const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const loader = require('sass-loader');
const { HotModuleReplacementPlugin } = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	};

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserWebpackPlugin(),
		]
	}

	return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true,
			},
		},
		'css-loader',
	];

	if (extra) {
		loaders.push(extra);
	}

	return loaders;
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './js/index.js'
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},

	// для задания относительных путей
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},

	// для оптимизации подключаемых библиотек
	optimization: optimization(),

	// сервер для автоматического обновления страниц
	devServer: {
		port: 4200,
		hot: isDev,
		contentBase: path.resolve(__dirname, 'src/index.html'),
		watchContentBase: true
	},

	// плагины для добавление функционала
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, 'src/img'),
				to: path.resolve(__dirname, 'dist/img'),
			}],
		}),
	],

	// для работы с различными расширениями файлов
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			// {
			// 	test: /\.(png|jpg|svg)$/,
			// 	use: ['file-loader']
			// },
			{
				test: /\.js$/,
				enforce: 'pre',
				use: isDev ? ['source-map-loader'] : [''],
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg|otf)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'fonts',
				}
			}
		]
	}
};