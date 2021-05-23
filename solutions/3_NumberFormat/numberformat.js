function formatNumber(number) {

    var result = '';

    if (number < 0) {
        result = formatNumber(Math.abs(number));
        return '-' + result;
    }
	var num = number + '';
	var indexPoint = num.indexOf('.');
	var fraction,real;
	if (indexPoint != -1 ) {
		fraction = formatNumber(num.substring(indexPoint+1));
		real = formatNumber (num.substring(0,indexPoint));
		result = real + '.' + fraction;
		return result;
	}
	else
	{
	    for (var i = num.length - 3; i >= 0; i -= 3) {
		result = ' ' + num.slice(i, i + 3) + result;
	}

		result = (num.slice(0, num.length % 3) + result);
		return result;
	}

}

var str = prompt ('Введите строку с числами');
var numregex = /(^|\s)-?\d+(\.\d+)?(\s|$)/igm
str = str.replace (numregex, formatNumber);
alert (str);