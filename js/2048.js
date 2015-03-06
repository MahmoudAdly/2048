var board = {
  svg: null,
  currentScore: 0,
  bestScore: 0,
  tileInitialValue: 2,
  tileEmptyValue: 0,
  array: [[0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
          ],
  stackingLoopLimit: 3,
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
  // reset board and scores
  reset: function() {
    // clear array
    for(var i=0; i<4; i++) {
      for(var j=0; j<4; j++) {
        this.array[i][j] = 0;
      }
    }
    // clear score
    this.currentScore = 0;

    // create new tiles
    this.addNewTile();
    this.addNewTile();

    this.updateView();
  },
  // add a new tile in a random empty tile
  addNewTile: function() {
    // find empty places
    var emptyTiles = [];
    for(var i=0; i<4; i++) {
      for(var j=0; j<4; j++) {
        if (this.array[i][j] == 0) {
          emptyTiles.push({'i':i, 'j':j});
        }
      }
    }
    if (emptyTiles.length == 0)
      return false;
    // select one in random
    var rand_num =  Math.floor(Math.random() * (emptyTiles.length-1));
    var rand_tile = emptyTiles[rand_num];
    this.array[rand_tile['i']][rand_tile['j']] = this.tileInitialValue;
    return true;
  },
  // the non-empty tile takes the place of the empty one
  challenge: function(a,b) {
    var aVal = this.array[a['i']][a['j']];
    var bVal = this.array[b['i']][b['j']];
    if (aVal == this.tileEmptyValue && bVal != this.tileEmptyValue) {
      this.array[a['i']][a['j']] = bVal;
      this.array[b['i']][b['j']] = this.tileEmptyValue;
      return true;
    } else {
      return false;
    }
  },
  // two similar tiles merge with value sum
  merge: function(a,b) {
    var aVal = this.array[a['i']][a['j']];
    var bVal = this.array[b['i']][b['j']];
    if(aVal != this.tileEmptyValue && aVal == bVal) {
      var newVal = aVal + bVal
      this.array[a['i']][a['j']] = newVal;
      this.array[b['i']][b['j']] = this.tileEmptyValue;

      this.currentScore += newVal;
      if (this.currentScore > this.bestScore) {
        this.bestScore = this.currentScore;
      }

      return true;
    } else {
      return false;
    }
  },
  // move tiles to the right/left and do the moving and merging.
  // default is right
  swipeH: function(reverse) {
    reverse = (typeof(reverse)==='boolean') ? reverse : false ;
    var jArr = (reverse == false) ? [3,2,1] : [0,1,2] ;
    var incrementer = (reverse == false) ? -1 : 1 ;
    
    // create a new tile only if a movement has happened
    var changeHappened = false;

    // this process takes three loops: stack, merge, stack again
    for(var i=0; i < this.array.length; i++) {
      for(var loop=0; loop<this.stackingLoopLimit; loop++) {
        for(var x in jArr) {
          var j = jArr[x];
          var change = this.challenge({'i':i, 'j':j}, {'i': i, 'j': j+incrementer});
          changeHappened = changeHappened || change;
        }
      }
      for(var x in jArr) {
        var j = jArr[x];
        var change = this.merge({'i':i, 'j':j}, {'i': i, 'j': j+incrementer});
        changeHappened = changeHappened || change;
      }
      for(var loop=0; loop<this.stackingLoopLimit; loop++) {
        for(var x in jArr) {
          var j = jArr[x];
          var change = this.challenge({'i':i, 'j':j}, {'i': i, 'j': j+incrementer});
          changeHappened = changeHappened || change;
        }
      }
    }
    // add new tile and update view
    if(changeHappened ==true) {
      this.addNewTile();
    }
    this.updateView();
  },
  // move tiles to the down/up and do the moving and merging.
  // default is down
  swipeV: function(reverse) {
    reverse = (typeof(reverse)==='boolean') ? reverse : false;
    var iArr = (reverse == false) ? [3,2,1] : [0,1,2] ;
    var incrementer = (reverse == false) ? -1 : 1 ;

    // create a new tile only if a movement has happened
    var changeHappened = false;

    // this process takes three loops: stack, merge, stack again
    for(var loop=0; loop<this.stackingLoopLimit; loop++) {
      for(var x in iArr) {
        var i = iArr[x];      
        for(var j=0; j < this.array.length; j++) {
          var change = this.challenge({'i':i, 'j':j}, {'i': i+incrementer, 'j': j});
          changeHappened = changeHappened || change;
        }
        for(var j=0; j < this.array.length; j++) {
          var change = this.merge({'i':i, 'j':j}, {'i': i+incrementer, 'j': j});
          changeHappened = changeHappened || change;
        }
        for(var j=0; j < this.array.length; j++) {
          var change = this.challenge({'i':i, 'j':j}, {'i': i+incrementer, 'j': j});
          changeHappened = changeHappened || change;
        }
      }
    }
    // add new tile and update view
    if(changeHappened == true) {
      this.addNewTile();
    }
    this.updateView();
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

// load svg object to have access to it
(function () {
  var onSvgLoaded = function () {
    board.svg = $( this.getSVGDocument().documentElement );
  };
  document.querySelectorAll('embed')[0].addEventListener('load', onSvgLoaded);
})();

$(window).bind('resize', function() {
  resizeTouchpad();
});

$(window).load(function() {
  resizeTouchpad();

  // initialize swipe listener
  $(".touchpad").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      switch(direction) {
        case "left":
          board.swipeH(true);
          break;
        case "up":
          board.swipeV(true);
          break;
        case "right":
          board.swipeH();
          break;
        case "down":
          board.swipeV();
          break;
        default:
      }
    },
    threshold:50
  });

  $(".new-game").click(function() {
    board.reset();
  });

  board.reset();

});

$(window).keydown(function(e){
  switch(e.keyCode) {
    case 37:
      // left
      e.preventDefault();
      board.swipeH(true);
      break;
    case 38:
      // up
      e.preventDefault();
      board.swipeV(true);
      break;
    case 39:
      // right
      e.preventDefault();
      board.swipeH();
      break;
    case 40:
      // down
      e.preventDefault();
      board.swipeV();
      break;
    default:
  }
});

