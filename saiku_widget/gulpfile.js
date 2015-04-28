'use strict';

process.env.BROWSERIFYSHIM_DIAGNOSTICS=1

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');


gulp.task('javascript', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        debug: true
    });

    return b.add('./saiku-chart-widget.js').bundle()
        .pipe(source('charts.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gutil.env.production ? uglify() : gutil.noop())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gutil.env.production ? gulp.dest('dist/') : gulp.dest('dev/'));
});


gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(concatCss("chart.css"))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gutil.env.production ? gulp.dest('dist/') : gulp.dest('dev/'));
});

gulp.task('default', ['javascript', 'css']);