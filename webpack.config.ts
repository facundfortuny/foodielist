'use strict';
import { VueLoaderPlugin } from 'vue-loader';
export const mode = 'development';
export const entry = ['./src/app.js'];
export const devtool = 'source-map';
export const module = {
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader',
    },
  ],
};
export const plugins = [new VueLoaderPlugin()];
