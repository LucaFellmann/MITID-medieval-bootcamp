let board;
let pot;
let maxValue = 0;

function setup() {
    createCanvas(700, 500);

    board = createBoard();
    createConnectButton(board, 'Connect Arduino');

    pot = new five.Sensor({
        pin: "A0",
        scale: [0, 200]
    });

    pot.on("change", function(value) {
        maxValue = Math.round(value);
    });
}

function draw() {
    background(200);

    for (let i = 0; i < maxValue; i++) {
        circle(30 + i * 30, 250, 20);
    }}