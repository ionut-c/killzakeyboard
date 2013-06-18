var Graphics = Graphics || {};
Graphics.Effects = {};

Graphics.Effects.KoochaDeath = function KoochaDeath(context, position){
    this.model = new Graphics.ModelObject(KoochaDeathModel, context);
    this.ended = false;
    this.model.setPosition(position);
}

Graphics.Effects.KoochaDeath.prototype.update = function KoochaDeath_update(deltaTime){
    this.model.update(deltaTime);
    if (this.model.isOver()) {
        this.ended = true;
    }
}
Graphics.Effects.KoochaDeath.prototype.render = function KoochaDeath_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Graphics.Effects.KoochaDeath.prototype.isOver = function KoochaDeath_isOver(){
    return this.ended;
}

Graphics.Effects.ShootEffect = function ShootEffect(context, model){
    this.model = new Graphics.ModelObject(ShootEffectModel, context);
    this.ended = false;
    this.attach = model;
    
    var p = this.attach.getPosition ();
    p.y = p.y - this.model.getSize().height / 2;
    this.model.setPosition(p);
}

Graphics.Effects.ShootEffect.prototype.update = function ShootEffect_update(deltaTime){
    this.model.update(deltaTime);
    var p = this.attach.getPosition ();
    p.y = p.y - this.model.getSize().height / 2;
    this.model.setPosition(p);
    if (this.model.isOver()) {
        this.ended = true;
    }
}
Graphics.Effects.ShootEffect.prototype.render = function ShootEffect_render(deltaTime){
    this.model.render();
    if(window.debug) { this.bounder.render( "red", this.model.getContext()); }
}
Graphics.Effects.ShootEffect.prototype.isOver = function ShootEffect_isOver(){
    return this.ended;
}