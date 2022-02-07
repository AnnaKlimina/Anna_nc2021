var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync'); 



gulp.task('less',function(){
  return gulp.src('src/styles/styles.less')
    .pipe(less()) 
    .pipe(gulp.dest('src/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    browser: "C:\\Users\\klise\\AppData\\Local\\Yandex\\YandexBrowser\\Application\\browser.exe"
  })

  gulp.watch('src/styles/**/*.less', gulp.parallel('less'));
 
	gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('less','browserSync'));
