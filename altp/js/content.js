// Khoi tao tham so can thiet cho game
var listData = [],
	step = 0,
	uriParam = location.search != '' ? location.search : "?aWFkZF9jb2RlPVRWVSZjb2RlX3R2dV9zdj0yNDM2NiZxaWQ9MjM1NTAmYWx0cF9zbGxfc3Y9MCZ0aG9pX2dpYW5fdHVuZ19jYXU9NjAmdGhvaV9naWFuX2JvX3F1YT0xNQ==", // Added by AnhDT4
	_listPara = $utils.getParameter(uriParam),
	listMocCauhoi = [];

// Dinh nghia Question model
function Question(q,aList,c,_explC,_explIn,_code,_arr){
	this.question = q;
	this.answerList = aList;
	this.explanationCorrect = _explC;
	this.explanationIncorrect = _explIn;
	this.correct = c;
	this.code = _code;
	this.listAnswerCode = _arr;
}

// Dinh nghia method tron cau tra loi
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

// Doi tuong chinh quan ly viec xu lys cau hoi, tra loi, su tro giup...
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
		}),
		pass = 0;
	
	this.timeCountDown = function(){
		_circleQuestionCount.countDownCircle();
		//_circleQuestionCount.drawCir();
		$(".btHelp").show();
	}
	
	var stopCountDown = function(){
		_circleQuestionCount.stop();
	}
	
	// Cho chuong trinh dua ra dap an sau khi nguoi dung tra loi
	this.choDapAn = function(){
		// Dung dem nguoc
		stopCountDown();

		// Khong cho phep chon cau tra loi khac hay su tro giup nao
		lockAnswer = true;
		lockChoose = true;
		stopAllTroGiup();
	}
	
	// Cac muc LTTNCoint tuong ung voi tong so cau hoi trong de
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
	
	// Dung choi
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
		$("#dungchoi_money").text(money+" LTTNCoint");
	}
	
	// Show ket qua sau khi nguoi dung tra loi
	var showExplaination = function(_isCorrect){
		
		var _rootEle = _isCorrect ? "traloidung_giaithich" : "traloisai_giaithich";
		if(_isCorrect){
			$id("divtraloi_div").innerHTML = question.explanationCorrect;
		} else {
			$id("divtraloi_div").innerHTML = question.explanationIncorrect;
		}
	}
	
	// Tuy chon font-size cho cau tra loi
	function scaleAnswer(_id){
		var currentWidth = $(_id)[0].getBBox().width;
		var _font = parseFloat($(_id).attr("font-size"));
		while(currentWidth/widthQDefine > 1) {
			_font--;
			$(_id).attr("font-size",_font);
			currentWidth = $(_id)[0].getBBox().width;
		}
	}
	
	// Chuyen Coint sang dang tien te voi dau phay dong
	function add0ToMoney(money){
		money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
		return money;
	}
	
	// In ra cau hoi
	function writeQuestion(_ele,text){
		$(_ele).empty();
		var _svg = d3.select(_ele);
		var measurer = new SVGTypewriter.Measurers.Measurer(_svg);
		var wrapper = new SVGTypewriter.Wrappers.Wrapper();
		wrapper.allowBreakingWords(false);
		var writer = new SVGTypewriter.Writers.Writer(measurer, wrapper);
		var writeOptions = {
		  selection: _svg,
		  xAlign: "left",
		  yAlign: "top",
		  textRotation: 0
		};
		writer.write(text, 800, 180, writeOptions);
	}
	
	// Hien thi ra cau hoi
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

		// Kiem tra xem trong cau tra loi co image hay khong
		var isImageAnswer = function (ans) {
				var regexp = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;

				var result = ans.match(regexp);

				if (result == null) 
					return false;
				else if (typeof(result) == "object" && result.length > 0) 
					return true;
				else 
					return false;
			},
			_rootEle = "#tbQuestion";

		//writeQuestion(_rootEle,question.question);
		var questString = question.question;
		questString += '<div style="text-align: left;">';
		// $id("divcauhoi_div").innerHTML = question.question;

		// Cai dat list cau tra loi cho helpDesk
		helpDesk.setAnswersList(Object.keys(question.answerList));
		
		for(var i = 0 ; i < 4 ; i++){
			$("#tbAnswer"+(i+1)).attr("font-size",20);
			if (isImageAnswer(question.answerList[i])) {
				questString += '<br />' + getAnswerName(i) + ': ' + question.answerList[i];
				$("#tbAnswer"+(i+1)).text('<Hình ảnh> Vui lòng xem ở nội dung câu hỏi');
			} else {
				$("#tbAnswer"+(i+1)).text(question.answerList[i]);
			}
			scaleAnswer("#tbAnswer"+(i+1));
		}
		questString += '</div>';
		$id("divcauhoi_div").innerHTML = questString;

		// Bat dau dem nguoc cho cau hoi
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
	
	// Chuyen cau tiep
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
			$("#chucmung_money").text(money+" LTTNCoint");
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

	// Cap nhat lan choi vao db
	function updateTest(questionPassed, money) {
		uri = '/cap_nhat_lan_choi.php';
		_listPara['passed'] = questionPassed;
		_listPara['money'] = money;
		$utils.post(uri, _listPara, function (res) {
			//console.log(res);
		});
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
	
	// Ham chuc nang cho su tro giup tu van tai cho
	function dapAnTuVan(dapan){
		return getCorrect(dapan[0]).toUpperCase()+"        "+getCorrect(dapan[1]).toUpperCase()+"        "+getCorrect(dapan[2]).toUpperCase();
	}
	
	function help1(){
		//tuvantaicho
		if(lockAnswer) return;
		
		// Tu van tai cho cho cau hoi hien tai
		helpDesk.use('tu_van_tai_cho', question, function (data) {
			var dapan = new Array();
			for (var i = 0; i < data.length; i++) {
				var name = data[i].chuc_vu + ': ' + data[i].ten_sinh_vien;
				$("#tuvantaicho_name"+(i+1)).text(data[i].ten_sinh_vien);
				$("#tuvantaicho_avata"+(i+1)).attr('xlink:href', data[i].avatar);
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
			var percent = new Array(),
				temp = new Array();
			for (var j = 0; j < data.length; j++) {
				temp.push(parseInt(data[j].cau_tra_loi));
			}

			// Lap qua 4 cau tra loi de tao bieu do
			for (var i = 0; i < 4; i++) {
				var k = parseInt(temp.indexOf(i));
				// Tao bieu do, gia tri phai la so thap phan
				if (k == -1) {
					// Neu cau tra loi da bi loai boi tro giup 50/50
					// thi cho hien thi 0%
					percent.push(0.0);
				} else {
					// Neu co cau tra loi thi /100 de lay gia tri la so thap phan
					var v = data[k].phan_tram_chon / 100;
					percent.push(v);
				}
			}
			// Tao bieu do
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
			$(".help").hide();
			$("#MainHelp").show();
			$("#helpSVG").show();
			for (var i = 0; i < data.length; i++) {
				personal = data[i];
				var name = personal.chuc_vu + ': ' + personal.nguoi_tro_giup;
				// $("#goidienchonguoithan_chucvu"+(i+1)).text(personal.chuc_vu);
				$("#goidienchonguoithan_ten"+(i+1)).text(name);
				$("#goidienchonguoithan_chon"+(i+1)).text(getCorrect(parseInt(personal.dap_an_chon)));
				$("#goidienchonguoithan_avata"+(i+1)).attr('xlink:href', personal.avatar);
			};
			$("#goidienchonguoithan").show();
			$("#goidienchonguoithan_1").show();
		});
	}

	// Ham chuc nang cho su tro giup goi dien thoai cho nguoi than
	// Duoc kich hoat khi nguoi dung chon 1 nguoi than trong danh sach 6 nguoi
	this.help4Choose = function(_id){
		// Cai dat su lua chon ma nguoi tro giup da chon
		$("#goidienchonguoithan_2_hoten").text($("#goidienchonguoithan_ten"+_id).text());
		$("#goidienchonguoithan_dapanchon").text($("#goidienchonguoithan_chon"+_id).text());
		$("#goidienchonguoithan_avatar").attr('xlink:href', $("#goidienchonguoithan_avata"+_id).attr('xlink:href'));
		
		// Hien thi lua chon cua nguoi tro giup
		$("#goidienchonguoithan_2").show();
		$("#goidienchonguoithan_1").hide();
	}
	
	// Ham chuc nang de su dung su tro giup bat ky tu 1-4
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
	
	// In ra ten cua cau tra loi dung
	function getCorrect(_answerId){
		correct = _answerId != undefined ? _answerId : question.correct;
		return getAnswerName(correct);
	}

	// In ra ten cua cau tra loi bat ky
	function getAnswerName(code) {
		switch (code) {
			case 0: return "A";
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
	
	// Nguoi dung tra loi 1 cau hoi
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

			index++;

			// Da het cau hoi, dung choi, cap nhat diem, quay lai man hinh cho
			if(index == listData.length){
				self.stop();
				return;
			}
		} else {
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

// Start game, goi khi nguoi dung click vao button 'Bat dau lam bai'
var startFunc = function(){
	if(_listPara["altp_sll_sv"] < 3 ){
		$("#loading").hide();
		$("#introduction").hide();
		$(".app").hide();
		$(".mydiv").hide();
		$("#playgame").show();
		$("#groupAnswer").show();
		var uri = '/get_quiz.php?quiz_id='+_listPara["qid"]+'&sv='+_listPara["id_sv"];

		// Lay thong tin quiz
		$utils.get(
		    uri, 
		    'json', 
		    function (data) {
				if(data.success == "1"){
					$("#SanSang").show();
					
					$("#dongho").removeAttr("transform");
					soundBatDauLamBai();
					$("#currentPoint").text("0");
					
					listData = [];
					//$("#tbQuestion").text("");
					for(var i = 1 ; i <= 4 ; i++){
						$("#tbAnswer"+i).text("");
						$("#help"+i).hide();
						$("#answer"+i+"_event").hide();
						$("#answer"+i+"_hover").hide();
						//$("#answer"+i+"_hover").attr("fill","#000000");
					}
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

					// Cai dat tro giup
					helpDesk = new HelpDesk(listData, data.gd);
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
				} else {
					//
					openPopup(data.message);
				}
		});
	} else {
		openPopup("khong duoc lam");
	}
	
}

// Ham chuc nang giup quay lai man hinh cho
var backToIntro = function(){
	$("#introduction").show();
	$("#playgame").hide();
	$("#loading").hide();
	$(".mydiv").hide();
	soundIntro();
}

// Ham chuc nang de mo 1 popup voi noi dung bat ky
var openPopup = function (message) {
	$("#popup_text").text(message);
	$("#popup").show();
}

var showBangXepHang = function(){
	$(".app").hide();
	$(".mydiv").hide();
	$("#groupbangxephang").show();
	$("#divbangxephang2_div").show();
	loadBangXepHang2();
}

var loadBangXepHang = function(){
	$(".mydiv").hide();
	$("#divbangxephang_div").show();
	var maTruong = _listPara["code_lms"];
		uri = "/bang_xep_hang.php?ma_truong="+maTruong.toLowerCase()+'&qid='+_listPara['qid'],
		uriThongTinCaNhan = '/thong_tin_ca_nhan.php?ma_truong='+maTruong.toLowerCase()+'&sv='+_listPara['id_sv']+'&qid='+_listPara['qid'];
	$utils.get(
	    uri,
	    'json',
	    function (data) {
	    	if(data.success == "1"){
				var _tmpData = data.data;
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

				_groupEle.innerHTML = "";
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
					// _tmpDiem.innerHTML = _item["diem"];
					var money = _item["diem"];
					money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
					$("#bangxephang_tongdiem").text(money);

					_tmpDiem.innerHTML = money;
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

			}
	    }
	);
	$utils.get(
	    uriThongTinCaNhan,
	    'json',
	    function (data) {
	    	if (data.success == 0) {
	    		return;
	    	};
	    	var profile = data;
			$("#bangxephang_hovaten").text(profile.name);
			var money = profile.tong_diem || 0;
			money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
			$("#bangxephang_tongdiem").text(money);
			$("#bangxephang_lop").text(profile.lop_quan_ly);
			$("#bangxephang_xephang").text(profile.xephang);
	    }
	);
}

var loadBangXepHang2 = function(){
	var maTruong = _listPara["code_lms"];
		uri = "/bang_xep_hang.php?ma_truong="+maTruong.toLowerCase()+'&qid='+_listPara['qid'],
		uriThongTinCaNhan = '/thong_tin_ca_nhan.php?ma_truong='+maTruong.toLowerCase()+'&sv='+_listPara['id_sv']+'&qid='+_listPara['qid'];

	// Load bang xep hang
	$utils.get(
		uri,
		'json',
		function(data) {
			if(data.success == "1"){
				var _tmpData = data.data;
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

				_groupEle.innerHTML = "";
				for (var i = 0 ; i < _tmpData.length; i++) {
					var _item = _tmpData[i];
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

					var money = _item["diem"];
					money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
					$("#bangxephang_tongdiem").text("");
					$("#bangxephang_tongdiem").text(money);
					_tmpDiem.innerHTML = money;
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
				
			}
		}
	);
	
	// Lay thong tin xep hang cua nguoi dang choi
	$utils.get(
	    uriThongTinCaNhan,
	    'json',
	    function (data) {
	    	if (data.success == 0) {
	    		return;
	    	};
	    	var profile = data;
	    	$("#bangxephang_hovaten").text("");
			$("#bangxephang_hovaten").text(profile.name);
			var money = profile.tong_diem || 0;
			money = (money < 1000) ? money + ".000" : (money/1000).toFixed(1) + "00.000";
			$("#bangxephang_tongdiem").text("");
			$("#bangxephang_tongdiem").text(money);
			$("#bangxephang_lop").text("");
			$("#bangxephang_lop").text(profile.lop_quan_ly);
			$("#bangxephang_xephang").text("");
			$("#bangxephang_xephang").text(profile.xephang);
	    }
	);
}

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