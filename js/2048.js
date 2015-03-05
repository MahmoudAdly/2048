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
    tap:function(event, target) {
      console.log(event);
    },
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction ); 
    },
    threshold:50
  });
});

$(window).bind('resize', function() {
  resizeTouchpad();
});

(function () {
  var embeds, embed, i, onSvgLoaded;

  onSvgLoaded = function () {
    svg  = $( this.getSVGDocument().documentElement );
  };

  embeds = document.querySelectorAll('embed');

  for (i=0; embed=embeds[i]; i++) {
    embed.addEventListener('load', onSvgLoaded);
  }
})();