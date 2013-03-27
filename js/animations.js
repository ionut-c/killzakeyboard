function Model(filePath, frameWidth, frameHeight, frameCount, frameSets, frameRate) {
    this.image = new Image();
    this.image.src = filePath;
    this.frameSize = { 'width': frameWidth, 'height': frameHeight };
    this.frameCount = frameCount;
    this.frameSets = frameSets;
    this.frameRate = frameRate;

}
Model.prototype.getFrameRate = function Model_getFrameRate(){
    return this.frameRate;
}
Model.prototype.getFrameCount = function Model_getFrameCount(){
    return this.frameCount;
}
Model.prototype.getImage = function Model_getImage(){
    return this.image;
}
Model.prototype.getSize = function Model_getSize(){
    return this.frameSize;
}

function ModelObject(model, context){
    this.context = context;
    this.model = model;
    this.index = 0;
    this.lastIndex = model.getFrameCount();
    this.elapsedTime = 0;
    this.indexFrameset = 0;
    this.position = { "x" : 0, "y" : 0 }
    this.current = { 'x': 0, 'y': 0 }
    this.modelSize = this.model.getSize();
}
ModelObject.prototype.update = function ModelObject_update(deltaTime){
    this.elapsedTime += deltaTime;
    if( this.elapsedTime >= this.model.getFrameRate()){
        //next frame
        this.index = this.index + 1 == this.lastIndex ? 0 : this.index + 1;
        this.current.x = this.index * this.modelSize.width;
        this.elapsedTime = 0;
    } 
}
ModelObject.prototype.render = function ModelObject_render(){
    this.context.drawImage(this.model.getImage(),
                      this.current.x, this.current.y,
                      this.modelSize.width,
                      this.modelSize.height,
                      this.position.x,
                      this.position.y,
                      this.modelSize.width,
                      this.modelSize.height);
}
ModelObject.prototype.setPosition = function ModelObject_setPosition(point) {
    this.position.x = point.x;
    this.position.y = point.y;
}
ModelObject.prototype.getPosition = function ModelObject_getPosition(){
    return { "x": this.position.x, "y": this.position.y };
}
ModelObject.prototype.getSize = function ModelObject_getSize(){
    var modelSize = this.model.getSize();
    return { "width": modelSize.width, "height": modelSize.height};
}
ModelObject.prototype.getContext = function ModelObject_getContext(){
    return this.context;
}

function Background(context, filePath, imageWidth, imageHeight, screenWidth, screenHeight){
    this.image = new Image();
    this.image.src = filePath;
    this.width = imageWidth;
    this.height = imageHeight;
    this.screen = { 'width': screenWidth, 'height': screenHeight };
    this.position = {"x": 0, "y": 0};
    this.elapsedTime = 0;
    this.context = context;
}
Background.prototype.update = function Background_update(deltaTime){
    this.elapsedTime += deltaTime;
    if(this.elapsedTime >= 10){
        this.elapsedTime = 0;
        this.position.x++;
        if( this.position.x >= this.width){
            this.position.x = 0;
        }
    }
}
Background.prototype.render = function Background_render(){
    if(this.position.x + this.screen.width > this.width){
        var w1 = this.width - this.position.x;
        this.context.drawImage(this.image,
                           this.position.x, this.position.y,
                           w1, this.screen.height,
                           0, 0,
                           w1, this.screen.height - 1);
        var w2 = this.position.x + this.screen.width - this.width;
        this.context.drawImage(this.image,
                           0, this.position.y,
                           w2, this.screen.height,
                           w1 , 0,
                           w2, this.screen.height - 1);
    } else {
    this.context.drawImage(this.image,
                           this.position.x, this.position.y,
                           this.screen.width, this.screen.height,
                           0, 0,
                           this.screen.width - 1, this.screen.height - 1);
    }
    this.context.restore();
}
