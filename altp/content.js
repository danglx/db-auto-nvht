// --- Edited by AnhDT4
var listData = [],
	step = 0,
	uriParam = location.search != '' ? location.search : "?aWFkZF9jb2RlPVRWVSZjb2RlX3R2dV9zdj0yNDM2NiZxaWQ9MjM1NTAmYWx0cF9zbGxfc3Y9MCZ0aG9pX2dpYW5fdHVuZ19jYXU9NjAmdGhvaV9naWFuX2JvX3F1YT0xNQ==", // Added by AnhDT4
	_listPara = $utils.getParameter(uriParam),
	listMocCauhoi = [];
// ---

function Question(q,aList,c,_explC,_explIn,_code,_arr){
	this.question = q;
	this.answerList = aList;
	this.explanationCorrect = _explC;
	this.explanationIncorrect = _explIn;
	this.correct = c;
	this.code = _code;
	this.listAnswerCode = _arr;
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
		if(listMocCauhoi.indexOf(20-i) > -1){
			_item.setAttribute("fill", "#FDEC75");
		} else {
			_item.setAttribute("fill", "#FFFFFF");
		}
		_groupDiem.appendChild(_item);
		
		var _glowItem = _glowClone.cloneNode(true);
		console.log(i== listData.length-1);
		
		_glowItem.setAttribute("transform", "translate(0,"+(i)*_yGlow+")");
		_glowItem.setAttribute("id", "glow"+(listData.length-i));
		_groupGlow.appendChild(_glowItem);
		if(i== listData.length-1){
			_glowItem.removeAttribute("display");
			$("#glow"+(listData.length-i)).show();
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
	console.log(_listPara);
	var self = this,
		timeDefine = parseInt(_listPara["thoi_gian_tra_loi"]), // Edited by AnhDT4: 1000 -> _listPara["thoi_gian_tung_cau"]
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
			var _answerID = getAnswer($("polygon[choose='true']").attr("id"));
			self.answer(_answerID);
		},
		function(){
			playDH();
		});
	
	this.timeCountDown = function(){
		_circleQuestionCount.countDownCircle();
		//_circleQuestionCount.drawCir();
		$(".btHelp").show();
	}
	
	var stopCountDown = function(){
		_circleQuestionCount.stop();
	}
	
	this.choDapAn = function(){
		stopCountDown();
		lockAnswer = true;
		lockChoose = true;
		stopAllTroGiup();
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
			if (index == 0) {
				money = 0;
			} else {
				money = getMoney(index - 1);
			}
		}
		var m = money;
		money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
		updateTest(index, m);
		$("#dungchoi_money").text(money+" LTTNPoint");
	}

	var updateTest = function (questionPassed, money) {
		console.log(_listPara);
		console.log("Index: "+questionPassed);
		uri = '/cap_nhat_lan_choi.php';
		_listPara['passed'] = questionPassed;
		_listPara['money'] = money;
		$utils.post(uri, _listPara, function (res) {
			//console.log(res);
		});
	}
	
	
	var showExplaination = function(_isCorrect){
		
		var _rootEle = _isCorrect ? "traloidung_giaithich" : "traloisai_giaithich";
		if(_isCorrect){
			$id("divtraloi_div").innerHTML = question.explanationCorrect;
		} else {
			$id("divtraloi_div").innerHTML = question.explanationIncorrect;
		}
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
		writer.write(text, 800, 180, writeOptions);
	}
	
	
	this.show = function(){
		$("#SanSang").hide();
		$("#groupAnswer").show();
		$(".mydiv").hide();
		$("#divcauhoi_div").show();
		$(".glow").hide();
		$("#glow"+(index+1)).show();
		$(".buttonAnswer").removeAttr("choose");
		$(".buttonAnswer").hide();
		lock50 = false, 
		lockCall = false, 
		lockLooker= false, 
		lockAnswer = false,
		isUseHelp1 = false,
		isUseHelp2 = false,
		isUseHelp3 = false,
		isUseHelp4 = false,
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
		helpDesk.setAnswersList(Object.keys(question.answerList));
		
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
		if(listMocCauhoi.indexOf(index) > -1){
			$("#chucmung").show();
			$("#chucmung_level").text("BẠN ĐÃ VƯỢT QUA CÂU SỐ "+(index));
			$("#traloidung").hide();
			_countDownCir.stop();
			var money = 0;
			money = getMoney(index-1);
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
		playRandonQuestion();
		if(listMocCauhoi.indexOf(index+1) > -1){
			playMocQuanTrong();
		}
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
	
	function dapAnTuVan(dapan){
		return getCorrect(dapan[0]).toUpperCase()+"        "+getCorrect(dapan[1]).toUpperCase()+"        "+getCorrect(dapan[2]).toUpperCase();
	}
	
	function help1(){
		//tuvantaicho
		if(lockAnswer) return;
		// var jsonString=JSON.stringify(question.listAnswerCode);
		// console.log(jsonString);
		// $.ajax({
			// url: "http://elearning.tvu.topica.vn/api_altp/get_quiz.php?quiz_id="+_listPara["qid"],
			// dataType: 'json',
			// type: "POST",
			// data: {action:actionType,data:data},
			// success: function(data) {
				
				
			// },
			// error: function (xhr, ajaxOptions, thrownError) {
				// alert(xhr.status);
				// alert(thrownError);
			// }
		// });
		
		// Tu van tai cho cho cau hoi hien tai
		helpDesk.use('tu_van_tai_cho', question, function (data) {
			var dapan = new Array();
			for (var i = 0; i < data.length; i++) {
				$("#tuvantaicho_name"+(i+1)).text(data[i].ten_sinh_vien);
				dapan.push(data[i].ma_cau_tra_loi);
			}
			$("#tuvantaicho_dapan").text(dapAnTuVan(dapan));
			$(".help").hide();
			$("#MainHelp").show();
			$("#helpSVG").show();
			$("#tuvantaicho").show();
		});
	}
	function help2(){
		//ykienkhangia
		if(lockAnswer) return;
		
		// Su tro giup tu khan gia cho cau tra loi hien tai
		helpDesk.use('hoi_y_kien_khan_gia', question, function (data) {
			console.log(data);
			var percent = new Array(),
				temp = new Array();
			for (var j = 0; j < data.length; j++) {
				temp.push(parseInt(data[j].cau_tra_loi));
			}

			for (var i = 0; i < 4; i++) {
				var k = parseInt(temp.indexOf(i));
				if (k == -1) {
					percent.push(0.0);
				} else {
					percent.push(data[k].phan_tram_chon / 100);
				}
			}
			$chart.drawChart(percent);
			$(".help").hide();
			$("#MainHelp").show();
			$("#helpSVG").show();
			$("#ykienkhangia").show();
		});
	}
	function help3(){
		// 50/50
		if(lockAnswer) return;

		// Loai 2 cau tra loi sai trong cau hoi hien tai
		helpDesk.use('5050', question, function (data, cquestion, cquestions) {
			for (var i = 0; i < 4; i++) {
				if (data.indexOf(i) != -1) {
					$("#ans"+(i + 1)).show();
				} else {
					$("#ans"+(i + 1)).hide();
				}
			}
			$(".help").hide();
			$("#MainHelp").show();
			$("#helpSVG").show();
			$("#50_50").show();
		});
	}
	function help4(){
		if(lockAnswer) return;

		// Nho nguoi than tro giup tra loi cau hoi hien tai
		helpDesk.use('call', question, function (data) {
			console.log(data);
			$(".help").hide();
			$("#MainHelp").show();
			$("#helpSVG").show();
			for (var i = 0; i < data.length; i++) {
				personal = data[i];
				$("#goidienchonguoithan_chucvu"+(i+1)).text(personal.chuc_vu);
				$("#goidienchonguoithan_ten"+(i+1)).text(personal.nguoi_tro_giup);
				$("#goidienchonguoithan_chon"+(i+1)).text(getCorrect(parseInt(personal.dap_an_chon)));
			};
			$("#goidienchonguoithan").show();
			$("#goidienchonguoithan_1").show();
		});
	}

	this.help4Choose = function(_id){
		// Cai dat su lua chon ma nguoi tro giup da chon
		$("#goidienchonguoithan_2_chucvu").text($("#goidienchonguoithan_chucvu"+_id).text());
		$("#goidienchonguoithan_2_hoten").text($("#goidienchonguoithan_hoten"+_id).text());
		$("#goidienchonguoithan_dapanchon").text($("#goidienchonguoithan_chon"+_id).text());
		
		// Hien thi lua chon cua nguoi tro giup
		$("#goidienchonguoithan_2").show();
		$("#goidienchonguoithan_1").hide();
	}
	
	this.useHelp = function(_id){
		if (lockAnswer) {
			return;
		};
		switch(_id){
			case 1 : 
				if(isUseHelp1) return;
				
				isUseHelp1 = true;
				$("#help1").show();
				help1();
				lockChoose = true;
				$(".btHelp").hide();
				stopCountDown();
				//tuvantaicho
				useTuVanTaiCho();
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
				useGoiNguoiThan();
				break;
			default :
				break;
		}
		
	}
	
	this.useHelpOK = function(){
		lockChoose = false;
		$("#MainHelp").hide();
		$("#helpSVG").hide();
		$(".btHelp").show();
		_circleQuestionCount.countDownCircleContinue();
		stopAllTroGiup();
	}
	
	
	function getCorrect(_answerId){
		correct = _answerId != undefined ? _answerId : question.correct;
		switch(correct){
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
		if (lockChoose || lockAnswer) {
			return;
		};
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
		lockAnswer = true;
		stopCountDown();
		
		if(_yourAnswer == question.correct){
			$("#traloidung").show();
			setCorrect(_yourAnswer,true);
			playTraLoiDung(_yourAnswer);
			$("#traloidung_dapan").text(getCorrect());
			showExplaination(true);
			var money = getMoney(index);
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
			console.log(question);
			$("#traloisai").show();
			setCorrect(_yourAnswer,false);
			showTrue(question.correct);
			showExplaination(false);
			playTraLoiSai(question.correct);
			$("#traloisai_dapan").text(getCorrect(question.correct));
		}
	}
}

var tmpQ = undefined;
var helpDesk = undefined;

var startFunc = function(){
	//http://ailatrieuphu.izee.vn/?iadd_code=TVU&code_tvu_sv=24366&qid=23550&altp_sll_sv=0
	//http://ailatrieuphu.izee.vn/?ma_truong=TVU&ma_sv=24366&qid=23550&so_lan_lam=0
	console.log(_listPara);
	if(_listPara["altp_sll_sv"] < 3 ){
		$("#loading").hide();
		$("#introduction").hide();
		$(".app").hide();
		$(".mydiv").hide();
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
		var uri = '/get_quiz.php?quiz_id='+_listPara["qid"]+'&sv='+_listPara["id_sv"];
		// console.log(_listPara);
		// Changed by AnhDT4
		$utils.get(
		    uri, 
		    'json', 
		    function (data) {
				console.log(data);
				if(data.success == "1"){
					_listPara['answers_code'] = [];
					for(var i = 0 ; i < data.data.length ; i++){
						var _data = data.data[i];
						var _ans = [], _idCorrect = -1,_listAnserCode = [];
						for(var k = 0 ; k < _data.arr_dap_an.length ; k++){
							_ans.push(_data.arr_dap_an[k].ten_cau_tra_loi);
							_listAnserCode.push(_data.arr_dap_an[k].ma_cau_tra_loi);
							// _listAnswersCode.push(_data.arr_dap_an[k].ma_cau_tra_loi);
							_data.arr_dap_an[k].dungsaiyn == "1" && (_idCorrect = k);
							_data.arr_dap_an[k].dungsaiyn == "1" && (console.log(_data.arr_dap_an[k].ten_cau_tra_loi));
						}
						listData.push(new Question(
							_data.ten_cau_hoi,
							_ans,
							_idCorrect,
							_data.correctfeedback,
							_data.incorrectfeedback,
							_data.ma_cau_hoi,
							_listAnserCode
						));
						_listPara['answers_code'].push({'cau_hoi': _data.ma_cau_hoi, 'cau_tra_loi': _listAnserCode[_idCorrect]});
						if(i== data.data.length-1){
							listMocCauhoi.push(_data.moc_1);
							listMocCauhoi.push(_data.moc_2);
							listMocCauhoi.push(_data.moc_3);
						}
					}
					helpDesk = new HelpDesk(listData, data.gd);
					console.log(listData);
					var helpCall = new AdapterCall(helpDesk),
						help5050 = new Adapter5050(helpDesk),
						helpAdvisoryInPlace = new AdapterAdvisoryInPlace(helpDesk),
						helpAskAudience = new AdapterAskAudience(helpDesk);

					helpDesk.setHelper('call', helpCall)
							.setHelper('5050', help5050)
							.setHelper('tu_van_tai_cho', helpAdvisoryInPlace)
							.setHelper('hoi_y_kien_khan_gia', helpAskAudience);
					_listPara['gd'] = data.gd;
					_listPara['ma_de'] = data.ma_de;
					// _listPara['answers_code'] = _listAnswersCode;
					tmpQ = new showQuestion();
					return;
				}
		});
		// $.ajax({
		// 	url: "http://elearning.tvu.topica.vn/api_altp/get_quiz.php?quiz_id="+_listPara["qid"],
		// 	dataType: 'json',
		// 	success: function(data) {
		// 		console.log(data);
		// 		if(data.success == "1"){
		// 			for(var i = 0 ; i < data.data.length ; i++){
		// 				var _data = data.data[i];
		// 				var _ans = [], _idCorrect = -1,_listAnserCode = [];
		// 				for(var k = 0 ; k < _data.arr_dap_an.length ; k++){
		// 					_ans.push(_data.arr_dap_an[k].ten_cau_tra_loi);
		// 					_listAnserCode.push(_data.arr_dap_an[k].ma_cau_tra_loi);
		// 					_data.arr_dap_an[k].dungsaiyn == "1" && (_idCorrect = k);
		// 					_data.arr_dap_an[k].dungsaiyn == "1" && (console.log(_data.arr_dap_an[k].ten_cau_tra_loi));
		// 				}
		// 				listData.push(new Question(
		// 					_data.ten_cau_hoi,
		// 					_ans,
		// 					_idCorrect,
		// 					_data.correctfeedback,
		// 					_data.incorrectfeedback,
		// 					_data.ma_cau_hoi,
		// 					_listAnserCode
		// 				));
		// 				if(i== data.data.length-1){
		// 					listMocCauhoi.push(_data.moc_1);
		// 					listMocCauhoi.push(_data.moc_2);
		// 					listMocCauhoi.push(_data.moc_3);
		// 				}
		// 			}
		// 			tmpQ = new showQuestion();
		// 			return;
		// 		}
		// 	},
		// 	error: function (xhr, ajaxOptions, thrownError) {
		// 		alert(xhr.status);
		// 		alert(thrownError);
		// 	}
		// });
	} else {
		console.log("khong duoc lam");
	}
	
}

var backToIntro = function(){
	
	$("#introduction").show();
	$("#playgame").hide();
	$("#loading").hide();
	$(".mydiv").hide();
	soundIntro();
}

var showBangXepHang = function(){
	$(".app").hide();
	$(".mydiv").hide();
	$("#groupbangxephang").show();
	$("#divbangxephang2_div").show();
	loadBangXepHang2();
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
	// console.log(_listPara);
	$(".mydiv").hide();
	$("#divbangxephang_div").show();
	var maTruong = _listPara["code_lms"];
		uri = "/bang_xep_hang.php?ma_truong="+maTruong.toLowerCase(),
		uriThongTinCaNhan = '/thong_tin_ca_nhan.php?ma_truong='+maTruong.toLowerCase()+'&sv='+_listPara['id_sv']+'&qid='+_listPara['qid'];
	$utils.get(
	    uri,
	    'json',
	    function (data) {
	    	if(data.success == "1"){
				var _tmpData = data.data,
					first = _tmpData[0]; // Edited by AnhDT4
				console.log(_tmpData);
				var _groupEle = $id("groupxephang_all");
				var _hangClone = $id("groupxephang_hang_clone");
				var _nameClone = $id("groupxephang_name_clone");
				var _pointClone = $id("groupxephang_point_clone");
				var _lopClone = $id("groupxephang_lop_clone");
				var _avata = $id("groupxephang_avata_clone");
				var _groupXepHang = $id("divbangxephang_svg");
				var defineHeight = 38,
					_line = [
							{x : 5.4, y : 3.4},
							{x : 62.3, y : 3.4},
							{x : 318, y : 3.4},
							{x : 391.6, y : 3.4},
							{x : 643.9, y : 3.4}
							];
				for(var i = 0 ; i < _tmpData.length; i++){ // Edited by AnhDT4: for(var i = 0 ; i < _tmpData.length + 10; i++){ -> for(var i = 0 ; i < _tmpData.length; i++){
					var _item = _tmpData[i]; // Edited by AnhDT4: _tmpData[i%3] -> _tmpData[i]
					var _tmpLop = _lopClone.cloneNode(true);
					_tmpLop.removeAttribute("display");
					_tmpLop.removeAttribute("id");
					_tmpLop.innerHTML = _item["lop_quan_ly"];
					_tmpLop.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpLop);
					
					var _tmpName = _nameClone.cloneNode(true);
					_tmpName.removeAttribute("display");
					_tmpName.removeAttribute("id");
					_tmpName.innerHTML = _item["ten_sinh_vien"];
					_tmpName.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpName);
					
					var _tmpHang = _hangClone.cloneNode(true);
					_tmpHang.removeAttribute("display");
					_tmpHang.removeAttribute("id");
					_tmpHang.innerHTML = (i+1) < 10 ? "0"+(i+1) : (i+1);
					_tmpHang.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpHang);
					
					var _tmpDiem = _pointClone.cloneNode(true);
					_tmpDiem.removeAttribute("display");
					_tmpDiem.removeAttribute("id");
					_tmpDiem.innerHTML = _item["diem"];
					_tmpDiem.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpDiem);
					
					//groupxephang_avata_clone
					var _tmpAvata = _avata.cloneNode(true);
					_tmpAvata.removeAttribute("display");
					_tmpAvata.removeAttribute("id");
					_tmpAvata.setAttribute("transform", "translate(0,"+(i*defineHeight) + ")");
					_tmpAvata.childNodes[1].setAttribute("xlink:href",_item["link_avatar"]);
					_groupXepHang.appendChild(_tmpAvata);
					
				}
				
				$("#divbangxephang_svg").removeAttr("viewBox");
				$("#divbangxephang_svg").removeAttr("viewbox");
				var _bangxephangBox = $("#divbangxephang_svg")[0].getBBox();
				$id("divbangxephang_svg").setAttribute("viewBox","0 0 "+_bangxephangBox.width + " "+ _bangxephangBox.height);
				for(var i = 1 ; i <= 5 ; i++){
					var _tmpLine = $id("divbangxephang_line"+i).setAttribute("x2",_line[i-1].x);
					var _tmpLine = $id("divbangxephang_line"+i).setAttribute("y2",_line[i-1].y + _bangxephangBox.height);
				}
				divbangxephangRatio = _bangxephangBox.width/ _bangxephangBox.height;
				calDivScroll();

				$utils.get(
				    uriThongTinCaNhan,
				    'json',
				    function (data) {
				    	console.log(data);
				    	console.log(uriThongTinCaNhan);
				    	if (data.success == 0) {
				    		return;
				    	};
				    	var profile = data;
						$("#bangxephang_hovaten").text(profile.name);
						$("#bangxephang_tongdiem").text(profile.diem);
						$("#bangxephang_lop").text(profile.lop_quan_ly);
						$("#bangxephang_xephang").text(profile.xephang);
				    }
				);
				
				
			}
	    }
	);
	// $.ajax({
	// 	url: "http://elearning.tvu.topica.vn/api_altp/bang_xep_hang.php?ma_truong=tvu",
	// 	dataType: 'json',
	// 	success: function(data) {
	// 		if(data.success == "1"){
	// 			var _tmpData = data.data,
	// 				first = _tmpData[0]; // Edited by AnhDT4
	// 			console.log(_tmpData);
	// 			var _groupEle = $id("groupxephang_all");
	// 			var _hangClone = $id("groupxephang_hang_clone");
	// 			var _nameClone = $id("groupxephang_name_clone");
	// 			var _pointClone = $id("groupxephang_point_clone");
	// 			var _lopClone = $id("groupxephang_lop_clone");
	// 			var _avata = $id("groupxephang_avata_clone");
	// 			var _groupXepHang = $id("divbangxephang_svg");
	// 			var defineHeight = 38,
	// 				_line = [
	// 						{x : 5.4, y : 3.4},
	// 						{x : 62.3, y : 3.4},
	// 						{x : 318, y : 3.4},
	// 						{x : 391.6, y : 3.4},
	// 						{x : 643.9, y : 3.4}
	// 						];
	// 			for(var i = 0 ; i < _tmpData.length; i++){ // Edited by AnhDT4: for(var i = 0 ; i < _tmpData.length + 10; i++){ -> for(var i = 0 ; i < _tmpData.length; i++){
	// 				var _item = _tmpData[i]; // Edited by AnhDT4: _tmpData[i%3] -> _tmpData[i]
	// 				var _tmpLop = _lopClone.cloneNode(true);
	// 				_tmpLop.removeAttribute("display");
	// 				_tmpLop.removeAttribute("id");
	// 				_tmpLop.innerHTML = _item["lop_quan_ly"];
	// 				_tmpLop.setAttribute("y", (i*defineHeight));
	// 				_groupEle.appendChild(_tmpLop);
					
	// 				var _tmpName = _nameClone.cloneNode(true);
	// 				_tmpName.removeAttribute("display");
	// 				_tmpName.removeAttribute("id");
	// 				_tmpName.innerHTML = _item["ten_sinh_vien"];
	// 				_tmpName.setAttribute("y", (i*defineHeight));
	// 				_groupEle.appendChild(_tmpName);
					
	// 				var _tmpHang = _hangClone.cloneNode(true);
	// 				_tmpHang.removeAttribute("display");
	// 				_tmpHang.removeAttribute("id");
	// 				_tmpHang.innerHTML = (i+1) < 10 ? "0"+(i+1) : (i+1);
	// 				_tmpHang.setAttribute("y", (i*defineHeight));
	// 				_groupEle.appendChild(_tmpHang);
					
	// 				var _tmpDiem = _pointClone.cloneNode(true);
	// 				_tmpDiem.removeAttribute("display");
	// 				_tmpDiem.removeAttribute("id");
	// 				_tmpDiem.innerHTML = _item["diem"];
	// 				_tmpDiem.setAttribute("y", (i*defineHeight));
	// 				_groupEle.appendChild(_tmpDiem);
					
	// 				//groupxephang_avata_clone
	// 				var _tmpAvata = _avata.cloneNode(true);
	// 				_tmpAvata.removeAttribute("display");
	// 				_tmpAvata.removeAttribute("id");
	// 				_tmpAvata.setAttribute("transform", "translate(0,"+(i*defineHeight) + ")");
	// 				_tmpAvata.childNodes[1].setAttribute("xlink:href",_item["link_avatar"]);
	// 				_groupXepHang.appendChild(_tmpAvata);
					
	// 			}
				
	// 			$("#divbangxephang_svg").removeAttr("viewBox");
	// 			$("#divbangxephang_svg").removeAttr("viewbox");
	// 			var _bangxephangBox = $("#divbangxephang_svg")[0].getBBox();
	// 			$id("divbangxephang_svg").setAttribute("viewBox","0 0 "+_bangxephangBox.width + " "+ _bangxephangBox.height);
	// 			for(var i = 1 ; i <= 5 ; i++){
	// 				var _tmpLine = $id("divbangxephang_line"+i).setAttribute("x2",_line[i-1].x);
	// 				var _tmpLine = $id("divbangxephang_line"+i).setAttribute("y2",_line[i-1].y + _bangxephangBox.height);
	// 			}
	// 			divbangxephangRatio = _bangxephangBox.width/ _bangxephangBox.height;
	// 			calDivScroll();
				
	// 			$("#bangxephang_hovaten").text(first.ten_sinh_vien); // Edited by AnhDT4
				
	// 		}
	// 	}
	// });
}

var loadBangXepHang2 = function(){
	//http://elearning.tvu.topica.vn/api_altp/bang_xep_hang.php?ma_truong=tvu
	//$(".mydiv").hide();
	//$("#divbangxephang_div").show();
	var maTruong = _listPara["code_lms"];
		uri = "/bang_xep_hang.php?ma_truong="+maTruong.toLowerCase();
	$utils.get(
		uri,
		'json',
		function(data) {
			if(data.success == "1"){
				var _tmpData = data.data,
					first = _tmpData[0]; // Edited by AnhDT4
				// console.log(_tmpData);
				var _groupEle = $id("groupxephang2_all");
				var _hangClone = $id("groupxephang2_hang_clone");
				var _nameClone = $id("groupxephang2_name_clone");
				var _pointClone = $id("groupxephang2_point_clone");
				var _lopClone = $id("groupxephang2_lop_clone");
				var _avata = $id("groupxephang2_avata_clone");
				var _groupXepHang = $id("divbangxephang2_svg");
				var defineHeight = 45,
					_line = [
							{x : 72, y : 2.5},
							{x : 379.5, y : 2.5},
							{x : 468, y : 2.5},
							{x : 771.5, y : 2.5},
							{x : 2, y : 2.5}
							]
					;
				for(var i = 0 ; i < _tmpData.length; i++){ // Edited by AnhDT4: for(var i = 0 ; i < _tmpData.length + 10; i++){ -> for(var i = 0 ; i < _tmpData.length; i++){
					var _item = _tmpData[i]; // Edited by AnhDT4: _tmpData[i%3] -> _tmpData[i]
					var _tmpLop = _lopClone.cloneNode(true);
					_tmpLop.removeAttribute("display");
					_tmpLop.removeAttribute("id");
					_tmpLop.innerHTML = _item["lop_quan_ly"];
					_tmpLop.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpLop);
					
					var _tmpName = _nameClone.cloneNode(true);
					_tmpName.removeAttribute("display");
					_tmpName.removeAttribute("id");
					_tmpName.innerHTML = _item["ten_sinh_vien"];
					_tmpName.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpName);
					
					var _tmpHang = _hangClone.cloneNode(true);
					_tmpHang.removeAttribute("display");
					_tmpHang.removeAttribute("id");
					_tmpHang.innerHTML = (i+1) < 10 ? "0"+(i+1) : (i+1);
					_tmpHang.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpHang);
					
					var _tmpDiem = _pointClone.cloneNode(true);
					_tmpDiem.removeAttribute("display");
					_tmpDiem.removeAttribute("id");
					_tmpDiem.innerHTML = _item["diem"];
					_tmpDiem.setAttribute("y", (i*defineHeight));
					_groupEle.appendChild(_tmpDiem);
					
					//groupxephang_avata_clone
					var _tmpAvata = _avata.cloneNode(true);
					_tmpAvata.removeAttribute("display");
					_tmpAvata.removeAttribute("id");
					_tmpAvata.setAttribute("transform", "translate(0,"+(i*defineHeight) + ")");
					_tmpAvata.childNodes[1].setAttribute("xlink:href",_item["link_avatar"]);
					_groupXepHang.appendChild(_tmpAvata);
					
				}
				$("#divbangxephang2_svg").removeAttr("viewBox");
				$("#divbangxephang2_svg").removeAttr("viewbox");
				var _bangxephangBox = $("#divbangxephang2_svg")[0].getBBox();
				$id("divbangxephang2_svg").setAttribute("viewBox","0 0 "+_bangxephangBox.width + " "+ _bangxephangBox.height);
				for(var i = 1 ; i <= 5 ; i++){
					var _tmpLine = $id("divbangxephang2_line"+i).setAttribute("x2",_line[i-1].x);
					var _tmpLine = $id("divbangxephang2_line"+i).setAttribute("y2",_line[i-1].y + _bangxephangBox.height);
				}
				divbangxephang2Ratio = _bangxephangBox.width/ _bangxephangBox.height;
				calDivScroll();
				$("#groupbangxephang_hovaten").text(first.ten_sinh_vien); // Edited by AnhDT4
			}
		}
	);
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
		volumeMute(true);
	} else {
		$("#mute").hide();
		volumeMute(false);
	}
}

new Slider("slidersound_event","slidersound",47,{x:0,y:0},47, volumeChange);

//loadBangXepHang();