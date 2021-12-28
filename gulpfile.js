let project_folder='distr';/// Выгружаем готовую сборку
let source_folder='src';/// Исходники

let path={
  build:{
    html:  project_folder + '/',
    css:   project_folder + '/css/',
    js:    project_folder + '/js/',
    img:   project_folder + '/img/',
    fonts: project_folder + '/fonts/'
  },
  src:{
    html:  [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css:   source_folder + '/sass/style.sass',
    js:    source_folder + '/js/**/*.js',
    img:   source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/*.ttf'
  },
  watch:{
    html:  source_folder + '/**/*.html',
    css:   source_folder + '/sass/**/*.sass',
    js:    source_folder + '/js/**/*.js',
    img:   source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
  },
  clean: './' + project_folder + '/'
}

let {src,dest} = require('gulp'),
          gulp = require('gulp'),
          browsersync = require('browser-sync').create(),
          fileinclude = require('gulp-file-include'),
          sass = require('gulp-sass'),
          autoprefixer = require('gulp-autoprefixer'),
          media = require('gulp-group-css-media-queries'),
          clean_css = require('gulp-clean-css'),
          rename = require('gulp-rename'),
          uglify = require('gulp-uglify'),
          imagemin = require('gulp-imagemin'),
          webp = require('gulp-webp'),
          webphtml = require('gulp-webp-html'),
          del = require('del');


function browserSync(params){
  browsersync.init({
    server:{
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: true
  })
}

function html () {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      media()
    )
    .pipe(autoprefixer({
      overrideBrowserlist: ['last 5 versions'],
      cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js () {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images () {
  return src(path.src.img)
    .pipe(webp({
        quality: 65
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgPlugins: [{ removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
  
}

function clean(params) {
  return del(path.clean);
  
}

let build = gulp.series(clean,gulp.parallel(css,js,html,images));
let watch = gulp.parallel(build, watchFiles,browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;