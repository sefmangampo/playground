var mainWidth;
var mainHeight;
var show= false;

var main = function(){
	getWindowDimensions();
	
	listeners();
	
	$(window).resize(getWindowDimensions);
}
function listeners(){
	
	$('.navItem').click(function(event){
		
		show = !show;
		if(show){
			TweenLite.to($('#view'),0.5,{autoAlpha:0.9});
			TweenLite.to($('#view2'),0.5,{autoAlpha:0});
		}else{
			TweenLite.to($('#view'),0.5,{autoAlpha:0});
			TweenLite.to($('#view2'),0.5,{autoAlpha:1});
		
		}
	});
	
}
function getWindowDimensions(){
	mainWidth = $(window).width();
	mainHeight = $(window).height();
	
	movers();
}

function movers(){
	$(".navItem").hover(function(){
		TweenLite.to(this,0.5,{left:-20});
	},function(){
		TweenLite.to(this,0.5,{left:-100});
	});
	

	
	TweenLite.to($('#view,#view2'),0.5,{width:mainWidth * 0.75,left:mainWidth * 0.125, top: mainHeight * 0.1,height:mainHeight * 0.5});
	
}



$(document).ready(main);


