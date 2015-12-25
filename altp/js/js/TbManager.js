var TextBox = function(){}
TextBox.prototype = {
	init : function(){
		this.textAlign = "center";
		this.MAX_FONTSIZE = 100;
		
		this.listTb = $(".mydiv").toArray();
		console.log(this.listTb);
		this.updatePos();
	},
	
	updatePos : function(){
		var self = this;
		if(this.listTb == undefined) return;
		this.listTb.forEach(function(txt){
			var container = $id(txt.getAttribute("container"));
			if (container) {
				var scrollX = $utils.f_scrollLeft();
				var scrollY = $utils.f_scrollTop();
				window.scrollTo(0, 0);
				
				var containerBB = container.getBoundingClientRect();
				txt.style.width = containerBB.width + "px";
				txt.style.height = containerBB.height + "px";
				txt.style.marginLeft = (containerBB.left - root_margin_left/$utils.getDevicePixelRatio() ) + "px";
				txt.style.marginTop = (containerBB.top - root_margin_top/$utils.getDevicePixelRatio())+ "px";
				
				//set font khi zoom
				//txt.style.fontSize = (containerBB.height * 0.7 < self.MAX_FONTSIZE ? containerBB.height * 0.7 : self.MAX_FONTSIZE)  + "px";
				//txt.style.textAlign = self.textAlign;
				
				window.scrollTo(scrollX || 0, scrollY || 0);
			}
		});
	}
}
var $tb = new TextBox();
