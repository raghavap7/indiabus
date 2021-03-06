;
(function() {

    'use strict';



    // iPad and iPod detection	
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Main Menu Superfish
    var mainMenu = function() {

        $('#fh5co-primary-menu').superfish({
            delay: 0,
            animation: {
                opacity: 'show'
            },
            speed: 'fast',
            cssArrows: true,
            disableHI: true
        });

    };

    //Date Picker

    // $('#date-start, #date-end').datepicker();

    [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
        new SelectFx(el);
    });
    $('#date-start, #date-end').datepicker({
        format: 'dd/mm/yyyy',
    }).on('changeDate', function(e) {
        $(this).datepicker('hide');
    });
    // Parallax
    var parallax = function() {
        if (!isiPad() || !isiPhone()) {
            $(window).stellar();
        }
    };


    // Offcanvas and cloning of the main menu
    var offcanvas = function() {

        var $clone = $('#fh5co-menu-wrap').clone();
        $clone.attr({
            'id': 'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class': '',
            'id': ''
        });

        $('#fh5co-page').prepend($clone);

        // click the burger
        $('.js-fh5co-nav-toggle').on('click', function() {

            if ($('body').hasClass('fh5co-offcanvas')) {
                $('body').removeClass('fh5co-offcanvas');
            } else {
                $('body').addClass('fh5co-offcanvas');
            }
            // event.preventDefault();

        });

        $('#offcanvas-menu').css('height', $(window).height());

        $(window).resize(function() {
            var w = $(window);


            $('#offcanvas-menu').css('height', w.height());

            if (w.width() > 769) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }

        });

    }



    // Click outside of the Mobile Menu
    var mobileMenuOutsideClick = function() {
        $(document).click(function(e) {
            var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }
        });
    };


    // Animations

    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function() {

                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, { offset: '85%' });
    };

    var stickyBanner = function() {
        var $stickyElement = $('.sticky-banner');
        var sticky;
        if ($stickyElement.length) {
            sticky = new Waypoint.Sticky({
                element: $stickyElement[0],
                offset: 0
            })
        }
    };

    // Document on load.
    $(function() {
        mainMenu();
        parallax();
        offcanvas();
        mobileMenuOutsideClick();
        contentWayPoint();
        stickyBanner();
    });


}());

$(document).ready(function() {

    var val = 1;

    $(".nav-bar").click(function() {


        if (val == 1) {

            $("header nav").animate({
                'left': '0'
            });
            val = 0;
        } else {
            val = 1;
            $("header nav").animate({
                'left': '-100%'
            });
        }
        return false;
    });


    // submenu

    $(document).ready(function() {
        $(".sub-menu").change(function() {
            $(this).find("option:selected").each(function() {
                var optionValue = $(this).attr("value");
                if (optionValue) {
                    $(".children").not("." + optionValue).hide();
                    $("." + optionValue).show();
                } else {
                    $(".children").hide();
                }
            });
        }).change();
    });

    //date search
    document.getElementById("up").onclick = function() {
        var i = dataI.valueOf() + 86400000;
        dataI = new Date(i);
        document.getElementById("dateD").innerHTML = dataI.toDateString();
    }
    document.getElementById("down").onclick = function() {
        var i = dataI.valueOf() - 86400000;
        dataI = new Date(i);
        document.getElementById("dateD").innerHTML = dataI.toDateString();
    }
    var dataI = new Date();
    document.getElementById("dateD").innerHTML = dataI.toDateString();



});