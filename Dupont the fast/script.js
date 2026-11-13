let board;
let buzzer;
let video;
let hands = [];
let lastX = 0;
let lastY = 0;

async function setup() {
    createCanvas(640, 480);

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    let handPose = await ml5.handPose();
    handPose.detectStart(video, gotHands);

    board = createBoard();
    createConnectButton(board, 'Connect Arduino');

    board.on('ready', () => {
        buzzer = new five.Piezo(3);
    });
}

function draw() {
    image(video, 0, 0, width, height);

    if (hands.length > 0 && buzzer) {
        let wrist = hands[0].wrist;

        let speed = dist(wrist.x, wrist.y, lastX, lastY);

        if (speed > 30) {
            buzzer.frequency(1000, 200);
        } else {
            buzzer.off();
        }

        lastX = wrist.x;
        lastY = wrist.y;
    }
}

function gotHands(results) {
    hands = results;
}