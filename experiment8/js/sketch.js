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
let video;
let img;
let handPose;
let hands = [];
let handType = ["None","None"]
let handScore = [0,0]
let scoreFlag = false;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function preload() {
  handPose = ml5.handPose();
  font = loadFont("assets/Inconsolata.otf");
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
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  background(33, 153, 240);
  textFont(font);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  
  let button = createButton("Press to Shoot");
  button.position(width/2, 7*height/10);
  button.mousePressed(buttonYay);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(33, 153, 240);
  textFont(font);
  textSize(32);
  fill(255);
  allFingersClosed(hands, 85);
  allFingersOpen(hands, 35);
  twoFingersOpen(hands, 60);
  

  if (hands.length == 2) {
    if (scoreFlag == true) {
      if (handType[0] == "Rock") {
        if(handType[1] == "Paper") {
          handScore[1]++;
        }
        if(handType[1] == "Scissors") {
          handScore[0]++;
        }
      }
      if (handType[0] == "Paper") {
        if(handType[1] == "Scissors") {
          handScore[1]++;
        }
        if(handType[1] == "Rock") {
          handScore[0]++;
        }
      }
      if (handType[0] == "Scissors") {
        if(handType[1] == "Rock") {
          handScore[1]++;
        }
        if(handType[1] == "Paper") {
          handScore[0]++;
        }
      }
      scoreFlag = false;
    }
  //console.log(handType[0] + "vs" + handType[1]);
  //console.log(handScore[0] + "to" + handScore[1]);
  text("VS", -15, height/4);
  textSize(48);
  text(handType[0], -width/4-50, height/4);
  text(handType[1], width/4-50, height/4);
  handType[0] = "None";
  handType[1] = "None";
  }
  else {
    textSize(64);
    text("ERROR", -75, -height/8);
  }
  textSize(48);
  text(handScore[0], -width/4, -height/4);
  text(handScore[1], width/4, -height/4);
}

function keyPressed() {
  if (key === ' ') {
    scoreFlag = true;
    //console.log("Yay");
  }
}

function buttonYay() {
  scoreFlag = true;
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function mapPoint(point) {
  return {
    x: width - map(point.x, 0, video.width, 0, width),
    y: map(point.y, 0, video.height, 0, height)
  };
}

function allFingersClosed(hands, threshold) {
  if (hands.length != 2) return false;

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = {};

    for (let j = 0; j < hand.keypoints.length; j++) {
      keypoints[j] = mapPoint(hand.keypoints[j]);
    }

    if ([2, 4, 5, 8, 9, 12, 13, 16, 17, 20].every(k => keypoints[k])) {
      let thumbDistance = dist(keypoints[2].x, keypoints[2].y, keypoints[4].x, keypoints[4].y);
      let indexDistance = dist(keypoints[5].x, keypoints[5].y, keypoints[8].x, keypoints[8].y);
      let middleDistance = dist(keypoints[9].x, keypoints[9].y, keypoints[12].x, keypoints[12].y);
      let ringDistance = dist(keypoints[13].x, keypoints[13].y, keypoints[16].x, keypoints[16].y);
      let pinkyDistance = dist(keypoints[17].x, keypoints[17].y, keypoints[20].x, keypoints[20].y);

      if (
        thumbDistance <= threshold &&
        indexDistance <= threshold &&
        middleDistance <= threshold &&
        ringDistance <= threshold &&
        pinkyDistance <= threshold
      ) {
        handType[i] = "Rock";
      }
    }
  }
}

function allFingersOpen(hands, threshold) {
  if (hands.length != 2) return false;

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = {};

    for (let j = 0; j < hand.keypoints.length; j++) {
      keypoints[j] = mapPoint(hand.keypoints[j]);
    }

    if ([2, 4, 5, 8, 9, 12, 13, 16, 17, 20].every(k => keypoints[k])) {
      let thumbDistance = dist(keypoints[2].x, keypoints[2].y, keypoints[4].x, keypoints[4].y);
      let indexDistance = dist(keypoints[5].x, keypoints[5].y, keypoints[8].x, keypoints[8].y);
      let middleDistance = dist(keypoints[9].x, keypoints[9].y, keypoints[12].x, keypoints[12].y);
      let ringDistance = dist(keypoints[13].x, keypoints[13].y, keypoints[16].x, keypoints[16].y);
      let pinkyDistance = dist(keypoints[17].x, keypoints[17].y, keypoints[20].x, keypoints[20].y);

      if (
        thumbDistance > threshold &&
        indexDistance > threshold &&
        middleDistance > threshold &&
        ringDistance > threshold &&
        pinkyDistance > threshold
      ) {
        if (handType[i] != "Rock") {
          handType[i] = "Paper";
        }
      }
    }
  }
}

function twoFingersOpen(hands, threshold) {
  if (hands.length != 2) return;

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = {};

    for (let j = 0; j < hand.keypoints.length; j++) {
      keypoints[j] = mapPoint(hand.keypoints[j]);
    }

    if ([2, 4, 5, 8, 9, 12].every(k => keypoints[k])) {
      let indexDistance = dist(keypoints[5].x, keypoints[5].y, keypoints[8].x, keypoints[8].y);
      let middleDistance = dist(keypoints[9].x, keypoints[9].y, keypoints[12].x, keypoints[12].y);

      if (indexDistance > threshold && middleDistance > threshold) {
        if (handType[i] != "Rock" && handType[i] != "Paper") {
          handType[i] = "Scissors";
        }
      }
    }
  }
}