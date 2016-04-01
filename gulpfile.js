var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wrap = require('gulp-wrap');
var addsrc = require('gulp-add-src');
var sourcemaps = require('gulp-sourcemaps');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

gulp.task('build', function() {
  return gulp
    .src([
      'src/exports.js',
      'src/modules/Util.js',
      'src/modules/KeyData.js',
      'src/modules/Key.js',
      'src/modules/Keycoder.js'
    ])
    .pipe(concat('keycoder.js'))
    .pipe(wrap('(function(){\r\n<%= contents %>\r\n})();'))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('dist/'))
    .pipe(rename('keycoder.min.js'))
    .pipe(uglify({
      mangle: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('document', ['build'], function () {
  return gulp
    .src(['dist/keycoder.js'])
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