var LeaderBoard = function()
{
    this.players = [];
    this.playernames = ["Szymon S.", "Carol K.", "Szymon S."];
    this.playerpoints = [20, 28, 42];
    this.sortNumbers = function(a, b) {
        return a - b;
    }
    this.firstPlace = _.last(this.playernames);
    this.secondPlace = _.first(_.last(this.playernames, 2));
    this.thirdPlace = _.first(_.last(this.playernames, 3));
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
    this.displayhighScores();
};

LeaderBoard.prototype.displayNewScores = function()
{
    if (tennisBall.points > _.last(this.playerpoints)) {
        this.getPlayerName = prompt("NEW HIGHSCORE! Enter name for leaderboard", "Szymon S.");
        this.playernames.push(this.getPlayerName);
        this.playerpoints.push(tennisBall.points);
        this.playerpoints.sort(this.sortNumbers);
        console.log(this.playernames); //for test purposes
        console.log(this.playerpoints); //for test purposes
    }
};

LeaderBoard.prototype.displayhighScores = function()
{
    if (this.firstPlace != undefined) {
        textSize(17);
        fill(0);
        text("1. " + this.firstPlace + " scored " + _.last(this.playerpoints).toString() + " points", 415, 80, width, height);
    }
    
    if (this.secondPlace != undefined) {
        textSize(17);
        fill(0);
        text("2. " + this.secondPlace + " scored " + _.first(_.last(this.playerpoints, 2)).toString() + " points", 415, 110, width, height);
    }
    
    if (this.thirdPlace != undefined) {          
        textSize(17);
        fill(0);
        text("3. " + this.thirdPlace + " scored " + _.first(_.last(this.playerpoints, 3)).toString() + " points", 415, 140, width, height);
    }          
};
