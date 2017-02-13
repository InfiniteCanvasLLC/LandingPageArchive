function base_customize_panel() {
	
	// Init Color Value
	$('#background-color-custom').val( rgbToHex( $('#splash').css('background-color') ) );
	$('#border-color-custom').val( rgbToHex( $('#border').css('background-color') ) );

	// Color Picker for Customize Panel
	$('.input-color').mColorPicker();

	// Customize Panel Toggle
	$('#customize-panel .toggler').click(function(){
		if( $('#customize-panel').hasClass('open') ) {
			$('#customize-panel').stop().animate({
				left: '-252'
			}, 500, 'easeOutQuint');
		} else {
			$('#customize-panel section').css('display', 'block');
			$('#customize-panel').stop().animate({
				left: '0'
			}, 500, 'easeOutQuint');
		}
		$('#customize-panel').toggleClass('open');
	});

	// Version
	$('input[name="custom-version"]').change(function(){
		$('body').removeClass('dark light').addClass( $(this).val() );
	});

	// Scheme
	$('#scheme-color-custom').change(function(){
		//$('#splash').css('background-color', $(this).val());
		$(document).contents().find('head').append('<style type="text/css"> a { color: '+$(this).val()+';} </style>');
		$(document).contents().find('head').append('<style type="text/css"> .icon, #content .section-title span em { background-color: '+$(this).val()+';} </style>');
	});

	// Background
	$('#background-color-custom').change(function(){
		$('#splash').css('background-color', $(this).val());
	});
	$('#background-texture-custom li').click(function(){
		$('#splash .pattern').css('background-image', 'url(./images/splash/texture/' + $(this).attr('data-texture') + '.png)');
	});
	$('#background-image-custom li').click(function(){
		if( $(this).attr('data-bg') == 'none' ) {
			$('#splash').css('background-image', 'none');
		} else {
			$('#splash').css('background-image', 'url(./custom/background-image/' + $(this).attr('data-bg') + ')');
		}
		
	});

	// Border
	$('#show-border-custom').change(function(){
		if( $(this).is(':checked') ){
			$('#border').show();
		}else{
			$('#border').hide();
		}
	});
	$('#border-color-custom').change(function(){
		$('#border').css('background-color', $(this).val());
	});
	$('#border-texture-custom li').click(function(){
		$('#border').css('background-image', 'url(./images/border/texture/' + $(this).attr('data-texture') + '.png)');
	});

	// Devices
	$('#device-custom').change(function(){
		$('#product-container').removeClass().addClass('container').addClass( $(this).val() );
	});

}

function populateMailChimpForm(domObject)
{
	_kmq.push(['record', 'download button clicked']);

	$('.app-store-image-bottom').fadeOut("slow", function()
	{	
		$('.mailchimp-form').removeAttr("style");
	  	$('.mailchimp-form').hide();
	  	$('.mailchimp-form').fadeIn("slow");
  	} );
}

jQuery(document).ready(function($) {
	useDownloadText = Math.floor(Math.random() * 2);
	
	// Customize Panel
	base_customize_panel();
	
	  $('.app-store-button').click(function()
	  {
	  	populateMailChimpForm($(this));
	  });
	  
	  $(".app-store-button-top").click(function()
	  {
	  	populateMailChimpForm($('.app-store-button'));
	  		  	
	    $('html, body').animate(
	    {
	        scrollTop: $("#subscribe-location").offset().top
	    }, 1000);
	  });
	  
	  var subscribeBlock = $(".subscribe-text");
	  
	  if (useDownloadText)
	  {
	  	subscribeBlock.replaceWith("<span><em>E</em>nter your e-mail address for the download link!</span>");
	  }
	  
	  $(window).on('beforeunload', function()
	  {
      	_kmq.push(['record', 'left page']);
	  });
});