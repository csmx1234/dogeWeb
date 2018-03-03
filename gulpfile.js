'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('scss', function () {
	return gulp.src('./public/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch('./public/scss/*.scss', ['scss']);
	gulp.watch("./views/*.pug").on("change", browserSync.reload);
});
