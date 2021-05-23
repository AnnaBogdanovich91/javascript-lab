//var counter = 0;
//
//function increment (){
//    counter++; return counter++;
//}

function  Counter () {
    var counter = 0;
    
    this.increment =  function () {counter++;
         return counter;},
    this.decrement = function () {counter--;
         return counter;},
    this.getValue =  function () {
         return counter;}
    };

//var Counter = (function () {
//    var counter = 0;
//    return {
//        increment: function () {counter++;
//         return counter++;},
//        decrement: function () {counter++;
//         return counter++;},
//        getValue: function () {
//         return counter;}
//    };
//})();
