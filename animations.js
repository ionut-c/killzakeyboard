var Model = function(filePath, frameWidth, frameHeight, frameCount, frameSets, frameRate) {
    this.image = new Image();
    this.image.src = filePath;
    this.frameSize = { 'width': frameWidth, 'height': frameHeight };
    this.frameCount = frameCount;
    this.frameSets = frameSets;
    this.frameRate = frameRate;

}
Model.prototype.getFrameRate = function(){
    return this.frameRate;
}
Model.prototype.getFrameCount = function(){
    return this.frameCount;
}
Model.prototype.getImage = function(){
    return this.image;
}
Model.prototype.getSize = function (){
    return { "width": this.frameSize.width, "height": this.frameSize.height};
}

var ModelObject = function (model, context){
    this.context = context;
    this.model = model;
    this.index = 0;
    this.lastIndex = model.getFrameCount();
    this.elapsedTime = 0;
    this.indexFrameset = 0;
    this.position = { "x" : 0, "y" : 0 }
    this.current = { 'x': 0, 'y': 0 }
}
ModelObject.prototype.update = function (deltaTime){
    this.elapsedTime += deltaTime;
    var modelSize = this.model.getSize();
    if( this.elapsedTime >= this.model.getFrameRate()){
        //next frame
        this.index = this.index + 1 == this.lastIndex ? 0 : this.index + 1;
        this.current.x = this.index * modelSize.width;
        this.elapsedTime = 0;
    } 
}
ModelObject.prototype.render = function (){
    var modelSize = this.model.getSize();
    this.context.drawImage(this.model.getImage(),
                      this.current.x, this.current.y,
                      modelSize.width,
                      modelSize.height,
                      this.position.x - modelSize.width / 2,
                      this.position.y - modelSize.height / 2,
                      modelSize.width,
                      modelSize.height);    
}
ModelObject.prototype.setPosition = function (point) {
    this.position.x = point.x;
    this.position.y = point.y;
}
ModelObject.prototype.getPosition = function (){
    return { "x": this.position.x, "y": this.position.y };
}
ModelObject.prototype.getSize = function (){
    var modelSize = this.model.getSize();
    return { "width": modelSize.width, "height": modelSize.height};
}