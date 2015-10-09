var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    webserver = require('gulp-webserver'),
    babel = require("gulp-babel");

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
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist//img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('components', function() {
  return gulp.src('components/*.html')
    .pipe(gulp.dest('dist/view'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/js', 'dist//img'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'components');
});

gulp.task('watch', function() {
  gulp.watch('components/pulsy.html', ['components']);
  gulp.watch('src/styles/*.scss', ['styles']);
  gulp.watch('src/scripts/*.js', ['scripts']);
  gulp.watch('src/images/*', ['images']);
  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
