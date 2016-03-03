var assetPath="";
var  gulp=require('gulp');
var browserSync=require('browser-sync').create();
var less=require('gulp-less');
var cssmin=require('gulp-cssmin');
var rename=require('gulp-rename');
var uglify =require('gulp-uglify');
var inject=require('gulp-inject');

gulp.task('browser-sync',function(){
	browserSync.init({
		server:{baseDir:'./src'}
	});
});

//---less编译,css minify
gulp.task('build-styles',function(){
	return gulp.src('./src/css/*.css')
/*	.pipe(less().on('error',function(err){
		console.log("compile less error=",err);
	}))*/
	.pipe(cssmin())
/*	.pipe(rename({suffix: '.min'}))*/
	.pipe(gulp.dest('./dest/css'));
});

//---js压缩
gulp.task('build-js',function(){
	return
	 gulp.src('./src/js/*.js')
	.pipe(uglify())
/*	.pipe(rename({suffix:'.min'}))*/
	.pipe(gulp.dest('./dest/js'));
});


//----重写html资源引用路径
gulp.task('build-html',function(){
	console.log('build-html');
	var target=gulp.src('./src/index.html')
	var sources=gulp.src(['./src/**/*.js','./src/**/*.css'],{read:false});
	return 
	target.pipe(inject(sources))
    .pipe(gulp.dest('./dest/index.html'));
});


gulp.task('build',['build-styles','build-js'],function(){	
	gulp.run('build-html');
});


gulp.task('default',['browser-sync','build'],function(){
	console.log("hello gulp...");
});	


