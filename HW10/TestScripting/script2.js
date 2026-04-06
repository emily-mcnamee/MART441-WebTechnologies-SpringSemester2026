class Square{
    constructor(x, y, height, width, color)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }
  
    setX(x)
    {
       this.x = x;
    }
    setY(y)
    {
       this.y = y;
    }
    setHeight(height)
    {
       this.height = height;
    }
    setWidth(width)
    {
       this.width = width;
    }
    setColor(color)
    {
        this.color = color;
    }
    get theX()
    {
        return this.x;
    }
    get theY()
    {
        return this.y;
    }
    get theHeight()
    {
        return this.height;
    }
    get theWidth()
    {
        return this.width;
    }
    get theColor()
    {
        return this.color;
    }
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
var x2 = 100;
var y2 = 100;
var square1;
var square2;

// move enemy square
var dx2 = 2;  
var dy2 = 2;  

function gameLoop() {
    drawSquare();
    requestAnimationFrame(gameLoop);
}

gameLoop();

function drawSquare()
{
  ctx.clearRect(0,0,800,600);

    // square2 movement
  x2 += dx2;
  y2 += dy2;

  // Bounce off walls (simple cycle)
  if(x2 <= 0 || x2 + 50 >= canvas.width){
      dx2 *= -1;
  }
  if(y2 <= 0 || y2 + 50 >= canvas.height){
      dy2 *= -1;
  }


  square1 = new Square(x,y,20,20,"blue");
  ctx.fillStyle = square1.theColor;
  ctx.fillRect(square1.theX, square1.theY, square1.theWidth, square1.theHeight);

  square2 = new Square(x2,y2,50,50,"green");
  ctx.fillStyle = square2.theColor;
  ctx.fillRect(square2.theX, square2.theY, square2.theWidth, square2.theHeight);
  
}

$(document).ready(function(){

      $(this).keypress(function(event){
        getKey(event);
      });
      });

function getKey(event)
{
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);

    var dx = 0;
    var dy = 0;

    // Determine movement direction
    if(actualLetter == "w"){
        dy = -10;
    }
    else if (actualLetter == 's'){
        dy = 10;
    }
    else if (actualLetter == 'a'){
        dx = -10;
    }
    else if (actualLetter == 'd'){
        dx = 10;
    }

    // Move first
    x += dx;
    y += dy;

    // Update square1 with new position BEFORE collision check
    square1 = new Square(x, y, 20, 20, "blue");

    // Check collision
    if(hasCollided(square1, square2)) {
        // Bounce back (reverse direction)
        x -= dx * 1.5;
        y -= dy * 1.5;
    }

    drawSquare();

}

    function moveUp(){
    y -= 10;
    }
    function moveDown(){
    y += 10;
    }
    function moveLeft(){
    x -= 10;
    }
    function moveRight(){
    x += 10;
    };

    function hasCollided(object1, object2) {
    return !(
        ((object1.theY + object1.theHeight) < (object2.theY)) ||
        (object1.theY > (object2.theY + object2.theHeight)) ||
        ((object1.theX + object1.theWidth) < object2.theX) ||
        (object1.theX > (object2.theX + object2.theWidth))
    );
    }
