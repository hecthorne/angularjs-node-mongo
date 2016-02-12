/*global -$ */
'use strict';
//  Arquivo criado por Paulo Henrique/Sérgio Agusto
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var configs = {
    dir: {
        root: '',
        app: 'app/',
        fonts: 'fonts/**',
        images: 'images/**',
        styles: 'styles/'
    },
    dist: {
        root: 'dist/',
        app: 'dist/app/',
        fonts: 'dist/fonts/',
        images: 'dist/images/',
        styles: 'dist/styles/'
    },
    files: {
        useref: ['dist/index.html'],
        js: 'app/**/*.js',
        jshint: ['app/**/*.js', '!app/lib/**/*.js'],
        lessStyle: 'styles/style.less',
        less: 'styles/**/*.less',
        css : 'styles/**/*.css',
        html: ['**/*.html', '!node_modules/**/*.html', '!bower_components/**/*.html'],
        jade: ['**/*.jade', '!node_modules/**/*.jade', '!bower_components/**/*.jade', '!layout/**/*.jade']
    }
};

gulp.task('clean', function() {
    return gulp.src(configs.dist.root)
        .pipe($.clean({
            force: true
        }));
});

gulp.task('less', function() {
    return gulp.src(configs.files.lessStyle)
        .pipe($.less())
        .pipe(gulp.dest(configs.dir.styles));
});

gulp.task('jade', ['less'], function() {
    return gulp.src(configs.files.jade)
        .pipe($.jade({
            pretty: true
        }))
        .pipe(gulp.dest(configs.dir.root));
})

gulp.task('fonts', ['clean'], function() {
    return gulp.src(configs.dir.fonts)
        .pipe(gulp.dest(configs.dist.fonts));
});

gulp.task('images', ['clean'], function() {
    return gulp.src(configs.dir.images)
        .pipe(gulp.dest(configs.dist.images));
});

gulp.task('copy', ['clean', 'fonts', 'images', 'jade'], function() {
    return gulp.src(configs.files.html)
        .pipe(gulp.dest(configs.dist.root));
});

gulp.task('jshint', function() {
    return gulp.src(configs.files.jshint)
        .pipe(reload({
            stream: true,
            once: true
        }))
        .pipe($.jshint({
            newcap:false,
            sub:true
        }))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


gulp.task('useref', ['clean', 'jshint', 'copy'], function() {
    var assets = $.useref.assets({
        searchPath: ['.']
    });

    return gulp.src(['dist/index.html','dist/bolsaverde.html','dist/relatorios.html'])
        .pipe(assets)
        .pipe($.rev())
        .pipe($.if('*.js', $.ngAnnotate()))
        .pipe($.if(argv.prod, ($.if('*.js', $.uglify()))))
        .pipe($.if(argv.prod, ($.if('*.css', $.csso()))))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(gulp.dest(configs.dist.root));
});


gulp.task('browser', ['jade', 'less'], function() {
    browserSync({
        notify: false,
        port: 9001,
        server: {
            baseDir: ['.'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    // watch for changes
    gulp.watch([
        '*.html',
        'app/*.html',
        'app/**/*.js',
        'images/**/*',
        'fonts/**/*'
    ]).on('change', reload);

    gulp.watch('*.jade', ['jade']);
    gulp.watch('app/**/*.jade', ['jade']);
    gulp.watch('styles/**/*.less', ['less']);
});

///////////
// WATCH //
///////////

gulp.task('refresh', ['jade'], function(){
     $.livereload.changed(configs.dir.root);
});

gulp.task('watch', function() {
     $.livereload.listen();
    gulp.watch(configs.files.less, ['less']);
    gulp.watch(configs.files.jade, ['jade', 'refresh']);
    gulp.watch([configs.files.css, configs.files.js],['jshint'])
    .on('change', function(event) {
        $.livereload.changed(event.path);
    });
});

///////////
// BUILD //
///////////
gulp.task('server', ['browser']);

gulp.task('default', ['jade', 'less', 'watch']);

///PARA O BUILD EM PRODUÇÃO EXECUTE O COMANDO gulp build --prod
gulp.task('build', ['clean','useref'], function() {
    return gulp.src('dist/**/*').pipe($.size({
        title: 'Tamanho',
        gzip: true
    }));
});
