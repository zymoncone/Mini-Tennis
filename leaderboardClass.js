var LeaderBoard = function()
{
   this.players = [];
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
    this.getPlayerName = prompt("Enter name for leadership", "Szymon S.");
    this.players.push(this.getPlayerName);
    console.log(this.players); //for test purposes
    textSize(17);
    fill(0);
    text("1. " + _.first(this.players) + " scored " + tennisBall.points.toString() + " points", 415, 80, width, height);
    save(this.players, 'Player.txt');
};
