import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const input = './src/index.ts';
const external = ['react', 'muuri'];
const banner = `/**
* muuri-react v${pkg.version}
* ${pkg.homepage}
* Copyright (c) 2020-present, paol-imi
* Released under the MIT license
* https://github.com/paol-imi/muuri-react/blob/master/LICENSE
* @license MIT
*/
`;

const plugins = [
  replace({ __DEV__: "process.env.NODE_ENV === 'production'" }),
  typescript(),
];

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      banner,
    },
    external,
    plugins,
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      banner,
    },
    external,
    plugins,
  },
];
