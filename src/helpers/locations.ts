import { Coord, LocationCoord } from '@/models/location';

export const locations: string[] = [
  '',
  'Valencia',
  'Barcelona',
  'Menorca',
  'Alacant',
  'London',
  'Madrid',
  'Paris',
  'Spain',
  'Germany',
  'France',
  'Italy',
  'Uk',
  'Norway',
  'Sweden',
  'Denmark',
  'Other',
];

export const defaultCoords: Coord = {
  lat: 39.47002481761118,
  lng: -0.37721269017276177,
};

export const locationCoords: LocationCoord = {
  ['Valencia']: {
    lat: 39.47002481761118,
    lng: -0.37721269017276177,
  },
  ['Barcelona']: {
    lat: 41.396993,
    lng: 2.158909,
  },
  ['Menorca']: {
    lat: 39.968122,
    lng: 4.101823,
  },
  ['Alacant']: {
    lat: 38.778269,
    lng: -0.437138,
  },
  ['London']: {
    lat: 51.514186,
    lng: -0.124068,
  },
  ['Madrid']: {
    lat: 40.421936,
    lng: -3.707876,
  },
  ['Paris']: {
    lat: 48.865847,
    lng: 2.340852,
  },
  ['Spain']: {
    lat: 40.421936,
    lng: -3.707876,
  },
  ['Denmark']: {
    lat: 55.682601,
    lng: 12.580743,
  },
  ['Norway']: {
    lat: 59.913528,
    lng: 10.749859,
  },
  ['Sweden']: {
    lat: 59.330187,
    lng: 18.068484,
  },
  ['Default']: {
    lat: 39.47002481761118,
    lng: -0.37721269017276177,
  },
};
