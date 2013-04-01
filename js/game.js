function _levelUpdateUI(level) {
    var kills = level.entityManager.getKills();
    var projCount = level.entityManager.getTotalProjectileCount();
    updateKilledStats( kills );
    updateMissedStats( projCount - kills );
}
function Level(id, maxX, maxY){
    this.waves = [];
    this.score = 0;
    this.time = 0;
    this.id = id;
    this.raport = 0;
    this.entityManager = new EntityManager(maxX, maxY);
    this.waveIndex = 0;
    this.over = false;
    this.totalEnemies = 0;
    this.duration = 0;
}
Level.prototype.getId = function Level_GetId() {
    return this.id;
}
Level.prototype.getReport = function Level_GetReport() {
    return this.raport;
}
Level.prototype.getCompletion = function Level_GetCompletion() {
    if     (this.raport == 1.00 ) { return 3; }
    else if(this.raport >= 0.75 ) { return 2; }
    else if(this.raport >= 0.50 ) { return 1; }
    else                          { return 0; }
}
Level.prototype.addWave = function Level_addWave(wave){
    this.totalEnemies += wave.getEnemiesCount();
    this.duration += wave.getDuration();
    this.waves.push(wave);
}
Level.prototype.update = function Level_update(deltaTime){
    this.time += deltaTime;
    
    this.entityManager.update(deltaTime);
    var spawned = this.waves[this.waveIndex].getSpawned(deltaTime);
    if( spawned != null){ this.entityManager.addEntities(spawned); }
    
    this.raport = this.entityManager.getKills() / this.totalEnemies;
    //var proc = this.time / this.duration;
    var proc = this.entityManager.getTotalEntitiesCount() / this.totalEnemies;
    proc = Math.ceil(proc * 100);
    Hud.refreshProgressBar( proc );

    if(this.waves[this.waveIndex].hasEnded()){
        this.waveIndex++;
        if(this.waveIndex == this.waves.length ){
            this.over = true;
	    _levelUpdateUI(this);
        }
	console.log( " Percent for progress bar : " + proc );
    }
}
Level.prototype.render = function Level_render(){
    this.entityManager.render();
}
Level.prototype.getEntityManager = function Level_getEntityManger(){
    return this.entityManager;
}
Level.prototype.isOver = function Level_isOver(){
    return this.over;
}



function Wave( spawners, startOffset, endOffset){
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.spawners = spawners;
    this.elapsedTime = 0;
    if (spawners.length > 1){
	this.duration = spawners.reduce( function (prev, cur) { 	
	    return Math.max(prev.getDuration(), cur.getDuration());
	});
	this.enemiesCount = spawners.reduce( function (prev, cur){
	   return prev.getEnemiesCount() + cur.getEnemiesCount(); 
	});
    } else {
	this.duration = spawners[0].getDuration();
	this.enemiesCount = spawners[0].getEnemiesCount();
    }
}
Wave.prototype.getSpawned = function Wave_getSpawned(deltaTime){
    this.elapsedTime += deltaTime;
    var tor = null;
    if( this.elapsedTime > this.startOffset){
        tor = this.spawners
            .map(function(spawner) {
                return spawner.getSpawned(deltaTime);})
            .filter(function(spawned) {
                return spawned != null;});
    }
    return tor;
}
Wave.prototype.hasEnded = function Wave_hasEnded(){
    if( this.elapsedTime > this.startOffset + this.duration + this.endOffset){
        return true;
    }
    return false;
}
Wave.prototype.getEnemiesCount = function Wave_getEnemiesCount(){
    return this.enemiesCount;
}
Wave.prototype.getDuration = function Wave_getDuration(){
    return this.startOffset + this.duration + this.endOffset;
}