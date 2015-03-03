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
        scoreBoard.displayNewScores();
        scoreBoard.displayhighScores();
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
