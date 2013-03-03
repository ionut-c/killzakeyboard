// todo change to Model
function Animation(context, file_path, frame_size_width, frame_size_height, frame_count, frame_sets, frame_rate) {
    var image = new Image();
    image.src = file_path;
    var frame_size = { 'width': frame_size_width, 'height': frame_size_height };
    var index = 0;
    var lastIndex = frame_count;
    var elapsed_time = 0;
    var index_frameset = 0;
    // assume momentarily that all frames in the sprite are only in a single strip 
    // moving along the X plane
    var position = { "x" : 0, "y" : 0 }
    var current = { 'x': 0, 'y': 0 }

    function setPosition(point) {
        position.x = point.x;
        position.y = point.y;
    }
    
    function getBoundingBox() {
        return {
            "x": position.x + (frame_size_width/4),
            "y": position.y + (frame_size_height/4),
            "width": frame_size_width/2,
            "height": frame_size_height/2
        };
    }

    function drawFrame() {
        context.drawImage(image,
                          current.x, current.y,
                          frame_size.width,
                          frame_size.height,
                          position.x - frame_size.width / 2,
                          position.y - frame_size.height / 2,
                          frame_size.width,
                          frame_size.height);
    }

    function nextFrame() {
        index = index + 1 == lastIndex ? 0 : index + 1;
        current.x = index * frame_size.width;
    }

    function nextFrameSet() {
        index_frameset = index_frameset + 1 == frame_sets ? 0 : index_frameset + 1;
        current.y = index_frameset * frame_size.height;
    }
    
    function update(deltaTime){
        elapsed_time += deltaTime;
        if( elapsed_time >= frame_rate){
            nextFrame();
            elapsed_time = 0;
        }
        drawFrame();      
    }

    return { 'drawFrame': drawFrame, 'nextFrame': nextFrame, 'nextFrameSet': nextFrameSet, "setPosition": setPosition, "getBoundingBox": getBoundingBox, "update": update };
}