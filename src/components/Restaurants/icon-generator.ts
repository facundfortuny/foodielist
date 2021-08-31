import Vue from 'vue';
import RestaurantMarker from './RestaurantMarker.vue';

// create a constructor from a Vue component
const LocationIconConstructor = Vue.extend(RestaurantMarker);

export const getColoredIconUrl = (
  fillColor: string,
  strokeColor: string
): string => {
  // create a Vue element with required props
  const iconComponent = new LocationIconConstructor({
    propsData: { fillColor, strokeColor },
  });
  // mount the component shadow DOM
  iconComponent.$mount();
  // get icon DOM element
  //   const iconDom = iconComponent.$el;
  // generate an html string from an element
  const iconString = new XMLSerializer().serializeToString(iconComponent.$el);
  // finally, generate a data url from a string
  return 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(iconString);
};
