function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.add = function Vector_add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
}
Vector.prototype.substract = function Vector_subtract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
}
Vector.prototype.scale = function Vector_scale(v) {
    return new Vector(this.x * v.x, this.y * v.y);
}
Vector.prototype.multiplyScalar = function Vector_multiplyScalar(n) {
    return new Vector(this.x * n, this.y * n);
}
Vector.prototype.length = function Vector_length() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
}
Vector.prototype.normalize = function Vector_normalize() {
    var iLen = 1 / this.length();
    return new Vector(this.x * iLen, this.y * iLen);
}
Vector.prototype.dot = function Vector_dot(v) {
    return (this.x * v.x) + (this.y * v.y);
}

function Rect( x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function Point(x,y){
    this.x = x;
    this.y = y;
}

function Circle(x, y, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';    
        
    for(var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    
    return parent;
}