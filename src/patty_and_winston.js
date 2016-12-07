var players=[];
function patty_and_winston_start() {
	players_create();
	window.requestNextAnimationFrame(animate);
}
function patty_and_winston_stop() {
	players_destroy();
}
function players_create(){
	players[players.length]=new character('patty',-128,0,1);
	players[players.length]=new character('winston',-128,100,0.75);
}
function players_destroy(){
	for (var i = players.length; i >= 0; i--) {
		players.splice(i,1);
	}
}

function animate(now){
	calculateFps(now);
	requestNextAnimationFrame(animate);
	patty_and_winston();
}
/* calculateFps adapted from Core HTML5 Canvas
 * David Geary (www.corehtmlcanvas.com) */
function calculateFps(now) {
   	var cur_fps = 1000 / (now - vp.fps.frame);
   	vp.fps.frame = now;
   	if (now - vp.fps.update > 1000)
   		vp.fps.update = now; 
   	return cur_fps; 
}

function character(character,x,y,speed) {
	if(!x)x=0;if(!y)y=0;if(!speed)speed=1;
  this.base_image = new Image();
  this.base_image.src = 'img/'+character+'_right.png';
  this.pos={'x':x,'y':y};
  this.dir={'x':0,'y':0};
  this.speed=speed;
}
character.prototype.draw=function(vp){
	vp.ctx.drawImage(this.base_image, 0, 0);
}

function patty_and_winston(){
	if(vp){
		for (var i = 0; i < players.length; i++){Math.random()
			players[i].pos.x=players[i].pos.x+(vp.fps.time*(players[i].speed*0.01));
			if(players[i].pos.x>settings.dimensions.width)players[i].pos.x=-128;
			vp.ctx.drawImage(players[i].base_image,players[i].pos.x,players[i].pos.y);
		}
	}

}