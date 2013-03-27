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
	    return { completed: parseInt(y.substr(0,y.indexOf("/"))), unlocked: parseInt(y.substr(y.indexOf("/")+1))};
	}
    }
    return { completion: 0, unlocked: 0 };
}
function levelCompleted(level, completion) {
  var temp=getLevelCompletion(level);
  if (completion != 0) {
    if (temp.completed == 0)
    {
      setLevelCompletion(level+1, 0, 1);
    }
    setLevelCompletion(level, completion, 1);
  }
}
function resetProgress() {
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