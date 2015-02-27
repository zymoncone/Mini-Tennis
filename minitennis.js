var LeaderBoardCanvas;

function setup() {
    createCanvas(700, 600); //400, 600
    LeaderBoardCanvas = createGraphics(400, 600);
    
    frameRate(60);
    noCursor();
    tennisBall = new Ball(); //ask about .create()
    tennisTable = new Table();
    time = new Time();
    scoreBoard = new LeaderBoard();
}

function draw() {
    background(200, 89, 100); //50 for blue background
    //
    LeaderBoardCanvas.background(200);          //leaderboard canvas
    image(LeaderBoardCanvas, 400, 0, 300, 600);
    //
    scoreBoard.display();
    tennisBall.createNewBall();
    tennisTable.createNewTable();
    time.runClock();
    tennisBall.block.run();
    scoreBoard.display();
}

var WriteToFile = function()
{
    //TODO
    //look at save();
};
