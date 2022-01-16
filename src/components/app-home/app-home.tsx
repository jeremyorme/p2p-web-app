import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  ipfs: any;
  orbitdb: any;
  myStore: any;
  @State() value: string;
  readonly: boolean;

  async componentWillLoad() {
    
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

    // Create/open a key-value store called 'my-store' and load its data
    this.myStore = await this.orbitdb.keyvalue('/orbitdb/zdpuAyVnbuWpkVg6gDoFCx6GZMzQFYiNz1NBVQq35JfTgPSdT/my-store');
    await this.myStore.load();
    
    // Get the latest value
    this.value = this.myStore.get('key');

    // Update the value following replication
    this.myStore.events.on('replicated', () => this.value = this.myStore.get('key'));

    // Determine if the user has write access
    const access = new Set(this.myStore.access.write);
    this.readonly = !access.has(this.orbitdb.identity.id);
  }

  setValue(value: string) {
    this.value = value;
    this.myStore.put('key', this.value);
  }

  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
        <p>
          Value=<input type="text" value={this.value} onInput={e => this.setValue((e.target as HTMLInputElement).value)} readonly={this.readonly}/>
        </p>
          <p>
          Address={this.myStore.address.toString()}
        </p>
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
