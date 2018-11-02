import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import { minify } from 'uglify-es';
import livereload from 'rollup-plugin-livereload'; //热更新;

const isProd = process.env.NODE_ENV === 'production';
const devDir = isProd ? 'dist/' : 'examples/dist/';
const name = pkg.name.split('/').pop();
const version = pkg.version;
const banner =
`/*!
 * ${name} ${version} (https://github.com/J-env/pmr-editor)
 * API https://github.com/J-env/pmr-editor
 * Copyright 2017-${(new Date).getFullYear()} J-env. All Rights Reserved
 * Licensed under MIT (https://github.com/J-env/pmr-editor/blob/master/LICENSE)
 */
`;

const plugins = [
  nodeResolve({
    jsnext: true,
    main: false
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  scss({
    output: `${devDir}${name}.css`,
    failOnError: true,
    // outputStyle: 'compressed' // 压缩格式
    outputStyle: isProd ? 'compressed' : 'expanded'
  }),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**'
  })
];

const ex = isProd ? [
  {
    input: 'src/index.js',
    output: {
      file: `dist/index.js`,
      format: 'es',
      name: 'PMR',
      banner: banner,
    },
    plugins: plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: `dist/${name}.umd.js`,
      format: 'umd',
      // 如果不同时使用 export 与 export default 可打开legacy
      // legacy: true,
      name: 'PMR',
      banner: banner,
    },
    plugins: [
      ...plugins,
      uglify({}, minify)
    ]
  }

] : [
  {
    input: 'src/index.js',
    output: {
      file: `${devDir}${name}.umd.js`,
      format: 'umd',
      // 如果不同时使用 export 与 export default 可打开legacy
      // legacy: true,
      name: 'PMR',
      banner: banner,
    },
    watch: {
      exclude: ['node_modules/**']
    },
    plugins: [
      ...plugins,
      serve({
        // open: true,
        contentBase: `examples/`, //启动文件夹;
        host: 'localhost', //设置服务器;
        port: 6003 //端口号;
      }), 
      livereload({
        watch: 'examples/'
      })
    ]
  }
];

export default ex;
