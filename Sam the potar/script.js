let board;
let pot;
let size = 100;

function setup() {
    createCanvas(700, 500);

    board = createBoard();
    createConnectButton(board, 'Connect Arduino');

    pot = new five.Sensor({
        pin: "A0",
        scale: [0, 255]
    });

    pot.on("change", function(value) {
        size = value;
    });
}

function draw() {
    background(200);
    rect(200, 200, 50, size);
}