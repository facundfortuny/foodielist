export interface GMapOptions {
  zoomControl: boolean;
  mapTypeControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
  rotateControl: boolean;
  fullscreenControl: boolean;
  disableDefaultUi: boolean;
  zoom: number;
}

export interface Location {
  lat: number;
  lng: number;
}
