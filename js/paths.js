function PathWalker(path) {
    this.param = 0;
    this.curve = 0;
    this.path = path;
}
PathWalker.prototype.getStart = function PathWalker_getStart() {
    if (this.path != null && this.path.length >= 4) {
        this.param = 0;
        this.curve = 0;
        return this.path[0];
    }
    return null;
}
PathWalker.prototype.getNext = function PathWalker_getNext(speed) {
    var i = this.curve * 3;
    var points = this.path;
    var t = this.param;
    if (points[i] != undefined && points[i + 1] != undefined && points[i + 2] != undefined && points[i + 3] != undefined) {
        // calculate some kinda derivates
        v1x = -3 * points[i].x + 9 * points[i + 1].x - 9 * points[i + 2].x + 3 * points[i + 3].x;
        v1y = -3 * points[i].y + 9 * points[i + 1].y - 9 * points[i + 2].y + 3 * points[i + 3].y;

        v2x = 6 * points[i].x - 12 * points[i + 1].x + 6 * points[i + 2].x;
        v2y = 6 * points[i].y - 12 * points[i + 1].y + 6 * points[i + 2].y;

        v3x = -3 * points[i].x + 3 * points[i + 1].x;
        v3y = -3 * points[i].y + 3 * points[i + 1].y;

        // gets you the wanted "t" for the specified speed
        t += speed / Math.sqrt((t * t * v1x + t * v2x + v3x) * (t * t * v1x + t * v2x + v3x) + (t * t * v1y + t * v2y + v3y) * (t * t * v1y + t * v2y + v3y));

        // cubic bezier formula
        x = Math.pow(1 - t, 3) * points[i].x + 3 * Math.pow(1 - t, 2) * t * points[i + 1].x + 3 * (1 - t) * Math.pow(t, 2) * points[i + 2].x + Math.pow(t, 3) * points[i + 3].x;
        y = Math.pow(1 - t, 3) * points[i].y + 3 * Math.pow(1 - t, 2) * t * points[i + 1].y + 3 * (1 - t) * Math.pow(t, 2) * points[i + 2].y + Math.pow(t, 3) * points[i + 3].y;

        // if "t" is at the end go to next curve
        if (t >= 1) {
            this.curve++;
            this.param = 0;
        } else {
            this.param = t;
        }

        return { "x": x, "y": y };
    }
    
    return null;
}
PathWalker.prototype.atEnd = function PathWalker_atEnd() {
    return (this.curve == Math.floor(this.path.length / 3));
}