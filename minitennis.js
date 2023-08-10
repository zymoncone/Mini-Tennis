var LeaderBoardCanvas;

setup = function() { //p5 setup
    createCanvas(700, 600); //400, 600: size of game play canvas
    LeaderBoardCanvas = createGraphics(400, 600);
    //
    frameRate(60);
    noCursor();
    //
    tennisBall = new Ball();
    tennisTable = new Table();
    time = new Time();
    scoreBoard = new LeaderBoard();
}

draw = function() { //p5 draw function, runs the code at 60 fps
    background(200, 89, 100); //50 for blue background
    //
    LeaderBoardCanvas.background(200); //leaderboard canvas
    image(LeaderBoardCanvas, 400, 0, 300, 600);
    //
    scoreBoard.display();
    tennisBall.createNewBall();
    tennisTable.createNewTable();
    time.runClock();
    if (tennisBall.block) {
        tennisBall.block.run();
    }
    scoreBoard.display();
}
