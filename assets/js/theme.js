$(document).ready(function() {

	// Setting some variables
	var windowHeight = $(window).height();	
	var windowWidth = $(window).width();
	var navHeight = $('header.navbar').height();
	
	/* Loading Spinner
	http://fgnass.github.io/spin.js/
	-------------------------*/	
	// Settings for Page Loading Overlay
	var spinnerHomeOptions = {
	  lines: 11, // The number of lines to draw
	  length: 10, // The length of each line
	  width: 2, // The line thickness
	  radius: 10, // The radius of the inner circle
	  corners: 0, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1.5, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinnerhome', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	
	// Settings for Project Loading Overlay
	var spinnerOptions = {
	  lines: 11, // The number of lines to draw
	  length: 20, // The length of each line
	  width: 2, // The line thickness
	  radius: 30, // The radius of the inner circle
	  corners: 0, // Corner roundness (0..1)
	  rotate: 0, // The rotation offset
	  direction: 1, // 1: clockwise, -1: counterclockwise
	  color: '#000', // #rgb or #rrggbb or array of colors
	  speed: 1.5, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: false, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	
	//var target = document.getElementById('site-title');
	var spinner = new Spinner(spinnerOptions).spin();	
	var spinnerhome = new Spinner(spinnerHomeOptions).spin();	
	// Loading spinner for Homepage
	$('#loadbox .inner').append(spinnerhome.el);
	// Loading Spinner for Projects
	$('.project-content').after(spinner.el);
	
	// Smooth scroll when clicking anchor links, except #timeline, #portfolio
	$('header a[href^="#"], #home a[href^="#"], #team a[href^="#"], #clients a[href^="#"], #contact a[href^="#"]').on('click', function(e) {     
    e.preventDefault();    
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
	});
	
	
	/*	Navigation
	-------------------------*/	
	var windowOffsetHeight = windowHeight - 1;
	
	if ( $('section:first-child').scrollTop() > windowOffsetHeight ) {
		$('header.navbar').addClass('show');
	}
	
	// If no a class of .show is found within <header class="navbar">, only display the header, once a visitor scrolls further down than the home page.
	if ($('header').not('.show')) {
		$(window).scroll(function() {
			if ( $(this).scrollTop() > windowOffsetHeight ) {
				$('header.navbar').addClass('show');
			}
			else {
				$('header.navbar').removeClass('show');
			}
		});
	};

	/* Timeline
	http://www.csslab.cl/2011/08/18/jquery-timelinr/#english
	-------------------------*/
	$(function() {
		$().timelinr({
			containerDiv: 					'#timeline',
			datesDiv: 							'#dates',
			issuesDiv: 							'#events',
			issuesSpeed: 						300,
			datesSpeed: 						300,
			startAt:								2, // Slide to display (default: 2)
			issuesTransparency: 		0
		})		
		var eventHeight = $('#events li').eq(settings.startAt-1).height();
		$('#events').css('height', eventHeight);			
	});
	
	$('#dates a').click(function() {
		var dateId = $(this).attr('href');
		var eventHeight = $('#events li'+dateId).height();
		$('#events').animate({ height: eventHeight }, 800);
			
	});
	

	/* Portfolio: Isotope Layout Plugin
	-------------------------*/
	
	// Cache portfolio container
	var container = $('#portfolio-list');
	
	// Portfolio: Number of columns
	// 2 columns grid for mobile
	// 3 columns grid for tablet & desktop
	function portfolioColumnNumber() {
			if (windowWidth < 768) {
			var portfolioColumns = 2;
		}
		else if (windowWidth >= 768) {
			var portfolioColumns = 3;
		}
		return portfolioColumns;
	}
	
	// Initialize Isotope & Masonry Layout
	container.imagesLoaded( function() {
		container.isotope({
		  itemSelector: 'li',
		  resizable: false,  // disable normal resizing
		  masonry: { columnWidth: container.width() / portfolioColumnNumber }
		 });
	 });
	
	// Update portfolio layout when resizing the browser window
  $(window).smartresize(function() {

	  container.isotope({
	    masonry: { columnWidth: container.width() / portfolioColumnNumber }
	  });
	});
    
	$(window).smartresize();

	// Initialize Portfolio Filter (on click)
	$('#portfolio-filter a').click(function(e) {		
		e.preventDefault();	  
	  var selector = $(this).attr('data-filter');
	  container.isotope({ filter: selector });		
		// Active Filter Class
		$('#portfolio-filter').find('.active').removeClass('active');
		$(this).parent().addClass('active');		
		return false;		
	});
	
	// Portfolio Filter Item Counter
	$('#portfolio-filter a').each(function() {
		var projecttype = $(this).attr('data-filter');
		if ( projecttype == "*" || "" ) {
			$(this).append( '<span class="type-counter">'+$("#portfolio-list > li").length+'</span>' ); // Count All Projects
		}
		else {
			$(this).append( '<span class="type-counter">'+$("#portfolio-list > li"+projecttype).length+'</span>' ); // Count The Specific Project Type
		}
	});
	

	/* Portfolio
	-------------------------*/
	var portfolio = $('#portfolio-list');
	var portfolioItem = portfolio.find('li');
	var projectLength = portfolioItem.length;
	var prevButton = $('#project-container .prev');
	var nextButton = $('#project-container .next');
	
	// Direction Aware Hover Effect
	portfolio.find('li').each(function() { 
		$(this).hoverdir({
			speed : 			200,
			hoverDelay : 	100
		});
	});
	
	function projectFunctions() {
	
		$('[class^="slideshow"]').bxSlider({
			controls: 			true,
			pager: 					false,
			prevText: 			'<i class="icon-angle-left"></i>',
		  nextText: 			'<i class="icon-angle-right"></i>'
		});
		
		/* FitVids v1.0 - Fluid Width Video Embeds
			https://github.com/davatron5000/FitVids.js/
			-------------------------*/
			$('.video-full-width').fitVids();
			$('.fluid-width-video-wrapper').css('padding-top','56.25%'); // Always display videos 16:9 (100/16*9=56.25)
			
			$('#project-container .spinner').fadeOut(1000);
	};
	
	// Opening a Project
	portfolioItem.find('a').click(function(e) {
		e.preventDefault();
		
		// Show Loading Spinner
		$('#project-container .spinner').show(0);
		
		// Disable browser scrollbar
		$('body').addClass('overflow-hidden');
		
		var projectLink = $(this).attr('href');
		var projectOpen = portfolio.find(this).attr('href',projectLink).closest('li');
		
		// Add class "open" to opened project
		projectOpen.addClass('open');
		
		// Disable prev link, when first project is open
		if (projectOpen.index() == 0) {	prevButton.addClass('disabled'); }
		else { prevButton.attr('href', projectOpen.prev('li').find('.project-link').attr('href')); }
		
		// Disable next link, when last project is open
		if (projectOpen.index()+1 == projectLength) { nextButton.addClass('disabled'); }
		else { nextButton.attr('href', projectOpen.next('li').find('.project-link').attr('href')); }
		
		// Show project popup and load project content
		$('#project-container').addClass('show');
		
		$('.project-content').load('index.html '+projectLink, function() {				
			projectFunctions();			
		});
		
	});
	
	// Button: Previous Project
	$('.prev').click(function() {
	
		$('#project-container .spinner').show(200);
	
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		
		// Enable next button when going to the previous project
		$('.next').removeClass('disabled');
		
		// Disable prev button when reaching first project
		if (currentIndex <= 2) { $('.prev').addClass('disabled'); }		
		var prevProjectLink = currentProject.prev('li').find('a').attr('href');
		
		currentProject.removeClass('open').prev('li').addClass('open');
		
		$('.project-content').load('index.html '+prevProjectLink, function() {			
			projectFunctions();		
		});
		
	});
	
	// Button: Next Project
	$('.next').click(function() {
	
		$('#project-container .spinner').show(200);
		
		var currentProject = portfolio.find('.open');
		var currentIndex = currentProject.index()+1;
		
		// Enable prev button when going to the next project
		$('.prev').removeClass('disabled'); 
		
		// Disable next button when reaching the last project
		if ( currentIndex+1 >= projectLength ) { $('.next').addClass('disabled'); }		
		var nextProjectLink = currentProject.next('li').find('a').attr('href');		
		currentProject.removeClass('open').next('li').addClass('open');

		$('.project-content').load('index.html '+nextProjectLink, function() {		
			projectFunctions();
		});
		
	});
	
	// Close button
	$('.close').click(function() {
		// Enable browser scrollbar
		$('body').removeClass('overflow-hidden');
		$('#project-container').removeClass('show');
		portfolio.find('.open').removeClass('open');
	});
	
	// Close using "ESC" key
	$(document).keyup(function(e) {
    if (e.keyCode == 27) {
    	// Enable browser scrollbar
			$('body').removeClass('overflow-hidden');
      $('#project-container').removeClass('show');
      portfolio.find('.open').removeClass('open');
    }
	});
	
	
	/* Load Tweets
	-------------------------*/
	// Does "tweet.php" exist? Yes -> Load it's Tweets
	$.ajax({
    url:'tweet.php',
    success: function() { $('#tweet').find('.container').load('tweet.php'); }
	});
	
	
	
	/* Fluid Width Video Embeds: FitVids v1.0
	https://github.com/davatron5000/FitVids.js/
	-------------------------*/
	$('.video-full-width').fitVids();
	$('.fluid-width-video-wrapper').css('padding-top','56.25%'); // Always display videos 16:9 (100/16*9=56.25)

	
	/* Bootstrap Plugins
	-------------------------*/
	
	// Navigation - Collapse (for mobile)
	$('.navbar .collapse').collapse();
	
	// Tooltip
	$('[data-toggle="tooltip"]').tooltip(); 
	

	/* Slideshow: Clients
	-------------------------*/
	clientsContainer = $('#clients').find('.container').width();
	
	// Number of clients to show at once (according to device width)
	if (windowWidth < 768) {
		var slidesAtOnce = 2; // Mobile devices
	}
	else if (windowWidth >= 768 && windowWidth < 1200) {
		var slidesAtOnce = 3; // Tablet and desktos with a screen smaller than 1200px
	}
	else if (windowWidth >= 1200) {
		var slidesAtOnce = 4; // Desktops with a width of 1200px and above
	}
	slideWidthCustom = Math.round(clientsContainer / slidesAtOnce);
	$('.slideshow-clients').bxSlider({
		infiniteLoop: false,
		hideControlOnEnd: true,
	  minSlides: 			slidesAtOnce,
	  maxSlides: 			slidesAtOnce,
	  slideWidth: 		slideWidthCustom,
	  slideMargin: 		10,
	  prevText: 			'<i class="icon-angle-left"></i>',
	  nextText: 			'<i class="icon-angle-right"></i>',
	  pager: 					false,
	  oneToOneTouch: false
	});
	
	
	// Bootstrap ScrollSpy: Highlight current navigation link
	$('[data-spy="scroll"]').each(function() {
  	var $spy = $(this).scrollspy('refresh');
	});

}); // END $(document).ready()


$(window).load(function() {

	/* Activate animate.css effects once page is loaded
	http://css-tricks.com/transitions-only-after-page-load/
  -------------------------*/
  $("body").removeClass("loading");
  
  // Hide Site Load Overlay
	$('#loadbox .spinnerhome').fadeOut(400);
	$('#loadbox .wrapper').delay(600).addClass('animated bounceOut');
	$('#loadbox').delay(800).fadeOut(400);
	
	/* Slideshow: BxSlider
	List with all slideshow options can be found here: http://bxslider.com/options
	-------------------------*/

	function overlayHeight() {
		$('.parallax').each(function() {
			var parallaxHeight = $(this).height();
			$(this).find('.background-overlay').css('height', parallaxHeight);
		});
	};

	// Background Slideshow "Home"
	$('.slideshow-home').bxSlider({
		mode: 'fade',
		pause: 4000,
		speed: 500,
		controls: true,
		pager: false,
		prevText: 			'<i class="icon-angle-left"></i>',
	  nextText: 			'<i class="icon-angle-right"></i>',
		oneToOneTouch: false,
		onSliderLoad: function() {
			$('.slideshow-home li.parallax').parallax("50%", 0.5);
		}		
	});
	
	// Slideshow "horizontal"
	$('.slideshow').bxSlider({
		mode: 'horizontal',
		adaptiveHeight: true,
		controls: false,
		oneToOneTouch: false,
		onSlideAfter: function() {
			overlayHeight();
		}
	});

	// Slideshow "vertical"
	$('.slideshow-vertical').bxSlider({
		mode: 'vertical',
		adaptiveHeight: true,
		controls: false,
		oneToOneTouch: false,
		onSlideAfter: function() {
			overlayHeight();
		}
	});
	
	// Slideshow "fade"
	$('.slideshow-fade').bxSlider({ 
		mode: 		'fade',
		adaptiveHeight: true,
		controls: false,
		oneToOneTouch: false,
		onSlideAfter: function() {
			overlayHeight();
		}
	});
	
	
	/* Parallax Effect for Background Images
	http://www.ianlunn.co.uk/plugins/jquery-parallax/
	-------------------------*/
	$('#home').parallax("50%", 0.5); 					// Background: Home
	$('#testimonials').parallax("50%", 0.5);	// Background: Testimonials
	$('#tweet').parallax("50%", 0.5);					// Background: Tweets
	$('#quote').parallax("50%", 0.5);					// Background: Quote
	
	overlayHeight();
	
	$(window).smartresize(function() { overlayHeight(); });	
	
});