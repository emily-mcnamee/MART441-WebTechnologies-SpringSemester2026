class Square {
  constructor(x, y, w, h) {
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

  setX(x)
  {
    this.x = x;
  }

    setY(y)
  {
    this.y = y;
  }


}

class Ellipse {
  constructor(x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.rotation = rotation;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }
draw(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
  ctx.fill();
}
  get theX() {
    return this.x;
  }

  get theY() {
    return this.y;
  }

  get theRadiusX() {
    return this.radiusX;
  }

  get theRadiusY() {
    return this.radiusY;
  }

  get theRotation() {
    return this.rotation;
  }

  get theStartAngle() {
    return this.startAngle;
  }

  get theEndAngle() {
    return this.endAngle;
  }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
let score = 0;

let theSquare = {
  "x": 85,
  "y": 75,
  "w": 25,
  "h": 200,
}

let theEllipse = {
  "x": 150,
  "y": 150,
  "radiusX": 10,   
  "radiusY": 10,   
  "rotation": 0,
  "startAngle": 0,
  "endAngle": Math.PI * 2
};

var myObjects = [];
var player;
player = new Square(x,y,20,20);

var currentX = theSquare.x;
for(let i = 0; i < 6; i++)
{
  var myObject = new Square(currentX, theSquare.y, theSquare.w, theSquare.h);
  myObjects.push(myObject);
  currentX += 90;
}

var myEllipses = [];

let startX = 100;

for (let i = 0; i < 5; i++) {
  let ellipse = new Ellipse(
    startX,
    theEllipse.y,
    theEllipse.radiusX,             
    theEllipse.radiusY,            
    theEllipse.rotation,              
    theEllipse.startAngle,
    theEllipse.endAngle
  );

  myEllipses.push(ellipse);
  startX += 60;
}

drawSquare();
placeDiagonally();
randomizeObjects();

setInterval(update, 1000 / 60);

function update() {
  drawSquare();
}

function drawSquare() {


  // remove smear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the rectangles
  
  for(let i = 0; i < myObjects.length; i++)
  {
  ctx.fillRect(myObjects[i].theX, myObjects[i].theY, myObjects[i].theW, myObjects[i].theH);
  }

  // draw the collectables

  for (let e of myEllipses) {
    e.draw(ctx);
  }
  

  // draw the scorecount
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 150, 30); 
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);


  // re-fill the rectangles
  ctx.fillStyle = "#0000FF";
  ctx.fillRect(player.theX, player.theY, player.theW, player.theH);
}

function randomizeObjects() {
  for (let obj of myEllipses) {

    let valid = false;

    while (!valid) {

      let newX = Math.random() * (canvas.width - obj.theRadiusX * 2) + obj.theRadiusX;
      let newY = Math.random() * (canvas.height - obj.theRadiusY * 2) + obj.theRadiusY;

      let testEllipse = {
        x: newX,
        y: newY,
        radiusX: obj.radiusX,
        radiusY: obj.radiusY
      };

      let collision = myObjects.some(rect =>
        hasCollided(rect, {
          x: newX - obj.radiusX,
          y: newY - obj.radiusY,
          w: obj.radiusX * 2,
          h: obj.radiusY * 2
        })
      );

      if (!collision) {
        obj.x = newX;
        obj.y = newY;
        valid = true;
      }
    }
  }
}

function placeDiagonally() {
  let startX = 180;
  let startY = 0;
  let step = 90;

  for (let i = 0; i < myObjects.length; i++) {
    let x = startX + i * step;
    let y = startY + i * step;

    // keep inside canvas
    x = Math.min(x, canvas.width - myObjects[i].theW);
    y = Math.min(y, canvas.height - myObjects[i].theH);

    myObjects[i].setX(x);
    myObjects[i].setY(y);
  }
}

// collision function

function hasCollided(object1, object2) {
    return !(
        ((object1.y + object1.h) < (object2.y)) ||
        (object1.y > (object2.y + object2.h)) ||
        ((object1.x + object1.w) < object2.x) ||
        (object1.x > (object2.x + object2.w))
    );
}

 // collectable collision 

function circleRectCollision(rect, circle) {
  let cx = circle.x;
  let cy = circle.y;
  let radius = circle.radiusX;

  let closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  let closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));

  let dx = cx - closestX;
  let dy = cy - closestY;

  return (dx * dx + dy * dy) <= radius * radius;
}

// Movement code

$(document).ready(function () {
  $(this).keypress(function (event) {
    getKey(event);
  });
});

function getKey(event) {
  var char = event.which || event.keyCode;
  var actualLetter = String.fromCharCode(char);
  
  let newX = x;
  let newY = y;

  // Calculate intended movement
  if (actualLetter == 'w') newY -= 15;
  else if (actualLetter == 's') newY += 15;
  else if (actualLetter == 'd') newX += 15;
  else if (actualLetter == 'a') newX -= 15;
  
  // Check collision with ALL objects
  let testPlayer = new Square(newX, newY, player.theW, player.theH);

  let collided = myObjects.some(obj => hasCollided(testPlayer, obj));

  // Keep inside canvas
  newX = Math.max(0, Math.min(canvas.width - player.theW, newX));
  newY = Math.max(0, Math.min(canvas.height - player.theH, newY));

  // only apply movement if there's no collision
  if (!collided) {
    x = newX;
    y = newY;
    player.setX(x);
    player.setY(y);
  }

  for (let i = myEllipses.length - 1; i >= 0; i--) {
    if (circleRectCollision(player, myEllipses[i])) {
      myEllipses.splice(i, 1);
      score += 1;
    }

}
  drawSquare();
}


//old movement code
/*function getKey(event) {
  var char = event.which || event.keyCode;
  var actualLetter = String.fromCharCode(char);

//Collision
for (let i = 0; i < myObjects.length; i++) {
  if (hasCollided(player, myObjects[i])) {
    break; // stop after first collision (optional)
  }
}

  if (actualLetter == 'w') 
  {
    y-=5;
    player.setY(y);
  }
  else if (actualLetter == 's') 
  {
    y+=5;
    player.setY(y);
  }
  else if (actualLetter == 'd') 
  {
    x+=5;
    player.setX(x);
  }
  else if (actualLetter == 'a')
  {
    x-=5;
    player.setX(x);
  } 
  drawSquare();
}*/