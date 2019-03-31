jQuery(document).ready(function($) {
	'use strict';
    
    $('#toggle').click(function(){
        $('#toggle').toggleClass('on');
        $('#primary-parallax-menu').slideToggle();
        $('#primary-parallax-menu').toggleClass('on');
        $('#primary-menu').slideToggle();
        $('#primary-menu').toggleClass('on');
    });
	//Parallax menu
    $(window).load(function(){
        if( $('body').hasClass('header-sticky') ) {
            var headerHeight = $('.bt-header-wrapper').outerHeight();
        } else {
            var headerHeight = 5;
        }
        $('.page-template-template-home .parallax-menu').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 2200,
            scrollOffset: headerHeight,
            scrollThreshold: 0.5
        });
    });

    //Home Slider
	$('.frontSlider').bxSlider({
		auto:true,
		speed:1000,
		pause:6500,
		controls:true,
		mode:'fade',
        pager:false
	});

	//Home Slider Fullscreen
	if( $('body').hasClass('home') ){
        if( $('.bt-front-slider-wrapper').length ) {
            $(window).resize(function() {
                var wHeight = ( $(window).height() );
                $('.bt-front-slider-wrapper').find( '.bx-viewport' ).height(wHeight);
                $('.single-slide-wrap').height(wHeight);
            }).resize();
        }
    }

	//Testimonials Section
	$('.testiSlider').bxSlider();

	//Fact Counter
    $('.bt-achievements .number').counterUp({
        delay: 20,
        time: 2000
    });
    
    // Menu Search Icon
        var open = false;
        $('.search-icon').on('click',function(){
            $('#search-toggle').toggleClass('open');
            $('.ak-search').toggleClass('open');
            $('#primary-menu').toggleClass('open');
            $('#primary-parallax-menu').toggleClass('open');
            open = !open;
            if(open){
                $(this).text("X");
              $(this).find('i.fa4').removeClass('fa-search').addClass('fa-caret-right');
            }else{
                $(this).html('<i class="fa fa-search"></i>');
              $(this).find('i.fa4').addClass('fa-search').removeClass('fa-caret-right');
            }
        });
    
    // About section tab
    $('.about-tab ul li').click(function(){
        //Home Entrance animation
            var wowextracall = new WOW(
                {
                    boxClass: 'wowextra', // animated element css class (default is wow)
                    mobile: false, // trigger animations on mobile devices (default is true)
                    live: true, // act on asynchronously loaded content (default is true)
                    callback: function (box) {
                        // the callback is fired every time an animation is started
                        // the argument that is passed in is the DOM node being animated
                    }
                }
            );
            wowextracall.init();
        
        var ids = $(this).attr('id');
        $('.about-tab ul li').removeClass('active');
        $(this).addClass('active');
        $('.tab-container').removeClass('active');
        $('.tab-container.'+ids).addClass('active');
    });

    //Top up arrow
    $("#scroll-up").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1000) {
                $('#scroll-up').fadeIn();
            } else {
                $('#scroll-up').fadeOut();
            }
        });
        $('a#scroll-up').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});