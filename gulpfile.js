/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    _ = require('lodash'),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    inject = require("gulp-inject"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    cssClean = require("gulp-clean-css"),
    del = require('del'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    angularFilesort = require('gulp-angular-filesort'),
    naturalSort = require("gulp-natural-sort"),
    livereload = require('gulp-livereload');



var paths = {
    webroot: "./wwwroot",
    src: "./wwwroot/src",
    libs: "./wwwroot/libs",
    jsLibs: "./wwwroot/libs/js",
    cssLibs: "./wwwroot/libs/css",
    scss: "./wwwroot/src/scss",
    dist: "./wwwroot/dist",
    node_modules: "./node_modules",
};


gulp.task('copy-assets-js', function() {
    var assets = {
        js: [
            "./node_modules/spin.js/spin.js",
            "./node_modules/angular/angular.js",
            "./node_modules/angular-spinner/angular-spinner.js",
            "./node_modules/angular-ui-router/release/angular-ui-router.js",
            "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",


        ]
    };
    return gulp.src(assets.js).pipe(gulp.dest(paths.jsLibs));

});



gulp.task('copy-assets-css', function() {
    var assets = {
        css: [
            "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
            "./node_modules/bootstrap/dist/css/bootstrap.css"
        ]
    };
    return gulp.src(assets.css).pipe(gulp.dest(paths.cssLibs));

});

gulp.task('copy-js', function() {

    return gulp.src(paths.src + "/**/*.js").pipe(gulp.dest(paths.dist));

});

gulp.task('copy-html', function() {

    return gulp.src(paths.src + "/views/*.html").pipe(gulp.dest(paths.dist + "/views"));

});

gulp.task("injectPath", ["copy-assets-js", "copy-assets-css", "copy-js", "copy-html"], function() {


    gulp.src(paths.src + "/index.html")
        .pipe(inject(gulp.src("./wwwroot/libs/js/spin.js", { read: false }), { name: "spin", ignorePath: paths.webroot, addRootSlash: false, relative: true }))
        .pipe(inject(gulp.src([paths.jsLibs + "/*.js", "!" + paths.jsLibs + "/spin.js"]).pipe(naturalSort()), { name: "libs", ignorePath: paths.webroot, addRootSlash: false, relative: true }))
        .pipe(inject(gulp.src([paths.src + "/**/*.js", "!" + paths.jsLibs + "/*.js"]).pipe(angularFilesort()), { ignorePath: paths.webroot, addRootSlash: false, relative: true }))
        .pipe(inject(gulp.src(paths.cssLibs + "/*.css", { read: false }), { name: "cssLibs", ignorePath: paths.webroot, addRootSlash: false, relative: true }))
        .pipe(inject(gulp.src([paths.src + "/**/*.css", "!" + paths.cssLibs + "/*.css"], { read: false }), { ignorePath: paths.webroot, addRootSlash: false, relative: true }))

    .pipe(gulp.dest(paths.dist));

});

gulp.task("sass", function(done) {
    gulp.src(paths.scss + "/**/*.scss")
        .pipe(sass({
            errLogToConsole: true,
            sourceComments: "normal"
        }))
        .pipe(gulp.dest(paths.dist + "/css/"))
        .pipe(cssClean({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: "min.css" }))
        .pipe(gulp.dest(paths.dist + "/css/"))
        .on("end", done);

});

gulp.task('clean', function(rm) {
    return del([paths.libs, paths.dist]);


});

//task to run before donet run;
gulp.task("build", ["injectPath"], function(done) {

});


gulp.task("rebuild", ["clean"], function(done) {
    runSequence("build");
});

gulp.task('watch', function() {
    livereload.listen();
    return watch(paths.src + "/*", function(events, done) {
        gulp.start('build', done);
    });
});