// A $( document ).ready() block.
$( document ).ready(function() {

  // human
  var huPlayer = "o";
  // ai
  var aiPlayer = "x";
var calls = 0;
var board = scanBoard();
console.log(emptySpots(board));






/*
Function that makes AI choose the best path to victory
*/
function minimax(board, player){

  calls++;

  var emptySpots = emptySpots(board);

  if (winning(board, huPlayer)) {
    return{score:-10}
  }else if (winning(board, aiPlayer)) {
    return{score:10}
  }else if (emptySpots.length === 0){
  	return {score:0};
  }

}

/*
Function that scans the html board and returns the current board in array form
*/
function scanBoard(){
var boardArray = [];
  for (var i = 0; i < 9; i++) {
    var id = i.toString();
    var classList = document.getElementById(id).className.split(/\s+/);
    //console.log(classList);
    if (classList.includes("x")) {
      boardArray.push("x");
    }else if(classList.includes("o")){
      boardArray.push("o");
    }else{
      boardArray.push(i);
    }
  }
  console.log(boardArray);
  return boardArray
}

/*
Function that finds the open spots on the board
*/
function emptySpots(board){

  var emptySpotsArray = [];
  emptySpotsArray = board.filter(function(value){
    return value != "x" && value != "o";
  });
return emptySpotsArray;
}

/*
Function that checks to see if any of the winning combinations are on the board for the player
*/
function winning(board, player){
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}
















});
