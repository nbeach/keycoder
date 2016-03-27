var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var addsrc = require('gulp-add-src');
var sourcemaps = require('gulp-sourcemaps');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

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

gulp.task('document', function () {
  return gulp
    .src(['src/keycoder.js'])
    .pipe(gulpJsdoc2md())
    .pipe(addsrc.prepend('project-info.md'))
    .pipe(concat('README.md'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['build', 'document']);
  gulp.watch('project-info.md', ['document']);
});

// Default Task
gulp.task('default', ['build', 'document']);