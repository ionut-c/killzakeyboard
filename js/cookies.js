var _header_size = 5;
var _levels = 24;
var _char_per_level = 3;
// level[0] - level id
// level[1] - unblocked or not
// level[2] - progress

function hasLevels() {
    return (new RegExp("(?:^|;\\s*)" + "levels" + "\\s*\\=")).test(document.cookie);
}
function getLevels() {
    if ( hasLevels() ) {
	var levels = document.cookie.replace(/(?:(?:^|.*;\s*)levels\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
	return levels;
    }
    return null;
}
function resetLevels() {
    var levels = "50503";
    for (var i = 1; i <= 5; i++) {
	if( i == 1) { levels += i + "10"; }
	else        { levels += i + "00"; }
    }
    document.cookie = "levels=" + levels;
}
function printLevels() {
    var levels = getLevels();
    if ( levels != null) {
	console.log( levels );
    }
}
function setLevelCompletion(id, completed) {
    if ( !hasLevels() ) { resetLevels(); }
    var levels = getLevels().split("");
    var lIndex =  _header_size + (id - 1) * _char_per_level;
    if ( completed > levels[ lIndex + 2 ] ) {
	levels[ lIndex + 2 ] = completed;
    }
    var nextLIndex = lIndex + _char_per_level;
    levels[ nextLIndex + 1 ] = 1;
    document.cookie = "levels=" + levels.join("");
}
function getLevelCompletion(id) {
    if ( !hasLevels() ) { resetLevels(); }
    var levels = getLevels();
    var lIndex =  _header_size + (id - 1) * _char_per_level;
    return levels[ lIndex + 2 ];
}
function isLevelUnlocked(id) {
    if ( !hasLevels() ) { resetLevels(); }
    var levels = getLevels();
    var lIndex =  _header_size + (id - 1) * _char_per_level;
    return levels[ lIndex + 1 ];
}
function getSoundSettings(type)
{
    var soundCookie = "SRS";
    var hasCookie = false;
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==soundCookie)
        {
            console.log(y);
            hasCookie = true;
        }
    }
    if(hasCookie === false)
    {
        return 1;
    }
    else {
        return parseInt(y.substr(type,1));
    }
}
function toggleSound(type, id)
{
    var soundCookie = "SRS";
    var hasCookie = false;
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==soundCookie)
        {
            hasCookie = true;
        }
    }
    if(hasCookie === false)
    {
        var exdate=new Date();
        var value;
        exdate.setDate(exdate.getDate() + 365);
        if(type === 0)
        {
            value = "01";
        }
        else if(type === 1)
        {
            value = "10";

        }
        id.innerHTML = id.innerHTML.replace('On', 'Off');
        var cookieV=value + "; expires="+exdate.toUTCString();
        document.cookie=soundCookie + "=" + cookieV;
        console.log(y);
    }
    else {
        var exdate=new Date();
        var value;
        exdate.setDate(exdate.getDate() + 365);
        var getCurrentSetting = parseInt(y.substr(type,1));
        var getOtherSetting;
        if(getCurrentSetting == 0)
        {
            getCurrentSetting = 1;
            id.innerHTML = id.innerHTML.replace('Off', 'On');
        }
        else {
            getCurrentSetting = 0;
            id.innerHTML = id.innerHTML.replace('On', 'Off');
        }
        if(type === 0)
        {
            console.log(y);
            console.log(y.substr(0,1)+" here");
            getOtherSetting = parseInt(y.substr(0,1));
            value = getCurrentSetting + "" + getOtherSetting;
        }
        else {
            console.log(y.substr(1,1)+" here");
            getOtherSetting = parseInt(y.substr(1,1));
            value = getOtherSetting + "" + getCurrentSetting;
        }
        console.log(type + " is: " + getCurrentSetting + " and other: " + getOtherSetting);
        var cookieV=value + "; expires="+exdate.toUTCString();
        document.cookie=soundCookie + "=" + cookieV;
    }
}