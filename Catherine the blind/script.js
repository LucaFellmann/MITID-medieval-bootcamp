let board;
let led;
let video;
let hands = [];

async function setup() {
    createCanvas(640, 480);

    board = createBoard();
    createConnectButton(board, 'Connect Arduino');
    led = new five.Led(3);

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    let handPose = await ml5.handPose();
    handPose.detectStart(video, gotHands);
}

function draw() {
    image(video, 0, 0, width, height);

    if (hands.length > 0 && led) {
        let hand = hands[0];

        let distance = dist(
            hand.wrist.x, hand.wrist.y,
            hand.middle_finger_tip.x, hand.middle_finger_tip.y
        );

        let brightness = constrain(map(distance, 50, 200, 0, 255), 0, 255);
        led.brightness(brightness);
    } else if (led) {
        led.off();
    }}
    
function gotHands(results) {
    hands = results;
}