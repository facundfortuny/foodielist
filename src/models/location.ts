export interface Coord {
  lat: number;
  lng: number;
}

export interface LocationCoord {
  [key: string]: Coord;
}
