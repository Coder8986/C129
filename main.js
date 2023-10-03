music1 = "";
music2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

status1 = "";
status2 = "";

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);   
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
       console.log("results");

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristx" + leftWristX + "leftWristY" + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rightWristx" + rightWristX + "rightWristY" + rightWristY);

       scoreLeftWrist = results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist =" + scoreLeftWrist);
    }
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");

    status1 = music1.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop()
        if ( status1 == false ) {
            music1.play();
            document.getElementById("h3tag").innerHTML = "The Harry Potter theme song remix";
        }
    }
}