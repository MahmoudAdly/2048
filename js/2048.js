var svg = null;

function resizeTouchpad() {
  $(".touchpad").css('position', 'absolute');
  $(".touchpad").offset($(".stage").offset());
  $(".touchpad").css('width', $('.stage').width());
  $(".touchpad").css('height', $('.stage').height());
}

$(window).load(function() {
  resizeTouchpad();
  
  $(".touchpad").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log(direction);
      switch(direction) {
        case "left":
          break;
        case "up":
          break;
        case "right":
          break;
        case "down":
          break;
        default:
      }
    },
    threshold:50
  });
});

$(window).bind('resize', function() {
  resizeTouchpad();
});

$(window).keydown(function(e){
  switch(e.keyCode) {
    case 37:
      // left
      e.preventDefault();
      break;
    case 38:
      // up
      e.preventDefault();
      break;
    case 39:
      // right
      e.preventDefault();
      break;
    case 40:
      // down
      e.preventDefault();
      break;
    default:
  }
});

// svg document loading
(function () {
  var embeds, embed, i, onSvgLoaded;
  onSvgLoaded = function () {
    svg = $( this.getSVGDocument().documentElement );
  };
  embeds = document.querySelectorAll('embed');
  for (i=0; embed=embeds[i]; i++) {
    embed.addEventListener('load', onSvgLoaded);
  }
})();
