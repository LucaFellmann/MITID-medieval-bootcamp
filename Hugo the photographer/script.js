let board;
let video;

function setup() {
    createCanvas(640, 480);

    board = createBoard();
    createConnectButton(board, 'Connect Arduino');

    let button = new five.Button({ pin: 3, isPullup: true });
    button.on('press', saveImage);

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
}

function draw() {
    image(video, 0, 0, width, height);
}

function saveImage() {
    saveCanvas('myImage', 'png');
}
