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
  for(var row = 0; row < boardSize; row++) {
    //create outer array row
    board.push([]);
    for(var col = 0; col < boardSize; col++) {
      //creates the inner null spaces that will hold the coords
      board[row].push(null);
    }
  }
  this.board = board;
}

Board.prototype.mark = function(xcord, ycord, marker) {
  if(!this.isMarkedYet(xcord, ycord) {
    this.board = marker;
  }
}

Board.prototype.isMarkedYet = function() {
  if(this.board[xcord][ycord] !== null) {
    return this.board[xcord][ycord];
  } else {
    return false;
  }
};

function Game() {
  var playerOne = new Player("X", true);
  var playerTwo = newPlayer("O", false);
  var board = new Board();
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.board = board;
};

Game.prototype.getTurns = function(){
  if(this.playerOne.isActive == true) {
    return this.playerOne;
  } else {
    return this.playerTwo;
  }
}

Game.prototype.toggleTurns = function(){
  this.playerOne.changeTurns();
  this.playerTwo.changeTurns();
};

Game.prototype.whoWins = function(){
  //take the board object and get the board property
  var myBoard = this.board.board;
  var winner = false;
//check for x axis wins
  for(var x = 0; x < 3; x++) {
    if( (myBoard[x][0] === myBoard[x][1]) && (myBoard[x][2] === myBoard[x][0]) ) {
      if(this.playerOne.marker === myBoard[x][0]){
        winner = this.playerOne;
      }
    } else if(this.playerTwo.marker === myBoard[x][0]) {
        winner = this.playerTwo;
    }
  }

//check for y axis wins
  for(var y = 0; y < 3; y++) {
    if((myBoard[0][y] === myBoard[1][y]) && (myBoard[0][y] === myBoard[2][y])) {
      if(this.playerOne.marker === myBoard[0][y]) {
        winner = this.playerOne;
      } else if(this.playerTwo.marker === myBoard[0][y]) {
        winner = this.playerTwo;
      }
    }
  }
  //check for diagonal wins
  if((myBoard[0][0] === myBoard[1][1]) && (myBoard[2][2] === myBoard[0][0])) {
    if(this.playerOne.marker === myBoard[0][0]) {
      winner = this.playerOne;
    }else if(this.playerTwo.marker === myBoard[0][0]) {
      winner = this.playerTwo;
    }
  } else if((myBoard[2][0] === myBoard[1][1]) && myBoard[0][2] === [2][0]) {
    if(this.playerOne.marker === myBoard[2][0]) {
      winner = this.playerOne;
    } else if(this.playerTwo.marker === myBoard[2][0]) {
      winner = this.playerTwo;
    }
  }
//check for draw by seeing if any board spaces with a null value remain
  if(winner === false) {
     for(var row = 0; row < 3; row++) {
      for(var col = 0; col < 3; col++) {
        if (myBoard[row][col] === null) {
          return false;
          //break;
        } else {
          winner = "draw";
        }
      }
     }
  }//edn of draw
 
  return winner;

}; //end of whoWins 