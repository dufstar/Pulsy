var gulp = require('gulp');
var webserver = require('gulp-webserver');
var babel = require("gulp-babel");


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('babel', function() {
  gulp.src('src/pulsy.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
