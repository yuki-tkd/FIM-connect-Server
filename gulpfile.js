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

// compile less files from the ./styles folder
// into css files to the ./public/stylesheets folder
gulp.task('less', function () {
    return gulp.src('./src/public/stylesheets/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./out/public/stylesheets'));
});

// TypeScript build for /src folder 
var tsConfigSrc = tsb.create('./src/tsconfig.json');
gulp.task('buildServerTs', function () {
    return gulp.src(['./src/**/*.ts','!src/public/javascripts/*.ts', '!src/public/javascripts/**/*.ts'])
        .pipe(tsConfigSrc()) 
        .pipe(gulp.dest('./out'));
});

gulp.task('buildClientTs', function() {
  let b = browserify({
    entries: './src/public/javascripts/fim-connect.ts'
  });
  b.plugin('tsify')
  .bundle()
  .pipe(source('fim-connect.js'))
  .pipe(gulp.dest('./out/public/javascripts/'));

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
    gulp.watch(['src/*.ts', 'src/**/*.ts', '!src/public/javascripts/*.ts', '!src/public/javascripts/**/*.ts'], ['buildServerTs']);
    gulp.watch(['src/public/javascripts/*.ts', 'src/public/javascripts/**/*.ts'], ['buildClientTs']);
    gulp.watch('src/public/stylesheets/*.less', ['less']);
}); 

gulp.task('buildAll', ['buildServerTs', 'buildClientTs', 'less']);
gulp.task('default', ['nodemon', 'watch']);
