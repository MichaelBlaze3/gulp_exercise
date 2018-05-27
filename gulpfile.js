const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify")
const sass = require("gulp-sass");
const concat = require("gulp-concat");
/**
 * -- Top Lvl Functions --
 * gulp.task -> Define tasks
 * gulp.src -> Point to files to use
 * gulp.dest -> Points to folder to output
 * gulp.watch -> Watch files and folders for changes
 */

// Log Message
gulp.task("message", () => {
    return console.log("Gulp is running...");
});

// Copy all HTML files
gulp.task("copyHTML", () => {
    gulp.src("src/**/*.html").pipe(gulp.dest("dist"));
});

// Optimize images
gulp.task("imageMin", () => {
    gulp.src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
});

// Minify js files
gulp.task("minify", () => {
    gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
});

// Compile sass
gulp.task("sass", () => {
    gulp.src("src/sass/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("scripts", () => {
    gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest("dist/js"))
})

gulp.task('default', ["message", "copyHTML", "imageMin", "sass", "scripts"]);

gulp.task("watch", () => {
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/*.html", ["copyHTML"]);
    gulp.watch("src/sass/*.scss", ["sass"]);
    gulp.watch("src/images/*", ["imageMin"]);
});