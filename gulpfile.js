var gulp = require('gulp'),
	webpack = require('webpack'),
	md5 = require('gulp-md5-plus'),
	gutil = require('gulp-util'),
    clean = require('gulp-clean');//清理文件


var webpack_config=require('./webpack.config.js');//得到webpack的配置
var devCompiler = webpack(webpack_config);

//执行打包流
gulp.task('build',function(callback){
	devCompiler.run(function(err, stats){
		gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();//执行完后执行下一个流
	});
});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['fileinclude'], function (done) {
  gulp.src('dist/oldjs/**/*.js')
       .pipe(md5(10, 'dist/html/**/*.html'))
       .pipe(gulp.dest('dist/js'))
       .on('end', done);
});

/*gulp.task('clean', ['md5:js'], function (done) {
	gulp.src(['dist/js'])
        .pipe(clean())
        .on('end', done);
});*/

//将html 文件放到dist中
gulp.task('fileinclude', ['build'], function (done) {
   gulp.src('src/html/**/*.html')
       .pipe(gulp.dest('dist/html'))
       .on('end', done);
});



gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['build','fileinclude','md5:js'])
        .on('end', done);
});

gulp.task('dev', ['build','watch','fileinclude','md5:js']);

gulp.task('default', ['build','fileinclude','md5:js']);//生产环境 还要替换md5 等等就不搞啦~~;