var windowWidth, windowHeight;

var container;
var rightPanel;

var containerWidth, containerHeight;
var containerPadding = 50;

var panelWidth, panelHeight;

var lineData = [];

var xScale, yScale;
var xAxis,yAxis;

var numberOfInputs = 21;
var highestValue = 50;

var lineType;

var main = function(){
	randomBackgroundColor();
	init();
	getWindowSize();
	resizeStuff();
	displayForm();
	displayWelcome();
	addButtons();
}

function displayDone(num,text){
	d3.select('svg').append("text")
		.attr("x",containerWidth / 2 + "px")
		.attr("y",containerHeight/ 12 + "px")
		.text(text)
		.attr("font-size",20+"px")
		.attr("text-anchor","middle")
		.style("opacity",0)
		.transition().delay(num).duration(500)
		.style("opacity",1);
}

function displayWelcome(){
	d3.select('svg').append("text")
		.attr("x",containerWidth / 2 + "px")
		.attr("y",containerHeight / 2 + "px")
		.text("Click the Button to draw graph")
		.attr("font-size",50+"px")
		.attr("text-anchor","middle")
		.style("opacity",0)
		.transition().delay(500).duration(1000)
		.style("opacity",1);
}

function createOptions(num){
	var items = [];
	
	for(var i = 1; i <= num;i++){
		items[i] = i;
	}
	
	return items;
}

function displayForm(){
	var labels = ["Value","Items","Line type","Taba","Kulay"];
	
	var form = d3.select('.panel').append('div');
	var tableforms = form.append('table').selectAll('tr').append('td').data(labels).enter().append('tr').append('td')
		.text(function(d){ return d});
	
	d3.select('table').style("width", panelWidth * 0.8 + "px");
	d3.selectAll('td').style("width", panelWidth * 0.4 + "px");
	d3.selectAll('tr').append('td').append('select').attr("id",function(d,i){ return "select" + i });
	
	var allSelects = d3.selectAll('select').style("width", panelWidth * 0.3 + "px");
	
	var select1 = d3.select('#select0').selectAll("option").data(createOptions(100)).enter().append('option')
		.attr("value",function(d,i){ return d})
		.text(function(d,i){ return d});
		$('#select0').val(50);
	
	var select2 = d3.select('#select1').selectAll("option").data(createOptions(100)).enter().append('option')
		.attr("value",function(d,i){ return d})
		.text(function(d,i){ return d});
		$('#select1').val(20);
		
	var select3 = d3.select("#select2").selectAll("option").data(["straight","curved"]).enter().append("option")
		.attr("value",function(d){ return d})
		.text(function(d){ return d});
	
	var select4 = d3.select("#select3").selectAll("option").data(createOptions(5)).enter().append("option")
		.attr("value",function(d){ return d})
		.text(function(d){ return d});
		$('#select3').val(1);

	var select5 = d3.select("#select4").selectAll("option").data(["red","blue","green","black"]).enter().append("option")
		.attr("value",function(d){ return d})
		.text(function(d){ return d});
		$('#select4').val("black");
		
}

function clearValues(){

	d3.select('#resultDiv').remove();
	d3.select('#lineDrawn').remove();
	d3.selectAll('text').remove();
	
}


function addButtons(){
	d3.select('.panel').append("input")
		.attr("type","button")
		.attr("value","Create Graph")
		.on("click",function(){
		
		
		highestValue = $('#select0').val();
		numberOfInputs = $('#select1').val();
		
		if($('#select2').val() == "straight"){
			lineType = "linear";
		}else{
			lineType = "cardinal";
		}
		randomBackgroundColor();
		clearValues();
		initScaleAxis();
		randomizeData(numberOfInputs,highestValue);	
		displayValues();
		plotLine();
				
		});
		
}

function plotLine(){
	var lineFunction = d3.svg.line()
							.x(function(d,i){ return xScale(i)})
							.y(function(d,i){ return yScale(d)})
							.interpolate(lineType);
							
	var lineGraph = d3.select(".container").append("path").attr("id","lineDrawn")
		.attr("d",lineFunction(lineData))
		.attr("fill","none")
		.attr("stroke-width",$('#select3').val())
		.attr("stroke",$('#select4').val());
	
	lineGraph.attr("stroke-dasharray", lineGraph.node().getTotalLength() + " " + lineGraph.node().getTotalLength() )
			.attr("stroke-dashoffset", lineGraph.node().getTotalLength())
			.transition()
			.duration(5000)
			.attr("stroke-dashoffset",0);
	
	var displayText = "";
	var highest = d3.max(lineData,function(d){ return d});
	var lowest  = d3.min(lineData,function(d){ return d});
	var mean = d3.mean(lineData,function(d){ return d})
	var median = d3.median(lineData,function(d){ return d});
	var sd = d3.deviation(lineData,function(d){ return (d)});
	
	sd = sd.toPrecision(5);
	displayText = "H: " + highest +", L: " + lowest + ", Mean: " + mean + ", Median: " + median + ", Standard Deviation: " +sd;
	displayDone(5000, displayText);
}

function displayValues(){
	

	var results = d3.select('.panel').append('div').attr("id","resultDiv")
		.style("height", panelHeight * 0.5 +"px")
		.style("width",panelWidth * 0.8 + "px")
		.style("margin", panelWidth * 0.1 +"px");
	
	results.append("h2").style("margin-top",10 + "px").text("Randomized Values: ").attr("class",'.display');
	
	results.append("ul").selectAll('li').data(lineData).enter().append('li').attr("class",'.display')
		.transition().duration(200).delay(function(d,i){
			return i * 100;
			return i * 100;
		}).text(function(d,i){
		
		i++;
		
		if(i < 10){
				
				i = "0" + i;
		}
		
		return  i+ " : " + d;
	});

}

function initScaleAxis(){
	
	xScale = d3.scale.linear().domain([0,numberOfInputs]).range([ containerPadding,containerWidth - containerPadding]);
	yScale = d3.scale.linear().domain([highestValue,0]).range([ containerPadding,containerHeight - containerPadding]);
	
	
	xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	yAxis = d3.svg.axis().scale(yScale).orient("left");
	
	d3.select('svg').append('g').attr("transform","translate(0,"+ (containerHeight - containerPadding) +")").call(xAxis).style("opacity",0).transition().duration(500).style("opacity",1);
	d3.select('svg').append('g').attr("transform","translate("+containerPadding+", 0 )").call(yAxis).style("opacity",0).transition().duration(600).style("opacity",1);

	
}

function randomizeData(num,limit){
	
	lineData = [];
	for(var i = 0; i < num; i++){
		lineData[i] = Math.floor(Math.random() * limit) + 1;
	}
	
}

function resizeStuff(){

	
	containerWidth = windowWidth * 0.7;
	containerHeight = windowHeight * 0.9;
	
	panelWidth = windowWidth * 0.225;
	panelHeight = windowHeight * 0.9;
	
	$('.container').css({"width": containerWidth + "px","height":containerHeight + "px","marginTop":windowHeight * 0.05 + "px","marginLeft":windowWidth * 0.02 + "px","background":"white","position":"absolute"});
	$('.panel').css({"width":panelWidth + "px","height": panelHeight+ "px","marginTop":windowHeight * 0.05 + "px","marginLeft": windowWidth * 0.75 + "px","position":"absolute","textAlign":"center"});
}

function getWindowSize(){
	
	windowHeight = $(window).height();
	windowWidth = $(window).width();

}

function init(){
	container = d3.select('body').append('svg').attr("class","container").style("opacity",0).transition().duration(1000).style("opacity",1);
	rightPanel = d3.select('body').append('div').attr("class","panel").style("opacity",0).transition().duration(1000).style("opacity",1);
}

function randomBackgroundColor(){
	var r = Math.floor(Math.random() * 100);
	var g = Math.floor(Math.random() * 100);
	var b = Math.floor(Math.random() * 100);

	d3.select('body').transition().duration(1000).style("background","rgb("+ r + "," + g + "," + b +")");
	}
	
$(document).ready(main);