nX = 0;
nY = 0;
difference = 0;
rWX = 0;
lWX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model Loaded");
}

function gotPoses(results)
{
    console.log(results);
    if(results.length > 0)
    {
        nX = results[0].pose.nose.x;
        nY = results[0].pose.nose.y;
        console.log("Nose X = " + nX + ", and nose y = " + nY + ".");
        
        lWX = results[0].pose.leftWrist.x; 
        rWX = results[0].pose.rightWrist.x;
        difference = floor(lWX - rWX);
        console.log("Left wrist X = " + lWX + ", and right right x = " + rWX + ". The difference is" + difference + ".");
    }
}

function draw()
{
    background("#969A97");

    document.getElementById("squareSide").innerHTML = "Width and height of the square you made will be " + difference + "pixels.";
    fill("#F90093");
    stroke("#F90093");
    square(nX, nY, difference);
}