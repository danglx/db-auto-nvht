//=================================================================
//disable zoom
// $(window).bind('mousewheel DOMMouseScroll', function(event) {
	// event.preventDefault();
// });

shortcut.add("Ctrl+=", function() {
    return;
});

shortcut.add("Ctrl+-", function() {
    return;
});
//=================================================================


// fix ios scroll
$(document).bind('touchmove', false);


//=================================================================
// Disable right click script
function clickIE() {
	if (document.all) {
		return false;
	}
}

function clickNS(e) {
	if (document.layers || (document.getElementById && !document.all)) {
		if (e.which == 2 || e.which == 3) {
			return false;
		}
	}
}
if (document.layers) {
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown = clickNS;
} else {
	document.onmouseup = clickNS;
	document.oncontextmenu = clickIE;
}

document.oncontextmenu = function() { return false; };
//=================================================================

// check use ie 11
var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
// check use ie 10
var is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
// check use chrome
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

// list of devices
var DEVICE= {
	NEXUS : 3,
	IPAD  : 1, 
	SURFACE : 2,
	PC : 0
}

// detect devices
function detectmob() {
	var nexus = /(.*Android.*Nexus.*)/i;
	var mobileRegex = /(android|iphone|ipad|ipod|BlackBerry|Windows Phone|webOS|BB)/i;
	var mobileBrowserRegex = /(Mobile|Opera Mini|Opera Mobi)/i;
	var touchRegex = /(Touch|Tablet PC)/i;
	var agent = navigator.userAgent;
	var rs;
	if (agent.match(nexus)) {
		rs = 3;
	} else if (agent.match(mobileRegex) || agent.match(mobileBrowserRegex)) {
		rs = 1;
	} else if (agent.match(touchRegex)
			|| ("ontouchstart" in document.documentElement)
			|| ('ontouchstart' in window)) {
		rs = 2;
	} else {
		rs = 0;
	}
	return rs;
}


// get true zoom ratio
var ratio = $(window).width() / window.outerWidth;
// time call event resize
var resizeTime = 0;
//event resize
$(window).resize(function(event) {
    ratio = $(window).width() / window.outerWidth;
    if (preRatio == $utils.getDevicePixelRatio()) {
        if (new Date().getTime() - resizeTime < 30) return;
        calculateDiv();
    } else {
        setResizeByZoom();
    }
    resizeTime = new Date().getTime();
});

$utils.orientationchange();


var divtrogiupRatio = 624/740;
var divbangxephangRatio = 663/248;
var divbangxephang2Ratio = 798/298;

//caldivscroll
function calDivScroll(){
	var _width = parseFloat($id("divtrogiup_div").style.width);
	if(!isNaN(_width)){
		$("#divtrogiup_svg").css("height",_width/divtrogiupRatio);
	}
	_width = parseFloat($id("divbangxephang_div").style.width);
	if(!isNaN(_width)){
		$("#divbangxephang_svg").css("height",_width/divbangxephangRatio);
	}
	_width = parseFloat($id("divbangxephang2_div").style.width);
	if(!isNaN(_width)){
		$("#divbangxephang2_svg").css("height",_width/divbangxephang2Ratio);
	}
}


//calculate and fit content with zoom
function setResizeByZoom() {
    preRatio = $utils.getDevicePixelRatio();
    $(".content").css("width", trueWidth / $utils.getDevicePixelRatio());
    $(".content").css("height", trueHeight / $utils.getDevicePixelRatio());

    $(".content").css("margin-top", root_margin_top / $utils.getDevicePixelRatio());
    $(".content").css("margin-left", root_margin_left / $utils.getDevicePixelRatio());
	//divtrogiup_svg 
	//width/height = 
	$tb.updatePos();
	calDivScroll();
}

// fit content on screen.
function calculateDiv() {
    preRatio = $utils.getDevicePixelRatio();
    var widthScreen = $(window).innerWidth() * $utils.getDevicePixelRatio();
    var heightScreen = $(window).innerHeight() * $utils.getDevicePixelRatio();
	
	//1280 720
    var widthDefi = 1280;
    var heightDefi = 720;

    if ((heightScreen * widthDefi / heightDefi) > widthScreen) {
        trueWidth = widthScreen;
        trueHeight = (widthScreen * heightDefi / widthDefi);
    } else {
        trueWidth = heightScreen * widthDefi / heightDefi;
        trueHeight = heightScreen;
    }
    $(".content").css("width", trueWidth);
    $(".content").css("height", trueHeight);
    centerDiv();
    setResizeByZoom()
}
// store margin-top
var root_margin_top = 0;
// store margin-left
var root_margin_left = 0;
// save state of $utils.getDevicePixelRatio
var preRatio;

var trueHeight, trueWidth;

// center content on Screen
function centerDiv() {
    var width_body = $(window).innerWidth() * $utils.getDevicePixelRatio();
    var height_body = $(window).innerHeight() * $utils.getDevicePixelRatio();
    var width_child = $("#svg").width();
    var height_child = $("#svg").height();
    root_margin_left = (width_body - width_child) / 2;
    root_margin_top = (height_body - height_child) / 2;
    if (root_margin_top < 0)
        root_margin_top = 0;
    if (root_margin_left < 0)
        root_margin_left = 0;
    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
        window.scrollTo(0, 10);
    }
    $(".content").css("margin-top", root_margin_top);
    $(".content").css("margin-left", root_margin_left);
}



function init() {
	calculateDiv();
	$("#svg").show();
	$tb.init();
	calDivScroll();
}

var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

// detect use firefox
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
// calculate and delay show content on firefox and other
init();

