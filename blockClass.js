//new Block Class
var Block = function()
{
    this.diameter = 40;
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
