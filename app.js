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