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

// preload() runs once before setup()
function preload() {
  // Load the MobileNet model
  // Initialize the Image Classifier method with MobileNet
  classifier = ml5.imageClassifier("MobileNet");
  classifier.classifyStart(video, gotResult);
}

// get the results
function gotResult(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  confidence = results[0].confidence;
  // console.log(label, confidence);
  classifier.classify(video, gotResult);
}

function setup() {
  createCanvas(canvasSize.width, canvasSize.height);
  video = createCapture(VIDEO);
  video.size(canvasSize.width, canvasSize.height);
  video.hide();

  // Classify the video
  classifier.classifyStart(video, 3, gotResult);
}

function draw() {
  background(220);
  image(video, 0, 0);

  // Draw the label with the highest confidence
  if (label !== "") {
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
    text(nf(confidence * 100, 0, 2) + "%", 10, height - 30);
  }
}
