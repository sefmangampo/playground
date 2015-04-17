var mainWidth;
var mainHeight;
var show= false;
var showFooterView = false;

var main = function(){
	getWindowDimensions();
	
	listeners();

	$(window).resize(getWindowDimensions);
}
function listeners(){
	
	$('footer li').click(function(){
		//alert($(this).attr('value'));
		showFooterView = !showFooterView;
		if(showFooterView){
			TweenLite.to($('.footerView'),1.5,{right:0,ease:"Elastic.easeOut"});
		}else{
			TweenLite.to($('.footerView'),1.5,{right: -mainWidth * 0.3,ease:"Elastic.easeOut"});
		}
	
	});
	
	
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
	
	$('footer').css({height:mainHeight *0.06,width:mainWidth * 0.9, left: mainWidth * 0.05});
	$('header').css({height:mainHeight *0.06,width:mainWidth * 0.9, left: mainWidth * 0.05});
	$('.footerView').css({height: mainHeight * 0.8,width:mainWidth * 0.3,top:mainHeight * 0.1,right: -mainWidth * 0.3});
	
	TweenLite.to($('#view,#view2'),0.5,{width:mainWidth * 0.75,left:mainWidth * 0.125, top: mainHeight * 0.1,height:mainHeight * 0.5});
	
}



$(document).ready(main);


