/**
 * Created by dell on 2016/12/19.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('default', function(){
    gulp.src('images_/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});
