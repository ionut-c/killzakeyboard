function EntityManager(spawners) {
    
    var entities = [];
    var colliders = [];
    
    function addCollider(collider){
        colliders.push(collider);
    }
    
    function update(deltaTime) {
        var spawned = spawners
            .map(function(spawner) { return spawner.update(deltaTime); })
            .filter(function(spawned) {
                return spawned != null;
            });
        entities = entities.concat(spawned) ;
        entities = entities.filter(function(entity) {
            for(var i = 0, len = colliders.length; i < len; i++) {
                if(checkColRR(entity.getBoundingBox(), colliders[i].getBoundingBox())) {
                    return false;
                }
            }
            return true;
        });
        entities.map(function(entity) { entity.update(deltaTime); });
        colliders.map(function(entity) { entity.update(deltaTime); });
    }
    
    return {'update': update, "addCollider": addCollider};
}


function EnemySpawner(context, path, enemy_type, numbers, frequency) {
    var elapsed_time = 0;
    var spawned_enemies = 0;
    
    function update(deltaTime) {
        elapsed_time += deltaTime;
        if(elapsed_time >= frequency && spawned_enemies < numbers) {
            spawned_enemies++;
            elapsed_time = 0;
            return enemy_type(context, path);
        }
        return null;
    }
    
    return {'update': update};
}

function Bird(context, path){
    var animation = Animation(context, "http://www.iphonegametutorials.com/wp-content/uploads/2010/09/dragon.png", 75, 70, 10, 1, 1);
    var walker = new PathWalker(path);
    var speed = 10;
    walker.getStart();
    
    function update(deltaTime){
        if( !walker.atEnd()){
            animation.setPosition(walker.getNext(speed));
        }
        animation.update(deltaTime);
    }
    
    return { "update": update, "getBoundingBox": animation.getBoundingBox };
}