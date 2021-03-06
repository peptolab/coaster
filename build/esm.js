import build from './build'
import babel from '@rollup/plugin-babel'

export default Object.assign(build, {
  input: 'entry/entry-complete.js',
  output: Object.assign(build.output, {
    file: 'dist/coaster.esm.js',
    format: 'es'
  }),
  plugins: [babel({ babelHelpers: 'bundled' })]
})