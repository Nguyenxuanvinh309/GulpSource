var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
// Requires the gulp-browser-sync plugin
var browserSync = require('browser-sync').create();
// Requires the gulp-useref plugin
var useref = require('gulp-useref');
// Requires the gulp-uglify plugin
var uglify = require('gulp-uglify');
// Requires the gulp-if plugin
var gulpIf = require('gulp-if');
// Requires the gulp-cssnano plugin
var cssnano = require('gulp-cssnano');
// Requires the gulp-imagemin plugin
var imagemin = require('gulp-imagemin');
// Requires the gulp-cache plugin
var cache = require('gulp-cache');
// Requires the del plugin
var del = require('del');
// Requires the run-sequence plugin
var runSequence = require('run-sequence');

//Build SASS task
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Build Minifies: html, js, css task
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//Optimize Image task
gulp.task('images', function(){
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg|mp4|ogg|webm)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      // Setting interlaced to true
      interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});

//Save fonts task
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

//Clean dist task
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//Clear cache task
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

//Browser sync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Gulp build
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

// Gulp default (Gulp start)
gulp.task('default', function (callback) {
  runSequence(['watch'],
    callback
  )
})
