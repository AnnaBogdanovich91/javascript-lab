function SaveItem() {
			
/* Здесь должен быть Ваш код для сохранения товара */
    doShowAll();
}

function RemoveItem() {
/* Здесь должен быть Ваш код для удаления товара */
    doShowAll();
}

function ClearAll() {
/* Здесь должен быть Ваш код для очистки хранилища */
	doShowAll();
}

function doShowAll() {
	if (CheckBrowser()) {
            var key = "";
            var list = "<tr><th>Имя</th><th>Значение</th></tr>\n";

            /* Здесь должен быть Ваш код для формирования таблицы товаров */

	} else {
            alert('Извините, ваш браузер не поддерживает HTML5 Web Storage');
	}
}

/*
 * Checking the browser compatibility.
 */
function CheckBrowser() {
    if (typeof(Storage) !== "undefined") {
	// we can use localStorage object to store data
	return true;
    } else {
	return false;
    }
}