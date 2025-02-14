// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let mousePosX = 0;
let mousePosY = 0;
let lerpX = 0;
let lerpY = 0;
let cubeCount = 18;
let posListX = [];
let posListY = [];
let rotList = [];
let lerpRot = 0;
let ringCount = [];

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  // Start of setup() code
  createCanvas(screen.availWidth, screen.availHeight, WEBGL);
  background(0);
  for (i = 0; i < cubeCount; i++) {
    posListX.push(0);
    posListY.push(0);
    rotList.push(0);
    ringCount.push(random(4, 7));
  }
  fill(0,0,227);
  specularMaterial(125);
  metalness(75);  
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  directionalLight(255,255,255,-0.5,0,-1)
  background(0);
  stroke(252, 252, 252);
  for (x = 0; x < cubeCount; x++) {
    push();
    lerpX = lerp(posListX[x], mousePosX, (0.005*(x+1)));
    lerpY = lerp(posListY[x], mousePosY, (0.005*(x+1)));
    translate(lerpX,lerpY,0);
    posListX[x] = lerpX;
    posListY[x] = lerpY;
    rotateX((frameCount%3600)/(x*10));
    lerpRot = lerp(rotList[x],((PI/2)*(posListY[x]/(height/2))), 0.5);
    rotateZ(lerpRot);
    rotList[x] = lerpRot;
    for (i = 0; i < ringCount[x]; i++){
      push();
      rotateX((2*PI/ringCount[x])*i);
      translate(0,sin(x*frameCount/100+25)*50,0);
      box((sin(x*frameCount/500+10)*50));
      pop();
    }
    pop();
  }
}

function mouseDragged() {
  mousePosX = (mouseX) - (width/2);
  mousePosY = (mouseY) - (height/2);
}