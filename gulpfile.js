'use strict';

var gulp        = require('gulp');
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('scss', function () {
	return gulp.src('./public/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./public/stylesheets'))
	.pipe(reload({ stream: true }));
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('watch', ['nodemon'], function () {
	browserSync.init({
		browser: "google chrome",
		proxy: "localhost:3000",
		port: 3001,
		notify: false
	});
	gulp.watch('./public/scss/*.scss', ['scss']);
	gulp.watch("./views/*.pug").on("change", browserSync.reload);
	gulp.watch("./public/**/*.*").on("change", browserSync.reload);
	gulp.watch("./routes/*.*").on("change", browserSync.reload);
});
