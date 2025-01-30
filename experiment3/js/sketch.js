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
let angle = 4;
let count = 0;
let balance = "both"
let zap;

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

function preload() {
  soundFormats('mp3');
  zap = loadSound("../sounds/zip.mp3");
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

  background(0);
  if (mouseIsPressed) {
    if (!zap.isPlaying()) {
      zap.play();      
    }
    stroke(random(167,212), random(100,147), 255);
    translate(width / 2, height);
    branch(height / 4, angle, count, balance);
  }
  else {
    zap.stop()
  }
}

function branch(len, angle, count, balance) {
  angle = PI/random(6,10)
  line(0, 0, 0, -len);
  translate(0, -len);
  if (count <= 3) {
    count++;
    if (balance == "right" || balance == "both") {
      push();
      rotate(angle);
      if (balance == "right") {
        tempBalance = random(["left", "both", "none"]);
      }
      else {
        tempBalance = random(["left, right", "both"])
      }
      branch(len * random(0.5, 1.2), angle, count, tempBalance);
      pop();
    }
    if (balance == "left" || balance == "both") {
      push();
      rotate(-angle);
      if (balance == "left") {
        tempBalance = random(["right", "both", "none"]);
      }
      else {
        tempBalance = random(["left, right", "both"])
      }
      branch(len * random(0.5, 1.2), angle, count, tempBalance);
      pop();
    }
  }
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}