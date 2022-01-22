import { Business, KeyedBusiness } from './business';

class Database {
  ipfs: any;
  orbitdb: any;
  myStore: any;
  businessKey: string;
  business: Business;
  readonly: boolean;

  async init() {
    // Create IPFS instance
    this.ipfs = window['ipfs'];
    if (!this.ipfs) {
      const Ipfs = window['Ipfs'];
      this.ipfs = await Ipfs.create({
        preload: { enabled: false },
        EXPERIMENTAL: { pubsub: true },
        config: {
          Addresses: {
            Swarm: [
              '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
              '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
            ]
          },
        }
      });
      window['ipfs'] = this.ipfs;
    }

    // Create OrbitDB instance
    const OrbitDB = window['OrbitDB'];
    this.orbitdb = await OrbitDB.createInstance(this.ipfs);

    // Create/open a key-value store called 'business' and load its data
    this.myStore = await this.orbitdb.keyvalue('business');
    await this.myStore.load();
    
    // Update the value following replication
    this.myStore.events.on('replicated', () => this.business = this.myStore.get(this.businessKey));

    // Determine if the user has write access
    const access = new Set(this.myStore.access.write);
    this.readonly = !access.has(this.orbitdb.identity.id);
  }

  getKeyedBusinesses(): KeyedBusiness[] {
    return Object.entries(this.myStore.all).map(e => ({key: e[0], business: e[1] as Business}));
  }

  getBusiness(key: string): Business {
    this.businessKey = key;
    this.business = this.myStore.get(this.businessKey);
    return this.business;
  }

  setBusiness(business: Partial<Business>) {
    this.business = {...this.business, ...business};
    this.myStore.put('key', this.business);
  }
}

export const database = new Database();