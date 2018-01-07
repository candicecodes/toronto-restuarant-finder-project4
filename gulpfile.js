const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css/'))
        .pipe(reload({ stream: true }));
});

gulp.task('watch', () => {
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('app.js', browserSync.reload)

});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: '.'
    })
});

gulp.task('default', ['browser-sync', 'styles', 'watch']);

