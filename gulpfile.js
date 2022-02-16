var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync");
var svgstore = require("gulp-svgstore");
var inject = require("gulp-inject");

gulp.task("svgstore", function () {
  var svgs = gulp.src("src/svg/*.svg").pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("src/index.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("src"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("less", function () {
  return gulp
    .src("src/styles/styles.less")
    .pipe(less())
    .pipe(gulp.dest("src/styles"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("browserSync", function () {
  browserSync({
    server: {
      baseDir: "src",
    },
    browser:
      "C:\\Users\\klise\\AppData\\Local\\Yandex\\YandexBrowser\\Application\\browser.exe",
  });

  gulp.watch("src/styles/**/*.less", gulp.parallel("less"));

  gulp.watch("src/svg/*.svg", gulp.parallel("svgstore"));

  gulp.watch("src/index.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel("less", "svgstore", "browserSync"));
