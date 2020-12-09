import build from './build'
import babel from '@rollup/plugin-babel'

export default Object.assign(build, {
  input: 'entry/entry-modular.js',
  output: Object.assign(build.output, {
    file: 'dist/coaster.modular.esm.js',
    format: 'es'
  }),
  plugins: [babel({ babelHelpers: 'bundled' })]
})