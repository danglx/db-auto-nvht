// File nay dinh nghia cac su kien cho phep trong game, chu yeu la cac event listener de xu ly
// su kien nguoi dung click vao 1 button nao do

//answer1,answer2,answer3,answer4,btTraloi,btDungLai,btSanSang,btTiepTuc,btHenGapLai,btNhanSao,btHelp1,btHelp2,btHelp3,btHelp4,btTroGiupOK,btTiepTucChucMung,btIntroHuongDanLamBai,btBatDauLamBai,btBangXepHang,btThoat,btIntroQuayLai,btIntroBatDau,btThoatBangXepHang,sound,goidien1,goidien2,goidien3,goidien4,goidien5,goidien6
var lockHover = false;
var tmpTarget ;
var _tmpTargetResetTab="";
var tabTarget= undefined;
var lockChoose = false;
$(document).ready(function() {
    $("#bodyID").mouseup(function(event) {
		if(lockChoose) return;
		if(lockHover && detectmob() != 1 && detectmob() != 3){
			setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
			lockHover = false;
		}
		if (event.which == 3 || event.which == 2) {
            return;
        }
		
		if(tabTarget != undefined){
			if(!$(tabTarget).is("input")){
				$(tabTarget).hide();
				$("#"+tabTarget[0].id.replace("tab","hover")).hide();
			}
			tabTarget = undefined;
		}
		
    });
	
    $("#bodyID").mousedown(function(event) {
		if (event.which == 3 || event.which == 2 || lockChoose) return;
		lockHover = true;
    });
	
	/* 
		uncomment if use interact
	*/
	// if(isIE11){
		// document.addEventListener("MSPointerUp",function(){
			// interact.stop();
		// });
	// }
});

var getIdButton= function(_id){
	if(_id==undefined) return "";
	return _id.replace("_event","");
}

var setHoverButton = function(_hover, _bool){
	if($(_hover).attr("choose") == "true") return;
	if(_bool){
		$("#bodyID").css("cursor","pointer");
		$(_hover).show();
	} else {
		$("#bodyID").css("cursor","default");
		$(_hover).hide();
	}
}



function chooseAnswer(_id){
	if(lockChoose) return;
	$(".buttonAnswer").attr("choose","false");
	$(".buttonAnswer").hide();
	$("#"+_id).attr("choose","true");
	$("#"+_id).show();
}

function getAnswer(_id){
	switch(_id){
		case "answer1_hover" : return 0;
		case "answer2_hover" : return 1;
		case "answer3_hover" : return 2;
		case "answer4_hover" : return 3;
		default : return "E";
	}
}


//=======================================================
var answer1Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	chooseAnswer("answer1_hover");
}

var answer1MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("answer1_event").addEventListener("click", answer1Click);
    document.getElementById("answer1_event").addEventListener("mouseup", answer1MouseUp);
}

var answer1MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#answer1_hover",true);
	lockHover = false;
}

var answer1MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#answer1_hover",true);
	}
	document.getElementById("answer1_event").addEventListener("mouseout", answer1MouseOut);
	document.getElementById("answer1_event").addEventListener("mousedown", answer1MouseDown);
}

var answer1MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeAnswer1Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#answer1_hover",false);
	}
}

var addAnswer1Event = function() {
    document.getElementById("answer1_event").addEventListener("mouseover", answer1MouseOver);
	document.getElementById("answer1_event").addEventListener("mousedown", answer1MouseDown);
	document.getElementById("answer1_event").addEventListener("mouseup", answer1MouseUp);
}

var removeAnswer1Event = function() {
    document.getElementById("answer1_event").removeEventListener("click", answer1Click);
    document.getElementById("answer1_event").removeEventListener("mouseout", answer1MouseOut);
}

addAnswer1Event();
//=======================================================
var answer2Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	chooseAnswer("answer2_hover");
}

var answer2MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("answer2_event").addEventListener("click", answer2Click);
    document.getElementById("answer2_event").addEventListener("mouseup", answer2MouseUp);
}

var answer2MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#answer2_hover",true);
	lockHover = false;
}

var answer2MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#answer2_hover",true);
	}
	document.getElementById("answer2_event").addEventListener("mouseout", answer2MouseOut);
	document.getElementById("answer2_event").addEventListener("mousedown", answer2MouseDown);
}

var answer2MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeAnswer2Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#answer2_hover",false);
	}
}

var addAnswer2Event = function() {
    document.getElementById("answer2_event").addEventListener("mouseover", answer2MouseOver);
	document.getElementById("answer2_event").addEventListener("mousedown", answer2MouseDown);
	document.getElementById("answer2_event").addEventListener("mouseup", answer2MouseUp);
}

var removeAnswer2Event = function() {
    document.getElementById("answer2_event").removeEventListener("click", answer2Click);
    document.getElementById("answer2_event").removeEventListener("mouseout", answer2MouseOut);
}

addAnswer2Event();
//=======================================================
var answer3Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	chooseAnswer("answer3_hover");
}

var answer3MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("answer3_event").addEventListener("click", answer3Click);
    document.getElementById("answer3_event").addEventListener("mouseup", answer3MouseUp);
}

var answer3MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#answer3_hover",true);
	lockHover = false;
}

var answer3MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#answer3_hover",true);
	}
	document.getElementById("answer3_event").addEventListener("mouseout", answer3MouseOut);
	document.getElementById("answer3_event").addEventListener("mousedown", answer3MouseDown);
}

var answer3MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeAnswer3Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#answer3_hover",false);
	}
}

var addAnswer3Event = function() {
    document.getElementById("answer3_event").addEventListener("mouseover", answer3MouseOver);
	document.getElementById("answer3_event").addEventListener("mousedown", answer3MouseDown);
	document.getElementById("answer3_event").addEventListener("mouseup", answer3MouseUp);
}

var removeAnswer3Event = function() {
    document.getElementById("answer3_event").removeEventListener("click", answer3Click);
    document.getElementById("answer3_event").removeEventListener("mouseout", answer3MouseOut);
}

addAnswer3Event();
//=======================================================
var answer4Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	chooseAnswer("answer4_hover");
}

var answer4MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("answer4_event").addEventListener("click", answer4Click);
    document.getElementById("answer4_event").addEventListener("mouseup", answer4MouseUp);
}

var answer4MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#answer4_hover",true);
	lockHover = false;
}

var answer4MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#answer4_hover",true);
	}
	document.getElementById("answer4_event").addEventListener("mouseout", answer4MouseOut);
	document.getElementById("answer4_event").addEventListener("mousedown", answer4MouseDown);
}

var answer4MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeAnswer4Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#answer4_hover",false);
	}
}

var addAnswer4Event = function() {
    document.getElementById("answer4_event").addEventListener("mouseover", answer4MouseOver);
	document.getElementById("answer4_event").addEventListener("mousedown", answer4MouseDown);
	document.getElementById("answer4_event").addEventListener("mouseup", answer4MouseUp);
}

var removeAnswer4Event = function() {
    document.getElementById("answer4_event").removeEventListener("click", answer4Click);
    document.getElementById("answer4_event").removeEventListener("mouseout", answer4MouseOut);
}

addAnswer4Event();

//=======================================================
var btTraloiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
    if (!lockChoose) {
	    playChoDapAn();
    }
}

var btTraloiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btTraloi_event").addEventListener("click", btTraloiClick);
    document.getElementById("btTraloi_event").addEventListener("mouseup", btTraloiMouseUp);
}

var btTraloiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btTraloi_hover",true);
	lockHover = false;
}

var btTraloiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btTraloi_hover",true);
	}
	document.getElementById("btTraloi_event").addEventListener("mouseout", btTraloiMouseOut);
	document.getElementById("btTraloi_event").addEventListener("mousedown", btTraloiMouseDown);
}

var btTraloiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtTraloiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btTraloi_hover",false);
	}
}

var addBtTraloiEvent = function() {
    document.getElementById("btTraloi_event").addEventListener("mouseover", btTraloiMouseOver);
	document.getElementById("btTraloi_event").addEventListener("mousedown", btTraloiMouseDown);
	document.getElementById("btTraloi_event").addEventListener("mouseup", btTraloiMouseUp);
}

var removeBtTraloiEvent = function() {
    document.getElementById("btTraloi_event").removeEventListener("click", btTraloiClick);
    document.getElementById("btTraloi_event").removeEventListener("mouseout", btTraloiMouseOut);
}

addBtTraloiEvent();
//=======================================================
var btDungLaiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	
	tmpQ.stop();
}

var btDungLaiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btDungLai_event").addEventListener("click", btDungLaiClick);
    document.getElementById("btDungLai_event").addEventListener("mouseup", btDungLaiMouseUp);
}

var btDungLaiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btDungLai_hover",true);
	lockHover = false;
}

var btDungLaiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btDungLai_hover",true);
	}
	document.getElementById("btDungLai_event").addEventListener("mouseout", btDungLaiMouseOut);
	document.getElementById("btDungLai_event").addEventListener("mousedown", btDungLaiMouseDown);
}

var btDungLaiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtDungLaiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btDungLai_hover",false);
	}
}

var addBtDungLaiEvent = function() {
    document.getElementById("btDungLai_event").addEventListener("mouseover", btDungLaiMouseOver);
	document.getElementById("btDungLai_event").addEventListener("mousedown", btDungLaiMouseDown);
	document.getElementById("btDungLai_event").addEventListener("mouseup", btDungLaiMouseUp);
}

var removeBtDungLaiEvent = function() {
    document.getElementById("btDungLai_event").removeEventListener("click", btDungLaiClick);
    document.getElementById("btDungLai_event").removeEventListener("mouseout", btDungLaiMouseOut);
}

addBtDungLaiEvent();

//=======================================================
var btSanSangClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.show();
}

var btSanSangMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btSanSang_event").addEventListener("click", btSanSangClick);
    document.getElementById("btSanSang_event").addEventListener("mouseup", btSanSangMouseUp);
}

var btSanSangMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btSanSang_hover",true);
	lockHover = false;
}

var btSanSangMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btSanSang_hover",true);
	}
	document.getElementById("btSanSang_event").addEventListener("mouseout", btSanSangMouseOut);
	document.getElementById("btSanSang_event").addEventListener("mousedown", btSanSangMouseDown);
}

var btSanSangMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtSanSangEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btSanSang_hover",false);
	}
}

var addBtSanSangEvent = function() {
    document.getElementById("btSanSang_event").addEventListener("mouseover", btSanSangMouseOver);
	document.getElementById("btSanSang_event").addEventListener("mousedown", btSanSangMouseDown);
	document.getElementById("btSanSang_event").addEventListener("mouseup", btSanSangMouseUp);
}

var removeBtSanSangEvent = function() {
    document.getElementById("btSanSang_event").removeEventListener("click", btSanSangClick);
    document.getElementById("btSanSang_event").removeEventListener("mouseout", btSanSangMouseOut);
}

addBtSanSangEvent();

var btTiepTucClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	playTiepTuc();
    tmpQ.next();
}

var btTiepTucMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btTiepTuc_event").addEventListener("click", btTiepTucClick);
    document.getElementById("btTiepTuc_event").addEventListener("mouseup", btTiepTucMouseUp);
}

var btTiepTucMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btTiepTuc_hover",true);
	lockHover = false;
}

var btTiepTucMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btTiepTuc_hover",true);
	}
	document.getElementById("btTiepTuc_event").addEventListener("mouseout", btTiepTucMouseOut);
	document.getElementById("btTiepTuc_event").addEventListener("mousedown", btTiepTucMouseDown);
}

var btTiepTucMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtTiepTucEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btTiepTuc_hover",false);
	}
}

var addBtTiepTucEvent = function() {
    document.getElementById("btTiepTuc_event").addEventListener("mouseover", btTiepTucMouseOver);
	document.getElementById("btTiepTuc_event").addEventListener("mousedown", btTiepTucMouseDown);
	document.getElementById("btTiepTuc_event").addEventListener("mouseup", btTiepTucMouseUp);
}

var removeBtTiepTucEvent = function() {
    document.getElementById("btTiepTuc_event").removeEventListener("click", btTiepTucClick);
    document.getElementById("btTiepTuc_event").removeEventListener("mouseout", btTiepTucMouseOut);
}

addBtTiepTucEvent();
//=======================================================
var btHenGapLaiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.stop("auto");
}

var btHenGapLaiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btHenGapLai_event").addEventListener("click", btHenGapLaiClick);
    document.getElementById("btHenGapLai_event").addEventListener("mouseup", btHenGapLaiMouseUp);
}

var btHenGapLaiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btHenGapLai_hover",true);
	lockHover = false;
}

var btHenGapLaiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btHenGapLai_hover",true);
	}
	document.getElementById("btHenGapLai_event").addEventListener("mouseout", btHenGapLaiMouseOut);
	document.getElementById("btHenGapLai_event").addEventListener("mousedown", btHenGapLaiMouseDown);
}

var btHenGapLaiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtHenGapLaiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btHenGapLai_hover",false);
	}
}

var addBtHenGapLaiEvent = function() {
    document.getElementById("btHenGapLai_event").addEventListener("mouseover", btHenGapLaiMouseOver);
	document.getElementById("btHenGapLai_event").addEventListener("mousedown", btHenGapLaiMouseDown);
	document.getElementById("btHenGapLai_event").addEventListener("mouseup", btHenGapLaiMouseUp);
}

var removeBtHenGapLaiEvent = function() {
    document.getElementById("btHenGapLai_event").removeEventListener("click", btHenGapLaiClick);
    document.getElementById("btHenGapLai_event").removeEventListener("mouseout", btHenGapLaiMouseOut);
}

addBtHenGapLaiEvent();
//=======================================================
var btNhanSaoClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	backToIntro();
}

var btNhanSaoMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btNhanSao_event").addEventListener("click", btNhanSaoClick);
    document.getElementById("btNhanSao_event").addEventListener("mouseup", btNhanSaoMouseUp);
}

var btNhanSaoMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btNhanSao_hover",true);
	lockHover = false;
}

var btNhanSaoMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btNhanSao_hover",true);
	}
	document.getElementById("btNhanSao_event").addEventListener("mouseout", btNhanSaoMouseOut);
	document.getElementById("btNhanSao_event").addEventListener("mousedown", btNhanSaoMouseDown);
}

var btNhanSaoMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtNhanSaoEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btNhanSao_hover",false);
	}
}

var addBtNhanSaoEvent = function() {
    document.getElementById("btNhanSao_event").addEventListener("mouseover", btNhanSaoMouseOver);
	document.getElementById("btNhanSao_event").addEventListener("mousedown", btNhanSaoMouseDown);
	document.getElementById("btNhanSao_event").addEventListener("mouseup", btNhanSaoMouseUp);
}

var removeBtNhanSaoEvent = function() {
    document.getElementById("btNhanSao_event").removeEventListener("click", btNhanSaoClick);
    document.getElementById("btNhanSao_event").removeEventListener("mouseout", btNhanSaoMouseOut);
}

addBtNhanSaoEvent();
//=======================================================
var btHelp1Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.useHelp(1);
}

var btHelp1MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btHelp1_event").addEventListener("click", btHelp1Click);
    document.getElementById("btHelp1_event").addEventListener("mouseup", btHelp1MouseUp);
}

var btHelp1MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btHelp1_hover",true);
	lockHover = false;
}

var btHelp1MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btHelp1_hover",true);
	}
	document.getElementById("btHelp1_event").addEventListener("mouseout", btHelp1MouseOut);
	document.getElementById("btHelp1_event").addEventListener("mousedown", btHelp1MouseDown);
}

var btHelp1MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtHelp1Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btHelp1_hover",false);
	}
}

var addBtHelp1Event = function() {
    document.getElementById("btHelp1_event").addEventListener("mouseover", btHelp1MouseOver);
	document.getElementById("btHelp1_event").addEventListener("mousedown", btHelp1MouseDown);
	document.getElementById("btHelp1_event").addEventListener("mouseup", btHelp1MouseUp);
}

var removeBtHelp1Event = function() {
    document.getElementById("btHelp1_event").removeEventListener("click", btHelp1Click);
    document.getElementById("btHelp1_event").removeEventListener("mouseout", btHelp1MouseOut);
}

addBtHelp1Event();
//=======================================================
var btHelp2Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.useHelp(2);
}

var btHelp2MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btHelp2_event").addEventListener("click", btHelp2Click);
    document.getElementById("btHelp2_event").addEventListener("mouseup", btHelp2MouseUp);
}

var btHelp2MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btHelp2_hover",true);
	lockHover = false;
}

var btHelp2MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btHelp2_hover",true);
	}
	document.getElementById("btHelp2_event").addEventListener("mouseout", btHelp2MouseOut);
	document.getElementById("btHelp2_event").addEventListener("mousedown", btHelp2MouseDown);
}

var btHelp2MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtHelp2Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btHelp2_hover",false);
	}
}

var addBtHelp2Event = function() {
    document.getElementById("btHelp2_event").addEventListener("mouseover", btHelp2MouseOver);
	document.getElementById("btHelp2_event").addEventListener("mousedown", btHelp2MouseDown);
	document.getElementById("btHelp2_event").addEventListener("mouseup", btHelp2MouseUp);
}

var removeBtHelp2Event = function() {
    document.getElementById("btHelp2_event").removeEventListener("click", btHelp2Click);
    document.getElementById("btHelp2_event").removeEventListener("mouseout", btHelp2MouseOut);
}

addBtHelp2Event();
//=======================================================
var btHelp3Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.useHelp(3);
}

var btHelp3MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btHelp3_event").addEventListener("click", btHelp3Click);
    document.getElementById("btHelp3_event").addEventListener("mouseup", btHelp3MouseUp);
}

var btHelp3MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btHelp3_hover",true);
	lockHover = false;
}

var btHelp3MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btHelp3_hover",true);
	}
	document.getElementById("btHelp3_event").addEventListener("mouseout", btHelp3MouseOut);
	document.getElementById("btHelp3_event").addEventListener("mousedown", btHelp3MouseDown);
}

var btHelp3MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtHelp3Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btHelp3_hover",false);
	}
}

var addBtHelp3Event = function() {
    document.getElementById("btHelp3_event").addEventListener("mouseover", btHelp3MouseOver);
	document.getElementById("btHelp3_event").addEventListener("mousedown", btHelp3MouseDown);
	document.getElementById("btHelp3_event").addEventListener("mouseup", btHelp3MouseUp);
}

var removeBtHelp3Event = function() {
    document.getElementById("btHelp3_event").removeEventListener("click", btHelp3Click);
    document.getElementById("btHelp3_event").removeEventListener("mouseout", btHelp3MouseOut);
}

addBtHelp3Event();
//=======================================================
var btHelp4Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.useHelp(4);
}

var btHelp4MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btHelp4_event").addEventListener("click", btHelp4Click);
    document.getElementById("btHelp4_event").addEventListener("mouseup", btHelp4MouseUp);
}

var btHelp4MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btHelp4_hover",true);
	lockHover = false;
}

var btHelp4MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btHelp4_hover",true);
	}
	document.getElementById("btHelp4_event").addEventListener("mouseout", btHelp4MouseOut);
	document.getElementById("btHelp4_event").addEventListener("mousedown", btHelp4MouseDown);
}

var btHelp4MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtHelp4Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btHelp4_hover",false);
	}
}

var addBtHelp4Event = function() {
    document.getElementById("btHelp4_event").addEventListener("mouseover", btHelp4MouseOver);
	document.getElementById("btHelp4_event").addEventListener("mousedown", btHelp4MouseDown);
	document.getElementById("btHelp4_event").addEventListener("mouseup", btHelp4MouseUp);
}

var removeBtHelp4Event = function() {
    document.getElementById("btHelp4_event").removeEventListener("click", btHelp4Click);
    document.getElementById("btHelp4_event").removeEventListener("mouseout", btHelp4MouseOut);
}

addBtHelp4Event();
//=======================================================
var btTroGiupOKClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.useHelpOK();
}

var btTroGiupOKMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btTroGiupOK_event").addEventListener("click", btTroGiupOKClick);
    document.getElementById("btTroGiupOK_event").addEventListener("mouseup", btTroGiupOKMouseUp);
}

var btTroGiupOKMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btTroGiupOK_hover",true);
	lockHover = false;
}

var btTroGiupOKMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btTroGiupOK_hover",true);
	}
	document.getElementById("btTroGiupOK_event").addEventListener("mouseout", btTroGiupOKMouseOut);
	document.getElementById("btTroGiupOK_event").addEventListener("mousedown", btTroGiupOKMouseDown);
}

var btTroGiupOKMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtTroGiupOKEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btTroGiupOK_hover",false);
	}
}

var addBtTroGiupOKEvent = function() {
    document.getElementById("btTroGiupOK_event").addEventListener("mouseover", btTroGiupOKMouseOver);
	document.getElementById("btTroGiupOK_event").addEventListener("mousedown", btTroGiupOKMouseDown);
	document.getElementById("btTroGiupOK_event").addEventListener("mouseup", btTroGiupOKMouseUp);
}

var removeBtTroGiupOKEvent = function() {
    document.getElementById("btTroGiupOK_event").removeEventListener("click", btTroGiupOKClick);
    document.getElementById("btTroGiupOK_event").removeEventListener("mouseout", btTroGiupOKMouseOut);
}

addBtTroGiupOKEvent();

//=======================================================
var btTiepTucChucMungClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.nextWithNoShowStar();
}

var btTiepTucChucMungMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btTiepTucChucMung_event").addEventListener("click", btTiepTucChucMungClick);
    document.getElementById("btTiepTucChucMung_event").addEventListener("mouseup", btTiepTucChucMungMouseUp);
}

var btTiepTucChucMungMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btTiepTucChucMung_hover",true);
	lockHover = false;
}

var btTiepTucChucMungMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btTiepTucChucMung_hover",true);
	}
	document.getElementById("btTiepTucChucMung_event").addEventListener("mouseout", btTiepTucChucMungMouseOut);
	document.getElementById("btTiepTucChucMung_event").addEventListener("mousedown", btTiepTucChucMungMouseDown);
}

var btTiepTucChucMungMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtTiepTucChucMungEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btTiepTucChucMung_hover",false);
	}
}

var addBtTiepTucChucMungEvent = function() {
    document.getElementById("btTiepTucChucMung_event").addEventListener("mouseover", btTiepTucChucMungMouseOver);
	document.getElementById("btTiepTucChucMung_event").addEventListener("mousedown", btTiepTucChucMungMouseDown);
	document.getElementById("btTiepTucChucMung_event").addEventListener("mouseup", btTiepTucChucMungMouseUp);
}

var removeBtTiepTucChucMungEvent = function() {
    document.getElementById("btTiepTucChucMung_event").removeEventListener("click", btTiepTucChucMungClick);
    document.getElementById("btTiepTucChucMung_event").removeEventListener("mouseout", btTiepTucChucMungMouseOut);
}

addBtTiepTucChucMungEvent();
//=======================================================
var btIntroHuongDanLamBaiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	$("#intro1").hide();
	$("#bangxephang").show();
	$("#huongdanlambai").show();
	$(".mydiv").hide();
	$("#divtrogiup_div").show();
	//$("#bangxephang").show();
	$("#groupxephang").hide();
	
}

var btIntroHuongDanLamBaiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btIntroHuongDanLamBai_event").addEventListener("click", btIntroHuongDanLamBaiClick);
    document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mouseup", btIntroHuongDanLamBaiMouseUp);
}

var btIntroHuongDanLamBaiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btIntroHuongDanLamBai_hover",true);
	lockHover = false;
}

var btIntroHuongDanLamBaiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btIntroHuongDanLamBai_hover",true);
	}
	document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mouseout", btIntroHuongDanLamBaiMouseOut);
	document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mousedown", btIntroHuongDanLamBaiMouseDown);
}

var btIntroHuongDanLamBaiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtIntroHuongDanLamBaiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btIntroHuongDanLamBai_hover",false);
	}
}

var addBtIntroHuongDanLamBaiEvent = function() {
    document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mouseover", btIntroHuongDanLamBaiMouseOver);
	document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mousedown", btIntroHuongDanLamBaiMouseDown);
	document.getElementById("btIntroHuongDanLamBai_event").addEventListener("mouseup", btIntroHuongDanLamBaiMouseUp);
}

var removeBtIntroHuongDanLamBaiEvent = function() {
    document.getElementById("btIntroHuongDanLamBai_event").removeEventListener("click", btIntroHuongDanLamBaiClick);
    document.getElementById("btIntroHuongDanLamBai_event").removeEventListener("mouseout", btIntroHuongDanLamBaiMouseOut);
}

addBtIntroHuongDanLamBaiEvent();
//=======================================================
var btBatDauLamBaiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
    startFunc();
}

var btBatDauLamBaiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btBatDauLamBai_event").addEventListener("click", btBatDauLamBaiClick);
    document.getElementById("btBatDauLamBai_event").addEventListener("mouseup", btBatDauLamBaiMouseUp);
}

var btBatDauLamBaiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btBatDauLamBai_hover",true);
	lockHover = false;
}

var btBatDauLamBaiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btBatDauLamBai_hover",true);
	}
	document.getElementById("btBatDauLamBai_event").addEventListener("mouseout", btBatDauLamBaiMouseOut);
	document.getElementById("btBatDauLamBai_event").addEventListener("mousedown", btBatDauLamBaiMouseDown);
}

var btBatDauLamBaiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtBatDauLamBaiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btBatDauLamBai_hover",false);
	}
}

var addBtBatDauLamBaiEvent = function() {
    document.getElementById("btBatDauLamBai_event").addEventListener("mouseover", btBatDauLamBaiMouseOver);
	document.getElementById("btBatDauLamBai_event").addEventListener("mousedown", btBatDauLamBaiMouseDown);
	document.getElementById("btBatDauLamBai_event").addEventListener("mouseup", btBatDauLamBaiMouseUp);
}

var removeBtBatDauLamBaiEvent = function() {
    document.getElementById("btBatDauLamBai_event").removeEventListener("click", btBatDauLamBaiClick);
    document.getElementById("btBatDauLamBai_event").removeEventListener("mouseout", btBatDauLamBaiMouseOut);
}

addBtBatDauLamBaiEvent();
//=======================================================
var btBangXepHangClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	$("#intro1").hide();
	$("#bangxephang").show();
	$("#huongdanlambai").hide();
	$("#groupxephang").show();
	loadBangXepHang();
}

var btBangXepHangMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btBangXepHang_event").addEventListener("click", btBangXepHangClick);
    document.getElementById("btBangXepHang_event").addEventListener("mouseup", btBangXepHangMouseUp);
}

var btBangXepHangMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btBangXepHang_hover",true);
	lockHover = false;
}

var btBangXepHangMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btBangXepHang_hover",true);
	}
	document.getElementById("btBangXepHang_event").addEventListener("mouseout", btBangXepHangMouseOut);
	document.getElementById("btBangXepHang_event").addEventListener("mousedown", btBangXepHangMouseDown);
}

var btBangXepHangMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtBangXepHangEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btBangXepHang_hover",false);
	}
}

var addBtBangXepHangEvent = function() {
    document.getElementById("btBangXepHang_event").addEventListener("mouseover", btBangXepHangMouseOver);
	document.getElementById("btBangXepHang_event").addEventListener("mousedown", btBangXepHangMouseDown);
	document.getElementById("btBangXepHang_event").addEventListener("mouseup", btBangXepHangMouseUp);
}

var removeBtBangXepHangEvent = function() {
    document.getElementById("btBangXepHang_event").removeEventListener("click", btBangXepHangClick);
    document.getElementById("btBangXepHang_event").removeEventListener("mouseout", btBangXepHangMouseOut);
}

addBtBangXepHangEvent();
//=======================================================
var btThoatClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
    window.location = $utils.getRedirectUri();
}

var btThoatMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btThoat_event").addEventListener("click", btThoatClick);
    document.getElementById("btThoat_event").addEventListener("mouseup", btThoatMouseUp);
}

var btThoatMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btThoat_hover",true);
	lockHover = false;
}

var btThoatMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btThoat_hover",true);
	}
	document.getElementById("btThoat_event").addEventListener("mouseout", btThoatMouseOut);
	document.getElementById("btThoat_event").addEventListener("mousedown", btThoatMouseDown);
}

var btThoatMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtThoatEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btThoat_hover",false);
	}
}

var addBtThoatEvent = function() {
    document.getElementById("btThoat_event").addEventListener("mouseover", btThoatMouseOver);
	document.getElementById("btThoat_event").addEventListener("mousedown", btThoatMouseDown);
	document.getElementById("btThoat_event").addEventListener("mouseup", btThoatMouseUp);
}

var removeBtThoatEvent = function() {
    document.getElementById("btThoat_event").removeEventListener("click", btThoatClick);
    document.getElementById("btThoat_event").removeEventListener("mouseout", btThoatMouseOut);
}

addBtThoatEvent();

//=======================================================
var btIntroQuayLaiClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	$("#intro1").show();
	$("#bangxephang").hide();
	$(".mydiv").hide();
}

var btIntroQuayLaiMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btIntroQuayLai_event").addEventListener("click", btIntroQuayLaiClick);
    document.getElementById("btIntroQuayLai_event").addEventListener("mouseup", btIntroQuayLaiMouseUp);
}

var btIntroQuayLaiMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btIntroQuayLai_hover",true);
	lockHover = false;
}

var btIntroQuayLaiMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btIntroQuayLai_hover",true);
	}
	document.getElementById("btIntroQuayLai_event").addEventListener("mouseout", btIntroQuayLaiMouseOut);
	document.getElementById("btIntroQuayLai_event").addEventListener("mousedown", btIntroQuayLaiMouseDown);
}

var btIntroQuayLaiMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtIntroQuayLaiEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btIntroQuayLai_hover",false);
	}
}

var addBtIntroQuayLaiEvent = function() {
    document.getElementById("btIntroQuayLai_event").addEventListener("mouseover", btIntroQuayLaiMouseOver);
	document.getElementById("btIntroQuayLai_event").addEventListener("mousedown", btIntroQuayLaiMouseDown);
	document.getElementById("btIntroQuayLai_event").addEventListener("mouseup", btIntroQuayLaiMouseUp);
}

var removeBtIntroQuayLaiEvent = function() {
    document.getElementById("btIntroQuayLai_event").removeEventListener("click", btIntroQuayLaiClick);
    document.getElementById("btIntroQuayLai_event").removeEventListener("mouseout", btIntroQuayLaiMouseOut);
}

addBtIntroQuayLaiEvent();
//=======================================================
var btIntroBatDauClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
    $("#intro1").show();
    $("#bangxephang").hide();
    $(".mydiv").hide();
	startFunc();
}

var btIntroBatDauMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btIntroBatDau_event").addEventListener("click", btIntroBatDauClick);
    document.getElementById("btIntroBatDau_event").addEventListener("mouseup", btIntroBatDauMouseUp);
}

var btIntroBatDauMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btIntroBatDau_hover",true);
	lockHover = false;
}

var btIntroBatDauMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btIntroBatDau_hover",true);
	}
	document.getElementById("btIntroBatDau_event").addEventListener("mouseout", btIntroBatDauMouseOut);
	document.getElementById("btIntroBatDau_event").addEventListener("mousedown", btIntroBatDauMouseDown);
}

var btIntroBatDauMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtIntroBatDauEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btIntroBatDau_hover",false);
	}
}

var addBtIntroBatDauEvent = function() {
    document.getElementById("btIntroBatDau_event").addEventListener("mouseover", btIntroBatDauMouseOver);
	document.getElementById("btIntroBatDau_event").addEventListener("mousedown", btIntroBatDauMouseDown);
	document.getElementById("btIntroBatDau_event").addEventListener("mouseup", btIntroBatDauMouseUp);
}

var removeBtIntroBatDauEvent = function() {
    document.getElementById("btIntroBatDau_event").removeEventListener("click", btIntroBatDauClick);
    document.getElementById("btIntroBatDau_event").removeEventListener("mouseout", btIntroBatDauMouseOut);
}

// addBtIntroBatDauEvent();
//=======================================================
var btThoatBangXepHangClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	backToIntro();
}

var btThoatBangXepHangMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("btThoatBangXepHang_event").addEventListener("click", btThoatBangXepHangClick);
    document.getElementById("btThoatBangXepHang_event").addEventListener("mouseup", btThoatBangXepHangMouseUp);
}

var btThoatBangXepHangMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#btThoatBangXepHang_hover",true);
	lockHover = false;
}

var btThoatBangXepHangMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#btThoatBangXepHang_hover",true);
	}
	document.getElementById("btThoatBangXepHang_event").addEventListener("mouseout", btThoatBangXepHangMouseOut);
	document.getElementById("btThoatBangXepHang_event").addEventListener("mousedown", btThoatBangXepHangMouseDown);
}

var btThoatBangXepHangMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeBtThoatBangXepHangEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#btThoatBangXepHang_hover",false);
	}
}

var addBtThoatBangXepHangEvent = function() {
    document.getElementById("btThoatBangXepHang_event").addEventListener("mouseover", btThoatBangXepHangMouseOver);
	document.getElementById("btThoatBangXepHang_event").addEventListener("mousedown", btThoatBangXepHangMouseDown);
	document.getElementById("btThoatBangXepHang_event").addEventListener("mouseup", btThoatBangXepHangMouseUp);
}

var removeBtThoatBangXepHangEvent = function() {
    document.getElementById("btThoatBangXepHang_event").removeEventListener("click", btThoatBangXepHangClick);
    document.getElementById("btThoatBangXepHang_event").removeEventListener("mouseout", btThoatBangXepHangMouseOut);
}

addBtThoatBangXepHangEvent();
//=======================================================
var btOKClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    if(event != undefined)
        setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
    // write code below here
    backToIntro();
}

var btOKMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    tmpTarget = event.target.id;
    lockHover = true;
    document.getElementById("btOK_event").addEventListener("click", btOKClick);
    document.getElementById("btOK_event").addEventListener("mouseup", btOKMouseUp);
}

var btOKMouseUp = function(event){
    setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
    setHoverButton("#btOK_hover",true);
    lockHover = false;
}

var btOKMouseOver = function(event) {
    if(!lockHover){
        tmpTarget = event.target.id;
        _tmpTargetResetTab = event.target.id;
        setHoverButton("#btOK_hover",true);
    }
    document.getElementById("btOK_event").addEventListener("mouseout", btOKMouseOut);
    document.getElementById("btOK_event").addEventListener("mousedown", btOKMouseDown);
}

var btOKMouseOut = function(event) {
    _tmpTargetResetTab = "";
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    removeBtOKEvent();
    if(!lockHover){
        var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
        _tabId=_tabId.replace("_tab","_event");
        if(_tabId == event.target.id) {
            $("#svg").css("cursor","");
            return;
        }
        setHoverButton("#btOK_hover",false);
    }
}

var addBtOKEvent = function() {
    document.getElementById("btOK_event").addEventListener("mouseover", btOKMouseOver);
    document.getElementById("btOK_event").addEventListener("mousedown", btOKMouseDown);
    document.getElementById("btOK_event").addEventListener("mouseup", btOKMouseUp);
}

var removeBtOKEvent = function() {
    document.getElementById("btOK_event").removeEventListener("click", btOKClick);
    document.getElementById("btOK_event").removeEventListener("mouseout", btOKMouseOut);
}

addBtOKEvent();
//=======================================================
var soundClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	muteSound();
}

var soundMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("sound_event").addEventListener("click", soundClick);
    document.getElementById("sound_event").addEventListener("mouseup", soundMouseUp);
}

var soundMouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#sound_hover",true);
	lockHover = false;
}

var soundMouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#sound_hover",true);
	}
	document.getElementById("sound_event").addEventListener("mouseout", soundMouseOut);
	document.getElementById("sound_event").addEventListener("mousedown", soundMouseDown);
}

var soundMouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeSoundEvent();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#sound_hover",false);
	}
}

var addSoundEvent = function() {
    document.getElementById("sound_event").addEventListener("mouseover", soundMouseOver);
	document.getElementById("sound_event").addEventListener("mousedown", soundMouseDown);
	document.getElementById("sound_event").addEventListener("mouseup", soundMouseUp);
}

var removeSoundEvent = function() {
    document.getElementById("sound_event").removeEventListener("click", soundClick);
    document.getElementById("sound_event").removeEventListener("mouseout", soundMouseOut);
}

addSoundEvent();

//=======================================================
var goidien1Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(1);
}

var goidien1MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien1_event").addEventListener("click", goidien1Click);
    document.getElementById("goidien1_event").addEventListener("mouseup", goidien1MouseUp);
}

var goidien1MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien1_hover",true);
	lockHover = false;
}

var goidien1MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien1_hover",true);
	}
	document.getElementById("goidien1_event").addEventListener("mouseout", goidien1MouseOut);
	document.getElementById("goidien1_event").addEventListener("mousedown", goidien1MouseDown);
}

var goidien1MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien1Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien1_hover",false);
	}
}

var addGoidien1Event = function() {
    document.getElementById("goidien1_event").addEventListener("mouseover", goidien1MouseOver);
	document.getElementById("goidien1_event").addEventListener("mousedown", goidien1MouseDown);
	document.getElementById("goidien1_event").addEventListener("mouseup", goidien1MouseUp);
}

var removeGoidien1Event = function() {
    document.getElementById("goidien1_event").removeEventListener("click", goidien1Click);
    document.getElementById("goidien1_event").removeEventListener("mouseout", goidien1MouseOut);
}

addGoidien1Event();
//=======================================================
var goidien2Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(2);
}

var goidien2MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien2_event").addEventListener("click", goidien2Click);
    document.getElementById("goidien2_event").addEventListener("mouseup", goidien2MouseUp);
}

var goidien2MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien2_hover",true);
	lockHover = false;
}

var goidien2MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien2_hover",true);
	}
	document.getElementById("goidien2_event").addEventListener("mouseout", goidien2MouseOut);
	document.getElementById("goidien2_event").addEventListener("mousedown", goidien2MouseDown);
}

var goidien2MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien2Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien2_hover",false);
	}
}

var addGoidien2Event = function() {
    document.getElementById("goidien2_event").addEventListener("mouseover", goidien2MouseOver);
	document.getElementById("goidien2_event").addEventListener("mousedown", goidien2MouseDown);
	document.getElementById("goidien2_event").addEventListener("mouseup", goidien2MouseUp);
}

var removeGoidien2Event = function() {
    document.getElementById("goidien2_event").removeEventListener("click", goidien2Click);
    document.getElementById("goidien2_event").removeEventListener("mouseout", goidien2MouseOut);
}

addGoidien2Event();
//=======================================================
var goidien3Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(3);
}

var goidien3MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien3_event").addEventListener("click", goidien3Click);
    document.getElementById("goidien3_event").addEventListener("mouseup", goidien3MouseUp);
}

var goidien3MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien3_hover",true);
	lockHover = false;
}

var goidien3MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien3_hover",true);
	}
	document.getElementById("goidien3_event").addEventListener("mouseout", goidien3MouseOut);
	document.getElementById("goidien3_event").addEventListener("mousedown", goidien3MouseDown);
}

var goidien3MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien3Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien3_hover",false);
	}
}

var addGoidien3Event = function() {
    document.getElementById("goidien3_event").addEventListener("mouseover", goidien3MouseOver);
	document.getElementById("goidien3_event").addEventListener("mousedown", goidien3MouseDown);
	document.getElementById("goidien3_event").addEventListener("mouseup", goidien3MouseUp);
}

var removeGoidien3Event = function() {
    document.getElementById("goidien3_event").removeEventListener("click", goidien3Click);
    document.getElementById("goidien3_event").removeEventListener("mouseout", goidien3MouseOut);
}

addGoidien3Event();
//=======================================================
var goidien4Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(4);
}

var goidien4MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien4_event").addEventListener("click", goidien4Click);
    document.getElementById("goidien4_event").addEventListener("mouseup", goidien4MouseUp);
}

var goidien4MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien4_hover",true);
	lockHover = false;
}

var goidien4MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien4_hover",true);
	}
	document.getElementById("goidien4_event").addEventListener("mouseout", goidien4MouseOut);
	document.getElementById("goidien4_event").addEventListener("mousedown", goidien4MouseDown);
}

var goidien4MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien4Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien4_hover",false);
	}
}

var addGoidien4Event = function() {
    document.getElementById("goidien4_event").addEventListener("mouseover", goidien4MouseOver);
	document.getElementById("goidien4_event").addEventListener("mousedown", goidien4MouseDown);
	document.getElementById("goidien4_event").addEventListener("mouseup", goidien4MouseUp);
}

var removeGoidien4Event = function() {
    document.getElementById("goidien4_event").removeEventListener("click", goidien4Click);
    document.getElementById("goidien4_event").removeEventListener("mouseout", goidien4MouseOut);
}

addGoidien4Event();
//=======================================================
var goidien5Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(5);
}

var goidien5MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien5_event").addEventListener("click", goidien5Click);
    document.getElementById("goidien5_event").addEventListener("mouseup", goidien5MouseUp);
}

var goidien5MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien5_hover",true);
	lockHover = false;
}

var goidien5MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien5_hover",true);
	}
	document.getElementById("goidien5_event").addEventListener("mouseout", goidien5MouseOut);
	document.getElementById("goidien5_event").addEventListener("mousedown", goidien5MouseDown);
}

var goidien5MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien5Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien5_hover",false);
	}
}

var addGoidien5Event = function() {
    document.getElementById("goidien5_event").addEventListener("mouseover", goidien5MouseOver);
	document.getElementById("goidien5_event").addEventListener("mousedown", goidien5MouseDown);
	document.getElementById("goidien5_event").addEventListener("mouseup", goidien5MouseUp);
}

var removeGoidien5Event = function() {
    document.getElementById("goidien5_event").removeEventListener("click", goidien5Click);
    document.getElementById("goidien5_event").removeEventListener("mouseout", goidien5MouseOut);
}

addGoidien5Event();
//=======================================================
var goidien6Click = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	if(event != undefined)
		setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
	// write code below here
	tmpQ.help4Choose(6);
}

var goidien6MouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	tmpTarget = event.target.id;
	lockHover = true;
    document.getElementById("goidien6_event").addEventListener("click", goidien6Click);
    document.getElementById("goidien6_event").addEventListener("mouseup", goidien6MouseUp);
}

var goidien6MouseUp = function(event){
	setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
	setHoverButton("#goidien6_hover",true);
	lockHover = false;
}

var goidien6MouseOver = function(event) {
	if(!lockHover){
		tmpTarget = event.target.id;
		_tmpTargetResetTab = event.target.id;
		setHoverButton("#goidien6_hover",true);
	}
	document.getElementById("goidien6_event").addEventListener("mouseout", goidien6MouseOut);
	document.getElementById("goidien6_event").addEventListener("mousedown", goidien6MouseDown);
}

var goidien6MouseOut = function(event) {
	_tmpTargetResetTab = "";
	try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
	removeGoidien6Event();
	if(!lockHover){
		var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
		_tabId=_tabId.replace("_tab","_event");
		if(_tabId == event.target.id) {
			$("#svg").css("cursor","");
			return;
		}
		setHoverButton("#goidien6_hover",false);
	}
}

var addGoidien6Event = function() {
    document.getElementById("goidien6_event").addEventListener("mouseover", goidien6MouseOver);
	document.getElementById("goidien6_event").addEventListener("mousedown", goidien6MouseDown);
	document.getElementById("goidien6_event").addEventListener("mouseup", goidien6MouseUp);
}

var removeGoidien6Event = function() {
    document.getElementById("goidien6_event").removeEventListener("click", goidien6Click);
    document.getElementById("goidien6_event").removeEventListener("mouseout", goidien6MouseOut);
}

addGoidien6Event();
//=======================================================
var btPopupClick = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    if(event != undefined)
        // setHoverButton("#"+getIdButton(tmpTarget)+"_hover",true);
    // write code below here
    backToIntro();
}

var btPopupMouseDown = function(event) {
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    tmpTarget = event.target.id;
    lockHover = true;
    document.getElementById("btPopup_event").addEventListener("click", btPopupClick);
    document.getElementById("btPopup_event").addEventListener("mouseup", btPopupMouseUp);
}

var btPopupMouseUp = function(event){
    // setHoverButton("#"+getIdButton(tmpTarget)+"_hover",false);
    // setHoverButton("#btPopup_hover",true);
    lockHover = false;
}

var btPopupMouseOver = function(event) {
    if(!lockHover){
        tmpTarget = event.target.id;
        _tmpTargetResetTab = event.target.id;
        // setHoverButton("#btPopup_hover",true);
    }
    document.getElementById("btPopup_event").addEventListener("mouseout", btPopupMouseOut);
    document.getElementById("btPopup_event").addEventListener("mousedown", btPopupMouseDown);
}

var btPopupMouseOut = function(event) {
    _tmpTargetResetTab = "";
    try {
        if (detectmob() != 1 && detectmob() != 3)
            if (event.which == 3 || event.which == 2) {
                return;
            }
    } catch (error) {}
    removeBtPopupEvent();
    if(!lockHover){
        var _tabId = (tabTarget != undefined) ? tabTarget[0].id : "";
        _tabId=_tabId.replace("_tab","_event");
        if(_tabId == event.target.id) {
            $("#svg").css("cursor","");
            return;
        }
        // setHoverButton("#btPopup_hover",false);
    }
}

var addBtPopupEvent = function() {
    document.getElementById("btPopup_event").addEventListener("mouseover", btPopupMouseOver);
    document.getElementById("btPopup_event").addEventListener("mousedown", btPopupMouseDown);
    document.getElementById("btPopup_event").addEventListener("mouseup", btPopupMouseUp);
}

var removeBtPopupEvent = function() {
    document.getElementById("btPopup_event").removeEventListener("click", btPopupClick);
    document.getElementById("btPopup_event").removeEventListener("mouseout", btPopupMouseOut);
}

addBtPopupEvent();