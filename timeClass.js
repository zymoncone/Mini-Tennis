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
