var fs = require('fs');
var del = require('del');
var request = require('request');
var gulp = require('gulp');
var chmod = require('gulp-chmod');
var gunzip = require('gulp-gunzip');
var install = require('gulp-install');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');
var untar = require('gulp-untar');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');
var zip = require('gulp-zip');
var source = require('vinyl-source-stream');


/**
 * Tasks for AWS Lambda
 */

var webpackConfig = require('./webpack.config.js');

gulp.task('clean:lambda', del.bind(null, [
  'dist/production',
  'dist/upload.zip',
]));

gulp.task('archive:lambda', [
  'copy:lambda',
  'install:lambda',
  'before-install:lambda',
  'bundle:lambda',
], function () {
  return gulp.src([
    './dist/production/**'
  ], {base: './dist/production'})
    .pipe(zip('upload.zip'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy:lambda', function () {
  return gulp.src('./resources/*.sqlite3')
    .pipe(gulp.dest('./dist/production/resources'));
});

gulp.task('install:lambda', function () {
  return gulp.src('./package.json')
    .pipe(gulp.dest('./dist/production'))
    .pipe(install({production: true}));
});

gulp.task('before-install:lambda', ['install:lambda'], function (done) {
  var path = './dist/production/node_modules/sqlite3/lib/binding/node-v46-linux-x64/node_sqlite3.node';
  try {
    fs.statSync(path);
    done();
  } catch (e) {
    var filename = 'node-v46-linux-x64.tar.gz';
    return request('https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v3.1.8/' + filename)
      .pipe(source(filename))
      .pipe(gunzip())
      .pipe(untar())
      .pipe(chmod(0o755))
      .pipe(gulp.dest('./dist/production/node_modules/sqlite3/lib/binding'));
  }
});

gulp.task('bundle:lambda', function () {
  return gulp.src('./src/lambda.ts')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/production'));
});


/**
 * Tasks for development
 */

var tsProject = ts.createProject('tsconfig.json');
var buildFailed = false;
var onError = function(err) {
  buildFailed = true;
};

gulp.task('clean', del.bind(null, [
    'dist/src',
    'dist/tests',
]));

gulp.task('build', function() {
  buildFailed = false;
  return gulp
    .src([
      './**/*.ts',
      '!./node_modules/**',
      '!./dist/**',
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

gulp.task('simple-test', ['build'], function(done) {
  if (buildFailed) {
    gutil.log('simple-test: skip');
    return done();
  }

  return gulp.src(['dist/tests/**/*.js'])
    .pipe(mocha());
});

gulp.task('watch', ['build'], function() {
  gulp.watch([
    'src/**/*.ts',
    'tests/**/*.ts',
  ], ['simple-test']);
});
