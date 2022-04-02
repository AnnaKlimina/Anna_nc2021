var gulp = require("gulp");
var less = require("gulp-less");
var browserSync = require("browser-sync");
var svgstore = require("gulp-svgstore");
var inject = require("gulp-inject");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify-es").default;

gulp.task("svgstore", function () {
  var svgs = gulp.src("src/svg/*.svg").pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("src/index.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("src"));
});

gulp.task("less", function () {
  return gulp
    .src("src/styles/styles.less")
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/styles"));
});

gulp.task("html", function () {
  return gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("js", function () {
  return gulp.src("./src/js/*.js").pipe(uglify()).pipe(gulp.dest("./dist/js"));
});

gulp.task("clean", async function () {
  return await del("dist");
});

gulp.task("browserSync", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp
    .watch("./src/styles/**/*.less")
    .on("change", gulp.series("less", browserSync.reload));

  gulp
    .watch("./src/index.html")
    .on("change", gulp.series("html", browserSync.reload));

  gulp.watch("./src/svg/*.svg", gulp.parallel("svgstore"));
});

gulp.task(
  "default",
  gulp.parallel("less", "html", "js", "svgstore", "browserSync")
);

gulp.task("build", gulp.series("svgstore", "less", "html", "js"));
