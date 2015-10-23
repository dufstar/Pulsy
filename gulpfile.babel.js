var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    browserify = require("gulp-browserify");

gulp.task('styles', function() {
  return sass('src/styles/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('browserify', ['scripts'], function() {
  return gulp.src('dist/js/pulsy.js')
  .pipe(browserify())
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(notify({ message: 'Scripts task complete' }))
});

gulp.task('components', function() {
  return gulp.src('components/*.html')
    .pipe(gulp.dest('dist/view'))
    .pipe(notify({ message: 'Components task complete' }))
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist//img'], cb)
});

gulp.task('build', ['clean', 'browserify', 'components', 'styles']);


gulp.task('watch', function() {
  gulp.watch('./src/**', ['browserify', 'components', 'styles']);
});

gulp.task('default', ['build', 'watch']);
