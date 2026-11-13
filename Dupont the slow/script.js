let video;
let poses = [];
let lastLeftX = 0;
let lastLeftY = 0;
let lastRightX = 0;
let lastRightY = 0;
let A = 0;

async function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    let bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, gotPoses);
}

function draw() {
    image(video, 0, 0, width, height);

    if (poses.length > 0) {
        let left = poses[0].left_shoulder;
        let right = poses[0].right_shoulder;

        let speedLeft = dist(left.x, left.y, lastLeftX, lastLeftY);
        let speedRight = dist(right.x, right.y, lastRightX, lastRightY);

        if (speedLeft > 3 || speedRight > 3) {
            A = millis();
        }

        if (millis() - A > 1000) {
            fill(0, 255, 0, 100);
            rect(0, 0, width, height);
        }   

        lastLeftX = left.x;
        lastLeftY = left.y;
        lastRightX = right.x;
        lastRightY = right.y;
    }}

function gotPoses(results) {
    poses = results;
}