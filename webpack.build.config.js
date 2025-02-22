const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: 'babel-loader', query: { compact: false } }],
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
				],
			},
		],
	},
	target: 'electron-renderer',
	plugins: [
		new HtmlWebpackPlugin({ title: 'Book-mate' }),
		new WebpackCdnPlugin({
			modules: [
			  {
				name: 'bootstrap',
				var: 'Bootstrap',
				path: 'dist/css/bootstrap.min.css'
			  },
			  {
				name: 'vue-router',
				var: 'VueRouter',
				path: 'dist/vue-router.min.js'
			  },
			  {
				name: 'vuex',
				var: 'Vuex',
				path: 'dist/vuex.min.js'
			  }
			],
			publicPath: '/node_modules'
		  }),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'bundle.css',
			chunkFilename: '[id].css',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BabiliPlugin(),
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false,
	},
}
