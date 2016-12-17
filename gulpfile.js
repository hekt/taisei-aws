var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');
var buildFailed = false;
var onError = function(err) {
  buildFailed = true;
};

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', function() {
  buildFailed = false;
  return gulp
    .src([
      './**/*.ts',
      '!./node_modules/**',
    ])
    .pipe(tsProject())
    .on('error', onError)
    .pipe(gulp.dest('./dist'));
});

gulp.task('pre-test', ['build'], function(done) {
  if (buildFailed) {
    gutil.log('pre-test: skip');
    return done();
  }

  return gulp.src(['dist/src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function(done) {
  if (buildFailed) {
    gutil.log('test: skip');
    return done();
  };

  return gulp.src(['dist/tests/**/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      reporters: ['text']
    }));
});

gulp.task('watch', ['build'], function() {
  gulp.watch([
    'src/**/*.ts',
    'tests/**/*.ts',
  ], ['test']);
});
