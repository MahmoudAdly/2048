var board = {
  svg: null,
  currentScore: 0,
  bestScore: 0,
  array: [[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
          ],
  // get tile and text styles for the matching value
  selectStyle: function(value) {
    switch(value) {
      case 0: return {
        'tile': { 'fill': '#d7c9c0' },
        'text': { 'font-size': '0px', 'fill': '#d7c9c0' }
      }
      case 2: return {
        'tile': { 'fill': '#eee4da' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#776e65' }
      }
      case 4: return {
        'tile': { 'fill': '#ede0c8' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#776e65' }
      }
      case 8: return {
        'tile': { 'fill': '#f2b179' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 16: return {
        'tile': { 'fill': '#f59563' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 32: return {
        'tile': { 'fill': '#f67c5f' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 64: return {
        'tile': { 'fill': '#f65e3b' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 128: return {
        'tile': { 'fill': '#edcf72' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 256: return {
        'tile': { 'fill': '#edcc61' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 512: return {
        'tile': { 'fill': '#edc850' },
        'text': { 'font-size': '55px', 'font-weight': 'bold', 'fill': '#f9f6f2' }
      }
      case 1024: return {
        'tile': { 'fill': '#edc53f' },
        'text': { 'font-size': '50px', 'font-weight': 'normal', 'fill': '#f9f6f2' }
      }
      case 2048: return {
        'tile': { 'fill': '#edc22e' },
        'text': { 'font-size': '50px', 'font-weight': 'normal', 'fill': '#f9f6f2' }
      }
      default: return {
        'tile': { 'fill': '#3c3a32' },
        'text': { 'font-size': '40px', 'font-weight': 'normal', 'fill': '#f9f6f2' }
      }  
    }
  },
  // zero all board numbers
  reset: function() {
    // clear array
    for(var i=0; i<4; i++) {
      for(var j=0; j<4; j++) {
        this.array[i][j] = 0;
      }
    }
    // clear score
    this.currentScore = 0;
  },
  shift: function() {

  },
  merge: function() {
    // body...
  },
  hswipe: function() {
    // body...
  },
  vswipe: function() {
    // body...
  },
  // update the svg tiles and score
  updateView: function() {
    for(var i=0; i<4; i++) {
      for(var j=0; j<4; j++) {
        // get the style matching the value
        var val = this.array[i][j];
        var valStyle = this.selectStyle(val);

        // apply style on tile and text
        this.svg.find('#tile'+i+j).css(valStyle['tile']);
        this.svg.find('#text'+i+j).css(valStyle['text']);

        // set the text with the value
        this.svg.find('#text'+i+j).find('tspan').html(val);
      }
    }
    this.svg.find('#textScore').find('tspan').html(this.currentScore);
    this.svg.find('#textBest').find('tspan').html(this.bestScore);
  }
};

// resize the span listening to the swipe events to cover the board
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

// load svg object to have access to it
(function () {
  var onSvgLoaded = function () {
    board.svg = $( this.getSVGDocument().documentElement );
  };
  document.querySelectorAll('embed')[0].addEventListener('load', onSvgLoaded);
})();
