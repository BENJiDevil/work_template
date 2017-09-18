var gulp = require('gulp');                                                                                             // основной плагин gulp

var sass            = require('gulp-sass');                             // SASS
var browserSync  	= require('browser-sync');                          // Browser Sync
var plumber         = require('gulp-plumber');                          // предохранитель для остановки гальпа
var watch           = require('gulp-watch');                            // расширение возможностей watch
var prefixer        = require('gulp-autoprefixer');                     // расставление автопрефиксов
var csso            = require('gulp-csso');                             // минификация CSS
var uglify          = require('gulp-uglify');                           // минификация JS
const imagemin      = require('gulp-imagemin');                         // сжатие изображений
var sourcemaps      = require('gulp-sourcemaps');                       // sourcemaps
var spritesmith     = require('gulp.spritesmith');                      // создание спрайтов из изображений
var clean           = require('gulp-clean');                            // очистка папки сборки
var	pngquant     	= require('imagemin-pngquant'); 					// Подключаем библиотеку для работы с png
var cache        	= require('gulp-cache'); 							// Подключаем библиотеку кеширования
var concat       	= require('gulp-concat'); 							// Подключаем gulp-concat (для конкатенации файлов)
var cssbeautify     = require("gulp-cssbeautify");                      // Приводит CSS в читабельный вид
var removeComments  = require('gulp-strip-css-comments');               // Удаляет комментарии из CSS
var rename          = require("gulp-rename");                           // Переименование файлов
var rigger          = require("gulp-rigger");                           // Импорт одного файла в другой

var path = {

    build: {                                                                                        // Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',                                                                             // Основная папка проекта
        js: 'build/js/',                                                                            // Папка JS
        jsb: 'build/js/',                                                                           // JS bower
        css: 'build/css/',                                                                          // Папка CSS
        img: 'build/images/',                                                                       // Папка с изображениями
        fonts: 'build/fonts/',                                                                      // Папка со шрифтами
        sprites: 'build/css/sprites/',                                                              // Папка и изображением спрайтов
        spritesCss: 'build/css/',                                                                   // Папка с CSS спрайтов
        php: 'build/include/',                                                                      // PHP
        php_config: 'build/',                                                                       // config PHP
        favicon: 'build/'                                                                           // favicon
    },
    release: {                                                                                      // Конечная папка релиза
        html: 'release/',                                                                           // Основная папка проекта
        js: 'release/js/',                                                                          // Папка JS
        jsb: 'release/js/',                                                                         // JS bower
        css: 'release/css/',                                                                        // Папка CSS
        img: 'release/images/',                                                                     // Папка с изображениями
        fonts: 'release/fonts/',                                                                    // Папка со шрифтами
        sprites: 'release/css/sprites/',                                                            // Папка и изображением спрайтов
        spritesCss: 'release/css/',                                                                 // Папка с CSS спрайтов
        php: 'release/include/',                                                                    // PHP
        php_config: 'release/',                                                                     // config PHP
        favicon: 'release/'                                                                         // favicon
    },
    src: {                                                                                          // Пути откуда брать исходники
        html: 'src/*.html',                                                              		    // HTML
        js: 'src/js/**/*.*',                                                                        // JS
        jsb: 'src/libs/**/*.*',                                                                     // JS bower
        css: 'src/css/**/*.css',                                                                    // CSS
        sass: 'src/css/**/*.+(sass|scss)',                                                                  // SASS
        img: 'src/images/**/*.*',                                                                   // Изображения
        fonts: 'src/fonts/**/*.*',                                                                  // Шрифты
        sprites: 'src/sprites/*.png',                                                               // Спрайты
        php: 'src/include/*.php',                                                                   // PHP
        php_config: 'src/include/conf/config.php',                                                  // config PHP
        favicon: 'src/favicon/*.*'                                                                  // favicon
    },
    watch: {                                                                                        // Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',                                                              		    // HTML
        js: 'src/js/**/*.js',                                                                       // JS
        jsb: 'src/libs/**/*.js',                                                                    // JS bower
        css: 'src/css/**/*.*',                                                                      // CSS
        img: 'src/css/images/**/*.*',                                                               // Изображения
        fonts: 'src/fonts/**/*.*',                                                                  // Шрифты
        sprites: 'src/sprites/*.png',                                                               // Спрайты
        php: 'src/include/*.*',                                                                     // PHP
        php_config: 'src/include/conf/config.php',                                                  // config PHP
        favicon: 'src/favicon/*.*'                                                                  // favicon
    },

    clean_build: './build',                                                                         // папка ./build
    clean_release: './release'                                                                      // папка ./release
};

/* CLEAN */
gulp.task('clean_build', function () {                                                              // очистка папки ./build
    return gulp.src(path.clean_build, {read: false})
        .pipe(clean());
});
gulp.task('clean_release', function () {                                                            // очистка папки ./release
    return gulp.src(path.clean_release, {read: false})
        .pipe(clean());
});

/* FONTS */
gulp.task('fonts:build', function() {                                                               // Билд шрифтов
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))                                                          // выгружаем в build
});
gulp.task('fonts:release', function() {                                                             // Билд шрифтов RELEASE
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.release.fonts))                                                        // выгружаем в release
});

/* PHP */
gulp.task('php:build', function() {                                                                 // Билд php
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))                                                            // выгружаем в build
    gulp.src(path.src.php_config)
        .pipe(gulp.dest(path.build.php_config))
});
gulp.task('php:release', function() {                                                               // Билд php RELEASE
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.release.php))                                                 	        // выгружаем в release
    gulp.src(path.src.php_config)
        .pipe(gulp.dest(path.release.php_config))
});

/* FAVICON */
gulp.task('favicon:build', function() {                                                             // Билд favicon
    gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.build.favicon))                                               	        // выгружаем в build
});
gulp.task('favicon:release', function() {                                                           // Билд favicon RELEASE
    gulp.src(path.src.favicon)
        .pipe(gulp.dest(path.release.favicon))                                                      // выгружаем в release
});

/* RELOAD */
gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/css/**/*.*', ['style:build']);                                                  // Наблюдение за sass файлами в папке sass
    gulp.watch('src/*.html', ['html:build']);                                                       // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/js/**/*.js',['js:build'], browserSync.reload);                                  // Наблюдение за JS файлами в папке js
});
gulp.task('browser-sync', function() {                                                              // Создаем таск browser-sync
    browserSync({                                                                                   // Выполняем browserSync
        server: {                                                                                   // Определяем параметры сервера
            baseDir: 'build'                                                                        // Директория для сервера
        },
        notify: false                                                                               // Отключаем уведомления
    });
});

/* HTML */
gulp.task('html:build', function () {                                                               // Билд HTML
    return gulp.src(path.src.html)                                                                  // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(rigger())                                                                             // Импортирование файлов
        .pipe(gulp.dest(path.build.html))                                                           // Выплюнем их в папку build
        .pipe(browserSync.reload({stream: true}))                                                   // И перезагрузим наш сервер для обновлений
});
gulp.task('html:release', function () {                                                             // Билд HTML
    return gulp.src(path.src.html)                                                                  // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(rigger())                                                                             // Импортирование файлов
        .pipe(gulp.dest(path.release.html))                                                         // Выплюнем их в папку build
        .pipe(browserSync.reload({stream: true}))                                                   // И перезагрузим наш сервер для обновлений
});



/* STYLES BUILD */
gulp.task('style:build',['css:build','libs_css:build'], function(){                                 // Создаем таск Sass
    return gulp.src(path.src.sass)                                                                  // Берем источник
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(sass())                                                                               // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))            // Создаем префиксы
        .pipe(cssbeautify())                                                                        // Читабельный вид
        .pipe(sourcemaps.write())                                                                   // Пишем карту
        .pipe(gulp.dest(path.build.css))                                                            // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true}))                                                   // Обновляем CSS на странице при изменении
});
gulp.task('css:build', function(){
    return gulp.src(path.src.css)                                                                   // Берем источник
        .pipe(cssbeautify())                                                                        // Читабельный вид
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(csso())                                                                               // Сжимаем
        .pipe(gulp.dest(path.build.css))                                                            // Выгружаем результат в папку css
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('libs_css:build', function() {
    return gulp.src([                                                                               // Берем все необходимые библиотеки
        'src/libs/owl.carousel/dist/assets/owl.carousel.css'                                        // Owl Carousel
    ])
        .pipe(concat('libs.min.css'))                                                               // Собираем их в кучу в новом файле libs.min.js
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(csso())                                                                               // Сжимаем
        .pipe(gulp.dest(path.build.css));                                                           // Выгружаем в папку
});

/* STYLES RELEASE */

gulp.task('style:release',['css:release','libs_css:release'], function(){                           // Создаем таск Sass
    return gulp.src(path.src.sass)                                                                  // Берем источник
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(sass())                                                                               // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))            // Создаем префиксы
        .pipe(cssbeautify())                                                                        // Читабельный вид
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(csso())                                                                               // Сжимаем
        .pipe(gulp.dest(path.release.css))                                                          // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true}))                                                   // Обновляем CSS на странице при изменении
});
gulp.task('css:release', function(){
    return gulp.src(path.src.css)                                                                   // Берем источник
        .pipe(cssbeautify())                                                                        // Читабельный вид
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(csso())                                                                               // Сжимаем
        .pipe(gulp.dest(path.release.css))                                                          // Выгружаем результата в папку css
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('libs_css:release', function() {
    return gulp.src([                                                                               // Берем все необходимые библиотеки
        'src/libs/owl.carousel/dist/assets/owl.carousel.css'                                        // Owl Carousel
    ])
        .pipe(concat('libs.min.css'))                                                               // Собираем их в кучу в новом файле libs.min.css
        .pipe(cssbeautify())                                                                        // Читабельный вид
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(csso())                                                                               // Сжимаем
        .pipe(gulp.dest(path.release.css))                                                         // Выгружаем в папку
        .pipe(browserSync.reload({stream: true}))
});

/* JS BUILD */
gulp.task('js:build',['libs_js:build'], function () {                                               // Билд JS
    gulp.src(path.src.js)                                                                           // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(rigger())                                                                             // Импортирование файлов
        .pipe(sourcemaps.init())                                                                    // Инициализируем карту
        .pipe(sourcemaps.write())                                                                   // Пропишем карту
        .pipe(gulp.dest(path.build.js))                                                             // Выплюнем готовый файл в build
        .pipe(browserSync.reload({stream: true}))                                                   // Обновляем CSS на странице при изменении
});
gulp.task('libs_js:build', function() {
    return gulp.src([                                                                               // Берем все необходимые библиотеки
        'src/libs/owl.carousel/dist/owl.carousel.min.js'                                            // Owl Carousel

    ])
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(concat('libs.min.js'))                                                                // Собираем их в кучу в новом файле libs.min.js
        .pipe(gulp.dest(path.build.js));                                                            // Выгружаем в папку
});

/* JS RELEASE */

gulp.task('js:release',['libs_js:release'], function () {                                           // Билд JS RELEASE
    gulp.src(path.src.js)                                                                           // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(rigger())                                                                             // Импорт файлов
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(sourcemaps.init())                                                                    // Инициализируем карту
        .pipe(uglify())                                                                             // Сожмем наш js
        .pipe(rename("common.min.js"))
        .pipe(gulp.dest(path.release.js))                                                           // Выплюнем готовый файл в build
});
gulp.task('libs_js:release', function() {
    return gulp.src([                                                                               // Берем все необходимые библиотеки
        'src/libs/owl.carousel/dist/owl.carousel.min.js'

    ])
        .pipe(removeComments())                                                                     // Удаляем комменты
        .pipe(concat('libs.min.js'))                                                                // Собираем их в кучу в новом файле libs.min.js
        .pipe(gulp.dest(path.release.js));                                                          // Выгружаем в папку
});

/* IMAGES BUILD */
gulp.task('img:build', function () {                                                                // Билд изображений
    gulp.src(path.src.img)                                                                          // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(cache(imagemin({                                                                      // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(path.build.img))                                                            // И бросим в build
        .pipe(browserSync.reload({stream: true}))                                                   // Обновляем CSS на странице при изменении
});

/* IMAGES RELEASE */
gulp.task('img:release', function () {                                                              // Билд изображений RELEASE
    gulp.src(path.src.img)                                                                          // Выберем файлы по нужному пути
        .pipe(plumber())                                                                            // Защита от остановки во время выполнения задачи
        .pipe(cache(imagemin({                                                                      // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(path.release.img))                                                          // И бросим в build
});

/* SPRITES BUILD */
gulp.task('sprites:build', function () {                                                            // Генерация спрайтов
    var spriteData =
        gulp.src(path.src.sprites)                                                                  // Выберем откуда брать изображения для объединения в спрайт
            .pipe(spritesmith({
                imgName: 'sprite.png',                                                              // имя спрайтового изображения
                cssName: 'sprite.css',                                                              // имя стиля где храним позиции изображений в спрайте
                imgPath: 'sprites/sprite.png',                                                      // путь где лежит спрайт
                cssFormat: 'css',                                                                   // формат в котором обрабатываем позиции
                algorithm: 'binary-tree',                                                           // алгоритм создания спрайта
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name                                                // имя каждого спрайта 's-' + name
                }
            }));
    spriteData.img.pipe(gulp.dest(path.build.sprites));                                             // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(path.build.spritesCss));                                          // путь, куда сохраняем стили
});

/* SPRITES BUILD */
gulp.task('sprites:release', function () {                                                          // Генерация спрайтов RELEASE
    var spriteData =
        gulp.src(path.src.sprites)                                                                  // Выберем откуда брать изображения для объединения в спрайт
            .pipe(imagemin({                                                                        // Сожмем изображения
                interlaced: true,
                optimizationLevel: 3,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant({})]
            }))
            .pipe(spritesmith({
                imgName: 'sprite.png',                                                              // имя спрайтового изображения
                cssName: 'sprite.css',                                                              // имя стиля где храним позиции изображений в спрайте
                imgPath: 'sprites/sprite.png',                                                      // путь где лежит спрайт
                cssFormat: 'css',                                                                   // формат в котором обрабатываем позиции
                algorithm: 'binary-tree',                                                           // алгоритм создания спрайта
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name                                                // имя каждого спрайта 's-' + name
                }
            }))
    spriteData.img.pipe(gulp.dest(path.release.sprites));                                           // путь, куда сохраняем картинку
    spriteData.css.pipe(cssbeautify());                                                             // Читабельный вид
    spriteData.css.pipe(removeComments());                                                          // Удаляем комменты
    spriteData.css.pipe(csso());                                                                    // Сжимаем
    spriteData.css.pipe(gulp.dest(path.release.spritesCss));                                        // путь, куда сохраняем стили
});

/* BUILD */
gulp.task('build', ['watch', 'html:build', 'style:build', 'js:build', 'sprites:build', 'fonts:build', 'img:build', 'php:build', 'favicon:build']);
/* RELEASE */
gulp.task('release', ['watch', 'html:release', 'style:release', 'js:release', 'sprites:release', 'fonts:release', 'img:release', 'php:release', 'favicon:release']);
/* DEFAULT */
gulp.task('default', ['watch', 'html:build', 'style:build', 'js:build', 'sprites:build', 'fonts:build', 'img:build', 'php:build', 'favicon:build']);
