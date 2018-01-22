var gulp = require('gulp');
var rev = require('gulp-rev-append');
var inject = require('gulp-inject');
var ignore = require('gulp-ignore');
var webserver = require('gulp-webserver');
var nodemon = require('nodemon');
var del = require('del');

var paths = {
  src: './**/*',
  srcHTML: './**/*.html',
  srcCSS: './**/*.css',
  srcJS: './**/*.js',
  srcLibs: './node_modules/**/*',

  tmp: '../tmp',
  tmpIndex: '../tmp/index.html',
  tmpCSS: '../tmp/**/*.css',
  tmpJS: '../tmp/**/*.js',
  tmpLibs: '../tmp/node_modules',

  dist: '../dist',
  distIndex: '../dist/index.html',
  distCSS: '../dist/**/*.css',
  distJS: '../dist/**/*.js'
};

gulp.task('default', ['clean:tmp']);

gulp.task('clean:tmp', function () {
  return del(['../tmp/**'], {force: true});
});

gulp.task('html', function () {
  return gulp.src([paths.srcHTML, '!./node_modules/**']).pipe(gulp.dest(paths.tmp));
});

gulp.task('css', function () {
  return gulp.src([paths.srcCSS, '!./node_modules/**']).pipe(gulp.dest(paths.tmp));
});

gulp.task('js', function () {
  return gulp.src([paths.srcJS, '!./node_modules/**']).pipe(gulp.dest(paths.tmp));
});

gulp.task('libs', function () {
  return gulp.src(paths.srcLibs).pipe(gulp.dest(paths.tmpLibs));
});

gulp.task('copy', ['html', 'css', 'js', 'libs']);

gulp.task('inject', ['copy'], function () {
  var css = gulp.src([paths.tmpCSS, '!../tmp/node_modules/**']);
  var js = gulp.src([paths.tmpJS, '!../tmp/node_modules/**']);
  return gulp.src(paths.tmpIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.tmp)
    .pipe(webserver({
      port: 5000,
      livereload: true
    }));
});

gulp.task('server', function() {
  // configure nodemon
  nodemon({
      // the script to run the app
      script: '../tmp/server.js',
      // this listens to changes in any of these files/routes and restarts the application
      watch: ["../tmp/server.js", "../tmp/app.js"],
      ext: 'js'
      // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
  }).on('restart', () => {
  gulp.src('server.js')
    // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
    .pipe(notify('Running the start tasks and stuff'));
});
});



gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});

////////////////////////////////
gulp.task('rev', function() {
  gulp.src('index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});