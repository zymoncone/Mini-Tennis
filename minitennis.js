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

//function keyPressed() {
//    redraw();
//}

//new Time Class
var Time = function()
{
    this.milliseconds = 0;
    this.currentDay = moment().calendar();
};

Time.prototype.runClock = function()
{
    this.milliseconds += 1;
    this.seconds = this.milliseconds/60; //60 = frames/second
    this.seconds = Math.round(this.seconds);
    this.showClock();
    this.showDay();
};

Time.prototype.showDay = function()
{
    textSize(15);
    fill(0);
    text(this.currentDay, 10, 8, width, height);
};

Time.prototype.showClock = function()
{
    textSize(25);
    fill(0);
    text(this.seconds.toString() + " sec", 10, 40, width, height);
   
};

//new Block Class
var Block = function()
{
    this.diameter = 60;
    this.xPosition = random(100, 400 - this.diameter); //width = 400
    this.yPosition = random(90, 500);
    this.color = color(255, 204, random(0, 255));
    this.radius = this.diameter/2;
};

Block.prototype.run = function()
{
    fill(this.color);
    rect(this.xPosition - this.radius, this.yPosition - this.radius, this.diameter, this.diameter); 
    this.breakBlock();
};

Block.prototype.touching = function()
{
    if (tennisBall.yPosition + tennisBall.diameter < this.yPosition + this.diameter && tennisBall.yPosition + tennisBall.diameter > this.yPosition && tennisBall.xPosition + tennisBall.diameter < this.xPosition + this.diameter && tennisBall.xPosition + tennisBall.diameter > this.xPosition) {
        return true;
    }
};

Block.prototype.breakBlock = function()
{
    if (this.touching() === true) {
        tennisBall.block = null;
        tennisBall.points += 1;
    }
};
    

//new Ball Class
var Ball = function()
{
    this.color = color(65);
    this.points = 0;
    this.radius = 17;
    this.diameter = this.radius * 2
    this.block = null;
    this.ballSpeedX = 4;
    this.ballSpeedY = 4;
    this.xPosition = random(25, 400 - 50); //width = 400
    this.yPosition = random(25, height - 400);
};
    
Ball.prototype.createNewBall = function() 
{
    fill(this.color);
    ellipse(this.xPosition, this.yPosition, this.diameter, this.diameter);
    this.move();
    this.showPoints();
};
    
Ball.prototype.move = function()
{
    this.xPosition += this.ballSpeedX;
    this.yPosition += this.ballSpeedY;
    this.checkForBoundaries();
    this.stopGame();
    this.bounceOffTable();
};

Ball.prototype.showPoints = function()
{
    textSize(50);
    fill(0);
    text(this.points.toString(), 10, 90, width, height);
};

Ball.prototype.checkForTable = function()
{
    if (this.yPosition > tennisTable.yPosition - this.radius && this.xPosition > mouseX && this.xPosition < mouseX + 100) {
    return true;
    }
};
    
Ball.prototype.checkForBoundaries = function()
{
    if (this.xPosition > 400 - this.radius) { //width = 400
        this.ballSpeedX *= -1;
    }
        
    if (this.xPosition < this.radius) { 
        this.ballSpeedX *= -1;
    }
        
    if (this.yPosition < this.radius) {
        this.ballSpeedY *= -1;
    }
    
    //TODO --->
    
//    //Tests for ball bouncing off side
//    if (this.yPosition - this.radius > tennisTable.yPosition && this.yPosition - this.radius < tennisTable.yPosition + 10 && this.xPosition + this.radius == mouseX) {
//        noLoop();
//        this.ballSpeedX *= -1;
//        this.ballSpeedY *= -1;
//    }
//    
//    if (this.yPosition - this.radius > tennisTable.yPosition && this.yPosition - this.radius < tennisTable.yPosition + 10 && this.xPosition == mouseX + 100) {
//        noLoop();
//        this.ballSpeedX *= -1;
//        this.ballSpeedY *= -1;
//    }
};

Ball.prototype.stopGame = function()
{
    if (this.yPosition > height - this.radius) { 
        tennisBall.block = null;
        scoreBoard.displayScores();
        noLoop();
        textSize(45);
        fill(0);
        text("Game Over!", 80, 300, width, height);
        //stops game
    }
};

Ball.prototype.bounceOffTable = function()
{
    //Check if ball is touching table
    if (this.checkForTable() === true) {
        this.ballSpeedY *= -1.1;
        this.ballSpeedX *= 1.1;
        this.points += 1;
        if (this.block === null) {
            this.block = new Block();
        }
    }
};


//new Table Class
var Table = function()
{
    this.yPosition = 550;
    this.color = color(65);
    this.movementAmount = 15;
};
    
Table.prototype.createNewTable = function()
{
    fill(this.color);
    rect(mouseX, this.yPosition, 100, 10); 
};


var LeaderBoard = function()
{
   this.scores = 0; 
};

LeaderBoard.prototype.display = function()
{
    fill(0);
    rect(400, 10, 300, 50);
    fill(0);
    rect(400, 0, 5, height);
    //Fix Stroke
    textSize(30);
    fill(255);
    text("Leader Board", 460, 30, width, height);
};

LeaderBoard.prototype.displayScores = function()
{
    //look at save();
    this.getPlayerName = prompt("Enter name for leadership", "Szymon S.");
    textSize(17);
    fill(0);
    text("1. " + this.getPlayerName + " scored " + tennisBall.points.toString() + " points", 415, 80, width, height);
};

    
