let canvasSize = {
  width: 320,
  height: 240,
};

// webcam video capture
let video;

// ml5.js classifier
let classifier;

// A variable to hold the result of the classification
let label = "";

// A variable to hold the confidence of the classification
let confidence = 0;

// An array of balloons
let balloons = [];

// preload() runs once before setup()
function preload() {
  // Load the MobileNet model
  // Initialize the Image Classifier method with MobileNet
  // classifier = ml5.imageClassifier("MobileNet");
  // classifier.classifyStart(video, gotResult);
}

// get the results
function gotResult(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  confidence = results[0].confidence;
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);

  createBalloons();
}

function draw() {
  background(220);

  // Update the balloons
  updateBallooons();

  // Draw a balloon
  drawBalloons();

  // Clean the balloons
  cleanBalloons();
}

function createBalloons() {
  // Create 5 balloons
  for (let i = 0; i < 5; i++) {
    balloons.push(new Balloon());
  }
}

function updateBallooons() {
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].update(deltaTime);
  }
}

function drawBalloons() {
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].display();
  }
}

function cleanBalloons() {
  // Remove the balloons that are out of the canvas
  balloons = balloons.filter((balloon) => balloon.inCanvas);

  // If there are less than 5 balloons
  // create more balloons
  if (balloons.length < 5) {
    createBalloons();
  }
}