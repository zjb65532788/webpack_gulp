var webpack = require('webpack'),
	fs=require('fs');

var entryPath="./src/entrys";
var outputPath="./dist";

var entrys= fs.readdirSync(entryPath).reduce(function (o, filename) {
    /\.js$/g.test(filename) &&
    (o[filename.replace(/\.js$/g,'')] = entryPath+'/'+filename);
    return o;
  }, {}
);
//entrys['vendors']=['vue']//一些公用的vue啊 等等。

module.exports={
	entry:entrys,
	output:{
		publicPath:"/dist",//相应的域名哦 如 "http://localhost"
		path: outputPath,//目标文件夹
		filename: 'oldjs/[name].js',
		chunkFilename: '/chunks/[hash].[name].chunk.js'//一些异步加载的会打包在这里哦
	},
	resolve: {
	  	extensions: ['', '.js', 'jsx','vue'],//是可以忽略的文件后缀名，比如可以直接require('Header');而不用加.js。
	},
	module:{
		loaders: [//所依赖的模块解析器
			{//es6咯 毕竟浏览器解析不了es6 所以需要解析器解析成es5 就先只用这个咯。
		        test: /\.js$/,
		        loader: 'babel',
		        query: {
					presets: ['es2015']
				}
		    },
			/*{//解析less咯
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			}, // use ! to chain loaders
			{//解析css 咯
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, 
      		{ //web字体库什么的咯
      			test: /\.(woff|svg|eot|ttf)\??.*$/, 
      			loader: 'url-loader?limit=50000'},
      		{//图片哈
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			} // inline base64 URLs for <=8k images, direct URLs for the rest*/
		]
	},
	plugins: [
        // kills the compilation upon an error.
        // this keeps the outputed bundle **always** valid
        new webpack.NoErrorsPlugin(),
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin('vendors', '/js/vendors.js')
    ]
}