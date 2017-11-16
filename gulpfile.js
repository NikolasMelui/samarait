const gulp           = require('gulp'),
	  gutil          = require('gulp-util'),
	  sass           = require('gulp-sass'),
	  concat         = require('gulp-concat'),
	  uglify         = require('gulp-uglify'),
	  cleanCSS       = require('gulp-clean-css'),
	  rename         = require('gulp-rename'),
	  del            = require('del'),
	  imagemin       = require('gulp-imagemin'),
	  browserSync    = require('browser-sync'),
	  cache          = require('gulp-cache'),
	  autoprefixer   = require('gulp-autoprefixer'),
	  ftp            = require('vinyl-ftp'),
	  notify         = require('gulp-notify'),
	  sourceMaps     = require('gulp-sourcemaps'),
	  livereload     = require('gulp-livereload');

// Пользовательские скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(sourceMaps.init())
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('app/js'))
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/fullpage.js/vendors/scrolloverflow.min.js',
		'app/libs/fullpage.js/dist/jquery.fullpage.min.js',
		'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/libs/inputmask/dist/min/inputmask/inputmask.min.js',
		'app/libs/inputmask/dist/min/inputmask/jquery.inputmask.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['watch'], function() {
	// browserSync({
	// 	proxy: "https://samarait-nikolasmelui.c9users.io",
	// 	port: 8080,
	// 	notify: true
	// 	// tunnel: true,
	// 	// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	// });
	browserSync({
		files: ['views/**/*.*', 'libs/**/*.js', 'app/js/common.js', 'app/sass/**/*.sass'],
		port: 8082
});

});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sourceMaps.init())
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(sourceMaps.write())
	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('views/**/*.*');
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	// .pipe(cache(imagemin())) // Cache Images
	.pipe(imagemin())
	.pipe(gulp.dest('app/img')); 
});

// gulp.task('deploy', function() {

// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});

// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));

// });

// gulp.task('removedist', function() { return del.sync('dist'); });
// gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['browser-sync', 'watch']);
