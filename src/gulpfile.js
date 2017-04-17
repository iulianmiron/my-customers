var gulp = require('gulp');
var rev = require('gulp-rev-append');

gulp.task('rev', function() {
  gulp.src('index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});