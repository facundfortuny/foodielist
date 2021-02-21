import { Location } from '@/models/GMapOptions';
export interface Restaurant {
  id?: string;
  name: string;
  type: string;
  address: string;
  location: string;
  description: string;
  visited: boolean;
  mapsLink: string;
  position: Location;
  website: string;
}
