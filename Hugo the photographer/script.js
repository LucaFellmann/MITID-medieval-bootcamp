let board;

let bodyPose;
// we create a variable to store the bodyPose model
let video;
// a variable to store the detected poses
let poses = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    video = createCapture(VIDEO);       // we open the webcam
    video.size(700, 500);
    video.hide();                        // we hide the video element

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;                 // we store the detected poses in the variable
    });  
    
}

function draw() {
    image(video, 0, 0);                  // we draw the video on the canvas

    if (poses.length > 0) {                 // if we have detected at least one pose
        
        console.log(poses[0].left_eye);
        let le = poses[0].left_eye;
        fill("blue");
        circle(le.x, le.y, 50);  

        console.log(poses[0].right_eye);
        let re = poses[0].right_eye;
        fill("green");
        circle(re.x, re.y, 50);   

        console.log(poses[0].left_ear);
        let lea = poses[0].left_ear;
        fill("yellow");
        circle(lea.x, lea.y, 10);   

        console.log(poses[0].right_ear);
        let rea = poses[0].right_ear;
        fill("orange");
        circle(rea.x, rea.y, 10);   
        
        
        line(le.x, le.y, re.x, re.y);
        line(lea.x, lea.y, le.x, le.y);
        line(rea.x, rea.y, re.x, re.y);
    }
}