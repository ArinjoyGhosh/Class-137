status = "";
objects = [];
function preload() {
    vdo = createVideo("video.mp4");
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    vdo.hide();
}
function startDetection() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    vdo.loop();
    vdo.volume(0);
    vdo.speed(1);
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        objects = results;
        console.log(results);
    }
}
function draw() {
    image(vdo, 0, 0, 400, 400);
    if(status != "") {
        objectDetector.detect(vdo, gotResults);
        for(i = 0; i <= objects.length; i++) {
            fill("red");
            stroke("black");
            noFill();
            percent = Math.round(objects[i].confidence * 100);
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
            text(objects[i].label + ", " + percent, objects[i].x - 2, objects[i].y);
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("numOfObjects").innerHTML = "Number of Objects Detected = " + objects.length;
        }
    }
}
