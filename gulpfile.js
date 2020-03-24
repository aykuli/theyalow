const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const del = require('del');
const concat = require('gulp-concat');

//placing *.html files in build/ dir
gulp.task('html', function (htmlBuild) {
    gulp.src('*.html')
        .pipe(gulp.dest('build/'));
    htmlBuild();
});

//just copy build/style.css from style.scss
gulp.task('css', function(done) {
    gulp.src("*.css")
        .pipe(plumber())
        .pipe(gulp.dest("build/"))
        .pipe(browserSync.stream());
    done();
});

gulp.task('assets', () => {
  gulp.src('assets/*.*')
      .pipe(gulp.dest('build/assets/'));
});

//wathing changes on *.html, *.scss source files
//and reloading browser if yes
gulp.task('serve', function(done) {
    browserSync.init({
        server: "./build",
        open: true
    });

    gulp.watch('*.css', gulp.series('css'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    gulp.watch('*.html', gulp.series('html'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    gulp.watch('assets/*.*', gulp.series('assets'))
                                .on('change', () => {
                                  browserSync.reload();
                                });
    done();
});

// clear folder build/ from old *.html/*.css when refreshing ones
gulp.task('clearBuild', function() {
  return del(['build/*.html',
              'build/style.css'
            ])
});


//main task for developing and wathing changes in browser
gulp.task('dev',
          gulp.series('clearBuild',
                      gulp.parallel('css', 'html'),
                      'serve'
                      ));






