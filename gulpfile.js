/**
 * Created by dell on 2016/12/19.
 */
'use strict';
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint=require('gulp-jshint'),
    sourcemaps=require('gulp-sourcemaps');

//压缩图片 单独执行就好
gulp.task('images', function(){
    gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
});

//语法检查
gulp.task('jshint', function(){
    return gulp.src(['js/common.js','js/nav.js','js/jquery.ajaxInclude.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//压缩css
gulp.task('minifycss',function(){
    return gulp.src('css/main.css')    //需要操作的文件
        .pipe(sourcemaps.init()) //sourcemaps初始化
        .pipe(minifycss())   //执行压缩
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(sourcemaps.write('./')) //sourcemaps结束
        .pipe(gulp.dest('css'));   //输出文件夹
});
//压缩，合并 js
gulp.task('minifyjs', function(){
    return gulp.src(['js/common.js','js/nav.js','js/jquery.ajaxInclude.js'])      //需要操作的文件
        .pipe(sourcemaps.init())  //sourcemaps初始化
        .pipe(uglify())    //压缩
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(sourcemaps.write('./')) //sourcemaps结束
        .pipe(gulp.dest('js'));  //输出
});
//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default',['jshint'],function(){
    gulp.start('minifycss','minifyjs');
});