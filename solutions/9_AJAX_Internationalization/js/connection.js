var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200) {
        processLangDocument(this.responseText);
    }
};

function request (file)
{
    xhttp.open("GET", file, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
};

