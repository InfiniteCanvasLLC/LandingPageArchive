jQuery(function($) {
    // Debug flag
    var debugMode = true;

    // Default time delay before checking location
    var callBackTime = 100;

    // # px before tracking a reader
    var readerLocation = 150;

    // Set some flags for tracking & execution
    var timer = 0;
    var endContent = false;
    var didComplete = false;

    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;
    
    // Get some information about the current page
    var pageTitle = document.title;
    
    var scrollDepth = new Array();
    
    for (var i = 0; i < 10; i++)
    {
    	scrollDepth[i] = 0;
    }

    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();
        
        var fraction = bottom / height;
        
        var intFraction = Math.floor(fraction * 10) - 1;
        
        if (intFraction > 9)
        {
        	intFraction = 9;
        }
        
        if (intFraction <= 9)
        {
	        if (scrollDepth[intFraction] == 0)
	        {
	        	// If we haven't sent events for any percentages up to the current one, send those now
	        	for (var i = 0; i < intFraction; i++)
	        	{
	        		if (scrollDepth[i] == 0)
	        		{
    			        _kmq.push(['record', 'Scroll ' + (i + 1) + '0 percent']);
    			        scrollDepth[i] = 1;
	        		}
	        	}
	        	
	        	_kmq.push(['record', 'Scroll ' + (intFraction + 1) + '0 percent']);
	        	scrollDepth[intFraction] = 1;
	        }
        }
    }

    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }

        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});