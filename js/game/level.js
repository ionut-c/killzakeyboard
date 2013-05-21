var Game = Game || {};

function _levelUpdateGUI(level) {
    var kills = level.entityManager.getKills();
    var projCount = level.entityManager.getTotalProjectileCount();
    Gui.updateKilledStats( kills );
    Gui.updateMissedStats( projCount - kills );
}
Game.Level = function Level(id, maxX, maxY){
    this.waves = [];
    this.score = 0;
    this.time = 0;
    this.id = id;
    this.raport = 0;
    this.entityManager = new Game.EntityManager(maxX, maxY);
    this.waveIndex = 0;
    this.over = false;
    this.totalEnemies = 0;
    this.duration = 0;
    this.endTime = 0;
}
Game.Level.prototype.getId = function Level_GetId() {
    return this.id;
}
Game.Level.prototype.getReport = function Level_GetReport() {
    return this.raport;
}
Game.Level.prototype.getCompletion = function Level_GetCompletion() {
    if     (this.raport == 1.00 ) { return 3; }
    else if(this.raport >= 0.75 ) { return 2; }
    else if(this.raport >= 0.50 ) { return 1; }
    else                          { return 0; }
}
Game.Level.prototype.addWave = function Level_addWave(wave){
    this.totalEnemies += wave.getEnemiesCount();
    this.duration += wave.getDuration();
    this.waves.push(wave);
}
Game.Level.prototype.update = function Level_update(deltaTime){
    this.time += deltaTime;
    
    this.entityManager.update(deltaTime);
    var spawned = this.waves[this.waveIndex].getSpawned(deltaTime);
    if( spawned != null){ this.entityManager.addEntities(spawned); }
    
    this.raport = this.entityManager.getKills() / this.totalEnemies;
    var proc = this.entityManager.getTotalEntitiesCount() / this.totalEnemies;
    proc = Math.ceil(proc * 100);
    Hud.refreshProgressBar( proc );

    var endTimer = this.entityManager.getTotalEntitiesCount() == this.totalEnemies
                            && this.entityManager.getEntityCount() == 0;
    if (endTimer){
        this.endTime += deltaTime;
    }
    if (this.endTime >= 2000){
        this.over = true;
        _levelUpdateGUI(this);
    }

    if (this.waves[this.waveIndex].hasEnded()){
        if (this.waveIndex < this.waves.length){
            this.waveIndex++;
        }
    }
}
Game.Level.prototype.render = function Level_render(){
    this.entityManager.render();
}
Game.Level.prototype.getEntityManager = function Level_getEntityManger(){
    return this.entityManager;
}
Game.Level.prototype.isOver = function Level_isOver(){
    return this.over;
}
Game.Level.prototype.getKillPercent = function Level_getKillPercent(){
    return this.raport * 100;
}


Game.Wave = function Wave( spawners, startOffset, endOffset){
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
Game.Wave.prototype.getSpawned = function Wave_getSpawned(deltaTime){
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
Game.Wave.prototype.hasEnded = function Wave_hasEnded(){
    if( this.elapsedTime > this.startOffset + this.duration + this.endOffset){
        return true;
    }
    return false;
}
Game.Wave.prototype.getEnemiesCount = function Wave_getEnemiesCount(){
    return this.enemiesCount;
}
Game.Wave.prototype.getDuration = function Wave_getDuration(){
    return this.startOffset + this.duration + this.endOffset;
}