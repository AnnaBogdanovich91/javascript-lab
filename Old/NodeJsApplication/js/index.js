$(document).ready(function(){

    if (!window.WebSocket) {
        console.log('No support for WebSocket.');
        return;
    }

    // Открыть соединение
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
    };

    connection.onerror = function (error) {
        // Проблемы с соединением
    };

  var move = 1;
     /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
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
  var wins = [7, 56, 448, 73, 146, 292, 273, 84];
  var score = {"X": 0, "O": 0};
  var turn = "X";
  var game = false;
  startNewGame();

  $("#board tr td").click(function() {
    if ($(this).text() === "" && game) {
        //turn = (move%2)? "X":"O";
        $(this).append(turn); 
        score[turn] += parseInt(this.dataset.indicator);
        connection.sendUTF(JSON.stringify(score));
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
  connection.onmessage = function (message) {
    
    // Получить score
    score = JSON.parse(message);
    // Определить где был клик. 
    // 
    // Проверить победителя
          
      if (checkForWinner(score[turn])) { 
	alert(turn +  " wins!"); 
        startNewGame();
        return;
      }
      if (move === 9) { 
          alert("Nobody wins!");
          startNewGame();
          return;
      } 
      move++; 
  }
  function startNewGame (){

      $.post('http://localhost:8080',
        JSON.stringify({command:'init', value:score})
        ,function(data,status){
            console.log("Data: " + data.player + "\nStatus: " + status);
            if (data.player != -1)
                turn = data.player;
                $("#board tr td").text("");
                score.X = 0; score.O =0;
                move = 1;
                game = true;
        });
  }
});