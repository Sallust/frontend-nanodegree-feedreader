'use strict';

var gulp = require('gulp');

var del = require('del');
var browserSync = require("browser-sync");



gulp.task('watch', function() {
    gulp.watch('index.html', ['brow-sync']);
});

gulp.task('default', ['brow-sync', 'watch']);

gulp.task('brow-sync', function() {
	browserSync.init({
		server:{
			baseDir: "./"
		},
		socket: {
			domain: 'http://localhost:3000'
		},
		files: './jasmine/spec/feedreader.js'
	});
});

