if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}
$(function() {

    "use strict"; 
    $('#bidtime1').countdown('2023/10/15', function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
    $('#bidtime2').countdown('2024/12/02', function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
    $('#bidtime3').countdown('2022/11/11', function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
    $('#bidtime4').countdown('2022/08/14', function(event) {
      $(this).html(event.strftime('%H:%M:%S'));
    });
});