/*
Gulpfile.js file for the tutorial:
Using Gulp, SASS and Browser-Sync for your front end web development - DESIGNfromWITHIN
http://designfromwithin.com/blog/gulp-sass-browser-sync-front-end-dev

Steps:

1. Install gulp globally:
npm install --global gulp

2. Type the following after navigating in your project folder:
npm install gulp gulp-util gulp-sass gulp-uglify gulp-rename gulp-minify-css gulp-notify gulp-concat gulp-plumber browser-sync --save-dev

3. npm install --save-dev node-neat

4. Setup your vhosts or just use static server (see 'Prepare Browser-sync for localhost' below)

5. Type 'Gulp' and start developing

6. install and add node-neat also
*/

/* Needed gulp config */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
//var minify = require('gulp-minify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var neat = require('node-neat');
//var pump = require('pump');
var reload = browserSync.reload;
/* Scripts task */
gulp.task('scripts', function () {
    return gulp.src([
        'js/vendor/jquery.js',
        'js/vendor/slick.js',
        'js/vendor/scroller.js',
        'js/vendor/easing.js',
        'js/vendor/niceselect.js',
        'js/vendor/popup.js'
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});


/* Sass task */
gulp.task('sass', function () {
    gulp.src('scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['scss'].concat(neat)
        }))
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        /* Reload the browser CSS after every change */
        .pipe(reload({ stream: true }));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
    browserSync.init(['css/*.css', 'js/*.js'], {
        proxy: 'http://localhost/mahindra/'
        /* For a static server you would use this: */
        /*server: {
            baseDir: './'
        }*/

    });
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function () {
    /* Watch scss, run the sass task on change. */
    gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass'])
    /* Watch app.js file, run the scripts task on change. */
    gulp.watch(['js/main.js'], ['scripts'])
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch(['*.php'], ['bs-reload']);
});
