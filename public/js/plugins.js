/* Sidebar Menu */
$(document).ready(function(){
  $(".toggle-search").click(function(){
      $('.search-box-responsive').slideToggle(100);
  });
});

/*Lyrics*/
$(document).ready(function(){
  $(".lyrics-link").click(function(){
    //$('.lyrics-container').fadeOut('fast');
    $(this).parent().parent().siblings().children( ".responsive-music" ).children( ".lyrics-container" ).fadeOut( "fast" , function() {
    });
    $(this).parent( ".responsive-music" ).children( ".lyrics-container" ).fadeToggle( "fast" );
  });
});



/* Team Dropdown Menu */
jQuery(function () {
    // remove the below comment in case you need chnage on document ready
    // location.href=jQuery("#selectbox").val(); 
    jQuery("#team-url").change(function () {
        location.href = jQuery(this).val();
    })
})

/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Popover */
$(function () {
  $('[data-toggle="popover"]').popover()
})

/* Page Loading */
$(window).load(function() {
  $(".loading").fadeOut(750);
})

/*Thumb Scroll*/
$(window).load(function(){
	$("#thumb-scroll").mThumbnailScroller({
		type:"click-50",
		theme:"buttons-out"
	});
});

/*Main Video Carousel*/
$(document).ready(function() {
  $(window).load(function(){
    $('#top-carousel').carousel("pause");
  });

  //Occurs when the carousel has finished sliding from one item to another
  $('#top-carousel').on('slid.bs.carousel', function () {
    var activeItem = $(this).find('.item.active');
    var videoName = activeItem.attr('data-video-name');
    $('#main-daily-motion-video-name').text(videoName);

    //Set as active the mini-video in the highlights section
    var index = activeItem.attr('data-index');

    $("#thumb-scroll a").removeClass('active');
    $("#thumb-scroll").mThumbnailScroller("scrollTo", index);
    if(index >= 4){
      $("#thumb-scroll").mThumbnailScroller("scrollTo", "right");
    }
    else{
      $("#thumb-scroll").mThumbnailScroller("scrollTo", "left"); 
    }

    $("#thumb-scroll a").each(function(){
      if($(this).attr('data-slide-to') == index.toString()){
        $(this).addClass('active');
        return false;
      }
    });
  });
});

