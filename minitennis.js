function setup() {
    createCanvas(400, 600);
    frameRate(60);
    noCursor();
    tennisBall = new Ball(); //ask about .create()
    tennisTable = new Table();
    time = new Time();
}

function draw() {
    background(200, 89, 100); //50 for blue background
    tennisBall.createNewBall();
    tennisTable.createNewTable();
    time.runClock();
    tennisBall.block.run();
}


//new Time Class
var Time = function()
{
    this.milliseconds = 0;
};

Time.prototype.runClock = function()
{
    this.milliseconds += 1;
    this.seconds = this.milliseconds/60; //60 = frames/second
    this.seconds = Math.round(this.seconds);
    this.showClock();
};

Time.prototype.showClock = function()
{
    textSize(25);
    fill(0);
    text(this.seconds.toString() + " seconds", 15, 80, width, height);
   
};

//new Block Class
var Block = function()
{
    this.diameter = 60;
    this.xPosition = random(100, width - this.diameter);
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
    this.xPosition = random(25, width - 50);
    this.yPosition = random(25, height - 400);
};
    
Ball.prototype.createNewBall = function() 
{
    fill(this.color);
    ellipse(this.xPosition, this.yPosition, this.diameter, this.diameter);
    this.move();
    this.showPoints();
//    this.block.run();
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
    textSize(60);
    fill(255);
    text(this.points.toString(), 10, 40, 100, 100);
};

Ball.prototype.checkForTable = function()
{
    if (this.yPosition > tennisTable.yPosition - this.radius && this.xPosition > mouseX && this.xPosition < mouseX + 100) {
    return true;
    }
};
    
Ball.prototype.checkForBoundaries = function()
{
    if (this.xPosition > width - this.radius) {
        this.ballSpeedX *= -1;
    }
        
    if (this.xPosition < this.radius) { 
        this.ballSpeedX *= -1;
    }
        
    if (this.yPosition < this.radius) {
        this.ballSpeedY *= -1;
    }
};

Ball.prototype.stopGame = function()
{
    if (this.yPosition > height - this.radius) {
        noLoop();
        tennisBall.block = null;
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
