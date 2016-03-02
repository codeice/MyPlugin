/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-03-01 15:03:42
 * @version $Id$
 */

var  gulp=require('gulp');
var browserSync=require('browser-sync').create();
var less=require('gulp-less');
var cssmin=require('gulp-cssmin');
var rename=require('gulp-rename');
var uglify =require('gulp-uglify');

gulp.task('browser-sync',function(){
	browserSync.init({
		server:{baseDir:'./src'}
	});
});

//---less编译,css minify
gulp.task('less',function(){
	return gulp.src('./src/css/*.less')
	.pipe(less().on('error',function(err){
		console.log("compile less error=",err);
	}))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dest/css'));
});

//---js压缩
gulp.task('uglify-js',function(){
	return
	 gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('./dest/js'));
});


gulp.task('default',['browser-sync','compile-less','uglify-js'],function(){
	console.log("hello gulp...");
	gulp.watch('./src/css/*.less',['less']);
/*	gulp.src('./src/*.html')
	.pipe(gulp.dest('./dest/*.html'));*/
});	


