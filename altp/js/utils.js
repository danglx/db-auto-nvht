function Utils() { 
    this.baseUrl = 'http://elearning.tvu.topica.vn';
    this.apiPath = '/api_altp';
    this.redirectUri = this.baseUrl;
}

Utils.prototype = {
    appendSVG: function (type) {
        var _svg = document.getElementById("svg");
        var _item = document.createElementNS("http://www.w3.org/2000/svg", type);
        _svg.appendChild(_item);
        return _item;
    },
	
    removeChildSVG: function (_item) {
        var _svg = document.getElementById("svg");
        _svg.removeChild(_item);
    },
	
    appendSVGElement: function (elementName, type) {
        var _svg = document.getElementById(elementName);
        var _item = document.createElementNS("http://www.w3.org/2000/svg", type);
        _svg.appendChild(_item);
        return _item;
    },
	
	addShape : function(_parrent, _data, _id) {
		var l = $utils.appendSVGElement(_parrent, "path");
		l.setAttribute("id", _id);
		l.setAttribute("d", _data);
		return l;
	},
	
	addRect : function(_parrent, _point, _id) {
		var l = $utils.appendSVGElement(_parrent, "rect");
		l.setAttribute("id", _id);
		l.setAttribute("d", _data);
		return l;
	},
	
	createGroup : function(_id) {
		var l = $utils.appendSVG("g");
		l.setAttribute("id", _id);
		return l;
	},
	
    threadCheckText: function (e) {
        var countInteval = 0;
        var reg = /^\d+$/;
        var testCheck = setInterval(function () {
            var _target = document.getElementById(e.currentTarget.id);

            var target = $("#" + e.currentTarget.id);
            countInteval++;

            if (!reg.test(target.val())) {
                target.val("");
                done();
            }
            if (countInteval >= 10)
                done();
        }, 30);

        function done() {
            clearInterval(testCheck);
        }
        return this;
    },

    onlyNumber: function (element) {
        element.on('keydown', function (e) {
            if (e.keyCode == 65 && e.ctrlKey == true) {
                return;
            }
            if (e.metaKey == true && e.keyCode == 65) {
                return;
            }
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 116]) !== -1 ||
				(e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            } else {
                var _target = document.getElementById(e.currentTarget.id);
                var target = $("#" + e.currentTarget.id);
                if (target.val().length >= 2 && (-_target.selectionStart + _target.selectionEnd) < 1) e.preventDefault();
            }
        });
    },
    getTrueCoor: function (x, y) {
        var svg = document.querySelector('svg');
		var position = svg.createSVGPoint();
		var _agent = navigator.userAgent.toLowerCase();
		var matrix = svg.getScreenCTM();
		
		position.x = x;
		position.y = y;

		matrix.e = parseInt($('#svg').css("margin-left"));
		matrix.f = parseInt($('#svg').css("margin-top"));
		

		if (detectmob() == 1 || detectmob() == 3) {
			matrix = svg.getScreenCTM();
			position.x = x;
			position.y = y;
		}
		
		// mozilla/5.0 (macintosh; intel mac os x 10_10_2) applewebkit/600.4.10 (khtml, like gecko) version/8.0.4 safari/600.4.10
		var correctPosition = position.matrixTransform(matrix.inverse());
		if (detectmob() != 1 && detectmob() != 3 && _agent.indexOf('chrome') < 0 && _agent.indexOf('safari') < 0) {
			correctPosition.x /= ratio;
			correctPosition.y /= ratio;
		}
		
        return [correctPosition.x, correctPosition.y];
    },

    getTransform: function (itemID) {
        var tXY = {
            x: 0,
            y: 0
        };
        var transformOld = $(itemID).attr('transform');

        if (transformOld == '' || transformOld == undefined) {
            return tXY;
        } else {

            var transXY = transformOld.match(/(-?[0-9\.]+)/g);
            if (transXY[0] != undefined) {
                tXY.x = parseFloat(transXY[0]);
            }
            if (transXY[1] != undefined) {
                tXY.y = parseFloat(transXY[1]);
            }
        }
        return tXY;
    },
	
	detectmob : function() {
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
	},
	
	orientationchange : function(){
		if (this.detectmob() == 2) {
			$.ajax({
				url: 'libs/jquery.mobile-1.4.5.min.js',
				dataType: 'script',
				success: function() {
					$(document).bind("mobileinit", function() {
						$.mobile.loadingMessage = false;
						$.mobile.hidePageLoadingMsg();
					});

					$(window).on("orientationchange", function(event) {
						calculateDiv();
					});
				}
			});
		}
	},
	
	getDevicePixelRatio : function() {
		var pixelRatio = 1; // just for safety
		if ('deviceXDPI' in screen) { // IE mobile or IE
			pixelRatio = screen.deviceXDPI / screen.logicalXDPI;
		} else if (window.hasOwnProperty('devicePixelRatio')) { // other devices
			pixelRatio = window.devicePixelRatio;
		}
		
		pixelRatio = Math.ceil(pixelRatio * 100)/100;
		return parseFloat(pixelRatio);
	},
	isLeftMouse: function (e) {
        e = e || window.event;
        var button = e.which || e.button;
        return button == 1 || button == null || e.isTrigger;
    },
	getParameter : function (_url) {
		// console.log(Base64.decode(_url));
		var a = _url ? Base64.decode(_url).split('&') : Base64.decode(window.location.search).substr(1).split('&');
		
		if (a == "") return {};
		var b = {};
		for (var i = 0; i < a.length; ++i)
		{
			var p=a[i].split('=', 2);
			if (p.length == 1)
				b[p[0]] = "";
			else
                if (p[0] == 'redirect') {
                    this.redirectUri = b[p[0]];
                };
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
		}
		return b;
	},
	isLeftMouse: function (e) {
        e = e || window.event;
        var button = e.which || e.button;
        return button == 1 || button == null || e.isTrigger;
    },
	
	f_scrollLeft: function () {
        return this.f_filterResults(
            window.pageXOffset ? window.pageXOffset : 0,
            document.documentElement ? document.documentElement.scrollLeft : 0,
            document.body ? document.body.scrollLeft : 0
        );
    },
    f_scrollTop: function () {
        return this.f_filterResults(
            window.pageYOffset ? window.pageYOffset : 0,
            document.documentElement ? document.documentElement.scrollTop : 0,
            document.body ? document.body.scrollTop : 0
        );
    },

    f_filterResults: function (n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
            n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
    },

    // Added by AnhDT4
    getBaseUrl: function () {
        return this.baseUrl;
    },

    getApiPath: function (apiPath) {
        return this.apiPath;
    },

    getRedirectUri: function () {
        return this.redirectUri;
    },

    get: function (uri, dataType, callback) {
        var baseUrl = this.getBaseUrl(),
            apiPath = this.getApiPath(),
            fullApiUrl = baseUrl + apiPath + uri;
        if ( dataType = 'undefined' ) {
             dataType = 'json';
        };
        $.get(fullApiUrl, null, function(res) {
            // res = $.parseJSON(res);
            callback(res);
        }, dataType);
    },

    post: function (uri, data, callback, dataType) {
        var baseUrl = this.getBaseUrl(),
            apiPath = this.getApiPath(),
            fullApiUrl = baseUrl + apiPath + uri;
        if ( dataType == undefined ) {
             dataType = 'json';
        };
        $.post(fullApiUrl, data, function (res) {
            callback(res);
        }, dataType);
    }
}

var $utils = new Utils();
$utils.baseUrl = 'http://elearning.tvu.topica.vn';
$utils.apiPath = '/api_altp'

var $id = function(_id){
	return document.getElementById(_id);
}

