import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import jsmin from 'gulp-jsmin'

gulp.task('build', () => {
  const src = 'src/**/*'
  const dest = 'build/'
  gulp.src(src)
      .pipe(babel({
        ignore: 'gulpfile.babel.js',
      }))
      .pipe(concat('index.js', {newLine: ';'}))
      .pipe(jsmin())
      .pipe(gulp.dest(dest))
})

gulp.task('default', ['build'])
