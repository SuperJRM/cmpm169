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
  angleMode(DEGREES);
  bronze = color(208,162,52)
  // Array storing current rotations of gears
  spinY = []
  for (let sy = 0; sy < 5; sy++) {
    let spinX = [];
    for (let sx = 0; sx < 5; sx++) {
      spinX.push(0);
    }
    spinY.push(spinX);
  }
  // Array storing current acceleration of gears
  inY = []
  for (let sy = 0; sy < 5; sy++) {
    let inX = [];
    for (let sx = 0; sx < 5; sx++) {
      inX.push(0);
    }
    inY.push(inX);
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  // Set up rotation for the rectangle
  push(); // Save the current drawing context
  translate(centerHorz, centerVert); // Move the origin to the rectangle's center
  rotate(frameCount / 100.0); // Rotate by frameCount to animate the rotation
  fill(234, 31, 81);
  noStroke();
  rect(-125, -125, 250, 250); // Draw the rectangle centered on the new origin
  pop(); // Restore the original drawing context

  // The text is not affected by the translate and rotate
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text("p5*", centerHorz - 105, centerVert + 40);

  // Start of draw() code
  background(0);
  // Creates 5x5 grid of gears
  for (let sy = 0; sy < 5; sy++) {
    for (let sx = 0; sx < 5; sx++) {
      push()
      scale(.5)
      translate(sx*500, sy*500);
      // Uses rotation and acceleration from array
      spinCount = spinY[sy][sx];
      spIncrease = inY[sy][sx];
      // Rotates canvas and creates rotated gear
      spinCount = spinCount + spIncrease;
      rotate(spinCount);
      gearMake()
      // Decreases acceleration
      if(spIncrease>0){
        spIncrease-= 1.75/deltaTime;
      }
      if (spIncrease<0) {
        spIncrease=0;
      }
      // Saves new rotation and acceleration to array
      spinY[sy][sx] = spinCount;
      inY[sy][sx] = spIncrease;
      pop();
    }
  }
}

// Function to draw a gear
function gearMake() {
  noFill();
  circle(0,0,100);
  fill(bronze);
  circle(0,0,250);
  fill(0,0,0)
  circle(0,0,100);
  // For loop draws gear teeth
  for (let angle=0; angle<=330; angle+=30) {
    push();
    rotate(angle);
    fill(bronze);
    noStroke();
    square(-18,-155,36);
    pop();
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  gearX = round(mouseX/250);
  gearY = round(mouseY/250);
  print(gearX,gearY)
  inY[gearY][gearX] += 3.5;
  
  // Edge Cases and neighbor gear acceleration
  if (gearX != 0 && gearY != 0) {
    inY[gearY-1][gearX-1] += 1.75;
  }
  if (gearX != 0) {
    inY[gearY][gearX-1] += 2.5;
  }
  if (gearY != 0) {
    inY[gearY-1][gearX] += 2.75;
  }
  if (gearX != 5 && gearY != 5) {
    inY[gearY+1][gearX+1] += 1.75;
  }  
  if (gearX != 5) {
    inY[gearY][gearX+1] += 2.5;
  }  
  if (gearY != 5) {
    inY[gearY+1][gearX] += 2.5;
  }
  
  if (gearX != 0 && gearY != 5) {
    inY[gearY+1][gearX-1] += 1.75;
  }
  if (gearX != 5 && gearY != 0) {
    inY[gearY-1][gearX+1] += 1.75;
  }
}