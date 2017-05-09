'use strict'
var gulp          = require('gulp');
var logger        = require('logger');
var less          = require('gulp-less');
var tsb           = require('gulp-tsb');
var browserify    = require('browserify');
var watchify      = require('watchify');
var tsify         = require('tsify');
var source        = require('vinyl-source-stream');
var nodemon       = require('gulp-nodemon');
var path          = require('path');

gulp.task('less', function () {
    return gulp.src('./static/src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./static/out/stylesheets'));
});

var tsConfigSrc = tsb.create('./src/tsconfig.json');
gulp.task('buildServerTs', function () {
    return gulp.src('./src/**/*.ts')
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest('./out'));
});

gulp.task('buildClientTs', function() {
  let b = browserify({
    entries: './static/src/ts/fim-connect.ts'
  });
  b.plugin('tsify')
  .bundle()
  .pipe(source('fim-connect.js'))
  .pipe(gulp.dest('./static/out/javascripts'));

  b.plugin(watchify, {
    ignoreWatch: ['**/node_modules/**']
  });
  return b;
});

gulp.task('nodemon', function(){
  return nodemon({
    script: 'out/www.js',
    watch: ['out/*.js', "out/**/*.*"]
  })
  .on('restart', function(){
    console.log('restarted');
  })
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['buildServerTs']);
    gulp.watch('static/src/ts/**/*.ts', ['buildClientTs']);
    gulp.watch('static/src/less/**/*.less', ['less']);
}); 

gulp.task('buildAll', ['buildServerTs', 'buildClientTs', 'less']);
gulp.task('default', ['nodemon', 'watch']);
