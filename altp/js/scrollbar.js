function Scrollbar(_item, _mask_item,contentScroll , heightConfig, startPoint,_distance, _callBack){
	this.rootEle = _item;
	this.maskItem = _mask_item;
	this.startPoint = startPoint;
	this.content = contentScroll;
	
	var distance = _distance, 
		callBack = _callBack,
		isMouseLeft = true,
		self = this,
		height = heightConfig,
		offset = 0,
		mouseY = 0,
		contentBBox = $("#"+this.content)[0].getBBox(),
		ratio = distance/ height
		;
	console.log(contentBBox);
	function update(_tmpDis){
		$("#"+self.rootEle).attr("transform","translate("+startPoint.x + ","+startPoint.y+")");
		$("#"+self.maskItem).attr("transform","translate("+startPoint.x + ","+startPoint.y+")");
		$("#"+self.content).attr("transform","translate("+ 0 + ","+(-_tmpDis)+")");
	}
	
	this.reset = function(){
		mouseY -= distance - heightConfig/2;
		startPoint.y -= distance - heightConfig/2;
		distance = heightConfig/2;
		update();
	}
	
	interact("#"+self.rootEle).draggable({
        onstart: function(event) {
            if (event.button == 2 || event.button == 3 || event.button == 1) {
                isMouseLeft = false;
                return;
            }
            var mouse = $utils.getTrueCoor(event.pageX, event.pageY);
            mouseY = mouse[1];
        },
        onmove: function(event) {
            if (!isMouseLeft) return;
            var mouse = $utils.getTrueCoor(event.pageX, event.pageY);
            var k1 = -mouseY + mouse[1];
			distance += k1;
			startPoint.y += k1;
			if(distance > height){
				startPoint.y -= distance - height;
				mouse[1] -= distance - height;
				distance = height;
			} else if(distance < 0 ){
				startPoint.y += -distance;
				mouse[1] += -distance;
				distance = 0;
			}
			ratio = distance/ height;
			var _tmpDis =ratio * (contentBBox.height - height - 50);
			
			
            mouseY = mouse[1];
			update(_tmpDis);
        },
        onend: function(event) {
			if(typeof(callBack) == "function"){
				callBack();
			}
		}
    })
    .restrict({
        drag: "#"+this.rootEle.parentNode,
        endOnly: false
    }).styleCursor(false);
}

new Scrollbar("srollbar","srollbar","contentScroll",350,{x:0,y:0},0);
