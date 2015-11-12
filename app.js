//create a player and give it a marker and a turn
function Player(marker, isActive) {
  this.marker = marker; 
  this.isActive = isActive; 
}

//change turns by toggling isActive 
Player.prototype.changeTurns = function(){
  if (this.isActive === true) {
    this isActive = false;   
  } else {
    this.isActive = true;
  }
};

function Board() {
  var boardSize = 3;
  var board = [];
//create empty 2d array  
  for(var row =0; row < boardSize; row++) {
    //create outer array row
    board.push([]);
    for(var col = 0; col < boardSize; col++) {
      //creates the inner null spaces that will hold the coords
      board[row].push(null);
    }
  }

}