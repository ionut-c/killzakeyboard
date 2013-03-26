function InputController() {
    var keysDown = new Array();
    addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
    addEventListener("keyup", function (e) { keysDown[e.keyCode] = false; }, false);
    
    function checkKey(keycode){
        if(keysDown[keycode] == undefined){ return false;}
            return keysDown[keycode];
    }
    
    return {"checkKey": checkKey};
}
