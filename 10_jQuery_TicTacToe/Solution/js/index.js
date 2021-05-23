$(document).ready(function(){

        /*
     * Каждой клетке поля сопоставлен некий индикатор, степень двойки
     * 
     * Учет клеток, отмеченных игроком, будем вести как сумму индикаторов клетки.
     * Так, если игрок поставил “X”  во все клетки первой строки, его балл 
     * будет равен  7. 
     * Известно, что выигрышные комбинации:  7, 56, 448, 73, 146, 292, 273, 84
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    
    var move = 1;
    var wins = [7, 56, 448, 73, 146, 292, 273, 84];
    var score = {"X": 0, "O": 0};

  $("#board tr td").click(function() {
    if ($(this).text() === "") {
      var turn = (move%2)? "X":"O";
      $(this).append(turn); 
      score[turn] += parseInt(this.dataset.indicator);
      
      if (checkForWinner(score[turn])) { 
	$('p').text(turn +  " выиграл!"); 
        startNewGame();
        return;
      }
      if (move === 9) { 
          $('p').text("Ничья!");
          startNewGame();
          return;
      } else  
      {
          move++;
          $('p').text ('Ходит ' + ((move%2)? "X":"O") );
      } 
    }
  });

  function checkForWinner(score) {
    for (var i = 0; i < wins.length; i += 1) {
        if ((wins[i] & score) === wins[i]) {
          return true;
        }
    }
    return false;
  }
  function startNewGame (){
      $("#board tr td").text("");
      score.X = 0; score.O =0;
      move = 1;
  }
});