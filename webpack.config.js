const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintFormatter = require('eslint-formatter-pretty');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const NODE_DIR = path.resolve(__dirname, 'node_modules');
const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const CDN_PATH = process.env.CDN_URL !== '' ? process.env.CDN_URL : process.env.SITE_URL;

const base = {
	entry: `${SRC_DIR}/js/App.jsx`,

	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.scss', 'sass']
	},

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendorStyles: {
					name: 'vendor',
					test: /\.less$/,
					chunks: 'all',
					enforce: true
				},
				vendor: {
					test: NODE_DIR,
					name(module) {
						/*
							[NOTE]: get the name. E.g. node_modules/packageName/not/this/part.js
							or node_modules/packageName
						*/
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];

						// [NOTE]: npm package names are URL-safe, but some servers don't like @ symbols
						return `vendor.${packageName.replace('@', '')}`;
					}
				}
			}
		}
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: NODE_DIR,
				use: ['babel-loader']
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: NODE_DIR,
				use: ['ts-loader']
			},
			{
				test: /\.hbs$/,
				exclude: NODE_DIR,
				loader: 'handlebars-loader'
			},
			{
				test: /\.less$/,
				exclude: NODE_DIR,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {importLoaders: 1}
					},
					'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				exclude: NODE_DIR,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {importLoaders: 1}
					},
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(jpg|png|txt|webm|mp4|pdf|zip|rar|gif|ico|eot|otf|svg|ttf|woff|woff2|xml|webmanifest)$/,
				exclude: NODE_DIR,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			API_URL: JSON.stringify(process.env.API_URL)
		}),
		/*
			[NOTE]: For a quick formatting fix, if you do not have prettier.io enabled on your IDE, rebuild webpack using the FIX = TRUE setting below...
			To install prettier for your IDE please use the documentation here: https://prettier.io/docs/en/editors.html
		*/
		new ESLintPlugin({
			formatter: ESLintFormatter,
			extensions: ['js', 'ts', 'tsx', 'jsx']
			// [HACK]: fix: true
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name]-[contenthash].css',
			chunkFilename: 'styles/[name]-[contenthash]-[id].css'
		}),
		new HtmlWebpackPlugin({
			inject: 'body',
			template: `${SRC_DIR}/index.hbs`,
			variables: process.env,
			hasFont: process.env.GOOGLE_FONT_URL !== '',
			isProd: process.env.NODE_ENV === 'production'
		}),
		new CleanWebpackPlugin()
	],

	output: {
		filename: 'js/[name]-[contenthash].js',
		publicPath:
			process.env.NODE_ENV === 'production' ? `${CDN_PATH}/` : `${process.env.SITE_URL}/`,
		path: BUILD_DIR
	}
};

// [NOTE]: The settings below are specific to running the application in PRODUCTION mode.
if (process.env.NODE_ENV === 'production') {
	module.exports = merge(base, {
		devtool: 'source-map',

		optimization: {
			minimizer: [
				new CssMinimizerPlugin({
					exclude: NODE_DIR
				})
			]
		}
	});
}

// [NOTE]: The settings below are specific to running the application in DEVELOPMENT mode.
if (process.env.NODE_ENV !== 'production') {
	module.exports = merge(base, {
		devtool: 'eval-source-map',

		devServer: {
			historyApiFallback: true,
			compress: true,
			hot: false,
			contentBase: BUILD_DIR,
			open: true,
			port: process.env.PORT
		}
	});
}
