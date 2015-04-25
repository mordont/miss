var clamp = function(x, min, max){
	return x < min ? min : (x > max ? max : x);
};

var Q = Quintus()
	.include("Sprites, Input")
	.setup({width: 800, height: 600})
	.controls();

Q.Sprite.extend("Player", {
	init: function(p){
		this._super(p, {
			asset: "player.png",
			x: Q.el.width / 2,
			y: Q.el.height - 60,
			type: Q.SPRITE_FRIENDLY,
			speed: 10
		});
	},
	step: function(dt){
		if (Q.inputs['left']){
			console.log('left');
			this.p.x -= this.p.speed;
		}
		if (Q.inputs['right']){
			console.log('right');
			this.p.x += this.p.speed;
		}
		if (Q.inputs['up']){
			this.p.y -= this.p.speed;
		}
		if (Q.inputs['down']){
			this.p.y += this.p.speed;
		}

		this.p.x = clamp(this.p.x, 0 + this.p.w / 2, Q.el.width - this.p.w / 2);
		this.p.y = clamp(this.p.y, 0 + this.p.h / 2, Q.el.height - this.p.h / 2);
	}
});

Q.load(["background.png", "player.png"], function(){
	var background = new Q.Sprite({asset: "background.png", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE});
	var player = new Q.Player();
	Q.gameLoop(function(dt){
		Q.clear();
		background.render(Q.ctx);
		player.update(dt);
		player.render(Q.ctx);
	});
});