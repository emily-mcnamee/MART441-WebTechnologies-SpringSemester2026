var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
var x2 = 100;
var y2 = 100;

var bgColor = "white";
var isColliding = false; 


class Square{
    constructor(x, y, height, width, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
    }
  
    setX(x){
       this.x = x;
    }
    setY(y){
       this.y = y;
    }
    setHeight(height){
       this.height = height;
    }
    setWidth(width){
       this.width = width;
    }
    setColor(color){
        this.color = color;
    }
    get theX(){
        return this.x;
    }
    get theY(){
        return this.y;
    }
    get theHeight(){
        return this.height;
    }
    get theWidth(){
        return this.width;
    }
    get theColor(){
        return this.color;
    }
}

var square1 = new Square(x, y, 38, 38, "blue");
var square2 = new Square(x2, y2, 50, 50, "green");

// original square sizes
var normalSize1 = 38;
var normalSize2 = 50;

// controls animation durationz
var growTimer = 0; 

// move enemy square
var dx2 = 1.2;  
var dy2 = 1.2;  

var keysPressed = {}; // track keys globally

// track key press and release
$(document).ready(function(){
    $(document).keydown(function(event){ getKey(event, true); });
    $(document).keyup(function(event){ getKey(event, false); });
    gameLoop();
});


function gameLoop() {
    drawSquare();
    requestAnimationFrame(gameLoop);
}

function getKey(event, isDown){
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char).toLowerCase();
    keysPressed[actualLetter] = isDown;
}

function drawSquare(){
    ctx.fillStyle = bgColor;  
    ctx.fillRect(0,0,canvas.width,canvas.height);
    movePlayer();

    // move square2
    square2.setX(square2.theX + dx2);
    square2.setY(square2.theY + dy2);

    // Bounce off walls
    if(square2.theX <= 0 || square2.theX + square2.theWidth >= canvas.width){
        dx2 *= -1;
    }
    if(square2.theY <= 0 || square2.theY + square2.theHeight >= canvas.height){
        dy2 *= -1;
    }
    // grabs random background color
    function getRandomColor() {
    var colors = ["#AA4A44", "#dec742", "#6d2463", "#CD7F32", "#FFC5D3", "black"];
    return colors[Math.floor(Math.random() * colors.length)];
    }
     
    // collision code
    if(hasCollided(square1, square2)) {
    if(!isColliding){
    // changes background color randomly
    bgColor = getRandomColor();

    // bounce square2
    dx2 *= -1;
    dy2 *= -1;
    // collide check
    isColliding = true;
    // trigger growth effect
    growTimer = 35; // number of frames

    // Push square1 away
    square1.setX(square1.theX - dx2 * 2);
    square1.setY(square1.theY - dy2 * 2);
    }} 
    else {
        isColliding = false;
    }
    // grow animation when squares collide
    var maxGrow = 10;

    if(growTimer > 0){
    growTimer--;

    var scale = Math.sin((growTimer / 20.5) * Math.PI); // smooth curve

    square1.setWidth(normalSize1 + maxGrow * scale);
    square1.setHeight(normalSize1 + maxGrow * scale);

    square2.setWidth(normalSize2 + maxGrow * scale);
    square2.setHeight(normalSize2 + maxGrow * scale);
    }
   // move the player character
    function movePlayer() {
    let dx = 0;
    let dy = 0;
    const speed = 2.25;

    if(keysPressed['w']) dy -= 1;
    if(keysPressed['s']) dy += 1;
    if(keysPressed['a']) dx -= 1;
    if(keysPressed['d']) dx += 1;

    // Normalize diagonal movement
    if(dx !== 0 || dy !== 0){
        const length = Math.sqrt(dx*dx + dy*dy);
        dx = (dx / length) * speed;
        dy = (dy / length) * speed;
    }

    // update square1
    square1.setX(square1.theX + dx);
    square1.setY(square1.theY + dy);

    // clamp to canvas
    square1.setX(Math.max(0, Math.min(square1.theX, canvas.width - square1.theWidth)));
    square1.setY(Math.max(0, Math.min(square1.theY, canvas.height - square1.theHeight)));}

    // draw square1
    ctx.fillStyle = square1.theColor;
    ctx.fillRect(square1.theX, square1.theY, square1.theWidth, square1.theHeight);

    // draw square2
    ctx.fillStyle = square2.theColor;
    ctx.fillRect(square2.theX, square2.theY, square2.theWidth, square2.theHeight);

}


// collision function
function hasCollided(object1, object2) {
return !(
    ((object1.theY + object1.theHeight) < (object2.theY)) ||
    (object1.theY > (object2.theY + object2.theHeight)) ||
    ((object1.theX + object1.theWidth) < object2.theX) ||
    (object1.theX > (object2.theX + object2.theWidth))
);
}

// audio track
var myAudio = document.getElementById('bgMusic');
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);    myAudio.play().catch(function(err){
    console.log("Autoplay was blocked:", err);
});