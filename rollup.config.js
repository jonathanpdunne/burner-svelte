import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
// import { postcss } from 'minna-ui';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

// const postcssOpts = {
// 	include: ['src/css/**/*.css'],
//   };

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('/@sapper/')) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			// postcss(postcssOpts),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve(),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			json({
				include: 'node_modules/**',
				exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
				preferConst: true, // Default: false
				indent: '  ',
				compact: true, // Default: false
				namedExports: true // Default: true
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev
			}),
			json({
				include: 'node_modules/**',
				exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
				preferConst: true, // Default: false
				indent: '  ',
				compact: true, // Default: false
				namedExports: true // Default: true
			}),
			resolve(),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
