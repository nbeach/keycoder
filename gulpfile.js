var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('keycoder.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(rename('keycoder.min.js'))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build:watch', function() {
  gulp.watch('src/**/*', ['build']);

});

// Default Task
gulp.task('default', ['build']);