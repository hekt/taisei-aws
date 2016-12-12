var gulp = require('gulp');
var shell = require('gulp-shell');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function() {
  return gulp
    .src([
      './**/*.ts',
      '!./node_modules/**',
    ])
    .pipe(tsProject())
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', ['build'], shell.task([
  '$(npm bin)/istanbul cover --report text-summary $(npm bin)/_mocha -- dist/tests/**/*.test.js',
], {
  ignoreErrors: true,
  env: {
    'FORCE_COLOR': true,
  }
}));

gulp.task('watch', ['build'], function() {
  gulp.watch([
    'src/**/*.ts',
    'tests/**/*.ts',
  ], ['build', 'test']);
});
