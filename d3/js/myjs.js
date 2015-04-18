var windowWidth;
var windowHeight;
var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];

var main = function(){
	
	

	
	windowHeight = $(window).height();
	windowWidth = $(window).width();

	d3.select("body")
		.style("background","rgb(24,36,57)")
		.style("padding",0 + "px")
		.style("margin", 0 +"px")
		
		.append('svg')
		.style("background","white")
		.attr("height",windowHeight * 0.9)
		.attr("width",windowWidth * 0.9)
		.style("margin-left",windowWidth * 0.05)
		.style("margin-top",windowHeight * 0.05);
		
		drawXAxes();
		//drawRec();
		//drawCircle();
		//drawEllipse();
		//drawLine();
	//	drawText();
		//drawPath();
		
		
}



function drawXAxes(){

	var xScale = d3.scale.linear().domain([0,dataset.length]).range([0,windowWidth * 0.8]);
	var yScale = d3.scale.linear().domain([d3.max(dataset,function(d){ return d[1]}),0]).rangeRound([0,windowHeight * 0.7]);
	
	var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(10);
	var yAxis = d3.svg.axis().scale(yScale).orient("left");
	

	d3.select('svg').append('g').call(xAxis).attr("transform","translate(50,"+ ((windowHeight * 0.7) + 50) +")").attr("class","axis");
	d3.select('svg').append('g').call(yAxis).attr("transform","translate(50,50)").attr("class","axis");
	
	d3.select('svg').selectAll('circle').data(dataset).enter().append('circle')
		.attr("r",10)
		.attr("cx",function(d,i){ return xScale(i + 1 )+50 })
		.attr("cy",function(d,i){ return ( yScale(d[1]) ) + 50});
}


function drawPath(){

	var pathClick = 0;

	d3.select('svg').append('path')
		.attr("stroke-width",2)
		.attr("stroke","blue")
		.attr("d","M0,0 L300,23 l50,50 l50,30 z")
		.on("mouseover",function(){
			d3.select(this).style("fill","red")
		}).on("mouseout",function(){
			d3.select(this).style("fill","blue");
		}).on("click",function(event){
			
			var xMouse = d3.mouse(this)[0];
			var yMouse = d3.mouse(this)[1];
			
			
			pathClick++;
			
			if(pathClick % 10 == 0)
			d3.select(this).transition().delay(pathClick * 250).duration(2000).attr("transform","translate(50,50)");
			else
			d3.select(this).transition().delay(pathClick * 250).duration(2000).attr("transform","translate("+(xMouse +windowHeight * 0.05 )+","+ (yMouse + windowWidth * 0.05)+")");
		});
		

}

function drawText(){
	
	var textclick = 0;
	
	d3.select('svg').append('text')
		.attr("x",500)
		.attr("y",100)
		.text(windowWidth + " by " + windowHeight)
		.style("fill","black")
		.style("stroke","peru")
		.on("click",function(){
			
			textclick++;
			d3.select(this).data([d3.select(this).text()]).enter();
			if(textclick % 2 == 0)
				d3.select(this).transition().delay(textclick * 250).duration(1000).style("stroke","black").style("writing-mode","tb").style("glyph-orientation-vertical",1).attr("textLength",100);
			else
			d3.select(this).transition().delay(textclick * 250).duration(1000).style("stroke","peru").style("writing-mode","lr").style("font-family","Tahoma");
			
			console.log("The value of this data is :" + d3.select(this).data());
		});

}

function drawLine(){

	var lineClick = 0;
	
	d3.select('svg').append('line')
		.attr("x1",100)
		.attr("y1",100)
		.attr("x2",500)
		.attr("y2",500)
		.style("stroke","salmon")
		.style("stroke-width",2)
		.transition()
		.delay(2000)
		.duration(2000)
		.style("stroke","black")
		.attr("transform","translate(100,0)");
		
}


function drawEllipse(){
	var elClick = 0;
	d3.select("svg").append("ellipse")
		.attr("rx",50)
		.attr("ry",50)
		.attr("cx",360)
		.attr("cy",60)
		.style("fill","tomato")
		.on("click",function(){
			elClick++;
			
			d3.select(this).data([elClick]).enter();
			var el = d3.select(this);
			
			if(elClick % 2 == 0)
				el.transition().delay(elClick * 250).duration(1000).attr("rx",100).attr("background","peru");
			else
				el.transition().delay(elClick * 250).duration(1000).attr("rx",50).attr("background","tomato");
			
			console.log("the value of data for this element is: " + d3.select('ellipse').data());
		});

}

function drawCircle(){

	var circleClick = 0;

	d3.select('svg').append('circle')
		.style("fill", "darkgoldenrod")
		.attr("cx",260)
		.attr("cy",60)
		.attr("r",50)
		.on("click",function(){
			circleClick++;
			
			var sel = d3.select(this).data([circleClick]).enter();
			var circle = d3.select(this);
			
			if(circleClick % 2 == 0)
				circle.transition().delay(circleClick * 250).duration(1000).attr("r",100);
			else
				circle.transition().delay(circleClick * 250).duration(1000).attr("r",50);
				
		console.log("the data for circle is: " + circle.data());
		});

}


function drawRec(){
	
	var rectClick = 0;
	
	d3.select("svg").append('rect')
		.attr("x",10)
		.attr("y",10)
		.attr("height",100)
		.attr("width",200)
		.attr("fill","orange")	
		.on("click",function(){
		
			rectClick++;
			var sec = d3.select(this).data([rectClick]).enter();
			var rect = d3.select(this);
			
			if(rectClick % 2 == 0)
				rect.transition().duration(1000).delay(rectClick* 250).attr("fill","green").attr("rx",50).attr("ry",50).attr("width",100);
			else
				rect.transition().duration(1000).delay(rectClick * 250).attr("fill","red").attr("rx",0).attr("ry",0).attr("width",200);
				
			console.log("The data of the rect is :" + rect.data());
		});
	
}




$(document).ready(main);