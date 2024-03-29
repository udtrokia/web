
import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  proxy: {
    "/api": {
      "target": "http://localhost:6000/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
	immer: true
      },
      dynamicImport: { webpackChunkName: true },
      dll: false,      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  theme: {
    "primary-color": "#333333",
    "tabs-horizontal-padding": "12px 8px",
  }
}

export default config;
