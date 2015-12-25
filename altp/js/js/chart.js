//chartHandler
//AnhND
function ChartHandle(){
	//define point
	var startPoint = {x :426, y : 392},
		startPoint0 = {x :408, y : 392},
		distanceOfColumn = 110,
		maxHeight = 180,
		rowHeight = maxHeight/5,
		rowWidth = 400,
		widthDefine = 40,
		rootElement = "chart";


	function drawRectByPoint(startPoint, w, h){
		return "M"+ startPoint.x + ","+startPoint.y +" v "+(-h) + " h "+w + " v "+h;
	}
	
	this.drawChart = function(listPercent){
		$("#"+rootElement).empty();
		
		
		//listPercent = [1,1,1,1];
		for(var i = 0 ; i < listPercent.length ; i++){
			var path = $utils.appendSVGElement(rootElement,"path");
			path.setAttribute("fill","#FFFFFF");
			path.setAttribute("d",
				drawRectByPoint(
					{x : startPoint.x + i * distanceOfColumn , y : startPoint.y }, 
					widthDefine,maxHeight* listPercent[i]
				)
			);
			path.setAttribute("opacity","0.8");
		}
		
		//init line
		for(var i  = 0 ; i < 5 ; i++){
			var path = $utils.appendSVGElement(rootElement,"path");
			path.setAttribute("stroke","#FFFFFF");
			path.setAttribute("opacity","0.3");
			path.setAttribute("stroke-width","3");
			path.setAttribute("d",
				"M " +startPoint0.x+","+ (startPoint0.y - ((i+1)* rowHeight)) +" L"+ (startPoint0.x + rowWidth) + ","+ (startPoint0.y - ((i+1)* rowHeight))
			);
		}
	}
}


$chart = new ChartHandle();
// $chart.drawChart([0.7,0.1,0.2,0.2]);
