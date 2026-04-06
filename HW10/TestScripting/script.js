var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
ctx.fillStyle = "#0000FF";
drawSquare();
setInterval(update, 1000/60);

function update()
{
  drawSquare();

}

function drawSquare()
{
  ctx.clearRect(0,0,800,600);
  ctx.fillRect(x, y, 20, 20);
  x++;
}