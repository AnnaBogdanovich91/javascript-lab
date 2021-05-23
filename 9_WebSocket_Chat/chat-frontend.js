(function () {
    "use strict";

    // Для улучшения производительности сохраним активные элементы HTML
    var content = document.getElementById('content');
    var input = document.getElementById('input');
    var status = document.getElementById('status');


    // Цвет еще не получен от сервреа
    var myColor = false;
    // Имя пользователя еще не отправлено на сервер
    var myName = false;

    // Проверить совместимость браузера
    if (!window.WebSocket) {
        content.innerHTML = '<p> Извините, этот браузер не поддерживает \n\
                                технологию WebSocket.</p>';
        return;
    }

/*	Ваш код должен быть здесь     
	
	Открыть соединение на сервер 'ws://127.0.0.1:1337'

	Если соединение установлено успешно, запросить имя пользователя
	
	
    Если получено сообщение от сервера, обработать его.
    Сервер отправляет сообщения в формате JSON
    1. Сервер отправляет цвет подключившемуся пользователю
      {'type':'color', 'data':color}
    2. Сервер рассылает всем пользователям новое сообщение
      {'type':'message',
       'data': {
               time: time,
               text: htmlEntities,
               author: userName,
               color: userColor  
               }
       }
    3. Сервер отпправляет новому пользователю всю историю сообщений
      {'type':history, 'data': array_of_messages }
*/
   
   

    /**
     * Отправить сообщение, после нажатия Enter (код 13)
     */
    input.addEventListener('keydown',function(event) {
        if (event.keyCode === 13) {
            var msg = input.value;
            if (!msg) {
                return;
            }
            // Сообщение - текст. Дополнительного преобразования не требуется
            connection.send(msg);
            input.value = '';
            // Заблокировать ввод, пока не будет получен ответ от сервера
            input.setAttribute ('disabled',true);

            // Первое, что вводит пользователь - свое имя. Сохранить его.
            if (myName === false) {
                myName = msg;
            }
        }
    });


    /**
     * Показать сообщение
     */
    function addMessage(author, message, color, dt) {
        content.innerHTML = '<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>' + content.innerHTML;
    }
})();