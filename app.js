//create a player and give it a marker and a turn
function Player(marker, isActive) {
  this.marker = marker; 
  this.isActive = isActive; 
}

//change turns by toggling isActive 
Player.prototype.changeTurns = function(){
  if (this.isActive === true) {
    this.isActive = false;   
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
  if(!this.isMarkedYet(xcord, ycord)) {
    this.board[xcord][ycord] = marker;
  }
};

Board.prototype.isMarkedYet = function(xcord, ycord) {
  if(this.board[xcord][ycord] !== null) {
    return this.board[xcord][ycord];
  } else {
    return false;
  }
};

function Game() {
  var playerOne = new Player("X", true);
  var playerTwo = new Player("O", false);
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
    if( ((myBoard[x][0]) === (myBoard[x][1])) && ((myBoard[x][2]) === (myBoard[x][0])) ) {
      if(this.playerOne.marker === myBoard[x][0]){
        winner = this.playerOne;
      }
    else if(this.playerTwo.marker === myBoard[x][0]) {
        winner = this.playerTwo;
      }
    }
  }
//check for y axis wins
  for(var y = 0; y < 3; y++) {
    if( ((myBoard[0][y]) === (myBoard[1][y])) && ((myBoard[0][y]) === (myBoard[2][y])) ) {
      if(this.playerOne.marker === myBoard[0][y]) {
        winner = this.playerOne;
      }
      else if(this.playerTwo.marker === myBoard[0][y]) {
        winner = this.playerTwo;
      }
    }
  }
  //check for diagonal wins
  if(( (myBoard[0][0]) === (myBoard[1][1])) && ((myBoard[2][2]) === (myBoard[0][0])) ) {
    if(this.playerOne.marker === myBoard[0][0]) {
      winner = this.playerOne;
    }else if(this.playerTwo.marker === myBoard[0][0]) {
      winner = this.playerTwo;
    }
  } else if(( (myBoard[2][0]) === (myBoard[1][1])) && ((myBoard[0][2]) === (myBoard[2][0])) ) {
    if(this.playerOne.marker === myBoard[2][0]) {
      winner = this.playerOne;
    }
    else if(this.playerTwo.marker === myBoard[2][0]) {
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
  }//end of draw
 
  return winner;

}; //end of whoWins 

var makeBoardBackground = function(){
  $("#inner-div").append("<div class='game-area'><div class='row'><div class='col-md-4 odd' id='tr'></div><div class='col-md-4 even' id='tc'></div><div class='col-md-4 odd' id='tl'></div></div><div class='row'><div class='col-md-4 even' id='mr'></div><div class='col-md-4 odd' id='mc'></div><div class='col-md-4 even' id='ml'></div></div><div class='row'><div class='col-md-4 odd' id='br'></div><div class='col-md-4 even' id='bc'></div><div class='col-md-4 odd' id='bl'></div></div></div>");
};

$(document).ready(function(){
  //initialize as false so that players can choose to play the computer
  var computerPlay = false;
  var xGuess;
  var yGuess;
  //hide any buttons or text that cause confusion on what options are
  $("#score-div").hide();
  $("#computer").hide();
  $("#message").hide();

  //click event to start game:loads board
  $("#play").click(function(event){
    event.preventDefault();  
    //set up game
    makeBoardBackground();
    var game = new Game();
    //set board to the board prop of this new game object
    var board = game.board;
    $(".turn").text(" ");
    //show an X or O
    $(".turn").text(game.getTurns().marker);
    $("#computer").show();
    $("#score-div").show();

    var results = function() {
      if(game.whoWins() === "draw") {
        $("#results").text("It's a draw").addClass('animated bounceInLeft');
        $("#score-div").hide();      
      } else if(game.whoWins()){
        $("#score-div").hide();
        $("#results").text(game.whoWins().marker + " wins!").addClass("animated bounceInLeft");
      }
    };

    var nextMoves = function(){
      //change turn and show whose turn it is
      game.toggleTurns();
      $(".turn").text(game.getTurns().marker);
    //if they choose to play computer,start computers turn
      if((game.getTurns().marker === "O") && (computerPlay === true)) {
        compuTurn();
      }
    };

    //click to mark on squares functions
    $("#tr").on("click", function(){
      console.log(game.getTurns());
      if((!(board.isMarkedYet(0, 0))) && (game.whoWins() === false)) {
        game.board.mark(0, 0, game.getTurns().marker);
        $("#tr").text(game.getTurns().marker);
        results();
      }
      nextMoves();
    });

    $("#tc").on("click", function(){
 console.log(game.getTurns());
      if((!(board.isMarkedYet(0, 1))) && (game.whoWins() === false)) {
        game.board.mark(0, 1, game.getTurns().marker);
        $("#tc").text(game.getTurns().marker);
        results();
      }
      nextMoves();
    });

    $("#tl").on("click", function(){
       console.log(game.getTurns());
      if((!(board.isMarkedYet(0, 2))) && (game.whoWins() === false)) {
        game.board.mark(0, 2, game.getTurns().marker);
        $("#tl").text(game.getTurns().marker);
        results();
    }
      nextMoves();
    });

    $("#mr").on("click", function(){
      if((!(board.isMarkedYet(1, 0))) && (game.whoWins() === false)) {
        game.board.mark(1, 0, game.getTurns().marker);
        $("#mr").text(game.getTurns().marker);
        results();
    }
      nextMoves();

    });

    $("#mc").on("click", function(){
      if((!(board.isMarkedYet(1, 1))) && (game.whoWins() === false)) {
        game.board.mark(1, 1, game.getTurns().marker);
        $("#mc").text(game.getTurns().marker);
        results();
      }
      nextMoves();

    });

    $("#ml").on("click", function(){
      if((!(board.isMarkedYet(1, 2))) && (game.whoWins() === false)) {
        game.board.mark(1, 2, game.getTurns().marker);
        $("#ml").text(game.getTurns().marker);
        results();
      }
      nextMoves();
    });

    $("#br").on("click", function(){
      if((!(board.isMarkedYet(2, 0))) && (game.whoWins() === false)) {
        game.board.mark(2, 0, game.getTurns().marker);
        $("#br").text(game.getTurns().marker);
        results();
      }
      nextMoves();

    });

    $("#bc").on("click", function(){
      if((!(board.isMarkedYet(2, 1))) && (game.whoWins() === false)) {
        game.board.mark(2, 1, game.getTurns().marker);
        $("#bc").text(game.getTurns().marker);
        results();
      }
      nextMoves();

    });

    $("#bl").on("click", function(){
      if((!(board.isMarkedYet(2, 2))) && (game.whoWins() === false)) {
        game.board.mark(2, 2, game.getTurns().marker);
        $("#bl").text(game.getTurns().marker);
        results();
      }
      nextMoves();
    });

    $("#computer").click(function(event){
      event.preventDefault();
      computerPlay = true;
     $("#message").show().addClass('animated bounceInLeft');

    });
var compuTurn = function() {
    var computerMarker;
    var xGuess = Math.floor(Math.random() * 3);
    var yGuess = Math.floor(Math.random() * 3);

    if(xGuess === 0 && yGuess === 0) {
    computerMarker = "#tr";
    }
    if(xGuess === 0 && yGuess === 1) {
    computerMarker = "#tc";
    }
    if(xGuess === 0 && yGuess === 2) {
    computerMarker = "#tl";
    }
    if(xGuess === 1 && yGuess === 0) {
    computerMarker = "#mr";
    }
    if(xGuess === 1 && yGuess === 1) {
    computerMarker = "#mc";
    }
    if(xGuess === 1 && yGuess === 2) {
    computerMarker = "#ml";
    }
    if(xGuess === 2 && yGuess === 0) {
    computerMarker = "#br";
    }
    if(xGuess === 2 && yGuess === 1) {
    computerMarker = "#bc";
    }
    if(xGuess === 2 && yGuess === 2) {
    computerMarker = "#bl";
    }

    if((!(board.isMarkedYet(xGuess, yGuess))) && (game.whoWins() === false)) {
      game.board.mark(xGuess, yGuess, game.getTurns().marker);
      $(computerMarker).text(game.getTurns().marker);
      if (game.whoWins() === "draw") {
        $("#results").text("It's a draw").addClass('animated bounceInLeft');
        $("#score-div").hide();
      }
      else if(game.whoWins()) {
        $("#score-div").hide();
        $("#results").text(game.whoWins().marker + " wins!").addClass('animated bounceInLeft');
      }

    game.toggleTurns();
    $(".turn").text(game.getTurns().marker);
    }

    else {
      compuTurn();

    }
  };


  $("#reset").click(function(event){
    event.preventDefault();
    $(".game-area").remove();
    $("#results").removeClass('animated bounceInLeft').text("");
    $("#score-div").hide();
    $(".turn").text("");
    $("#message").hide();
    $("#computer").hide();
    computerPlay = false;
  });

   });//end of submit event
 });//end of file