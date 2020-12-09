import banner from './banner'
import babel from '@rollup/plugin-babel'

export default {
  output: {
    name: 'Coaster',
    banner
  },
  plugins: [
    babel({
      plugins: [
        '@babel/external-helpers',
        '@babel/transform-object-assign'
      ]
    })
  ]
}