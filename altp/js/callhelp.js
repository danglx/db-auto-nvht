//anhnd
function CallHelp(){
	var timeDefine = 30,
		widthBar = 260,
		startXMask = 489.499,
		element = "bar",
		text = "timer",
		maskElement = "progressbar_mask"
		;
	this.startTimer = function(){
		var _tmpTime = timeDefine;
		$("#"+text).text(_tmpTime);
		var _tmpTimeBar = timeDefine * 1000;
		var stepX = widthBar / (_tmpTimeBar );
		var play = setInterval(function(){
			$("#"+text).text(_tmpTime);
			_tmpTime--;
			if(_tmpTime < 0){
				play != undefined && clearInterval(play);
				playBar != undefined && (clearInterval(playBar));
				$("#"+maskElement).attr("x", startXMask - widthBar-1);
				console.log("end");
			}
		},1000);
		
		var playBar = setInterval(function(){
			_tmpTimeBar -= 30;
			$("#"+maskElement).attr("x", startXMask - (timeDefine * 1000- _tmpTimeBar)* stepX);
		},30);
	}
}

$callhelp = new CallHelp();
$callhelp.startTimer();