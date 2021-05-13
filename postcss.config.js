module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-preset-env': {
			browsers: ['last 2 versions']
		},
		autoprefixer: {
			overrideBrowserslist: ['last 2 versions']
		}
	}
};
