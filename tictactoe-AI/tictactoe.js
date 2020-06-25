const humPlayer = 'O';
const aiPlayer = 'X';
var origBoard;
const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
origBoard = Array.from(Array(9).keys());
console.log(origBoard);
$(document).ready(function(){
  $(".cell").bind("click",this,function(){
    var i = $(this).attr("id");
    $(this).unbind("click");
    turn(i, humPlayer);
    //aiplayers turn
    turn(bestspot(), aiPlayer);
  });
});

function turn(cellid, player){
  $('#'+cellid).text(player);
  origBoard[cellid] = player;
  let gamewon = checkWin(origBoard, player);
  if(gamewon)gameOver(gamewon)
  else if(emptySquares().length == 0){
    $(".cell").unbind("click");
    $(".declareWinner").removeClass("hide");
    $(".declareWinner").find("td").text("Tie Game!");
  }
}
function checkWin(board, player){
  //get all index values that have been played
  //reduce - params- accumulator, element, index
  const played = board.reduce((a,e,i) =>
    (e === player)? a.concat(i) : a,[]);
  // for(var i =0; i < winCombos.length ; i++){
  //   var count = 0;
  //   for(var j= i; j< winCombos[i].length; j++){
  //     if(played.indexOf(winCombos[i][j]) != '-1'){
  //       count++;
  //       if(count+1 == winCombos[i].length){
  //         console.log("win");
  //       }
  //     }
  //   }
  // }
  //instead of above native for loop we can use this
  var gamewon = null;
  for(let [index, win] of winCombos.entries()){
    if(win.every(elem => played.indexOf(elem) > -1)){
      gamewon = {win:win, player: player};
      break;
    }
  }
  return gamewon;
}
function emptySquares(){
  return origBoard.filter(ele => typeof ele == 'number');
}

function bestspot(){
  return  minimax(origBoard, aiPlayer).index;
}

function gameOver(gamewon){
  const color = gamewon.player == humPlayer? "green" : "red";
  const text = gamewon.player == humPlayer? "You Win!" : "You Lose!";
  for(index of gamewon.win){
    $('#'+index).css("background-color", color);
  }
  $(".cell").unbind("click");
  $(".declareWinner").removeClass("hide");
  $(".declareWinner").find("td").text(text);
}

function checkTie(board){
  return board.every(ele => typeof ele != "number");
}
function minimax(tempBoard, player){
  //setting up score
  if(checkWin(tempBoard, aiPlayer)){
    return {score : 20};
  }
  else if (checkWin(tempBoard, humPlayer)) {
    return {score:-10};
  }
  else if (checkTie(tempBoard)) {
    return {score: 0};
  }
  var tempemptysquares = emptySquares();
  var movesarr  = [];
  for(var i =0; i < tempemptysquares.length; i++)
  {
    var moves = {};
    var index = tempBoard.indexOf(tempemptysquares[i]);
    tempBoard[index] = player;
    if(player == aiPlayer){
      var result = minimax(tempBoard, humPlayer);
      //moves = {'score' : score, 'index' : index};
      moves.score = result.score;
      moves.index = index;
    }
    else if(player == humPlayer){
      var result = minimax(tempBoard, aiPlayer);
      //moves = {'score' : score, 'index' : index};
      moves.score = result.score;
      moves.index = index;
    }
    movesarr.push(moves);
    //again filling back the tempboard with numbers
    tempBoard[tempemptysquares[i]] = index;
    if(i == 1){
      break;
    }
  }
  var bestMove;
  if(player == aiPlayer){
    var bestscore = -10000;
    for(var i= 0; i< movesarr.length; i++){
      if(movesarr[i].score > bestscore){
        bestscore = movesarr[i].score;
        bestMove = i;
      }
    }
  }
  else{
    var bestscore = 10000;
    for(var i= 0; i< movesarr.length; i++){
      if(movesarr[i].score < bestscore){
        bestscore = movesarr[i].score;
        bestMove = i;
      }
    }
  }
  return movesarr[bestMove];
}
//
