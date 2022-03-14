song = '';

left_wrist_x = '';
left_wrist_y = '';

right_wrist_x = '';
right_wrist_y = '';

leftWrist_score = '';
rightWrist_score = '';

function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function draw() {
    image(video, 0, 0, 600, 300);

    fill("red");
    stroke("red");
    if (leftWrist_score > 0.2) {
        circle(left_wrist_x, left_wrist_y, 20);
        left_wrist_y_number = Number(left_wrist_y);
        left_wrist_y_without_decimal = floor(left_wrist_y_number);
        volume = left_wrist_y_without_decimal / 300;
        document.getElementById("volume").innerHTML = "Volume- " + volume;
        song.setVolume(volume);
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded() {
    console.log("Model is loaded!!!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;

        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;

        console.log("Left wrist x- " + left_wrist_x + " left wrist y- " + left_wrist_y);
        console.log("right wrist x- " + right_wrist_x + " right wrist y- " + right_wrist_y);
    }

}