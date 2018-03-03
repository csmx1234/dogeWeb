'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function () {
	return gulp.src('./public/scss/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('scss:watch', function () {
	gulp.watch('./public/scss/*.scss', ['scss']);
});
