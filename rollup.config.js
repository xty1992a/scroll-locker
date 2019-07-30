import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
	file: 'lib/index.js',
	format: 'umd',
	name: 'ScrollLocker'
  },
  plugins: [
	babel({
	  exclude: 'node_modules/**'
	}),
	uglify()
  ]
};
