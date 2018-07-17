'use strict';
(function($)
{
	$.fn.modal=function(parametres)
	{
		return this.each(function()
		{
			var cible = $(this).data('target');
			if(parametres == "show" ){
				$('#'+cible).css('display', "block");
			}
			else if (parametres == "hide"){
				$('#'+cible).css('display', "none");
			}
		});
	};

})(jQuery);

$(document).ready(function() {
	disable();
	popin();
	onglet();
	tooltip();
	carrousel();
})

function popin(){
	var ciblemodal = $('#btnPopin').data('target');
	$('#btnPopin').click(function(){
		$('#btnPopin').modal("show");
	});
	$('.popin-dismiss').click(function(){
		$('#btnPopin').modal("hide");
	});
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$('#btnPopin').modal("hide");
		}
	});
	$('#'+ciblemodal).click(function(e){
		if(e.target.id == ciblemodal ){
			$('#btnPopin').modal("hide");
		}
	});
}


function disable(){
	$('.disabled').prop('disabled',true);
}

function onglet(){
	var ongletnumber = $('.tab-list').children().length;
	$('.tab-list li:nth-child(0)').attr('class', 'active');
	for(var i=0; i<(ongletnumber+1); i++){
		$('.tab-list li:nth-child('+i+')').click(function(){
			for(var j = 1 ; j< (ongletnumber+1); j++){
				$('.tab-list li:nth-child('+j+')').attr('class', '');
			}
			$(this).attr('class', 'active');
			var ongletactif = $(this).data("target");
			$('.tab-content div').attr('class', '');
			$('#'+ongletactif).attr('class', 'active');
		});
		if($('.tab-list li:nth-child('+i+')').attr('class') == "active"){
			var onglet = $('.tab-list li:nth-child('+i+')').data("target");
			$('#'+onglet).attr('class', 'active');

		}
	}
}

function tooltip(){
	var sourisX;
	var sourisY;
	var topElement;
	var leftElement;
	var title = $('.tooltip').attr('title');
	$('.tooltip').mousemove(function(e){
		sourisX = e.pageX;
		sourisY = e.pageY;
		topElement = $(this).position().top;
		leftElement = $(this).position().left;
	})
	if(title != "" && title){
		$('.tooltip').mouseenter(function(){
			$(this).attr('title','');   
			if($(this).data('placement') == "right"){
				$(this).append('<span id="tooltip-contenu">' + title + '</span>'); 
				$('#tooltip-contenu').css('margin-left', "3%" );
				$('#tooltip-contenu').css('margin-top', "-0.5%" );

			}else if ($(this).data('placement') == "left"){
				$(this).append('<span id="tooltip-contenu">' + title + '</span>'); 
				$('#tooltip-contenu').css('margin-left', "-13%" );
				$('#tooltip-contenu').css('margin-top', "-0.5%" );
			}else if ($(this).data('placement') == "bottom"){
				$(this).append('<span id="tooltip-contenu">' + title + '</span>'); 
				$('#tooltip-contenu').css('margin-top', "2.5%" );
				$('#tooltip-contenu').css('margin-left', "-4%" );
			}else if ($(this).data('placement') == "top"){
				$(this).append('<span id="tooltip-contenu">' + title + '</span>'); 
				$('#tooltip-contenu').css('margin-top', "-2.5%" );
				$('#tooltip-contenu').css('margin-left', "-4%" );
			}
		})


		$('.tooltip').mouseout(function() {
			$(this).attr('title',title);
			$(this).children('span#tooltip-contenu').remove();

		});
	}
}
function carrousel(){
	var currentCarrousel;
	var i;
	var y;
	var index = $('#carrousel .carrousel-content').length - 1;
	var slide = 0;
	var carrousel = $('#carrousel');
	var beforeCarrousel;
	var afterCarrousel;
	var activeCarrousel;

	currentCarrousel = $('#carrousel .carrousel-content').eq(slide);
	$('#carrousel .carrousel-content').css('display', 'none');
	currentCarrousel.addClass('active');
	$('#carrousel .carrousel-content .active').css('display', 'block');
	currentCarrousel.css('display', 'block');
	

	$('#carrousel').append('<div class="controls"> <span class="prev">Precedent</span> <span class="next">Suivant</span> </div>');

	for( i=1; i< index+2 ; i++){
		carrousel.append('<span class="page">'+i+"</span>");
	}
	
	$(".page").click(function(){
		clearInterval(auto);
		var thispage = $(this).text();
		activeCarrousel = $('#carrousel .active');
		currentCarrousel = $('#carrousel .carrousel-content').eq(thispage-1);
		activeCarrousel.fadeOut();
		activeCarrousel.removeClass('active');
		currentCarrousel.addClass('active');
		currentCarrousel.fadeIn();
		
		
		slide = thispage-1;
		auto = setInterval(function(){
			next()
		}, 5000);

	});

	function next(){
		slide++;
		if(slide > index){
			slide = 0;
		}
		currentCarrousel = $('#carrousel .carrousel-content').eq(slide);
		beforeCarrousel = $('#carrousel .carrousel-content').eq(slide-1);
		beforeCarrousel.fadeOut();
		currentCarrousel.fadeIn();
		currentCarrousel.addClass('active');
		beforeCarrousel.removeClass('active');
		auto;		
	}
	$('.next').click(function(){
		next();
		clearInterval(auto);
		auto = setInterval(function(){
			next()
		}, 5000);
		
	});
	var auto = setInterval(function(){
		next()
	}, 5000);


	$('.prev').click(function(){
		slide--;
		if(slide < 0){
			slide = $('#carrousel .carrousel-content').length -1;
		}
		$('#carrousel .carrousel-content').css('display', 'none');
		currentCarrousel = $('#carrousel .carrousel-content').eq(slide);
		afterCarrousel = $('#carrousel .carrousel-content').eq(slide+1);
		afterCarrousel.fadeOut();
		currentCarrousel.fadeIn();
		currentCarrousel.addClass('active');
		afterCarrousel.removeClass('active');
		clearInterval(auto);
		auto = setInterval(function(){
			next()
		}, 5000);;	
		
	});
}