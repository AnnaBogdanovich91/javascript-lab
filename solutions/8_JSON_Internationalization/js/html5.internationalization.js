
var languages = document.getElementsByClassName('language');
for (index=0; index < languages.length; index++)
{
    languages[index].addEventListener('click', function(){
         switchLanguage(this.dataset.lang);
    });
}

function switchLanguage(language){
    request ("i18n/" + language + ".json");
}
function processLangDocument(responseText){
    var langDocument = {};
    langDocument = JSON.parse(responseText);

    var tags = document.querySelectorAll('span,img,a,label,li,option,h1,h2,h3,h4,h5,h6');
    for (index=0; index < tags.length; index++)
    {
        var key = tags[index].dataset.langkey;
        if(langDocument[key]) tags[index].innerText = langDocument[key];
    }
}
