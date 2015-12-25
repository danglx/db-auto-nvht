var listData = [];
var step = 0;
var _listPara = $utils.getParameter("	?aWFkZF9jb2RlPVRWVSZjb2RlX3R2dV9zdj0yNDM2NiZxaWQ9MjM1NTAmYWx0cF9zbGxfc3Y9MCZ0aG9pX2dpYW5fdHVuZ19jYXU9NjAmdGhvaV9naWFuX2JvX3F1YT0xNQ==");

function Question(q,aList,c,_explC,_explIn){
	this.question = q;
	this.answerList = aList;
	this.explanationCorrect = _explC;
	this.explanationIncorrect = _explIn;
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
	console.log(this.correct + 1);
	this.answerList = _tmpList;
}




function showQuestion(){
	var index = 0;
	var question = listData[index];
	var _diemClone = document.getElementById("diemclone"),
		_groupDiem = document.getElementById("groupdiem"),
		_y = 38,
		_groupDiemHeightConfig = 559,
		_groupdiemScale = 1;
	var _glowClone = document.getElementById("glowclone"),
		_groupGlow = document.getElementById("glowGroup"),
		_yGlow = 38;
	$("#groupdiem").empty();
	$("#glowGroup").empty();
	for(var i = 0 ;i < listData.length ; i++){
		var _item = _diemClone.cloneNode(true);
		_item.setAttribute("y", (i) * _y);
		_item.setAttribute("id", "diem"+(listData.length-i));
		_item.removeAttribute("display");
		(i) % 5 == 0 ? _item.setAttribute("fill", "#FDEC75") : _item.setAttribute("fill", "#FFFFFF");
		_groupDiem.appendChild(_item);
		
		var _glowItem = _glowClone.cloneNode(true);
		console.log(i== listData.length-1);
		
		_glowItem.setAttribute("transform", "translate(0,"+(i)*_yGlow+")");
		_glowItem.setAttribute("id", "glow"+(listData.length-i));
		_groupGlow.appendChild(_glowItem);
		if(i== listData.length-1){
			_glowItem.removeAttribute("display");
			$("#glow"+(listData.length-i)).show();
			console.log($("#glow"+(listData.length-i)));
		} 
	}
	var _groupDiemHeight = $("#groupdiem")[0].getBBox().height;
	_groupdiemScale = _groupDiemHeightConfig/_groupDiemHeight;
	function getGroupDiemMatrix(_scale){
		return "matrix("+_scale+" 0 0 "+_scale+" 1058 110)";
	}
	if(_groupdiemScale < 1) {
		$("#groupdiem").attr("transform",getGroupDiemMatrix(_groupdiemScale));
		var glow  = {height: 785,width: 269,x: 1005,y: 70};
		$("#glowGroup").attr("transform","translate("+(glow.x + glow.width/2 )+","+ (glow.y ) +") scale("+_groupdiemScale+") translate(" + (-glow.x - glow.width/2)+","+(- glow.y ) +")");
		if(listData.length == 20){
			$("#glowGroup").attr("transform","translate("+(glow.x + glow.width/2 - 20)+","+ (glow.y + 10) +") scale("+_groupdiemScale+") translate(" + (-glow.x - glow.width/2)+","+(- glow.y ) +")");
		}
	}
	
	var moneyList = getMoneyByLength(listData.length);
	for(var i = 0 ; i < moneyList.length ; i++){
		$("#diem"+(i+1)).text((i+1) + " - "+add0ToMoney(moneyList[i]));
	}
	
	
	//question.shuffle();
	var self = this,
		timeDefine = 1000,
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
		_countDownCir = undefined,
		widthQDefine = 700,
		donghoBBox = $("#dongho")[0].getBBox(),
		donghoCenter = {x : donghoBBox.x + donghoBBox.width/2,y:donghoBBox.y + donghoBBox.height/2},
		playDongHo = undefined,
		currentAngleDongHo = 0,
		playDH = function(){
			playDongHo != null && clearInterval(playDongHo);
			playDongHo = setInterval(function(){
				currentAngleDongHo += 20;
				if(currentAngleDongHo % 180 == 0) clearInterval(playDongHo);
				$("#dongho").attr("transform","rotate("+currentAngleDongHo+","+donghoCenter.x + ","+donghoCenter.y+")");
			},30);
		},
		_circleQuestionCount = new circleCountDown("traloi_circle","traloi_countDown", {x : 894 , y : 423}, timeDefine, [20,25],
		function(){
			//self.stop("auto");
			var _answerID = getAnswer($("polygon[choose='true']").attr("id"));
			//if( _answerID== "E" ) return;
			self.answer(_answerID);
		},
		function(){
			playDH();
		});
		// $("#dongho").attr("transform","rotate(40,"+donghoCenter.x + ","+donghoCenter.y+")");
	
	this.timeCountDown = function(){
		_circleQuestionCount.countDownCircle();
		//_circleQuestionCount.drawCir();
		$(".btHelp").show();
	}
	
	var stopCountDown = function(){
		_circleQuestionCount.stop();
	}
	
	function getMoneyByLength(_length){
		switch(_length){
			case 5: 
				return [2000,4000,6000,8000,10000];
			case 10:
				return [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000];
			case 15:
				return [100,200,300,500,1000,1500,2000,2500,3500,5000,6500,8000,9500,12000,20000];
			case 20:
				return [500,1000,1500,2000,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000];
			default: return [];
		}
	}
	
	function getMoney(_lv){
		return getMoneyByLength(listData.length)[_lv];
	}
	
	this.stop = function(mode){
		_circleQuestionCount.stop();
		$("#tbTime").text(timeDefine);
		$("#dungchoi").show();
		//$("#groupAnswer").hide();
		showTrue(question.correct);
		$("#traloisai").hide();
		$(".btHelp").hide();
		$(".mydiv").hide();
		var money = 0;
		if(mode=="auto"){
			if(index > 4 && index <= 9) {
				money = 1000;
			} else if(index > 9){
				money = 5000;
			}
		} else {
			money = getMoney(index);
		}
		money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
		$("#dungchoi_money").text(money+" LTTNPoint");
	}
	
	
	var showExplaination = function(_isCorrect){
		//var _listText = question.explanation.split("\n");
		var _rootEle = _isCorrect ? "traloidung_giaithich" : "traloisai_giaithich";
		console.log(question);
		if(_isCorrect){
			
			$id("divtraloi_div").innerHTML = question.explanationCorrect;
		} else {
			$id("divtraloi_div").innerHTML = question.explanationIncorrect;
		}
		
		// $("#"+_rootEle).empty();
		// for(var i = 0 ; i < _listText.length ; i++){
			// var _ele = $utils.appendSVGElement(_rootEle,"tspan");
			// _ele.setAttribute("font-size",20);
			// _ele.setAttribute("font-family","'Arial'");
			// _ele.setAttribute("fill","#FFFFFF");
			// _ele.setAttribute("text-anchor","middle");
			// _ele.setAttribute("dy","25");
			// _ele.setAttribute("x","0");
			// _ele.textContent =_listText[i];
		// }
		// if(!_isCorrect){
			// var _ele = $utils.appendSVGElement(_rootEle,"tspan");
			// _ele.setAttribute("font-size",18);
			// _ele.setAttribute("font-family","'Arial'");
			// _ele.setAttribute("fill","#FFFFFF");
			// _ele.setAttribute("text-anchor","middle");
			// _ele.setAttribute("dy","25");
			// _ele.setAttribute("x","0");
			// _ele.textContent = "CẢM ƠN BẠN ĐÃ THAM GIA CHƯƠNG TRÌNH";
		// }
	}
	
	function scaleAnswer(_id){
		var currentWidth = $(_id)[0].getBBox().width;
		var _font = parseFloat($(_id).attr("font-size"));
		while(currentWidth/widthQDefine > 1) {
			_font--;
			$(_id).attr("font-size",_font);
			currentWidth = $(_id)[0].getBBox().width;
		}
	}
	
	function add0ToMoney(money){
		money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
		return money;
	}
	
	function writeQuestion(_ele,text){
		$(_ele).empty();
		var _svg = d3.select(_ele);
		var measurer = new SVGTypewriter.Measurers.Measurer(_svg);
		var wrapper = new SVGTypewriter.Wrappers.Wrapper();
		wrapper.allowBreakingWords(false);
		console.log(wrapper);
		var writer = new SVGTypewriter.Writers.Writer(measurer, wrapper);
		var writeOptions = {
		  selection: _svg,
		  xAlign: "left",
		  yAlign: "top",
		  textRotation: 0
		};
		
		//text = "anh dai ca ah ksahfksd afksahf ksfksajfhsdkjf skafhska fjksafh skadfhskad fhskhfksa fksahfksdha fkjshafkhsdk fhkjsadhf";
		writer.write(text, 800, 180, writeOptions);
	}
	
	
	this.show = function(){
		$("#SanSang").hide();
		$("#groupAnswer").show();
		$(".glow").hide();
		$("#glow"+(index+1)).show();
		$(".buttonAnswer").removeAttr("choose");
		$(".buttonAnswer").hide();
		soundSansang();
		for(var i = 1 ; i <= 4 ; i++){
			$("#answer"+i+"_event").show();
			$("#answer"+i+"_hover").hide();
			$("#answer"+i+"_hover").attr("fill","#878787");
		}
		lockChoose = false;

		var _rootEle = "#tbQuestion";
		//writeQuestion(_rootEle,question.question);
		$id("divcauhoi_div").innerHTML = question.question;
		
		for(var i = 0 ; i < 4 ; i++){
			$("#tbAnswer"+(i+1)).attr("font-size",20);
			$("#tbAnswer"+(i+1)).text(question.answerList[i]);
			scaleAnswer("#tbAnswer"+(i+1));
		}
		this.timeCountDown();
	}
	
	this.nextWithNoShowStar = function(){
		question = listData[index];
		//question.shuffle();
		$("#traloidung").hide();
		$("#chucmung").hide();
		_countDownCir.stop();
		this.show();
	}
	
	this.next = function(){
		$(".mydiv").hide();
		if(index%5 == 0){
			$("#chucmung").show();
			$("#chucmung_level").text("BẠN ĐÃ VƯỢT QUA CÂU SỐ "+(index));
			$("#traloidung").hide();
			_countDownCir.stop();
			var money = 0;
			money = getMoney(index);
			money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
			$("#chucmung_money").text(money+" LTTNpoint");
			return;
		}
		$("#divcauhoi_div").show();
		resetColorHover();
		question = listData[index];
		//question.shuffle();
		
		$("#traloidung").hide();
		_countDownCir.stop();
		this.show();
	}
	
	function help50_50complete(){
		help3();
	}
	
	function ykienkhangiaComplete(){
		help2();
	}
	
	sound_help50_50.removeEventListener("complete",help50_50complete);
	sound_help50_50.addEventListener("complete",help50_50complete);
	
	sound_Khangia.removeEventListener("complete",ykienkhangiaComplete);
	sound_Khangia.addEventListener("complete",ykienkhangiaComplete);
	
	
	function help1(){
		//tuvantaicho
		if(lockAnswer) return;
		$chart.drawChart([0.7,0.1,0.2,0.2]);
		//stopCountDown();
		$(".help").hide();
		$("#MainHelp").show();
		$("#tuvantaicho").show();
	}
	function help2(){
		//ykienkhangia
		if(lockAnswer) return;
		$chart.drawChart([0.7,0.1,0.2,0.2]);
		
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
		
		//stopCountDown();
		$(".help").hide();
		$("#MainHelp").show();
		$("#50_50").show();
		
	}
	function help4(){
		if(lockAnswer) return;
		$(".help").hide();
		$("#MainHelp").show();
		$("#goidienchonguoithan").show();
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
				stopCountDown();
				break;
			case 2 : 
				if(isUseHelp2) return;
				isUseHelp2 = true;
				$("#help2").show();
				//help2();
				lockChoose = true;
				$(".btHelp").hide();
				stopCountDown();
				useHoiYKienKhanGia();
				break;
			case 3 : 
				if(isUseHelp3) return;
				isUseHelp3 = true;
				$("#help3").show();
				$(".btHelp").hide();
				lockChoose = true;
				use50_50();
				stopCountDown();
				break;
			case 4 : 
				if(isUseHelp4) return;
				isUseHelp4 = true;
				$("#help4").show();
				help4();
				lockChoose = true;
				$(".btHelp").hide();
				stopCountDown();
				break;
		}
		
	}
	
	this.useHelpOK = function(){
		lockChoose = false;
		$("#MainHelp").hide();
		$(".btHelp").show();
		_circleQuestionCount.countDownCircleContinue();
	}
	
	
	function getCorrect(){
		switch(question.correct){
			case 0 : return "A";
			case 1 : return "B";
			case 2 : return "C";
			case 3 : return "D";
		}
	}
	
	function resetColorHover(){
		$("#answer1_hover").attr("fill","#878787");
		$("#answer2_hover").attr("fill","#878787");
		$("#answer3_hover").attr("fill","#878787");
		$("#answer4_hover").attr("fill","#878787");
	}
	
	function setCorrect(_id,isCorrect){
		resetColorHover();
		var color = "#30ff00";
		isCorrect || (color = "#ff0000");
		switch(_id){
			case 0 : 
				$("#answer1_hover").attr("fill",color);
				break;
			case 1 :
				$("#answer2_hover").attr("fill",color);
				break;
			case 2 :
				$("#answer3_hover").attr("fill",color);
				break;
			case 3:
				$("#answer4_hover").attr("fill",color);
				break;
		}
	}
	
	function showTrue(_id){
		var color = "#30ff00";
		switch(_id){
			case 0 : 
				$("#answer1_hover").attr("fill",color);
				$("#answer1_hover").show();
				break;
			case 1 :
				$("#answer2_hover").attr("fill",color);
				$("#answer2_hover").show();
				break;
			case 2 :
				$("#answer3_hover").attr("fill",color);
				$("#answer3_hover").show();
				break;
			case 3:
				$("#answer4_hover").attr("fill",color);
				$("#answer4_hover").show();
				break;
		}
	}
	
	this.answer = function(_yourAnswer){
		for(var i = 0 ; i < 4 ; i++){
			$("#ans"+(i+1)).show();
		}
		$(".traloi").hide();
		$(".mydiv").hide();
		$("#divtraloi_div").show();
		$(".btHelp").hide();
		lockChoose = true;
		stopCountDown();
		
		if(_yourAnswer == question.correct){
			$("#traloidung").show();
			setCorrect(_yourAnswer,true);
			$("#traloidung_dapan").text(getCorrect());
			showExplaination(true);
			var money = getMoney(index+1);
			money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
			$("#currentPoint").text(money);
			_countDownCir != undefined && _countDownCir.stop();
			_countDownCir = new circleCountDown("traloidung_circle","traloidung_countDown", {x : 582 , y : 394}, 10, [18,23],
				function(){
					$("#traloidung").hide();
					self.next();
				},
				function(){
					playDH();
				}
			);
			_countDownCir.countDownCircle();
			//_countDownCir.drawCir();
			if(index == listData.length-1){
				$("#chucmung2").show();
				_circleQuestionCount.stop();
				return;
			}
			index++;
		} else {
			$("#traloisai").show();
			setCorrect(_yourAnswer,false);
			showTrue(question.correct);
			showExplaination(false);
		}
	}
}


var tmpQ = undefined;


var startFunc = function(){
	//http://ailatrieuphu.izee.vn/?iadd_code=TVU&code_tvu_sv=24366&qid=23550&altp_sll_sv=0
	//http://ailatrieuphu.izee.vn/?ma_truong=TVU&ma_sv=24366&qid=23550&so_lan_lam=0
	
	if(_listPara["altp_sll_sv"] < 3 ){
		$("#loading").hide();
		$("#introduction").hide();
		$(".app").hide();
		$(".mydiv").hide();
		$("#divcauhoi_div").show();
		$("#playgame").show();
		$("#SanSang").show();
		$("#groupAnswer").show();
		
		$("#dongho").removeAttr("transform");
		soundBatDauLamBai();
		
		listData = [];
		//$("#tbQuestion").text("");
		for(var i = 1 ; i <= 4 ; i++){
			$("#tbAnswer"+i).text("");
			$("#help"+i).hide();
			$("#answer"+i+"_event").hide();
			$("#answer"+i+"_hover").hide();
			//$("#answer"+i+"_hover").attr("fill","#000000");
		}
		console.log("http://elearning.tvu.topica.vn/api_altp/get_quiz.php?quiz_id="+_listPara["qid"]);
		$.ajax({
			url: "http://elearning.tvu.topica.vn/api_altp/get_quiz.php?quiz_id="+_listPara["qid"],
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.success == "1"){
					for(var i = 0 ; i < data.data.length ; i++){
						var _data = data.data[i];
						
						
						//var _quest = _data.ten_cau_hoi.match(/<p>.*<[/]p>/mi)[0].replace("<p>","").replace("</p>","");
						var _ans = [], _idCorrect = -1;
						for(var k = 0 ; k < _data.arr_dap_an.length ; k++){
							_ans.push(_data.arr_dap_an[k].ten_cau_tra_loi);
							_data.arr_dap_an[k].dungsaiyn == "1" && (_idCorrect = k);
							//_data.arr_dap_an[k].dungsaiyn == "1" && (console.log(_data.arr_dap_an[k].ten_cau_tra_loi));
						}
						//var _exp = _data.correctfeedback;
						// _exp = _exp.match(/<p>.*<[/]p>/mi)[0].split("</p>");
						// var _tmpExp = "";
						// for(var x = 0 ; x < _exp.length ;x++){
							// _tmpExp += _exp[x].replace("<p>","") + "\n";
						// }
						//console.log(_tmpExp);
						listData.push(new Question(
							_data.ten_cau_hoi,
							_ans,
							_idCorrect,
							_data.correctfeedback,
							_data.incorrectfeedback
						));
						
					}
					tmpQ = new showQuestion();
					return;
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
	} else {
		console.log("khong duoc lam");
	}
	
}

var backToIntro = function(){
	$("#introduction").show();
	$("#playgame").hide();
	$("#loading").hide();
	soundIntro();
}

var showBangXepHang = function(){
	$(".app").hide();
	$("#groupbangxephang").show();
}

// $("#loading").hide();
// $("#introduction").hide();
// $(".app").hide();
// $("#playgame").show();
// $("#SanSang").show();
var q1 = new Question(
		"Giải Grand Slam đầu tiên trong năm là giải nào?\nĐố các bạn biết",
		["Austrlia mở rộng Austrlia mở rộng Austrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia mở rộngAustrlia","Wimbledon","Roland Garos","Mỹ mở rộng"],
		0,
		"bởi vì search google\nToi thay nhu sau\nGiải Grand Slam đầu tiên trong năm là giải Austrlia mở rộng"
	);
var q2 = new Question(
		"Trong các cây cầu sau\n cầu nào là cầu xoay?",
		["Cầu Thanh Trì","Cầu Thị Nại","Cầu Sông Hàn","Cầu Cần Thơ"],
		2,
		"Đây là câu rất khó\nCầu xoay là Cầu Sông Hàn"
	);
var q3 = new Question(
		"Đại Ngu là quốc hiệu của triều đại nào?",
		["Triều Ngô","Triều Hồ","Các chúa Nguyễn","Nhà Tây Sơn"],
		1,
		"Đây là câu rất khó\nĐại Ngu là quốc hiệu của Triều Hồ"
	);
	
var loadBangXepHang = function(){
	//http://elearning.tvu.topica.vn/api_altp/bang_xep_hang.php?ma_truong=tvu
	$.ajax({
		url: "http://elearning.tvu.topica.vn/api_altp/bang_xep_hang.php?ma_truong=tvu",
		dataType: 'json',
		success: function(data) {
			if(data.success == "1"){
				var _tmpData = data.data;
				console.log(_tmpData);
				var _groupEle = $id("groupxephang_all");
				var _hangClone = $id("groupxephang_hang_clone");
				var _nameClone = $id("groupxephang_name_clone");
				var _pointClone = $id("groupxephang_point_clone");
				var _lopClone = $id("groupxephang_lop_clone");
				var _avata = $id("groupxephang_avata_clone");
				var _groupXepHang = $id("groupxephang");
				for(var i = 0 ; i < _tmpData.length ; i++){
					var _item = _tmpData[i];
					var _tmpLop = _lopClone.cloneNode(true);
					_tmpLop.removeAttribute("display");
					_tmpLop.innerHTML = _item["lop_quan_ly"];
					_tmpLop.setAttribute("y", (i*48));
					_groupEle.appendChild(_tmpLop);
					
					var _tmpName = _nameClone.cloneNode(true);
					_tmpName.removeAttribute("display");
					_tmpName.innerHTML = _item["ten_sinh_vien"];
					_tmpName.setAttribute("y", (i*48));
					_groupEle.appendChild(_tmpName);
					
					var _tmpHang = _hangClone.cloneNode(true);
					_tmpHang.removeAttribute("display");
					_tmpHang.innerHTML = (i+1) < 10 ? "0"+(i+1) : (i+1);
					_tmpHang.setAttribute("y", (i*48));
					_groupEle.appendChild(_tmpHang);
					
					var _tmpDiem = _pointClone.cloneNode(true);
					_tmpDiem.removeAttribute("display");
					_tmpDiem.innerHTML = _item["diem"];
					_tmpDiem.setAttribute("y", (i*48));
					_groupEle.appendChild(_tmpDiem);
					
					//groupxephang_avata_clone
					var _tmpAvata = _avata.cloneNode(true);
					_tmpAvata.removeAttribute("display");
					_tmpAvata.setAttribute("transform", "translate(0,"+(i*48) + ")");
					_groupXepHang.appendChild(_tmpAvata);
				}
			}
		}
	});
}
// listData.push(q1);
// listData.push(q2);
// listData.push(q3);
// listData.push(q3);
// for(var i = 0 ; i < 5 ; i++){
	// listData.push(q1);
// }
// tmpQ = new showQuestion();
// tmpQ.show();


var muteSound = function(){
	if($("#mute").css("display") == "none"){
		$("#mute").show();
	} else {
		$("#mute").hide();
	}
}

new Slider("slidersound_event","slidersound",47,{x:0,y:0},47);
