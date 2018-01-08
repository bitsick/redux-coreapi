import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

import pkg from './package.json'


var input = 'src/index.js'
var name = 'ReduxCoreAPI'
var banner = `/* redux-coreapi version ${pkg.version} */`
var babelConfig = {
  exclude: 'node_modules/**',
}


var umd = {
  input: input,
  name: name,
  banner: banner,
  output: {
    format: 'umd',
    file: pkg.browser
  },
  plugins: [
    commonjs(),
    babel(babelConfig)
  ]
}


var umdmin = {
  input: input,
  name: name,
  banner: banner,
  output: {
    format: 'umd',
    file: pkg.browser.replace('.js', '.min.js')
  },
  plugins: [
    commonjs(),
    babel(babelConfig),
    uglify()
  ]
}


var es = {
  input: input,
  name: name,
  banner: banner,
  output: {
    format: 'es',
    file: pkg.module
  },
  plugins: [babel(babelConfig)]
}


var cjs = {
  input: input,
  name: name,
  banner: banner,
  output: {
    format: 'cjs',
    file: pkg.main,
  },
  plugins: [babel(babelConfig)]
}


export default [umd, umdmin, es, cjs]
