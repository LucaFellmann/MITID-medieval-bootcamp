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
    });}

function draw() {
    image(video, 0, 0, width, height);

    if (hands.length > 0 && buzzer) {
        let hand = hands[0];

        let distance = dist(hand.wrist.x, hand.wrist.y,
                            hand.middle_finger_tip.x, hand.middle_finger_tip.y);

        if (distance > 80) {
            let frequency = map(distance, 80, 200, 100, 1000);
            frequency = constrain(frequency, 100, 1000);

            if (frameCount % 10 === 0) {
                buzzer.frequency(frequency, 200);
            }
        } else {
            buzzer.off();
        }
    } else if (buzzer) {
        buzzer.off();
    }
}

function gotHands(results) {
    hands = results;
}