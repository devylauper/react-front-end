module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
	plugins: [
		['@babel/plugin-proposal-object-rest-spread', {loose: true, useBuiltIns: true}],
		['@babel/plugin-proposal-class-properties', {loose: true}],
		['@babel/plugin-syntax-dynamic-import']
	],
	env: {
		production: {
			plugins: [
				[
					'transform-react-remove-prop-types',
					{mode: 'wrap', ignoreFilenames: ['node_modules']}
				],
				['minify-dead-code-elimination', {optimizeRawSize: true}],
				'@babel/plugin-transform-react-inline-elements',
				'@babel/plugin-transform-react-constant-elements'
			]
		}
	},
	ignore: ['node_modules', 'build']
};
