var audioPath = "sounds/",
	introPath = "01_Intro/",
	batdauPath = "02_Bat dau/",
	cauhoiPath = "03_NhacCauhoi/",
	trogiupPath = "04_cactrogiup/",
	messagePath = "05_CacMessege/";

var sounds_resouce = [
        {id:"intro_huongdan_xephang", src:audioPath + introPath + "Intro-huongdan-xephang.mp3"},
        {id:"Start_button", src:audioPath + introPath + "Start_button.mp3"},
        {id:"khi_chua_sansang", src:audioPath + batdauPath + "khi_chua_sansang.mp3"},
        {id:"Sansang_button", src:audioPath + batdauPath + "Sansang_button.mp3"},
        {id:"MocQuanTrong", src:audioPath + cauhoiPath + "MocQuanTrong.mp3"},
        {id:"nhac_nen_cau_hoi_Question", src:audioPath + cauhoiPath + "nhac_nen_cau_hoi_Question.mp3"},
        {id:"nhac_nen_cau_hoi_Question_dang1", src:audioPath + cauhoiPath + "nhac_nen_cau_hoi_Question_dang1.mp3"},
        {id:"nhac_nen_cau_hoi_Question_dang2", src:audioPath + cauhoiPath + "nhac_nen_cau_hoi_Question_dang2.mp3"},
        {id:"nhac_nen_cau_hoi_Question_dang3", src:audioPath + cauhoiPath + "nhac_nen_cau_hoi_Question_dang3.mp3"},
        {id:"50_50", src:audioPath + trogiupPath + "50-50.mp3"},
        {id:"Khangia", src:audioPath + trogiupPath + "Khangia.mp3"},
        {id:"Nguoithan", src:audioPath + trogiupPath + "Nguoithan.mp3"},
        {id:"TuVan", src:audioPath + trogiupPath + "TuVan.mp3"},
        {id:"01_cho_dap_an", src:audioPath + messagePath + "01_cho_dap_an.mp3"},
        {id:"02_cho_dap_an2", src:audioPath + messagePath + "02_cho_dap_an2.mp3"},
        {id:"03_dung_xin_chuc_mung", src:audioPath + messagePath + "03_dung_xin_chuc_mung.mp3"},
        {id:"A_xin_chuc_mung", src:audioPath + messagePath + "A_xin_chuc_mung.mp3"},
        {id:"B_xin_chuc_mung", src:audioPath + messagePath + "B_xin_chuc_mung.mp3"},
        {id:"C_xin_chuc_mung", src:audioPath + messagePath + "C_xin_chuc_mung.mp3"},
        {id:"D_xin_chuc_mung", src:audioPath + messagePath + "D_xin_chuc_mung.mp3"},
        {id:"DungChoi", src:audioPath + messagePath + "DungChoi.mp3"},
        {id:"Phan_hoi_sai_A", src:audioPath + messagePath + "Phan_hoi_sai_A.mp3"},
        {id:"Phan_hoi_sai_B", src:audioPath + messagePath + "Phan_hoi_sai_B.mp3"},
        {id:"Phan_hoi_sai_C", src:audioPath + messagePath + "Phan_hoi_sai_C.mp3"},
        {id:"Phan_hoi_sai_D", src:audioPath + messagePath + "Phan_hoi_sai_D.mp3"},
        {id:"Tiep_tuc_Button", src:audioPath + messagePath + "Tiep_tuc_Button-sb.mp3"},
        {id:"Tra_loi_button_dung", src:audioPath + messagePath + "Tra_loi_button_dung.mp3"},
        {id:"VuotMocQuanTrong", src:audioPath + messagePath + "VuotMocQuanTrong.mp3"}
];

var sound_intro_huongdan_xephang,
	sound_Start_button,
	sound_khi_chua_sansang,
	sound_Sansang_button,
	sound_MocQuanTrong,
	sound_nhac_nen_cau_hoi_Question,
	sound_nhac_nen_cau_hoi_Question_dang1,
	sound_nhac_nen_cau_hoi_Question_dang2,
	sound_nhac_nen_cau_hoi_Question_dang3,
	sound_help50_50,
	sound_Khangia,
	sound_Nguoithan,
	sound_TuVan,
	sound_01_cho_dap_an,
	sound_02_cho_dap_an2,
	sound_03_dung_xin_chuc_mung,
	sound_A_xin_chuc_mung,
	sound_B_xin_chuc_mung,
	sound_C_xin_chuc_mung,
	sound_D_xin_chuc_mung,
	sound_DungChoi,
	sound_Phan_hoi_sai_A,
	sound_Phan_hoi_sai_B,
	sound_Phan_hoi_sai_C,
	sound_Phan_hoi_sai_D,
	sound_Tiep_tuc_Button,
	sound_Tra_loi_button_dung,
	sound_VuotMocQuanTrong;

var _listAllAudio ;

$(document).ready(function() {
	var params = {};
	var pieces = window.location.search.slice(1).split("&");
	for (var i = 0, l = pieces.length; i < l; i++) {
		var parts = pieces[i].split("=");
		params[parts[0]] = parts[1];
	}
	if (params.type == "flash") {
		createjs.Sound.registerPlugins([createjs.FlashAudioPlugin]);
	} else if (params.type == "html5") {
		createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);
	} else {
		createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
	}
	queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3"];

	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete", loadComplete);
	queue.addEventListener("fileload", fileComplete);
	queue.loadManifest(sounds_resouce);
});


function loadComplete(evt) {
	sound_intro_huongdan_xephang = createjs.Sound.createInstance("intro_huongdan_xephang");
	sound_intro_huongdan_xephang.addEventListener("complete",function(){
		sound_intro_huongdan_xephang.play();
	});
	sound_Start_button = createjs.Sound.createInstance("Start_button");
	sound_Start_button.addEventListener("complete",function(){
		sound_khi_chua_sansang.play();
	});
	sound_khi_chua_sansang = createjs.Sound.createInstance("khi_chua_sansang");
	sound_khi_chua_sansang.addEventListener("complete",function(){
		sound_khi_chua_sansang.play();
	});
	sound_Sansang_button = createjs.Sound.createInstance("Sansang_button");
	sound_Sansang_button.addEventListener("complete",playRandonQuestion);
	
	sound_MocQuanTrong = createjs.Sound.createInstance("MocQuanTrong");
	sound_nhac_nen_cau_hoi_Question = createjs.Sound.createInstance("nhac_nen_cau_hoi_Question");
	sound_nhac_nen_cau_hoi_Question_dang1 = createjs.Sound.createInstance("nhac_nen_cau_hoi_Question_dang1");
	sound_nhac_nen_cau_hoi_Question_dang2 = createjs.Sound.createInstance("nhac_nen_cau_hoi_Question_dang2");
	sound_nhac_nen_cau_hoi_Question_dang3 = createjs.Sound.createInstance("nhac_nen_cau_hoi_Question_dang3");
	sound_nhac_nen_cau_hoi_Question.addEventListener("complete",function(){
		sound_nhac_nen_cau_hoi_Question.play();
	});
	sound_nhac_nen_cau_hoi_Question_dang1.addEventListener("complete",function(){
		sound_nhac_nen_cau_hoi_Question_dang1.play();
	});
	sound_nhac_nen_cau_hoi_Question_dang2.addEventListener("complete",function(){
		sound_nhac_nen_cau_hoi_Question_dang2.play();
	});
	sound_nhac_nen_cau_hoi_Question_dang3.addEventListener("complete",function(){
		sound_nhac_nen_cau_hoi_Question_dang3.play();
	});
	sound_help50_50 = createjs.Sound.createInstance("50_50"); 
	sound_Khangia= createjs.Sound.createInstance("Khangia");
	sound_Nguoithan= createjs.Sound.createInstance("Nguoithan");
	sound_TuVan= createjs.Sound.createInstance("TuVan");
	sound_01_cho_dap_an= createjs.Sound.createInstance("01_cho_dap_an");
	sound_01_cho_dap_an.addEventListener("complete",function(){
		var _answerID = getAnswer($("polygon[choose='true']").attr("id"));
		tmpQ.answer(_answerID);
	});
	sound_02_cho_dap_an2= createjs.Sound.createInstance("02_cho_dap_an2");
	sound_02_cho_dap_an2.addEventListener("complete",function(){
		var _answerID = getAnswer($("polygon[choose='true']").attr("id"));
		tmpQ.answer(_answerID);
	});
	sound_03_dung_xin_chuc_mung= createjs.Sound.createInstance("03_dung_xin_chuc_mung");
	sound_A_xin_chuc_mung= createjs.Sound.createInstance("A_xin_chuc_mung");
	sound_B_xin_chuc_mung= createjs.Sound.createInstance("B_xin_chuc_mung");
	sound_C_xin_chuc_mung= createjs.Sound.createInstance("C_xin_chuc_mung");
	sound_D_xin_chuc_mung= createjs.Sound.createInstance("D_xin_chuc_mung");
	sound_DungChoi= createjs.Sound.createInstance("DungChoi");
	sound_Phan_hoi_sai_A= createjs.Sound.createInstance("Phan_hoi_sai_A");
	sound_Phan_hoi_sai_B= createjs.Sound.createInstance("Phan_hoi_sai_B");
	sound_Phan_hoi_sai_C= createjs.Sound.createInstance("Phan_hoi_sai_C");
	sound_Phan_hoi_sai_D= createjs.Sound.createInstance("Phan_hoi_sai_D");
	sound_Tiep_tuc_Button= createjs.Sound.createInstance("Tiep_tuc_Button");
	sound_Tiep_tuc_Button.addEventListener("complete",function(){
		tmpQ.next();
	});
	sound_Tra_loi_button_dung= createjs.Sound.createInstance("Tra_loi_button_dung");
	sound_VuotMocQuanTrong= createjs.Sound.createInstance("VuotMocQuanTrong");
	
	sound_intro_huongdan_xephang.play();
	$loading.stopTimer();
	console.log("load Audio Complete");
	_listAllAudio = [
	sound_intro_huongdan_xephang,
	sound_Start_button,
	sound_khi_chua_sansang,
	sound_Sansang_button,
	sound_MocQuanTrong,
	sound_nhac_nen_cau_hoi_Question,
	sound_nhac_nen_cau_hoi_Question_dang1,
	sound_nhac_nen_cau_hoi_Question_dang2,
	sound_nhac_nen_cau_hoi_Question_dang3,
	sound_help50_50,
	sound_Khangia,
	sound_Nguoithan,
	sound_TuVan,
	sound_01_cho_dap_an,
	sound_02_cho_dap_an2,
	sound_03_dung_xin_chuc_mung,
	sound_A_xin_chuc_mung,
	sound_B_xin_chuc_mung,
	sound_C_xin_chuc_mung,
	sound_D_xin_chuc_mung,
	sound_DungChoi,
	sound_Phan_hoi_sai_A,
	sound_Phan_hoi_sai_B,
	sound_Phan_hoi_sai_C,
	sound_Phan_hoi_sai_D,
	sound_Tiep_tuc_Button,
	sound_Tra_loi_button_dung,
	sound_VuotMocQuanTrong];
}

function fileComplete(evt) {

}

function playTraLoiDung(_dapan){
	stopAllAudio();
	var ran = Math.floor((Math.random() * 100));
	if(ran %3 == 1){
		sound_03_dung_xin_chuc_mung.play()
	} else if(ran % 3 == 2){
		sound_Tra_loi_button_dung.play()
	} else {
		switch(_dapan){
			case 0 : 
				sound_A_xin_chuc_mung.play();
				break;
			case 1 :
				sound_B_xin_chuc_mung.play();
				break;
			case 2 :
				sound_C_xin_chuc_mung.play();
				break;
			case 3:
				sound_D_xin_chuc_mung.play();
				break;
		}
	}
}



function playTiepTuc(){
	stopAllAudio();
	sound_Tiep_tuc_Button.play();
}

function playTraLoiSai(_dapan){
	stopAllAudio();
	switch(_dapan){
		case 0 : 
			sound_Phan_hoi_sai_A.play();
			break;
		case 1 :
			sound_Phan_hoi_sai_B.play();
			break;
		case 2 :
			sound_Phan_hoi_sai_C.play();
			break;
		case 3:
			sound_Phan_hoi_sai_D.play();
			break;
	}
	
}

function playChoDapAn(){
	tmpQ.choDapAn();
	stopAllAudio();
	var ran = Math.floor((Math.random() * 100));
	if(ran %2 == 0){
		sound_01_cho_dap_an.play();
	} else {
		sound_02_cho_dap_an2.play();
	}
}

function playRandonQuestion(){
	stopAllAudio();
	var ran = Math.floor((Math.random() * 4));
	ran = (ran < 4) ? ran : 3;
	if(ran == 0){
		sound_nhac_nen_cau_hoi_Question.play();
	} else if(ran == 1){
		sound_nhac_nen_cau_hoi_Question_dang1.play();
	} else if(ran == 2){
		sound_nhac_nen_cau_hoi_Question_dang2.play();
	} else if(ran == 3){
		sound_nhac_nen_cau_hoi_Question_dang3.play();
	}
}

function volumeChange(_volume){
	for(var i = 0 ; i < _listAllAudio.length ; i++){
		_listAllAudio[i].volume = _volume;
	}
}

function playMocQuanTrong(){
	sound_MocQuanTrong.play();
}


function volumeMute(isMute){
	for(var i = 0 ; i < _listAllAudio.length ; i++){
		isMute ? _listAllAudio[i].muted = true : _listAllAudio[i].muted = false;
	}
}

function stopAllAudio(){
	for(var i = 0 ; i < _listAllAudio.length ; i++)
		_listAllAudio[i].stop();
}

function soundIntro(){
	sound_intro_huongdan_xephang.play();
}

function soundBatDauLamBai(){
	sound_intro_huongdan_xephang.stop();
	sound_Start_button.play();
}

function soundSansang(){
	sound_Start_button.stop();
	sound_khi_chua_sansang.stop();
	sound_Sansang_button.play();
}

function use50_50(){
	if(sound_Sansang_button.playState != "playFinished"){
		playRandonQuestion();
	}
	sound_help50_50.play();
}

function useHoiYKienKhanGia(){
	if(sound_Sansang_button.playState != "playFinished"){
		playRandonQuestion();
	}
	sound_Khangia.play();
}

function useGoiNguoiThan(){
	if(sound_Sansang_button.playState != "playFinished"){
		playRandonQuestion();
	}
	sound_Nguoithan.play();
}

function useTuVanTaiCho(){
	if(sound_Sansang_button.playState != "playFinished"){
		playRandonQuestion();
	}
	sound_TuVan.play();
}

function stopAllTroGiup(){
	sound_Nguoithan.stop();
	sound_Khangia.stop();
	sound_help50_50.stop();
	sound_TuVan.stop();
}
