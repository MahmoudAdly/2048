function resizeTouchpad() {
  $(".touchpad").css('position', 'absolute');
  $(".touchpad").offset($(".stage").offset());
  $(".touchpad").css('width', $('.stage').width());
  $(".touchpad").css('height', $('.stage').height());
}

$( window ).load(function() {
  resizeTouchpad();
  //Enable swiping...
  $(".touchpad").swipe( {
    tap:function(event, target) {
      console.log(event);
    },
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction ); 
    },
    threshold:50
  });
});

$(window).on('resize', function() {
  resizeTouchpad();
});