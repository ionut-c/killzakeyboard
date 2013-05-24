var Storage = Storage || { };

var _header_size = 5;
var _levels = 12;
var _char_per_level = 4;
// level[0,1] - level id
// level[2] - unblocked or not
// level[3] - progress

function _getLevelCompletionIndex(id) {
    return _header_size + 3 + (id - 1) * _char_per_level;
}
function _getLevelUnlockedIndex(id) {
    return _header_size + 2 + (id - 1) * _char_per_level
}
function _hasLevels() {
    return (new RegExp("(?:^|;\\s*)" + "levels" + "\\s*\\=")).test(document.cookie);
}
function _getLevels() {
    if ( _hasLevels() ) {
    var levels = document.cookie.replace(/(?:(?:^|.*;\s*)levels\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
    return levels;
    }
    return Storage.resetLevels();
}
Storage.resetLevels = function _resetLevels() {
    var levels = "505040110";
    for (var i = 2; i <= _levels; i++) {
    if( i < 10 ) { levels += +"0"; }
    levels += i + "00";
    }
    document.cookie = "levels=" + levels;
    return levels;
}
Storage.setLevelCompletion = function setLevelCompletion(id, completed) {
    var levels = _getLevels().split("");
    var lIndex = _getLevelCompletionIndex(id);
    if ( completed > levels[ lIndex ] ) {
       levels[ lIndex ] = completed;
    }
    var nextLIndex = _getLevelUnlockedIndex(id + 1);
    if( completed > 0 )
    {
        levels[ nextLIndex ] = 1;
    }
    document.cookie = "levels=" + levels.join("");
}
Storage.getLevelCompletion = function getLevelCompletion(id) {
    var levels = _getLevels();
    var lIndex =  _getLevelCompletionIndex(id);
    return levels[ lIndex ];
}
Storage.isLevelUnlocked = function isLevelUnlocked(id) {
    var levels = _getLevels();
    var lIndex =  _getLevelUnlockedIndex(id);
    return levels[ lIndex ];
}

function _hasSound() {
    return (new RegExp("(?:^|;\\s*)" + "SRS" + "\\s*\\=")).test(document.cookie);
}
function _getSound() {
    if ( _hasSound() ) {
    var sound = document.cookie.replace(/(?:(?:^|.*;\s*)SRS\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
    return sound;
    }
    return _resetSound();
}
function _resetSound() {
    var sound = "11";
    document.cookie = "SRS=" + sound;
    return sound;
}
Storage.getSoundSettings = function getSoundSettings(type){
    var sound = _getSound();
    switch ( type ) {
    case "music":
        return sound[0];
    case "sfx":
        return sound[1];
    default:
        return 0;
    }
    return 0;
}
Storage.toggleSound = function toggleSound(element, mode){
    var sound = _getSound().split("");
    var index = -1;
    
    var testMusic  = element.id.search("ToggleMusic");
    var testSFX  = element.id.search("ToggleSFX");
    
    if ( testMusic != -1) { index = 0; }
    if ( testSFX   != -1) { index = 1; }
    
    if ( sound[index] == 0) {
        sound[index] = 1;
        element.innerHTML = element.innerHTML.replace('Off', 'On');

    } else {
        sound[index] = 0;
        element.innerHTML = element.innerHTML.replace('On', 'Off');
    }
    document.cookie = "SRS=" + sound.join("");
    if(mode == "ingame" && index == 0)
    {
        Sound.updateMusic();
    }
}
