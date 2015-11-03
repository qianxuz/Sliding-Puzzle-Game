/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : Qianxu Zeng
Created : 2015.09.23
Modified : 2015.09.26
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

var IMAGE_PATH = "duck.jpg";
var IMAGE_WIDTH =  690;
var IMAGE_HEIGHT = 472;
// Change these if you use your own image.

var NUM_ROWS = 4;
var NUM_COLS = 4;

// Location of the empty tile: (I didn't use these)
var emptyRow = 0;
var emptyCol = 0;

var is_shuffle = false;
var step_num = 0;

var num = 0;
// Position of each div
var pos = new Array();
for(var i=0; i<4;i++){
  pos[i] = new Array();
  for(var j=0; j<4; j++){
    pos[i][j] = num;
    num++;
  }
} 

// Add any other global variables you may need here.

/**
 * Creates all the tiles necessary.
 * @return undefined
 */

function createTiles(){
  var img = new Image();
  var w = IMAGE_WIDTH/4;
  var h = IMAGE_HEIGHT/4;

  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){  
      var _div = createDiv(w,h,i,j);
      if(i===0)
        document.getElementById("row1").appendChild(_div);
      if(i===1)
        document.getElementById("row2").appendChild(_div);
      if(i===2)
        document.getElementById("row3").appendChild(_div);
      if(i===3)
      {
        if(j!=3)
          document.getElementById("row4").appendChild(_div);
        else{
          var blank_div = document.createElement("div");
          blank_div.style.width = w+"px";
          blank_div.style.height = h+"px";
          blank_div.style.margin = "1px";
          blank_div.style.overflow = "hidden";
          blank_div.style.backgroundImage = "url('white.jpg')";
          blank_div.style.backgroundPosition = 0+"px"+" "+0+"px";
          blank_div.style.display = "inline-block";
          blank_div.style.backgroundRepeat = "no";
          blank_div.id = 15;
          blank_div.classList.add("puzzlecell");
          document.getElementById("row4").appendChild(blank_div);

        }
      }       
    }
 }
   // figure out how wide and tall each tile should be
  
  // add all of the tiles to your page using nested for loops and
  // createDiv. Remember to leave one out for the empty tile
  
  // hint: you can use document.body.appendchild
  return undefined;
}

/**
 * Returns a div with the specified width and height and puts it at the
 * supplied row and column.
 * @param width Fill in what each of these parameters mean!
 * @param height
 * @param row
 * @param col
 * @return The div you created
 */
var n = 0;
function createDiv(width, height, row, col){
  // create your div and set its size & position attributes
  // based on parameters
  
  var w = IMAGE_WIDTH/4;
  var h = IMAGE_HEIGHT/4;
  var mydiv = document.createElement("div");
  mydiv.style.width = w+"px";
  mydiv.style.height = h+"px";
  //mydiv.style.height = mydiv.style.width * 0.22 * (IMAGE_HEIGHT / IMAGE_WIDTH) + "px";
  mydiv.style.margin = "1px";
  mydiv.style.overflow = "hidden";
  mydiv.style.display = "inline-block";
  mydiv.style.backgroundImage = "url('duck.jpg')";
  mydiv.style.backgroundPosition = (-(col*w))+"px"+" "+(-(row*h))+"px";
  mydiv.style.backgroundRepeat = "no";
  mydiv._row = row;
  mydiv._col = col;
  mydiv.id = n;
  mydiv.classList.add("puzzlecell");
  n = n+1;
  return mydiv;
	
  // Set the div's background
  // hint: css sprites (tutorial: http://css-tricks.com/css-sprites/) are a really
  // nice way to show only a portion of an image on a tile. 

  // add an event listener that will execute some function you define that will
  // move the clicked div to the empty tile location if the div is in a valid
  // position

  // a helpful gremlin left the following cryptic words scrawled here:
  // position absolute
  
	// return your result
}

/**
 * Example function that could get called when a tile is clicked.
 * @param Add whatever params you need!
 * @return Fill in what the function returns here!
 */
function tileClicked(){
        var id = $(this).attr("id");
        var x;
        var y;
        var swaping_cell;
        var temp;
        var flag = -1;
        var num_tile = 0;
        var SUCCESS = true; 
        var tag = parseInt(id);
        // find the position of $(this), row:x, column:y
        for(var i = 0;i<4;i++) 
          for(var j = 0;j<4;j++){
            if(pos[i][j]===tag){
              x = i;
              y = j;
              break;
            }
          }
        // check if the tile can move to the empty spot
        if(x>0&&pos[x-1][y]===15){
          swaping_cell = $("#" + 15).first(); //top
          flag = 1;
        }
        if(y<3&&pos[x][y+1]===15){ 
          swaping_cell = $("#" + 15).first(); //right
          flag = 2;
        }
        if(x<3&&pos[x+1][y]===15){
          swaping_cell = $("#" + 15).first(); //down
          flag = 3;
        }
        if(y>0&&pos[x][y-1]===15){ 
          swaping_cell = $("#" + 15).first(); //right
          flag = 4;
        }
        
        // if the tile can move, move the tile to the empty spot
        if(flag>0){
          // change backgroundImage, backgroundPosition, and id
          var swaping_image = swaping_cell.css("backgroundImage");
          swaping_cell.css("backgroundImage", $(this).css("backgroundImage"));
          $(this).css("backgroundImage", swaping_image);
           
          var swaping_position = swaping_cell.css("backgroundPosition");
          swaping_cell.css("backgroundPosition", $(this).css("backgroundPosition"));
          $(this).css("backgroundPosition", swaping_position);

          $('#15').attr("id",id);
          $(this).attr("id","15");

          // update values of Pos[][]
          switch(flag){
            case 1:
              temp = pos[x][y];
              pos[x][y] = pos[x-1][y];
              pos[x-1][y] = temp;
              break;
            case 2:
              temp = pos[x][y];
              pos[x][y] = pos[x][y+1];
              pos[x][y+1] = temp;
              break;
            case 3:
              temp = pos[x][y];
              pos[x][y] = pos[x+1][y];
              pos[x+1][y] = temp;
              break;
            case 4:
              temp = pos[x][y];
              pos[x][y] = pos[x][y-1];
              pos[x][y-1] = temp;
              break;
            default:
              break;
          }
        }
        
        // check whether the player is success
        // Do not check if it is shuffling
        if(!is_shuffle){
          step_num++;
          document.getElementById("moves").innerHTML = 'Number of Moves: ' + step_num;
          for(var i = 0; i < 4;i++){
            for(var j =0;j< 4;j++){
              if(pos[i][j]===num_tile){
                num_tile++;
              }
              else{
                SUCCESS = false;
                break;
              }
            }
          }
          if(SUCCESS)
            alert("Congratulations!");
        }
}

/**
 * Shuffle up the tiles in the beginning of the game
 * @return
 */
// simulate a mouse click to make sure shuffling results are in a solvable puzzle state
function shuffleTiles(){
  is_shuffle = true;
  var shuffle_num;
  shuffle_num = Math.floor(Math.random()*500);
  for(var i = 0; i<shuffle_num; i++)
  {
    var id;
    id = Math.floor(Math.random()*15);
    $("#"+id).trigger("click");
  }
  is_shuffle = false;
  step_num = 0;
  document.getElementById("moves").innerHTML = 'Number of Moves: ' + step_num;
}

//Keyboard controls: when you press the up arrow key, 
//make it move the tile below the empty tile up, 
//and similarly with left, right, and down.
function tileKeydown(){
  var flag = -1;
  var id = $("#15").attr("id");
  var tag = parseInt(id);
  var x;
  var y;
  var swaping_cell;
  var temp;
  var num_tile = 0;
  var SUCCESS = true;
  for(var i = 0;i<4;i++)
    for(var j = 0;j<4;j++){
      if(pos[i][j]===tag){
        x = i;
        y = j;
        break;
      }
    }
  if(event.keyCode===39){
    if(y>0){
      var swaping_cell = $("#" + pos[x][y-1]).first();
      flag = 4;
    }
  }
  if(event.keyCode===40){
    if(x>0){
      var swaping_cell = $("#" + pos[x-1][y]).first();
      flag = 1;
    }
  }
  if(event.keyCode===37){
    if(y<3){
      var swaping_cell = $("#" + pos[x][y+1]).first();
      flag = 2;
    }
  }
  if(event.keyCode===38){
    if(x<3){
      var swaping_cell = $("#" + pos[x+1][y]).first();
      flag = 3;
    }
  }
  if(flag>0){
    var swaping_image = swaping_cell.css("backgroundImage");
    swaping_cell.css("backgroundImage", $("#15").css("backgroundImage"));
    $("#15").css("backgroundImage", swaping_image);
           
    var swaping_position = swaping_cell.css("backgroundPosition");
    swaping_cell.css("backgroundPosition", $("#15").css("backgroundPosition"));
    $("#15").css("backgroundPosition", swaping_position);

    $('#15').attr("id",swaping_cell.attr("id"));
    swaping_cell.attr("id","15");

    switch(flag){
      case 1:
        temp = pos[x][y];
        pos[x][y] = pos[x-1][y];
        pos[x-1][y] = temp;
        break;
      case 2:
        temp = pos[x][y];
        pos[x][y] = pos[x][y+1];
        pos[x][y+1] = temp;
        break;
      case 3:
        temp = pos[x][y];
        pos[x][y] = pos[x+1][y];
        pos[x+1][y] = temp;
        break;
      case 4:
        temp = pos[x][y];
        pos[x][y] = pos[x][y-1];
        pos[x][y-1] = temp;
        break;
      default:
        break;
      }
    }
   
    step_num++;
    document.getElementById("moves").innerHTML = 'Number of Moves: ' + step_num;
    for(var i = 0; i < 4;i++){
      for(var j =0;j< 4;j++){
        if(pos[i][j]===num_tile){
          num_tile++;
        }
        else{
          SUCCESS = false;
          break;
        }
      }
    }
    if(SUCCESS)
      alert("Congratulations!");
}

/**
 * When the page loads, create our puzzle
 */
window.onload = function () {
  // create the tiles
  createTiles();
  $(".puzzlecell").click(tileClicked);
  // shuffle the tiles
  shuffleTiles();
  document.onkeydown = tileKeydown;
  is_shuffle = false;
  $("#reset").click(shuffleTiles);

  $(window).resize(function() {
    var width = $(this).width();
    $(".puzzlecell").each(function(){
      var w = width * 0.15, h = width * 0.15 * (IMAGE_HEIGHT / IMAGE_WIDTH);
      var id = parseInt($(this).attr("id"))
      var col = id % 4, row = Math.floor(id / 4);
      $(this).css("width", w);
      $(this).css("height", h);
      $(this).css("backgroundSize", "400% 400%");
      $(this).css("backgroundPosition", (-(col*w))+"px"+" "+(-(row*h))+"px");

    });
  });
  // generate parameters for a random puzzle  
}
