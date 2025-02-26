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
let playing = false;
let inputFlag = false;
let helmetInput;
let drinkInput;
let userDrinks;
let spdInput;
let userSpd;
let wearingHelmet = false;
let validCheck = false;
let deadCheck = false;
let miles = 0;
let mileInterval;
let crashed = false;

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

  video = createVideo('assets/SickBike.mp4');
  //video.size(width, height);
  video.hide();
  
  textAlign(CENTER, CENTER);
  helmetInput = createCheckbox("Wearing a helmet?", false);
  helmetInput.position(windowWidth / 2 - 80, windowHeight / 2 - 50); 
  
  drinkInput = createInput('');
  drinkInput.position(windowWidth / 2 - 60, windowHeight / 2);
  
  spdInput = createInput('');
  spdInput.position(windowWidth / 2 - 60, windowHeight / 2 + 60);
  
  helmetInput.changed(handleHelmetChange);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  textFont(font);
  if (crashed) {
    background(0);
    textSize(32);
    fill(255);
    text("You crashed!", 0, 0);
    if (deadCheck) {
      text("You've Died.", 0, 50);
    }
    else{
      text("You made it out alive.", 0, 50);
    }
    return;
  }

  textSize(32);
  background(220);
  fill(0);
  text("Hey New Rider!", 0, -100);
  textSize(16);
  text("How many drinks have you had?", 50, - 20);
  text("Speed limit's 70. How fast are you riding?", 100, 40);

  if (inputFlag) {
    validCheck = true;
    userDrinks = Number(drinkInput.value()); 
    userSpd = Number(spdInput.value());


    print("Wearing Helmet:", wearingHelmet);

    if (isNaN(userDrinks)) { 
      print("Test Failed: Not a Number for Drinks");
      validCheck = false;
    } else {
      print("Hooray! Valid number:", userDrinks);
    }
    
    if (isNaN(userSpd)) { 
      print("Test Failed: Not a Number for Speed");
      validCheck = false;
    } else {
      print("Hooray! Valid number:", userSpd);
    }

    drinkInput.value('');
    spdInput.value('');
    helmetInput.checked(false);
    
    inputFlag = false;
  }
  
  if (validCheck && !crashed) {
    background(255, 0, 0);

    drinkInput.remove();
    spdInput.remove();
    helmetInput.remove();

    image(video, 0, 0, width, height);
    video.show();
    
    textSize(32);
    fill(255);
    text("Enjoy the ride!", 0, -100);

    startSimulation(userDrinks, userSpd, wearingHelmet);
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    inputFlag = true;
  }
}

function handleHelmetChange() {
  wearingHelmet = helmetInput.checked();
}

function startSimulation(drinks, speed, helmet) {
    crashed = false;
    miles += speed/deltaTime;    
    textSize(24);
    print(miles)
    let milePrint = int(miles)
    text(`Miles Driven: ${milePrint}`, 0, -50);
    if (checkForAccident(drinks, speed, helmet)) {
        crashed = true;
        deadCheck = deathChance(userDrinks, userSpd, wearingHelmet);
        return;
    }
}

function checkForAccident(drinks, speed, helmet) {
    let baseChance = 0.00864; //Rate based on injury rate for each VMT per rider
    baseChance*=(speed/deltaTime); //Account for miles traveled
    return ((Math.random()*100) < baseChance);
}

function deathChance(drinks, speed, helmet) {
    let baseChance = 0.0751;
  
    if (drinks > 0) baseChance *= (drinks*1.27);
    if (speed > 70) baseChance *= ((speed - 70) * 1.034);
    if (helmet) baseChance /= 3.7;
    return (Math.random() < baseChance);
}