$(document).ready(function(){
	ResizeBanner();
	MenuMobile();
	MovetoBlock();
	VoteEvent();
	CustomCSSBrowser();
	HoverGalleryAni();

	$( window ).resize(function() {
		console.log(11);
		ResizeBanner();
	  HoverGalleryAni();
	});
});

function ResizeBanner() {
	var banner = $('.banner-area');
	var widthBrowser = $(window);
	var menu = $('.desktop-navbar');
	var bannerVideo = $('.banner');

	if(banner.length > 0) {
		banner.height(widthBrowser.innerHeight() - (menu.innerHeight()));
		if(widthBrowser.innerWidth() < 767) {
			banner.height(widthBrowser.innerHeight() - (menu.innerHeight()) + 86);
		}
	}

	if(widthBrowser.innerWidth() < 1440) {
		if(widthBrowser.innerHeight() >= 1024) {
			var translateXVal = (2560 - widthBrowser.innerWidth()) / 2;
			translateXVal = (-translateXVal) + 'px';
		} else {
			var translateXVal = (1440 - widthBrowser.innerWidth()) / 2;
		}

		bannerVideo.css('transform','translateX('+translateXVal+')');
		bannerVideo.css('-webkit-transform','translateX('+translateXVal+')');
		bannerVideo.css('-moz-transform','translateX('+translateXVal+')');
		bannerVideo.css('-ms-transform','translateX('+translateXVal+')');
		bannerVideo.css('-o-transform','translateX('+translateXVal+')');
	}
}

function MenuMobile() {
		if($('.mobile-navbar').length > 0) {
			$('.mobile-navbar').click(function(){
				$('#mbMenu').width("100%");
				$(this).css('opacity',0);
			});
		}

		if($('.closebtn').length > 0) {
			$('.closebtn').click(function(){
				$('#mbMenu').width(0);
				$('.mobile-navbar').css('opacity',1);
			});
		}
}

function MovetoBlock() {
	if($(".link-block").length > 0) {
		$('.link-block').click(function(){
			if($(this).attr('href') === '#bannerbl') {
				$('html, body').animate({
			        scrollTop: $($(this).attr('href')).offset().top - 86
			  }, 600);
			} else {
				$('html, body').animate({
							scrollTop: $($(this).attr('href')).offset().top
				}, 600);
			}
		});
	}
}

function VoteEvent() {
	var voteVal = $('.vote-btn');

	if(voteVal.length > 0) {
		voteVal.click(function(){
			var currentVal = parseInt($(this).parent().children('.value-vote').text());
			currentVal = currentVal + 1;
			$(this).parent().children('.value-vote').addClass('add');

			setTimeout(function(){
				$('.value-vote').removeClass('add');
			}, 500);

			$(this).parent().children('.value-vote').text(currentVal);
			$(this).css('z-index',0);
		});
	};
}

function DetectBrowser(isBrowser) {
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';

	// Safari 3.0+ "[object HTMLElementConstructor]"
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;

	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;

	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;

	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;

	var output = null;
	switch (isBrowser) {
		case 'opera':{ output = isOpera; return output; }; break;
		case 'firefox':{ output = isFirefox; return output; }; break;
		case 'safari':{ output = isSafari; return output; }; break;
		case 'ie':{ output = isIE; return output; }; break;
		case 'edge':{ output = isEdge; return output; }; break;
		case 'chrome':{ output = isChrome; return output; }; break;
		case 'blink':{ output = isBlink; return output; }; break;
		default: break;
	}
}

function CustomCSSBrowser() {
	if(DetectBrowser('ie') === true) {
		$('.clip-text').addClass('clip-text-ei').removeClass('clip-text');
	}

	if(DetectBrowser('edge') === true) {
		$('.clip-text').addClass('clip-text-ei').removeClass('clip-text');
	}

	if(DetectBrowser('safari') === true) {
		$('.clip-text').addClass('clip-text-ei').removeClass('clip-text');
	}
}

function HoverGalleryAni() {
	if($(window).innerWidth() >= 992) {
		if($('.box-item').length > 0) {
			$('.box-item').mouseover(function(){
					$(this).css('position','absolute');
			});

			$('.box-item').mouseout(function(){
					$(this).css('position','relative');
			});
		}
	}
}
