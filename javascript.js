// A $( document ).ready() block.
$( document ).ready(function() {
var phrases = ["What are you going to do about that!?","You play like a peasant!","PATHETIC!","Are you even trying?","You're a disgrace to all humans!","I'm not even trying!","I know every possible outcome!","Just give up!"]
var interval;
var running = false;
var wordBuilding = false;
var currentPhrase;
var currentPhraseArray;
var counter;
var audio = new Audio('undertale.mp3');
  // human
  var huPlayer = "o";
  // ai
  var aiPlayer = "x";
var calls = 0;
var board = scanBoard();
console.log(calls);

$( ".tic-box" ).click(function() {
  var classList = document.getElementById(this.id).className.split(/\s+/);
  //Check if space has alrady been used by a player
  if (classList.includes("x") || classList.includes("o")) {
    console.log("Already used!");
  } else {

    var board = scanBoard();

    console.log((emptyIndexies(board)).length);

    if (winning(board, huPlayer)){
      clearInterval(interval);
       console.log("h1");
       $( ".ai-text" ).text("What!? IMPOSSIBLE!");
    }
  	else if (winning(board, aiPlayer)){
      clearInterval(interval);
      console.log("ai1");
      $( ".ai-text" ).text("Not even a challenge!");
  	}
    else if ((emptyIndexies(board)).length-1 === 0){
      clearInterval(interval);
    	console.log("tie1");
      $( ".ai-text" ).text("Don't get cocky that's not even a win!");
    }else {



    $( "#"+(this.id).toString() ).addClass( "o" );

    board = scanBoard();
    console.log(board);
    var bestMoveAI = minimax(board, aiPlayer)
    console.log(bestMoveAI);



    $( "#"+(bestMoveAI.index).toString() ).addClass( "x" );
    if (wordBuilding == false) {
      currentPhrase = phrases[getRandomInt(phrases.length)];
      console.log(currentPhrase);
      currentPhraseArray = currentPhrase.split("");
      console.log(currentPhraseArray);
      counter = 0;
      wordBuilding = true;
      $( ".ai-text" ).text(".");
      audio.play();
    }
    if (running == false) {

      running = true;
      wordBuilding = true;

      interval = setInterval(function(){

        if (counter >= currentPhraseArray.length) {
          wordBuilding = false;
          audio.currentTime = 0
          audio.pause();
        } else {

        var currentAIText = $( ".ai-text" ).text();
        currentAIText = currentAIText.replace("."," ");
        $( ".ai-text" ).text(currentAIText + currentPhraseArray[counter]);
        counter++;

      }

    }, 90);

    }
    board = scanBoard();
    if (winning(board, huPlayer)){
      clearInterval(interval);
      audio.currentTime = 0
      audio.pause();
       console.log("h");
       $( ".ai-text" ).text(".");
       underType("What!? IMPOSSIBLE!")
    }
  	else if (winning(board, aiPlayer)){
      clearInterval(interval);
      audio.currentTime = 0
      audio.pause();
      console.log("ai");
      $( ".ai-text" ).text(".");
      underType("Not even a challenge!")
  	}
    else if ((emptyIndexies(board)).length-1 === 0){
      clearInterval(interval);
      audio.currentTime = 0
      audio.pause();
    	console.log("tie");
      $( ".ai-text" ).text(".");
      underType("Don't get cocky that's not even a win!")
    }

  }
  }
  });

  // the main minimax function
  function minimax(newBoard, player){
    //add one to function calls
    calls++;

    //available spots
    var availSpots = emptyIndexies(newBoard);

    // checks for the terminal states such as win, lose, and tie and returning a value accordingly
    if (winning(newBoard, huPlayer)){
       return {score:-10};
    }
  	else if (winning(newBoard, aiPlayer)){
      return {score:10};
  	}
    else if (availSpots.length === 0){
    	return {score:0};
    }

  // an array to collect all the objects
    var moves = [];

    // loop through available spots
    for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
    	move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer){
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
      }
      else{
        var result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
    var bestMove;
    if(player === aiPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }else{

  // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

  // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
  }

  // returns the available spots on the board
  function emptyIndexies(board){
    return  board.filter(s => s != "o" && s != "x");
  }

  // winning combinations using the board indexies for instace the first win could be 3 xes in a row
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

  return boardArray
}

//Generate random int from 0 to max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//starts undertale style message
function underType(msg) {
    var currentMsg = msg;
    var currentMsgArray = currentMsg.split("");
    var msgCounter = 0;
    $( ".ai-text" ).text(".");
    audio.play();



    interval = setInterval(function(){

      if (msgCounter >= currentMsgArray.length) {
        clearInterval(interval);
        audio.pause();
      } else {

      var currentAIText = $( ".ai-text" ).text();
      currentAIText = currentAIText.replace("."," ");
      $( ".ai-text" ).text(currentAIText + currentMsgArray[msgCounter]);
      msgCounter++;

    }

  }, 90);

  }


});
