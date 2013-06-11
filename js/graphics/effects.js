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