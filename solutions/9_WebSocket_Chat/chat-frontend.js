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

    // Открыть соединение
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        // Запросить имя пользователя
        input.removeAttribute ('disabled');
        status.innerHTML = 'Укажите имя:';
    };

    connection.onerror = function (error) {
        // Проблемы с соединением
        content.innerHTML = '<p> "Извините, проблемы с соединением" </p>';
    };

    /* Обработка получаемых сообщений
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
   
    connection.onmessage = function (message) {
        // Преобразовать объект JSON в объект JavaScript
        var json = JSON.parse(message.data);

        // См. комментарий выше или исходный код сервера
        if (json.type === 'color') { 
            myColor = json.data;
            status.innerHTML = myName + ': ';
            status.setAttribute('style','color:' + myColor);
            input.removeAttribute ('disabled');
            // Теперь пользователь может отправлять сообщения
        } else if (json.type === 'history') { 
            // Отобразить всю историю переписки
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text,
                           json.data[i].color, new Date(json.data[i].time));
            }
        } else if (json.type === 'message') { 
            // Отобразить сообщение и дать пользователю возможность ответить
            input.removeAttribute ('disabled');
            addMessage(json.data.author, json.data.text,
                       json.data.color, new Date(json.data.time));
        } else {
            console.log('Неверный формат сообщения: ', json);
        }
    };

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

            // Первое, что вводит пользоатель - свое имя. Сохранить его.
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