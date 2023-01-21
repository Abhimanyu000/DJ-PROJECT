song1="";
song2="";

LWX="";
LWY="";
RWX="";
RWY="";
keyLW="0";
LS="";

function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(400, 400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    POSE=ml5.poseNet(video, modelLoaded);
    POSE.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 400, 400);

    fill("red");
    stroke("red");
    LS=song1.isPlaying();
    if(keyLW>0.2){
        circle(LWX, LWY, 20);
        song2.stop();
        if(LS==false){
            song1.play();
            document.getElementById("nameDISPLAY").innerHTML="Song playing: Harry Potter Theme";
        }
    }
}

function modelLoaded(){
    console.log("MODEL LOADED");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        LWX=results[0].pose.leftWrist.x;
        LWY=results[0].pose.leftWrist.y;
        RWX=results[0].pose.rightWrist.x;
        RWY=results[0].pose.rightWrist.y;
        keyLW=results[0].pose.keypoints[9].score;

        console.log("LWX: "+LWX);
        console.log("LWY: "+LWY);
        console.log("RWX: "+RWX);
        console.log("RWY: "+RWY);
        console.log("keyLW: "+keyLW);
    }
}