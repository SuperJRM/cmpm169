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
let colorData;
let saveCheck = false;
let saveColor = [0,0,0,0];
let butter = true;

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
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  image(video, 0, 0, width, height);
  loadPixels();
  colorData = pixels;
  let endCount = pixels.length;
  filter(THRESHOLD,0.345);
  loadPixels();
  for (let i=0; i<endCount; i+=4) {  // Searches every pixel
    if (pixels[i] == 0 && saveCheck == true) {  // In B/W, Red can only be 0 or 255, replaces RGB value with saved colors
      for (let j = 0; j < 3; j++) {
        pixels[i + j] = saveColor[j];
      }
    }
    else if(pixels[i] == 0) {  // If pixel is black but no color is saved, finds, uses, and saves next colored pixel value
      pixelLoc = i;
      while (pixelLoc+4<endCount && pixels[pixelLoc] == 0){
        pixelLoc += 4
      }
      for (let j = 0; j < saveColor.length; j++) {
        saveColor[j] = colorData[pixelLoc + j];
        pixels[i + j] = saveColor[j];
      }
      saveCheck = true;
    }
    else {  // Pixel is white, saved colors set to be replaced
      saveCheck = false;
    }
  }
  updatePixels();
  loadPixels();
  for (let i=0; i<endCount; i+=4) {  // Searches every pixel
    if (pixels[i] == 255 && pixels[i+1] == 255 && pixels[i+2] == 255) {
      for (let j = 0; j < 3; j++) {
        pixels[i + j] = 0;
      }
    }
  }
  updatePixels();
  if (butter == true) {
    loadPixels();
    for (let i=0; i<endCount; i+=120) {  // Searches pixels
      if (pixels[i] != 0 && pixels[i+1] != 0 && pixels[i+2] != 0) {
        stroke(pixels[i], pixels[i+1],pixels[i+2],90);
        let xLoc = (i/(4*pixelDensity()) % width);
        let yLoc = Math.floor(i / (8 * pixelDensity() * width));
        line(xLoc,yLoc,xLoc+75,yLoc+75)
      }
    }
  }
}

function keyPressed() {
  if (key === 'b' && butter == false) {
    butter = true;
  }
  else if (key === 'b' && butter == true) {
    butter = false;
  }
}