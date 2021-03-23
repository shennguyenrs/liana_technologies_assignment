const { src, dest, series, parallel } = require("gulp");
const minifyJs = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const minifyHtml = require("gulp-html-minifier");
const copyFiles = require("gulp-copy");
const cleanDir = require("gulp-clean");
const autoprefixer = require("gulp-autoprefixer");

// Remove old directory
const clean = async () => {
  return src("./dist", { read: false, allowEmpty: true }).pipe(cleanDir());
};

// Copy all files to new dist
const copy = async () => {
  return src([
    "./script/*.min.js",
    "./script/*.map",
    "./styles/*.min.css",
    "./styles/*.map",
    "./img/**/*",
    "./favicon.ico",
    "./index.php",
  ])
    .pipe(copyFiles("./dist"))
    .pipe(dest("./dist"));
};

// Minify css file to all
const style = async () => {
  return src("./styles/styles.css")
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/styles"));
};

// Minify javascript file to all
const script = async () => {
  return src("./script/main.js")
    .pipe(minifyJs())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/script"));
};

// Minify html file
const html = async () => {
  return src("./*.html")
    .pipe(
      minifyHtml({
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist"));
};

// Make build
const build = series(clean, copy, parallel(style, script), html);

// Export functions
exports.clean = clean;
exports.copy = copy;
exports.style = style;
exports.script = script;
exports.build = build;

exports.default = build;
