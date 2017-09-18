$(window).on('load', function () {                                                          //------- loader
    $preloader = $('.loader-section'),
        $loader = $preloader.find('.overlay-loader');
    $loader.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});