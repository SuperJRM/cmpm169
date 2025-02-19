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
const tag = ["Ashen", "Circuit", "Thunder", "Hollow", "Lantern", "Nightfall", "Tattered", "Serpent", "Gravity", "Grit", "Hallowed", "Tenth", "Ember", "Rust", "Veil", "Forgotten", "Iron", "Chasm", "Risen", "Glimmer", "Phantom", "Cradle", "Shattered", "Murmur", "Trapped", "Broken", "Echo", "Slumber", "Fading", "Rift", "Crescent", "Silent", "Warden", "Frost", "Twilight", "Solitude", "Abyss", "Withered", "Threshold", "Sunder", "Whisper", "Tangle", "Dusk", "Fathom", "Veiled", "Cinder", "Rapture", "Eclipse", "Paragon", "Solace"];
const api = "https://api.giphy.com/v1/stickers/search?&api_key=";
const apiKey = ["Ln1OMDKTMpwmS1AX3OnlmVBfPsuSEkje", "A6MgOoK9jJ0wFHnuM3rI9GzXLkrmAChZ"];
let currentKey = 0;
let currentTag = 0;
let tagList = [];
let subTag = [];
let query;
let GIFurls = [];
let loadedImages = [];
let GIFnum = 0;
let lastSpawnTime = 0;
let spawnInterval = 3000; // New GIF every 3 seconds
let font;

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

  textSize(128);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 10; i++) {
    let tagInsert = floor(random(tag.length));
    let tagCheck = true;
    print(tagInsert)
    for (let j = 0; j < tagList.length; j++){
      if (tagList[j] == tagInsert) {
        tagCheck = false;
      }
    }
    if (tagCheck == true) {
      tagList.push(tagInsert);
      subTag.push(tag[tagInsert]); 
      print(tag[tagInsert])
    }
  }
  query = subTag[currentTag];
  getJSON();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(0);

    fill(255);
    if (millis() - lastSpawnTime > spawnInterval || lastSpawnTime == 0) {
        lastSpawnTime = millis();
        // Swap to a new GIF
        currentTag = (currentTag + 1) % subTag.length;
        query = subTag[currentTag];
        speakTag()
        getJSON();
    }

    if (loadedImages.length > 0 && GIFnum < loadedImages.length && loadedImages[GIFnum]) {
    push();
    imageMode(CENTER);
    image(loadedImages[GIFnum], 0, 0, width, height);
    pop();
} 
else {
    console.log("Skipping draw, image not loaded yet.");
}
  textFont(font);
  text(subTag[currentTag], 0, 0); 
}

function getJSON() {
  let url = api + apiKey[currentKey] + "&q=" + query + "&limit=10";
  loadJSON(url, gotData, loadError);
}

function gotData(giphy) {
  GIFurls = [];
  loadedImages = [];
  for (let i = 0; i < giphy.data.length; i++) {
      GIFurls.push(giphy.data[i].images.fixed_height.url);
      loadImage(GIFurls[i], gotGIF, loadError);
  }
}

function gotGIF(giphyImg) {
  loadedImages.push(giphyImg);
}

function loadError(errMsg) {
  console.log("Load error: " + errMsg);
  currentKey = (currentKey + 1) % apiKey.length;
  getJSON();
}

function speakTag() {
  const utterance = new SpeechSynthesisUtterance(subTag[currentTag]);
  window.speechSynthesis.speak(utterance);
}