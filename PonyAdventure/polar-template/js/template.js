function rgbToHex(rgbString) {
	if( rgbString == null ) return false;
	var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if(parts == null ) return '#FFFFFF';
	
	delete (parts[0]);
	for (var i = 1; i <= 3; ++i) {
	    parts[i] = parseInt(parts[i]).toString(16);
	    if (parts[i].length == 1) parts[i] = '0' + parts[i];
	}
	return '#' + parts.join(''); // "0070ff"
}


function base_map() {
	if( $('#map').length > 0 ) {

		var latitude = $('#map').attr('data-lat');
		var longitude = $('#map').attr('data-long');
		var zoom = $('#map').attr('data-zoom');

		// Default Value
		if( typeof(latitude) === 'undefined' ) latitude = "14.26438308756265";
		if( typeof(longitude) === 'undefined' ) longitude = "100.1953125";
		if( typeof(zoom) === 'undefined' ) zoom = 15;

		var map = new GMaps({
		  div: '#map',
		  lat: latitude,
		  lng: longitude,
		  zoom: zoom,
		  mapTypeControl: false,
		  scrollwheel: false,
		  markers: [
		    {lat: latitude, lng: longitude}
		  ]
		});

		map.addMarker({
		  lat: latitude,
		  lng: longitude
		});

	}
}

function base_toggle() {
	$('.toggle .tab').click(function(){
		$(this).toggleClass('active');
		$(this).siblings('.pane').slideToggle(100, 'linear');
	});
}

function base_tab() {
	$('.tabs-wrap').each(function(){
		var tab_group = $('.tabs-wrap');
		$('.tabs li', tab_group).click(function(e){
			e.preventDefault();
			$('.tabs a', tab_group).removeClass('current');
			$('a', this).addClass('current');

			$('.panes .pane', tab_group).hide();
			$('.panes .pane', tab_group).eq($(this).index()).show();
		});

		// Trigger Initial Tab
		var initial_tab = parseInt( $(this).attr('data-initial-tab'), 10 );
		$('.tabs li', tab_group).eq(initial_tab).trigger('click');
	});
}

function base_form() {

	// Form Label
	$('input[type=text], input[type=password], textarea').each(function(){
		if( $(this).attr('value') !== '' ) {
			$(this).siblings('label').addClass('compact');
		}
	}).blur(function(){
		if( $(this).attr('value') === '' ) {
			$(this).siblings('label').removeClass('compact');
		}
	}).focus(function(){
		if( $(this).attr('value') === '' ) {
			$(this).siblings('label').addClass('compact');
		}
	});

	// Form Validate
	$('form').each(function(){
		
		// Submit
		$('.submit', $(this)).click(function(e){
			e.preventDefault();
			$(this).parents('form').submit();
		});

		$(this).validate({
			errorPlacement: function(error, element) {
				if( !element.hasClass('error') ) {
					element.parent('.input').jrumble({
						rotation: 0,
						y: 0
					});
					element.parent('.input').trigger('startRumble');
					var demoTimeout;
					demoTimeout = setTimeout(function(){element.parent('.input').trigger('stopRumble');}, 500);
				}
			}
		});
	});

	var options = {
		beforeSubmit: preSubmit,
		success: postSubmit,
		dataType: 'json'
	};
	$('form').ajaxForm(options);

}

// pre-submit callback 
function preSubmit(formData, jqForm, options) { 
    $('.form-respond', $(jqForm)).show();
	_kmq.push(['record', 'subscribed to newsletter']);
	
	$("#fb_pixel").addClass("fb_conversion");

    return true; 
}
// post-submit callback 
function postSubmit(responseText, statusText, xhr, $form)  { 
    if( responseText.status === 'success' ) {
    	$('.input', $form).fadeOut();
    	$('.form-respond', $form).removeClass().addClass('form-respond').addClass('success').html(responseText.message);
    } else {
    	$('.form-respond', $form).removeClass().addClass('form-respond').addClass('failed').html(responseText.message);
    }
} 

function base_additional_markup() {
	$('.button').append('<div class="bt-shadow"></div>');
	$('.frame').append('<div class="overlay"></div>');

	$('#content section').filter(':odd').addClass('odd');
}

function base_modal() {
	
	// Image
	$('a.modal-image').fancybox({
		transitionIn: 'elastic',
		overlayOpacity: 0.8,
		overlayColor: '#000',
		opacity: true,
		titlePosition: 'over',
		speedOut: 150,
		showCloseButton: false
	});

	// Gallery
	$('a.modal-gallery').attr('rel', 'gallery').fancybox({
		
		overlayOpacity: 0.8,
		overlayColor: '#000',
		opacity: true,
		titlePosition: 'over',
		speedOut: 150,
		showCloseButton: false
	});

	// Youtube
	$('a.modal-youtube').click(function() {
		$.fancybox({
			overlayOpacity	: 0.8,
			overlayColor	: '#000',
			showCloseButton: false,
			padding		: 0,
			autoScale		: false,
			transitionIn	: 'none',
			transitionOut	: 'none',
			title			: this.title,
			width			: 680,
			height		: 495,
			href			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
			type			: 'swf',
			swf			: {
				'wmode'		: 'transparent',
				'allowfullscreen'	: 'true'
			}
		});
		return false;
	});

	// Vimeo
	$('.modal-vimeo').click(function() {
		$.fancybox({
			overlayOpacity	: 0.8,
			overlayColor	: '#000',
			showCloseButton	: false,
			padding			: 0,
			autoScale		: false,
			transitionIn	: 'none',
			transitionOut	: 'none',
			title			: this.title,
			width			: 400,
			height			: 265,
			href			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
			type			: 'swf'
		});

		return false;
	});
}

function base_gallery() {
	
	var $gallery = $('.gallery-list');

	$gallery.imagesLoaded( function(){
	  $gallery.masonry({
	    itemSelector : 'li',
	    isAnimated: true
	  });
	});
}

function base_twitter() {
	$("#twitter-box").tweet({
	  modpath: "/php/tweet.php",
      join_text: "auto",
      username: "twitter",
      avatar_size: 0,
      count: 1,
      page: 1,
      template: "<i class='icon-twitter'></i> {text} <i class='icon-time'></i> {time}",
      auto_join_text_default: "we said,",
      auto_join_text_ed: "we",
      auto_join_text_ing: "we were",
      auto_join_text_reply: "we replied",
      auto_join_text_url: "we were checking out",
      loading_text: "loading tweets..."
    }).bind("loaded", function() {
          var ul = $(this).find(".tweet_list");
          var ticker = function() {
            setTimeout(function() {
              ul.find('li:first').animate( {marginTop: '-4em'}, 500, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
              });
              ticker();
            }, 8000);
          };
          ticker();
        });;
}

function base_custom() {

	// Header Toggle
	$('#header-toggle').click(function(){
		if( $('header').hasClass('active') ) {
			$('header').animate({
				marginTop: '0px'
			}, 300).removeClass('active');
			
		} else {
			$('header').animate({
				marginTop: '-' + $('header').height() + 'px'
			}, 300).addClass('active');
		}
	});
	$('#header-toggle').trigger('click');

	// Primary Nav
	$('#primary-nav ul li a').click(function(){
		$('#primary-nav ul li').removeClass('active');
		$(this).parents('li').addClass('active');
	});
}

function base_slider() {

	var vimeoPlayers = $('.flexslider').find('iframe'), player; 		
	
	for (var i = 0, length = vimeoPlayers.length; i < length; i++) { 		    
			player = vimeoPlayers[i]; 		    
			$f(player).addEvent('ready', ready); 		
	} 		
	
	function addEvent(element, eventName, callback) { 	    	
		if (element.addEventListener) { 		    	
			element.addEventListener(eventName, callback, false) 		    
		} else { 	      		
			element.attachEvent(eventName, callback, false); 	      	
		} 	    
	} 	    
	
	function ready(player_id) { 	    	
		var froogaloop = $f(player_id); 	    	
		froogaloop.addEvent('play', function(data) { 		    	
			$('.flexslider').flexslider("pause"); 	
			console.log('vimeo play')	    
		}); 		    
		froogaloop.addEvent('pause', function(data) { 			    
			$('.flexslider').flexslider("play"); 		    
		}); 		
	} 

    // Flexslider
    $('.flexslider').each(function(){
    	$(this).imagesLoaded(function(){
			var defaults = {
				animation: 'slide', // slide, fade
	        	slideshow: true,
	        	slideshowSpeed: 5000,
	        	animationDuration: 400,
	        	smoothHeight: true
	        };
			var options = $.extend({}, defaults, $(this).data());
			$(this).flexslider({
				animation: options.animation, 
				slideshow: options.slideshow,
				slideshowSpeed: options.slideshowSpeed,
				animationDuration: options.animationDuration,
				controlNav: true,
				directionNav: false,
				video: true,
				useCSS: false,   
				animationLoop: false,    
				before: function(slider){    
					if (slider.slides.eq(slider.currentSlide).find('iframe').length !== 0)
					      $f( slider.slides.eq(slider.currentSlide).find('iframe').attr('id') ).api('pause');       
				}
			});
			$('.flex-control-nav', $(this)).wrap('<div class="slide-control" />');
		});
    });
	
}

jQuery(document).ready(function($) {

	// Additional Markup
	base_additional_markup();

	// Form
	base_form();

	// Toggle
	base_toggle();

	// Tab
	base_tab();

	// Modal
	base_modal();

	// Pretty Print
	prettyPrint();

	// FitVid
	$('.container').fitVids();

	// Map
	base_map();

	// Custom
	base_custom();

	// Gallery
	base_gallery();

	// Twitter
	base_twitter();
	
	// Slider
	base_slider();

	// Scroll to Top
	$('#back-to-top').click(function(e){
		e.preventDefault();
		$.scrollTo( 0, 1500 );
	});

});