var Graphics = Graphics || {};

Graphics.Model = function Model(filePath, frameWidth, frameHeight, frameCount, frameSets, frameRate) {
    this.image = new Image();
    this.image.src = filePath;
    this.frameSize = { 'width': frameWidth, 'height': frameHeight };
    this.frameCount = frameCount;
    this.frameSets = frameSets;
    this.frameRate = frameRate;

}
Graphics.Model.prototype.getFrameRate = function Model_getFrameRate(){
    return this.frameRate;
}
Graphics.Model.prototype.getFrameCount = function Model_getFrameCount(){
    return this.frameCount;
}
Graphics.Model.prototype.getImage = function Model_getImage(){
    return this.image;
}
Graphics.Model.prototype.getSize = function Model_getSize(){
    return this.frameSize;
}

Graphics.loadModels = function Graphics_loadModels() {
    PlayerModel = new Graphics.Model("assets/sprites/player_sprite.png", 240, 100, 6, 1, 1000/24);
    BirdModel = new Graphics.Model("assets/sprites/koocha_sprite.png", 105, 100, 6, 1, 1000/24);
    AppleModel = new Graphics.Model("assets/sprites/apple_sprite.png", 22, 27, 1, 1, 1000/1000);
    KoochaDeathModel = new Graphics.Model("assets/sprites/death_animation_detail.png", 124, 100, 6, 1, 1000/24);
}

Graphics.ModelObject = function ModelObject(model, context){
    this.context = context;
    this.model = model;
    this.index = 0;
    this.lastIndex = model.getFrameCount();
    this.elapsedTime = 0;
    this.indexFrameset = 0;
    this.position = { "x" : 0, "y" : 0 }
    this.current = { 'x': 0, 'y': 0 }
    this.modelSize = this.model.getSize();
    this.ended = false;
}
Graphics.ModelObject.prototype.update = function ModelObject_update(deltaTime){
    this.elapsedTime += deltaTime;
    if( this.elapsedTime >= this.model.getFrameRate()){
        //next frame
        if (this.index + 1 == this.lastIndex) {
            this.ended = true;
            this.index = 0;
        } else {
            this.index++;
        }
        this.current.x = this.index * this.modelSize.width;
        this.elapsedTime = 0;
    } 
}
Graphics.ModelObject.prototype.render = function ModelObject_render(){
    this.context.drawImage(this.model.getImage(),
                      this.current.x, this.current.y,
                      this.modelSize.width,
                      this.modelSize.height,
                      this.position.x,
                      this.position.y,
                      this.modelSize.width,
                      this.modelSize.height);
}
Graphics.ModelObject.prototype.setPosition = function ModelObject_setPosition(point) {
    this.position.x = point.x;
    this.position.y = point.y;
}
Graphics.ModelObject.prototype.getPosition = function ModelObject_getPosition(){
    return { "x": this.position.x, "y": this.position.y };
}
Graphics.ModelObject.prototype.getSize = function ModelObject_getSize(){
    return this.modelSize;
}
Graphics.ModelObject.prototype.getContext = function ModelObject_getContext(){
    return this.context;
}
Graphics.ModelObject.prototype.isOver = function ModelObject_isOver(){
    return this.ended;
}