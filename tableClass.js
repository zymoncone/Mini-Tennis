//new Table Class
var Table = function()
{
    this.yPosition = 550;
   
    this.color = color(65);
    this.movementAmount = 15;
};
    
Table.prototype.createNewTable = function()
{
    this.xPosition = mouseX;
    if (this.xPosition + 100 > 401) {
        this.xPosition = 300;
        cursor(HAND);
    } else {
        this.xPosition = mouseX;
        noCursor();
    };
    
    fill(this.color);
    rect(this.xPosition, this.yPosition, 100, 10); 
};
