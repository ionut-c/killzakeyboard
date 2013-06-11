var Graphics = Graphics || {};

Graphics.Background = function Background(context, filePath, imageWidth, imageHeight, screenWidth, screenHeight){
    this.image = new Image();
    this.image.src = filePath;
    this.width = imageWidth;
    this.height = imageHeight;
    this.screen = { 'width': screenWidth, 'height': screenHeight };
    this.position = {"x": 0, "y": 0};
    this.elapsedTime = 0;
    this.context = context;
}
Graphics.Background.prototype.update = function Background_update(deltaTime){
    this.elapsedTime += deltaTime;
    if(this.elapsedTime >= 10){
        this.elapsedTime = 0;
        this.position.x+=3;
        if( this.position.x >= this.width){
            this.position.x = 0;
        }
    }
}
Graphics.Background.prototype.render = function Background_render(){
    if(this.position.x + this.screen.width > this.width){
        var w1 = this.width - this.position.x;
        this.context.drawImage(this.image,
                           this.position.x, this.position.y,
                           w1, this.height,
                           0, 0,
                           w1, this.screen.height);
        var w2 = this.position.x + this.screen.width - this.width;
        this.context.drawImage(this.image,
                           0, this.position.y,
                           w2, this.height,
                           w1 , 0,
                           w2, this.screen.height);
    } else {
    this.context.drawImage(this.image,
                           this.position.x, this.position.y,
                           this.screen.width, this.height,
                           0, 0,
                           this.screen.width, this.screen.height);
    }
    this.context.restore();
}