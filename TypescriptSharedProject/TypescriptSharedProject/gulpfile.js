var gulp = require('gulp'),
    tsc = require('gulp-tsc'),
    shell = require('gulp-shell'),
    seq = require('run-sequence'),
    del = require('del');


var paths = {
    ts: {
        src: ['scripts/ts/*.ts'],
        dest: 'scripts'
    }
};

gulp.task('default', ['build']);
gulp.task('dev', ['watch']);

gulp.task('clean', function (done) {
    del(paths.ts.dest + '/*.js', done);
});

gulp.task('rebuild', function (done) {
    seq('clean', 'build', done);
});

gulp.task('build', function () {
    return gulp.src(paths.ts.src)
        .pipe(tsc({
            module: "CommonJS",
            sourcemap: true,
            emitError: false
        }))
        .pipe(gulp.dest(paths.ts.dest));
});

gulp.task('watch', function () {
    gulp.watch(paths.ts.src, ['build']);
});
