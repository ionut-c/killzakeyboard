var _header_size = 5;
var _levels = 5;
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
