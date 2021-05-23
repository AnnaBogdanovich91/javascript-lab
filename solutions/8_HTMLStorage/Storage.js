function SaveItem() {
			
	var name = document.forms.ShoppingList.name.value;
	var data = document.forms.ShoppingList.data.value;
	localStorage.setItem(name, data);
	doShowAll();
}

function RemoveItem() {
	var name = document.forms.ShoppingList.name.value;
	document.forms.ShoppingList.data.value = localStorage.removeItem(name);
	doShowAll();
}

function ClearAll() {
	localStorage.clear();
	doShowAll();
}

// dynamically draw the table

function doShowAll() {
	if (CheckBrowser()) {
            var key = "";
            var list = "<tr><th>Имя</th><th>Значение</th></tr>\n";

            for (i = 0; i <= localStorage.length - 1; i++) {
		key = localStorage.key(i);
		list += "<tr><td>" + key + "</td>\n<td>"
				+ localStorage.getItem(key) + "</td></tr>\n";
		}
            document.getElementById('list').innerHTML = list;
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