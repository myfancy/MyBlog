/**
 * Created by dell on 2016/12/19.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('default', function(){
    gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});
