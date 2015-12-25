var listData = [];
var step = 0;

function Question(q,aList,c,_expl){
	this.question = q;
	this.answerList = aList;
	this.explanation = _expl;
	this.correct = c;
}

Question.prototype.shuffle = function(){
	var _tmpList=[];
	var _listIndex=[];
	var isSetCorrect = false;
	while(_tmpList.length < 4){
		var ran = Math.floor((Math.random() * 4));
		ran = (ran < 4) ? ran : 3; 
		if(_tmpList.length == 3){
			var _total = 0;
			for(var i = 0 ; i < _listIndex.length ;i++){
				_total+= _listIndex[i];
			}
			var _index = 6 - _total;
			_tmpList.push(this.answerList[_index]);
			
			isSetCorrect || (this.correct = _tmpList.length - 1);
			break;
		}
		if(_listIndex.indexOf(ran) == -1){
			_tmpList.push(this.answerList[ran]);
			if(ran == this.correct && !isSetCorrect){
				isSetCorrect = true;
				this.correct = _tmpList.length - 1;
			}
			_listIndex.push(ran);
		}
	}
	this.answerList = _tmpList;
}




function showQuestion(){
	var index = 0;
	var question = listData[index];
	question.shuffle();
	var self = this,
		timeDefine = 30,
		lock50 = false, 
		lockCall = false, 
		lockLooker= false, 
		lockAnswer = false,
		isUseHelp1 = false,
		isUseHelp2 = false,
		isUseHelp3 = false,
		isUseHelp4 = false,
		yourAnswer = undefined,
		_count = undefined,
		tmpTimeCountDown = -1,
		_countDownCir = undefined;
	
	this.timeCountDown = function(time){
		_count != undefined && clearInterval(_count);
		$(".btHelp").show();
		tmpTimeCountDown = time;
		_count = setInterval(function(){
			if(time<=0){
				self.stop("auto");
				clearInterval(_count);
			}
			$("#tbTime").text(time);
			time--;
			tmpTimeCountDown = time;
		},1000);
	}
	
	var stopCountDown = function(){
		_count != undefined && clearInterval(_count);
	}
	
	function getMoney(_lv){
		switch(_lv){
			case 1 : return 100;
			case 2 : return 200;
			case 3 : return 300;
			case 4 : return 500;
			case 5 : return 1000;
			case 6 : return 1500;
			case 7 : return 2000;
			case 8 : return 2500;
			case 9 : return 3500;
			case 10 : return 5000;
			case 11 : return 6500;
			case 12 : return 8000;
			case 13 : return 9500;
			case 14 : return 12000;
			case 15 : return 20000;
			default : return 0;
		}
	}
	
	this.stop = function(mode){
		_count != undefined && clearInterval(_count);
		$("#tbTime").text(timeDefine);
		$("#dungchoi").show();
		$("#groupAnswer").hide();
		$("#traloisai").hide();
		$(".btHelp").hide();
		var money = 0;
		var numStar = 0;
		if(mode=="auto"){
			if(index > 4 && index <= 9) {
				money = 1000;
			} else if(index > 9){
				money = 5000;
			}
		} else {
			money = getMoney(index);
		}
		numStar = parseInt(money / 1000);
		$("#dungchoi_sao").text(numStar);
		money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
		$("#dungchoi_tien").text(money);
	}
	
	
	var showExplaination = function(_isCorrect){
		var _listText = question.explanation.split("\n");
		var _rootEle = _isCorrect ? "traloidung_giaithich" : "traloisai_giaithich";
		$("#"+_rootEle).empty();
		for(var i = 0 ; i < _listText.length ; i++){
			var _ele = $utils.appendSVGElement(_rootEle,"tspan");
			_ele.setAttribute("font-size",20);
			_ele.setAttribute("font-family","'Arial'");
			_ele.setAttribute("fill","#FFFFFF");
			_ele.setAttribute("text-anchor","middle");
			_ele.setAttribute("dy","25");
			_ele.setAttribute("x","0");
			_ele.textContent =_listText[i];
		}
		if(!_isCorrect){
			var _ele = $utils.appendSVGElement(_rootEle,"tspan");
			_ele.setAttribute("font-size",18);
			_ele.setAttribute("font-family","'Arial'");
			_ele.setAttribute("fill","#FFFFFF");
			_ele.setAttribute("text-anchor","middle");
			_ele.setAttribute("dy","25");
			_ele.setAttribute("x","0");
			_ele.textContent = "CẢM ƠN BẠN ĐÃ THAM GIA CHƯƠNG TRÌNH";
		}
	}
	
	
	
	
	this.show = function(){
		$("#SanSang").hide();
		$("#groupAnswer").show();
		$(".glow").hide();
		$("#level"+(index+1)).show();
		$(".buttonAnswer").removeAttr("choose");
		$(".buttonAnswer").hide();
		lockChoose = false;
		//$("#tbQuestion").text(question.question);
		var _listText = question.question.split("\n");
		var _rootEle = "tbQuestion";
		$("#"+_rootEle).empty();
		for(var i = 0 ; i < _listText.length ; i++){
			var _ele = $utils.appendSVGElement(_rootEle,"tspan");
			_ele.setAttribute("font-size",24);
			_ele.setAttribute("font-family","'Arial'");
			_ele.setAttribute("fill","#FDEC75");
			_ele.setAttribute("text-anchor","middle");
			_ele.setAttribute("dy","25");
			_ele.setAttribute("x","0");
			_ele.textContent =_listText[i];
		}
		for(var i = 0 ; i < 4 ; i++){
			$("#tbAnswer"+(i+1)).text(question.answerList[i]);
		}
		this.timeCountDown(timeDefine);
	}
	
	this.nextWithNoShowStar = function(){
		question = listData[index];
		question.shuffle();
		$("#traloidung").hide();
		$("#chucmung").hide();
		_countDownCir.stop();
		this.show();
	}
	
	this.next = function(){
		if(index%5 == 0){
			$("#chucmung").show();
			$("#chucmung_level").text("BẠN ĐÃ VƯỢT QUA CÂU SỐ "+(index));
			$("#traloidung").hide();
			_countDownCir.stop();
			
			var money = 0;
			var numStar = 0;
			money = getMoney(index);
			numStar = parseInt(money / 1000);
			$("#chucmung_sao").text(numStar);
			money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
			$("#chucmung_tien").text(money);
			
			return;
		}
		question = listData[index];
		question.shuffle();
		$("#traloidung").hide();
		_countDownCir.stop();
		this.show();
	}
	
	function help1(){
		//tuvantaicho
		if(lockAnswer) return;
		$chart.drawChart([0.7,0.1,0.2,0.2]);
		stopCountDown();
		$(".help").hide();
		$("#MainHelp").show();
		$("#tuvantaicho").show();
	}
	function help2(){
		if(lockAnswer) return;
		$chart.drawChart([0.7,0.1,0.2,0.2]);
		stopCountDown();
		$(".help").hide();
		$("#MainHelp").show();
		$("#ykienkhangia").show();
	}
	function help3(){
		if(lockAnswer) return;
		var id = -1;
		while(true){
			var ran = Math.floor((Math.random() * 4));
			ran = (ran < 4) ? ran : 3; 
			if(ran != question.correct){
				id = ran;
				break;
			}
		}
		for(var i = 0 ; i < 4 ; i++){
			$("#ans"+(i+1)).show();
			if(i != id && i != question.correct){
				$("#ans"+(i+1)).hide();
			}
		}
		
		stopCountDown();
		$(".help").hide();
		$("#MainHelp").show();
		$("#50_50").show();
		
	}
	function help4(){
		
	}
	
	this.useHelp = function(_id){
		
		switch(_id){
			case 1 : 
				if(isUseHelp1) return;
				isUseHelp1 = true;
				$("#help1").show();
				help1();
				lockChoose = true;
				$(".btHelp").hide();
				break;
			case 2 : 
				if(isUseHelp2) return;
				isUseHelp2 = true;
				$("#help2").show();
				help2();
				lockChoose = true;
				$(".btHelp").hide();
				break;
			case 3 : 
				if(isUseHelp3) return;
				isUseHelp3 = true;
				$("#help3").show();
				help3();
				lockChoose = true;
				$(".btHelp").hide();
				break;
			case 4 : 
				if(isUseHelp4) return;
				isUseHelp4 = true;
				break;
		}
		
	}
	
	this.useHelpOK = function(){
		lockChoose = false;
		$("#MainHelp").hide();
		this.timeCountDown(tmpTimeCountDown);
	}
	
	
	function getCorrect(){
		switch(question.correct){
			case 0 : return "A";
			case 1 : return "B";
			case 2 : return "C";
			case 3 : return "D";
		}
	}
	
	this.answer = function(_yourAnswer){
		for(var i = 0 ; i < 4 ; i++){
			$("#ans"+(i+1)).show();
		}
		$(".traloi").hide();
		$(".btHelp").hide();
		lockChoose = true;
		stopCountDown();
		if(_yourAnswer == question.correct){
			$("#traloidung").show();
			$("#traloidung_dapan").text(getCorrect());
			showExplaination(true);
			_countDownCir != undefined && _countDownCir.stop();
			_countDownCir = new circleCountDown("traloidung_circle","traloidung_countDown", {x : 340 , y : 393}, 10, [20,25],
				function(){
					$("#traloidung").hide();
					self.stop();
				}
			);
			_countDownCir.countDownCircle();
			index++;
		} else {
			$("#traloisai").show();
			showExplaination(false);
		}
	}
}


var tmpQ = undefined;


var startFunc = function(){
	$("#loading").hide();
	$("#introduction").hide();
	$("#playgame").show();
	$.ajax({
		url: "http://elearning.tvu.topica.vn/api_altp/get_quiz.php?quiz_id=24465",
		dataType: 'json',
		success: function(data) {
			if(data.success == "1"){
				console.log(data);
				for(var i = 0 ; i < data.data.length ; i++){
					var _data = data.data[i];
					var _quest = _data.ten_cau_hoi.match(/<p>.*<[/]p>/mi)[0].replace("<p>","").replace("</p>","");
					var _ans = [], _idCorrect = -1;
					for(var k = 0 ; k < _data.arr_dap_an.length ; k++){
						_ans.push(_data.arr_dap_an[k].ten_cau_tra_loi);
						_data.arr_dap_an[k].dungsaiyn == "1" && (_idCorrect = k);
						_data.arr_dap_an[k].dungsaiyn == "1" && (console.log(_data.arr_dap_an[k].ten_cau_tra_loi));
						
					}
					var _exp = "";
					listData.push(new Question(
						_quest,
						_ans,
						_idCorrect,
						_exp
					));
				}
				tmpQ = new showQuestion();
			}
		}
	});
}

startFunc();
$("#SanSang").hide();
$("#groupAnswer").show();
// var _test = new circleCountDown("traloi_circle","traloi_countDown", {x : 894 , y : 193}, 15, [20,25],function(){});
// _test.drawCir();

