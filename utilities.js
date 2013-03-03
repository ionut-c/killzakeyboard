var Vector = function (x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.add = function (v) {
    return new Vector(this.x + v.x, this.y + v.y);
}
Vector.prototype.substract = function (v) {
    return new Vector(this.x - v.x, this.y - v.y);
}
Vector.prototype.scale = function (v) {
    return new Vector(this.x * v.x, this.y * v.y);
}
Vector.prototype.multiplyScalar = function (n) {
    return new Vector(this.x * n, this.y * n);
}
Vector.prototype.length = function () {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
}
Vector.prototype.normalize = function () {
    var iLen = 1 / this.length();
    return new Vector(this.x * iLen, this.y * iLen);
}
Vector.prototype.dot = function (v) {
    return (this.x * v.x) + (this.y * v.y);
}

var Rect = function ( x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}