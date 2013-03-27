function setLevelCompletion(level, completion, unlocked){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 356);
    var c_value=escape(completion+"/"+unlocked) + "; expires="+exdate.toUTCString();
    document.cookie= level + "=" + c_value;
}

function getLevelCompletion(level){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x == level){
		    return { completed: parseInt(y.substr(0,y.indexOf("/"))) || 0, unlocked: parseInt(y.substr(y.indexOf("/")+1))};
		}
    }
    return { completed: 0, unlocked: 0 };
}

function levelCompleted(level, completion) {
  var temp=getLevelCompletion(level);
  if (completion > temp.completed) {
    setLevelCompletion(level, completion, 1);
    var tempNext = getLevelCompletion(level+1);
    if(tempNext.unlocked === 0)
    {
    	setLevelCompletion(level+1, tempNext.completion, 1);
    }
  }
}
function resetProgress() {
	document.getElementById("Reset").className="title-button disabled";
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (level = 1; level <= 5; level++) {
	for (i=0;i<ARRcookies.length;i++)
	{
	    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	    x=x.replace(/^\s+|\s+$/g,"");
	    if (x == level){
			if (level === 1) {
			    setLevelCompletion(level,0,1);
			}
			else {
			    setLevelCompletion(level,0,0);
			}
			getLevelCompletion(level);
	    }
	}
    }
}
function deleteAllCookies() {
	document.getElementById("Freset").className="title-button disabled";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
    	var cookie = cookies[i];
    	var eqPos = cookie.indexOf("=");
    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
