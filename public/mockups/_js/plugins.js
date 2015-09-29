/* Sidebar Menu */
$(document).ready(function(){
  $(".toggle-search").click(function(){
      $('.search-box-responsive').slideToggle(100);
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

