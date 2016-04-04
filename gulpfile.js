var gulp          = require('gulp');
var clean         = require('gulp-clean');
var jshint        = require('gulp-jshint');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var browserSync   = require('browser-sync');
var stylish       = require('jshint-stylish');



gulp.task('clean', function(){
  return gulp.src('dist/')
  .pipe(clean());
});

gulp.task('browser-sync', function(){
  browserSync.init({
    server: "./"
  });
});

gulp.task('browsersync-reload', function () {
    browserSync.reload();
});

gulp.task('jslint', function() {
  return gulp.src(['components/**/*.js','shared/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(['components/**/*.js','shared/**/*.js'], ['jslint', 'browsersync-reload']);
  gulp.watch(['components/**/*.js','components/**/*.html','shared/**/*.js','shared/**/*.html'], ['browsersync-reload']);
});




gulp.task('jshint', function(){
  return gulp.src(['components/**/*.js','shared/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', function() {
            beep();
          });
});

gulp.task('uglify',['clean'], function(){
  return gulp.src(['components/**/*.js','scripts/*.js','shared/**/*.js'])
  .pipe(uglify())
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['jshint','uglify']);
