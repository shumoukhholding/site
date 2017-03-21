'use strict';
/*
 *
 * 1. Variables
 * 2. General
 * 3. Countdown
 * 5. Lightbox
 * 6. Portfolio
 * 7. Counter
 *
 * */


$(document).ready(function () {

    // Variables

    var $window = $(window),
        $body = $('body'),
        $menu = $('.menu-icon'),
        $content = $('.content'),
        $contentHome = $('.content_home'),
        $loaderBg = $('.loader-bg'),
        $contact = $('.contact'),
        $callContact = $('.callContact'),
        $closeContact = $('.close'),
        $countdown = $('.countdown'),
        $count_number = $('.count-number'),
        $timer = $('.timer'),
        $container = $('#Portfolio'),
        $filters = $('#filters'),
        $filtersLink = $('#filters a'),
        $box = $('.box'),
        $windowHeight = $window.height(),
        $windowWidth = $window.width();

    // -----------------------------------------------------------------------------------------------------
    // Loader
    setTimeout(function () {
        $loaderBg.addClass('fadeOut animated');
        setTimeout(function () {
            $loaderBg.addClass('hide');
        }, 500);
    }, 2500);


    // -----------------------------------------------------------------------------------------------------
    // Progress bar
    $('.progress .progress-bar').css("width",
        function () {
            return $(this).attr("aria-valuenow") + "%";
        }
    );

    // -----------------------------------------------------------------------------------------------------
    // Hover services
    $box.on('mouseenter', function () {
        $box.removeClass('on');
        $(this).addClass('on')
    });

    // -----------------------------------------------------------------------------------------------------
    // Menu

    $menu.on('click', function () {
        $menu.toggleClass('on');
        $content.toggleClass('on');
        $contentHome.toggleClass('on');
        // start all the timers
        $timer.each(count);
    });

    $window.on('click', function () {
        if ($content.hasClass('on')) {
            $contentHome.on('click', function () {
                $content.removeClass('on');
                $contentHome.removeClass('on');
                $menu.removeClass('on');
            });
        }
    });

    // -----------------------------------------------------------------------------------------------------
    // COUNTDOWN
    var ctd = document.getElementById('countdown');
    if (ctd) {
        countdown();
    }
    function countdown() {
        // ATTENTION - Ianuary is 0, February is 1 ......
        var launch_date = new Date(Date.UTC(2017, 3, 1, 0, 0));
        var days;
        var hours;
        var minutes;
        var seconds;
        var rest;
        var now = new Date();

        seconds = rest = Math.floor(((launch_date.getTime() - now.getTime()) / 1000));

        days = zero(Math.floor(seconds / 86400));
        seconds -= days * 86400;

        hours = zero(Math.floor(seconds / 3600));
        seconds -= hours * 3600;

        minutes = zero(Math.floor(seconds / 60));
        seconds -= minutes * 60;

        seconds = zero(Math.floor(seconds));

        function zero(n) {
            return (n < 10 ? '0' : false) + n;
        }

        rest <= 0 ? days = hours = minutes = seconds = '00' : setTimeout(countdown, 1000);

        ctd.innerHTML =
            '<li><div><span class="h5">' + days + '</span><br> day' + (days > 1 ? 's' : '') + '</div></li>' +
            '<li><div><span class="h5">' + hours + '</span><br> hour' + (hours > 1 ? 's' : '') + '</div></li>' +
            '<li><div><span class="h5">' + minutes + '</span><br> minute' + (minutes > 1 ? 's' : '') + '</div></li>' +
            '<li><div><span class="h5">' + seconds + '</span><br> second' + (seconds > 1 ? 's' : '') + '</div></li>';
    }

    // -----------------------------------------------------------------------------------------------------
    // Lightbox
    $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-with-zoom',
        fixedContentPos: true,
        closeBtnInside: true,

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
    });


    // -----------------------------------------------------------------------------------------------------
    // PORTOFOLIO

    $container.isotope({
        itemSelector: '.portfolio-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.portfolio-sizer'
        }
    });

    $filters.on('click', 'a', function () {
        var filterValue = $(this).attr('data-filter');
        $filtersLink.removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: filterValue
        });
    });

    // -----------------------------------------------------------------------------------------------------
    // COUNTER

    $.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from: $(this).data('from'),
                to: $(this).data('to'),
                speed: $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals: $(this).data('decimals')
            }, options);

            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;

            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};

            $self.data('countTo', data);

            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);

            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;

                render(value);

                if (typeof (settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }

                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;

                    if (typeof (settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    $.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: null // callback method for when the element finishes updating
    };
    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }

    // custom formatting example
    $count_number.data('countToOptions', {
        formatter: function (value, options) {
            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    });

    // // start all the timers
    $timer.each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

});
