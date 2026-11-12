let board;

let microphone;
let micValue = 0; // a global variable to store the microphone value

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    // we create the sensor object
    microphone = new five.Sensor("A0");

    // we listen to sensor values
    microphone.on("data", function(latestValue) {
        // on modification do stuff 
        micValue = latestValue;

    });
}



function draw() {
    background(200);
    //console.log(micValue);

    circle(width / 2, height / 2, micValue);

}