var gulp = require('gulp');
var bs = require('browser-sync').create(); //create a browser-sync instance


var paths = {
	index: ['./src/index.html'],
	html: ['./src/components/**/*.html'],
	css: ['./src/styles/**/*.css'],
	js: ['./src/**/*.js'],
}

gulp.task('browser-sync', function() {
	bs.init({
		server: {
			baseDir: ["./", "./src"]
		},
		open: false,
		notify: {
		    styles: {
		        top: '0',
		        right: '40%',
		        backgroundColor: 'rgba(0, 0, 0, 0.2)'
		    }
		}
	});
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch([paths.index, paths.html, paths.css, paths.js]).on('change', bs.reload);
});