export interface GMapOptions {
  zoomControl: boolean;
  mapTypeControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
  rotateControl: boolean;
  fullscreenControl: boolean;
  disableDefaultUi: boolean;
  zoom: number;
  clickableIcons: boolean;
}

export interface Location {
  _lat: number;
  _lng: number;
  latitude: number;
  longitude: number;
}
