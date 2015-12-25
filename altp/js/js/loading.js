//anhnd
function Loading(){
	var timeDefine = 1,//in sec
		widthBar = 629,
		fps = 24,
		startXMask = 320,
		element = "bar",
		text = "timer",
		maskElement = "progressbar_mask",
		playBar
		;
	this.startTimer = function(){
		var numStep =(timeDefine * 1000) / fps;
		var countInStep = widthBar/numStep;
		var currentX = startXMask - widthBar;
		var timeCount = 0;
		$("#"+maskElement).attr("x",currentX);
		playBar = setInterval(function(){
			currentX += countInStep;
			$("#"+maskElement).attr("x", currentX);
			if(currentX >= startXMask - 30){
				// $("#"+maskElement).attr("x",startXMask);
				// $("#loading").hide();
				// $("#introduction").show();
				clearInterval(playBar);
			}
		},fps);
	}
	this.stopTimer = function(){
		clearInterval(playBar);
		$("#"+maskElement).attr("x",startXMask);
		$("#loading").hide();
		$("#introduction").show();
	}
}

$loading = new Loading();
$loading.startTimer();