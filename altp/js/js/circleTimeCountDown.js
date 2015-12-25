function circleCountDown(_ele,_titleEle, _center, _time, _width, _callback, _callbackAfter1Sec) {
    var hMode = "none",
        hDownAng = 0,
        circleEle = _ele,
        center = _center,
		time = _time,
		fps = 24,
		titleEle = _titleEle,
		width = _width,
		callback = _callback,
		callbackAfter1Sec = _callbackAfter1Sec,
		playTime = undefined,
		playCircle = undefined,
		currentTime = 0;

    function describeArc(cx, cy, r, _r, startAngle, endAngle) {
        var rad = Math.PI / 180,
            x1 = cx + r * Math.cos(startAngle * rad),
            x2 = cx + r * Math.cos(endAngle * rad),
            y1 = cy + r * Math.sin(startAngle * rad),
            y2 = cy + r * Math.sin(endAngle * rad),
            flag = (Math.abs(endAngle - startAngle) > 180);

        _x1 = cx + _r * Math.cos(startAngle * rad),
            _x2 = cx + _r * Math.cos(endAngle * rad),
            _y1 = cy + _r * Math.sin(startAngle * rad),
            _y2 = cy + _r * Math.sin(endAngle * rad),
            _flag = (Math.abs(endAngle - startAngle) > 180);
        var x =
            "M " + _x1 + ", " + _y1 + " L" + x1 + ", " + y1 + " A" + r + ", " + r + ", 0 ," + ((flag) ? "1" : "0") + ", 1 ," + x2 + ", " + y2 + " L " + _x2 + ", " + _y2 + " A" + _r + ", " + _r + ", 0 ," + ((flag) ? "1" : "0") + ", 0 ," + _x1 + ", " + _y1 + " z";
        return x;
    }
    var updateTrack = function(rotate_h) {
        var div_h = 0;
        div_h = rotate_h - hDownAng;
        if (div_h < -180) {
            div_h = 360 + div_h;
        }
        if (div_h > 180) {
            div_h = -360 + div_h;
        }

        if (hDownAng == rotate_h) {
            hMode = "none";
        } else if (hMode == "none" && div_h > 0) {
            hMode = "regularA";
        } else if (hMode == "regularA" && div_h < -90 && div_h > -180) {
            hMode = "regularB";
        } else if (hMode == "regularA" && div_h < 0 && div_h > -90) {
            hMode = "counterA";
        } else if (hMode == "regularB" && div_h > 0) {
            hMode = "regularA";
        } else if (hMode == "none" && div_h < 0) {
            hMode = "counterA";
        } else if (hMode == "counterA" && div_h < 180 && div_h > 90) {
            hMode = "counterB";
        } else if (hMode == "counterA" && div_h > 0 && div_h < 90) {
            hMode = "regularA";
        } else if (hMode == "counterB" && div_h < 0) {
            hMode = "counterA";
        }
        var _start, _end;

        //hour
        if (hMode == "regularA" || hMode == "regularB") {
            _start = (hDownAng - 90);
            _start = (_start >= 0) ? _start : 360 + _start;

            _end = rotate_h - 90;
            _end = (_end >= 0) ? _end : 360 + _end;

            if (_start > _end) {
                _end += 360;
            }
            $("#" + circleEle).attr("d", describeArc(center.x, center.y, 195, 160, _start, _end));
        } else if (hMode == "counterA" || hMode == "counterB") {
            _end = (hDownAng - 90);
            _end = (_end >= 0) ? _end : 360 + _end;

            _start = rotate_h - 90;
            _start = (_start >= 0) ? _start : 360 + _start;

            if (_start > _end) {
                _end += 360;
            }
            $("#" + circleEle).attr("d", describeArc(center.x, center.y, 195, 160, _start, _end));
        } else {
            $("#" + circleEle).attr("d", "");
        }
    }
	
	this.drawCir = function(){
		$("#" + circleEle).attr("d", describeArc(center.x, center.y, width[0], width[1], 0, 359.99));
	}
	
	this.getCurrentTime = function(){
		return currentTime;
	}

    this.countDownCircle = function() {
        var _degree = 0;
		var _step = 360/((1000/fps) * (time ));
		var _tmpTime = _time;
		$("#"+titleEle).text(_tmpTime);
		playTime != undefined && clearInterval(playTime);
		playCircle != undefined && clearInterval(playCircle);
		
		playTime = setInterval(function(){
			_tmpTime--;
			currentTime = _tmpTime;
			$("#"+titleEle).text(_tmpTime);
			if(typeof(callbackAfter1Sec) == "function"){
				callbackAfter1Sec();
			}
			if(_tmpTime <= 0){
				$("#" + circleEle).attr("d", describeArc(center.x, center.y, width[0], width[1], 0, 0));
				playCircle != undefined && clearInterval(playCircle);
				clearInterval(playTime);
				currentTime = 0;
				if(typeof(callback) == "function"){
					callback();
				}
			}
		},1000);
		
        playCircle = setInterval(function() {
            _degree += _step;
            var _start = _degree - 90;
            _start = (_start >= 0) ? _start : 360 + _start;
            _end = 270
            if (_start > _end) {
                _end += 360;
            }
            $("#" + circleEle).attr("d", describeArc(center.x, center.y, width[0], width[1], _start, _end));
        }, fps);
    }
	
	this.countDownCircleContinue = function() {
		if(currentTime == 0) {
			this.countDownCircle();
			return;
		}
        var _degree = (360/time) * (time-currentTime);
		_degree = _degree % 360;
		
		var _step = (360 - _degree)/((1000/fps) * (currentTime) );
		var _tmpTime = currentTime;
		$("#"+titleEle).text(_tmpTime);
		playTime != undefined && clearInterval(playTime);
		playCircle != undefined && clearInterval(playCircle);
		
		playTime = setInterval(function(){
			_tmpTime--;
			currentTime = _tmpTime;
			$("#"+titleEle).text(_tmpTime);
			if(_tmpTime <= 0){
				$("#" + circleEle).attr("d", describeArc(center.x, center.y, width[0], width[1], 0, 0));
				playCircle != undefined && clearInterval(playCircle);
				clearInterval(playTime);
				currentTime = 0;
				if(typeof(callback) == "function"){
					callback();
				}
			}
		},1000);
		
        playCircle = setInterval(function() {
            _degree += _step;
            var _start = _degree - 90;
            _start = (_start >= 0) ? _start : 360 + _start;
            _end = 270
            if (_start > _end) {
                _end += 360;
            }
            $("#" + circleEle).attr("d", describeArc(center.x, center.y, width[0], width[1], _start, _end));
        }, fps);
    }
	
	
	this.stop = function(){
		playTime != undefined && clearInterval(playTime);
		playCircle != undefined && clearInterval(playCircle);
	}
}

// $cirDown = new circleCountDown("circleTime","test", {x : 500, y : 500}, 10, [100,200]);
// $cirDown.countDownCircle();