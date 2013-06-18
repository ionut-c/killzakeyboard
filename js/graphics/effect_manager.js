var Graphics = Graphics || {};

Graphics.EffectManager = function EffectManager(context){
    this.effects = [];
    this.context = context;
}
Graphics.EffectManager.prototype.addEffect = function EntityManager_addEffect(name, position){
    var effect = null;
    if (name == "KoochaDeath") {
        effect = new Graphics.Effects.KoochaDeath(this.context, position);
    } else
    if (name == "ShootEffect") {
        effect = new Graphics.Effects.ShootEffect(this.context, position);
    } else {
        throw "Invalid effect name for addEffect."
    }
    this.effects.push(effect);
}
Graphics.EffectManager.prototype.update = function EntityManager_update(deltaTime) {
    this.effects.map(function(effect) { effect.update(deltaTime); });
    this.effects = this.effects.filter(function (effect) {
        return ! effect.isOver();
    });
}
Graphics.EffectManager.prototype.render = function EntityManager_render(){
    this.effects.map(function(effect) { effect.render(); });
}