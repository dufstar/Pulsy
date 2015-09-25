

$(".complete").click(function() {
	$(this).addClass("loading");
	setTimeout(function() {
		$(".fa-cog").css("display","block");
		$(".fa-cog").addClass("button-settings");
		$(".privacy-container").css("display","block");
	},2500);
	setTimeout(function() {
		$(".endorse-label").addClass("show-label");
		$(".fa-heart").addClass("bounce-heart").addClass("animated-heart bounce-active");
	},3000);
	setTimeout(function() {
		$(".fa-heart").removeClass("bounce-active");
		$(".endorse-label").removeClass("show-label");
	},6000);
	setTimeout(function() {
		$(".fa-heart").removeClass("bounce-heart").removeClass("animated-heart");
	},8000);
});

$(".privacy-container").hover(function() {
	$(".progress-button button span").css("opacity","0");
});

$(".privacy-container").mouseleave(function() {
	$(".progress-button button span").css("opacity","1");
});

$(document).scroll(function() {
	if ($(document).scrollTop() > 100) {
		$(".content-avatar, .content-avatar-mini").addClass("hide-avatar");
	} else {
		$(".content-avatar, .content-avatar-mini").removeClass("hide-avatar");
	}
	if ($(document).scrollTop() > 110) {
		$(".content-nav").addClass("main-nav-fixed");
	} else {
		$(".content-nav").removeClass("main-nav-fixed");
	}
	if ($(document).scrollTop() > 460) {
		$(".nav-container").appendTo("body").find(".content-body-nav").addClass("body-nav-fixed");
		// $(".content-nav, .launch-button, .cancel-button, .progress-button, .progress-button button").addClass("shrink-nav");
		// $(".action-buttons").addClass("shrink-actions");
	} else {
		$(".nav-container").prependTo(".content-body").find(".content-body-nav").removeClass("body-nav-fixed");
		// $(".content-nav, .launch-button, .cancel-button, .progress-button, .progress-button button").removeClass("shrink-nav");
		// $(".action-buttons").removeClass("shrink-actions");
	}
});

$(".launch-button").click(function() {
	$(".launch-button").addClass("action-clicked");
	setTimeout(function() {
		$(".launch-button").css("display","none");
	},150);
});

$(".fa-heart, .fa-star, .fa-share").click(function() {
	$(this).toggleClass("action-clicked");
	$(".label").removeClass("show-label");
});

// $(".action-buttons .fa").hover(function() {
// 	var hover_left = $(this).position().left + 18;
// 	var icon_label = $(this).data('label');
// 	$(".tooltip").addClass("tooltip-active").css("left",hover_left);
// 	$(".tooltip").text(icon_label);
// });

// $(".action-buttons .fa-heart").hover(function() {
// 	if (!$(this).hasClass("action-clicked")) {
//        $(".endorse-label").addClass("show-label");
// 	}
// });

// $(".action-buttons .fa-star").hover(function() {
// 	if (!$(this).hasClass("action-clicked")) {
//        $(".save-label").addClass("show-label");
// 	}
// });

// $(".action-buttons .fa-share").hover(function() {
// 	if (!$(this).hasClass("action-clicked")) {
//        $(".share-label").addClass("show-label");
// 	}
// });

// $(".action-buttons .fa").mouseleave(function() {
//        $(".tooltip").removeClass("tooltip-active");
//        $(".label").removeClass("show-label");
// });

$(".fa-cog").hover(function() {
	$(".tooltip").addClass("tooltip-active");
});

$(".fa-cog").mouseleave(function() {
	$(".tooltip").removeClass("tooltip-active");
});

$(".fa-cog").click(function() {
	$(".progress-button").toggleClass("settings-active");
	$(".tooltip").css("opacity","0");
	$(".mark-private").toggleClass("mark-private-active");
});

$(".fa-share").click(function() {
	$(".share-footer, .share-filter").toggleClass("share-active");
	$(".share-overlay").toggleClass("share-active");
	$(".content-avatar, .content-avatar-mini").toggleClass("hide-keira");
	setTimeout(function() {
		$(".content-body-nav").toggleClass("share-active");
		$(".share-overlay").toggleClass("share-fade");
		$("body").animate({scrollTop: "110px"});
	},10);
});

$(".close-share").click(function() {
	$(".share-footer, .share-filter").toggleClass("share-active");
	$(".fa-share").toggleClass("action-clicked");
	$(".share-overlay").toggleClass("share-fade");
	$(".content-avatar").toggleClass("hide-keira");
	$(".content-body-nav").toggleClass("share-active");
	setTimeout(function() {
		$(".share-overlay").toggleClass("share-active");
	},250);
});

$(".share-user").click(function() {
	$(this).toggleClass("user-selected");
	$(this).find(".fa-check").toggleClass("user-selected");
});




[].slice.call( document.querySelectorAll( '.progress-button' ) ).forEach( function( bttn, pos ) {
       new UIProgressButton( bttn, {
               callback : function( instance ) {
                       var progress = 0,
                               interval = setInterval( function() {
                                       progress = Math.min( progress + Math.random() * 0.3, 1 );
                                       instance.setProgress( progress );

                                       if( progress === 1 ) {
                                               instance.stop( pos === 1 || pos === 3 ? -1 : 1 );
                                               clearInterval( interval );
                                       }
                               }, 150 );
               }
       } );
} );