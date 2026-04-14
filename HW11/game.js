class Square
{
  constructor(x, y, w, h)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  get theX()
  {
    return this.x;
  }

  get theY()
  {
    return this.y;
  }

  get theW()
  {
    return this.w;
  }

  get theH()
  {
    return this.h;
  }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
ctx.fillStyle = "#0000FF";
drawSquare();
setInterval(update, 1000/60);
/*let mySquare = {
  "x": 10,
  "y": 10,
  "w": 20,
  "h": 20
}*/
function update()
{
  drawSquare();
}

function drawSquare()
{
  var mySquare = new Square(100,100,50,50)
  //ctx.clearRect(0,0,800,600);
  ctx.fillRect(mySquare.theX, mySquare.theY, mySquare.theW, mySquare.theH)
}

$(document).ready(function () {
  $(this).keypress(function (event) {
    getKey(event);
  });
});


function getKey(event)
{
  var char = event.which || event.keyCode;
  var actualLetter = String.fromCharCode(char);

  if(actualLetter == 'd'){ mySquare.x++;}
  if(actualLetter == 'a'){ mySquare.x--;}
  if(actualLetter == 'w'){ mySquare.y--;}
  if(actualLetter == 's'){ mySquare.y++;}
}