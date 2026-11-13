let board;
let buzzer;
let video;
let hands = [];

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

async function draw() {
    image(video, 0, 0, width, height);

    if (hands.length > 0 && buzzer) {
        let hand = hands[0];
        let distance = dist(hand.wrist.x, hand.wrist.y,
                            hand.middle_finger_tip.x, hand.middle_finger_tip.y);

        let speed = speed(hand.wrist.x, hand.wrist.y,
                           hand.middle_finger_tip.x, hand.middle_finger_tip.y);

        let frequency = constrain(map(speed, 5, 50, 100, 1000), 100, 1000);

        if (frameCount % 10 === 0) {
            buzzer.frequency(frequency, 200);
        }
    } else if (buzzer) {
        buzzer.off();
    }}

function gotHands(results) {
    hands = results;
}