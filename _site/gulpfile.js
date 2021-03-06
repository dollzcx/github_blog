var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

var less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');

var paths = {
    less: ['public/stylesheets/less/**/*.less'],
    images: ['public/images/zone/**/*.jpg']
};

var watcherLess;

gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest('public/images/zone/min'));
});

gulp.task('styles', function () {
    return gulp.src(paths.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('public/stylesheets/src'))
        .pipe(minifyCSS())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest('public/stylesheets/dest'))
        .pipe(livereload());
});

gulp.task('default', ['styles'], function () {
    livereload.listen();

    watcherLess = gulp.watch(paths.less, ['styles']);
    watcherLess.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', runnning tasks...');
    });
});
