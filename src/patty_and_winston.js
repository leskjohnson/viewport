var patty_and_winston={
	'players':[],
	'start':function(){
		this.players_create();
		window.requestNextAnimationFrame(animate);
	},
	'stop':function(){
		players_destroy();
	},
	'players_create':function(){
		this.players[this.players.length]=new character('patty',-128,0,1);
		this.players[this.players.length]=new character('winston',-128,100,0.75);
	},
	'players_destroy':function(){
		for(var i=this.players.length;i>=0;i--)
			this.players.splice(i,1);
	},
	'draw':function(){
		if(vp){
			for (var i = 0; i < this.players.length; i++){
				this.players[i].pos.x=this.players[i].pos.x+(vp.fps.time*(this.players[i].speed*0.01));
				if(this.players[i].pos.x>settings.dimensions.width)this.players[i].pos.x=-128;
				vp.ctx.drawImage(this.players[i].base_image,this.players[i].pos.x,this.players[i].pos.y);
			}
		}
	}
};