function Slider(_item, _mask_item , widthConfig, startPoint,_distance, _callBack){
	this.rootEle = _item;
	this.maskItem = _mask_item;
	this.startPoint = startPoint;

	var distance = _distance, 
		callBack = _callBack,
		isMouseLeft = true,
		self = this,
		width = widthConfig,
		//offset = 0,
		ratio = 1,
		mouseX = 0;
	
	function update(){
		$("#"+self.rootEle).attr("transform","translate("+startPoint.x + ","+startPoint.y+")");
		$("#"+self.maskItem).attr("transform","translate("+startPoint.x + ","+startPoint.y+")");
	}
	
	this.reset = function(){
		mouseX -= distance - widthConfig/2;
		startPoint.x -= distance - widthConfig/2;
		distance = widthConfig/2;
		update();
	}
	
	interact("#"+self.rootEle).draggable({
        onstart: function(event) {
            if (event.button == 2 || event.button == 3 || event.button == 1) {
                isMouseLeft = false;
                return;
            }
            var mouse = $utils.getTrueCoor(event.pageX, event.pageY);
            mouseX = mouse[0];
        },
        onmove: function(event) {
            if (!isMouseLeft) return;
            var mouse = $utils.getTrueCoor(event.pageX, event.pageY);
            var k1 = -mouseX + mouse[0];
			distance += k1;
			startPoint.x += k1;
			if(distance > width){
				startPoint.x -= distance - width;
				mouse[0] -= distance - width;
				distance = width;
			} else if(distance < 0 ){
				startPoint.x += -distance;
				mouse[0] += -distance;
				distance = 0;
			}
            mouseX = mouse[0];
			update();
        },
        onend: function(event) {
			if (!isMouseLeft) {
				isMouseLeft = true;
			}
			if(typeof(callBack) == "function"){
				callBack(ratio);
			}
		}
    })
    .restrict({
        drag: "#"+this.rootEle.parentNode,
        endOnly: false
    }).styleCursor(false);
}

