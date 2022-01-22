export interface Business {
  name: string;
  description: string;
  icon: string;
  url: string;
  tel: string;
  address: string;
  longitude: number;
  latitude: number;
}

export interface KeyedBusiness {
  key: string,
  business: Business
}