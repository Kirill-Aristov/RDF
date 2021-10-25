let project_folder = "product";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    pdf: project_folder + "/pdf/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/hmtl/**/*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/app.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4}",
    pdf: source_folder + "/pdf/**/*",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp,mp4}",
    pdf: source_folder + "/pdf/**/*.pdf",
  },
  clean: "./" + project_folder + "/"
}
let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require('gulp-sass')(require('sass')),
  autoprefixer = require("gulp-autoprefixer");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}
function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
        .on('error', scss.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}
function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}
function pdf() {
  return src(path.src.pdf)
    .pipe(dest(path.build.pdf))
    .pipe(browsersync.stream())
}
function img() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
  gulp.watch([path.watch.pdf], pdf);
}
function clean(params) {
  return del(path.clean);
}
let build = gulp.series(clean, gulp.parallel(css, js, html, pdf, img));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.img = img;
exports.pdf = pdf;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;



// var globParent = require('glob-parent');

// globParent('path/to/*.js'); // 'path/to'
// globParent('/root/path/to/*.js'); // '/root/path/to'
// globParent('/*.js'); // '/'
// globParent('*.js'); // '.'
// globParent('**/*.js'); // '.'
// globParent('path/{to,from}'); // 'path'
// globParent('path/!(to|from)'); // 'path'
// globParent('path/?(to|from)'); // 'path'
// globParent('path/+(to|from)'); // 'path'
// globParent('path/*(to|from)'); // 'path'
// globParent('path/@(to|from)'); // 'path'
// globParent('path/**/*'); // 'path'

// // if provided a non-glob path, returns the nearest dir
// globParent('path/foo/bar.js'); // 'path/foo'
// globParent('path/foo/'); // 'path/foo'
// globParent('path/foo'); // 'path' (see issue #3 for details)