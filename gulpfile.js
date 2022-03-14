const gulp = require('gulp');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon')
const cleanCSS = require('gulp-clean-css');

gulp.task('css', () => (
    gulp.src('./public/styles/*.css')
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/dist'))
))

gulp.task('watch', () => (
    gulp.watch('./public/styles/*.css', gulp.parallel('css')),
    gulp.watch('/server.js', gulp.parallel('js'))
))

gulp.task('start', (done) => (
    nodemon({
        script: 'server.js',
        ext: 'css',
        tasks: ['css'],
        ignore: ['public/dist'],
        done: done
    })
))

gulp.task('default', gulp.parallel('css', 'start'))