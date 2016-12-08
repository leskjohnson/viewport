/* container for the player */
var player=null;
/* container for all the characters returned from the character() return */
var characters=[];
/* when patty and winston has been selected */
function patty_and_winston_start() {
	characters_create();
	/* create patty and winston */
	window.requestNextAnimationFrame(animate);
}
/* remove all the characters */
function patty_and_winston_stop(){characters_destroy();}

/* this creates seperate characters to draw in the vp.ctx */ 
function characters_create(){
	characters[characters.length]=new character('patty',0,0,1);
	characters[characters.length]=new character('winston',0,100,0.75);
}
/* destroy all the characters created */
function characters_destroy(){for(var i=characters.length;i>=0;i--)characters.splice(i,1);}

/* this is the function that is called when new frame animation is received */
function animate(now){
	/* get the framerate and save it into vp.fps */
	calculateFps(now);
	/* call this function, animate, again (the framerate loop) */
	requestNextAnimationFrame(animate);
	/* this runs the game logic of patty and winston */
	patty_and_winston();
}

/* calculateFps adapted from Core HTML5 Canvas
 * David Geary (www.corehtmlcanvas.com) */
function calculateFps(now) {
   	var cur_fps=1000/(now-vp.fps.frame);
   	vp.fps.frame=now;
   	if (now-vp.fps.update>1000)
   		vp.fps.update = now; 
   	return cur_fps; 
}

/* this is the container for characters (stores the characters state) */
function character(character,x,y,speed,sx,sy,dx,dy,fx,fy) {
  	this.tex=new Image();
  	if(character)
  		this.tex.src='img/'+character+'_right.png';
	if(!x)x=0;if(!y)y=0;if(!speed)speed=1;
	if(!dx)dx=0;if(!dy)dy=0;
	if(!fx)fx=0;if(!fy)fy=0;
	if(!sx)sx=1;if(!sy)sy=1;
  	this.pos={'x':x,'y':y};
	this.dir={'x':dx,'y':dy};
	this.fri={'x':fx,'y':fy};
	this.scl={'x':sx,'y':sy};
  	this.speed=speed;
}
/* draw the character into the viewport (vp.ctx) */
character.prototype.draw=function(){
	/* get the texture width and height */
	var scl={'x':this.tex.width,'y':this.tex.height};
	/* drop the character into the canvas */
	vp.ctx.drawImage(this.tex,this.pos.x,this.pos.y,scl.x,scl.y);
}
/* set the character direction */
character.prototype.dir=function(x,y){vp.pos.x=x;vp.pos.y=y;}

/* the game logic for patty and winston */
function patty_and_winston(){
	vp.clear();

	var steady_dir={'x':0.01,'y':0};
	/* if the viewport (vp) exists */
	if(vp){
		/* loop through the characters and draw them in the viewport (vp.ctx) */
		for (var i = 0; i < characters.length; i++){

			// characters[i].dir.x=steady_dir.x;
			// characters[i].dir.y=steady_dir.y;

			/* calculate the left and right boundary and stop the direction force */
			if(characters[i].dir.x>0){
				if((characters[i].pos.x+characters[i].tex.width)>vp.size.x)
					characters[i].dir.x=0;
			}else if(characters[i].dir.x<0){
				if(characters[i].pos.x<0)
					characters[i].dir.x=0;
			}
			/* calculate the up and down boundary and stop the direction force */
			if(characters[i].dir.y>0){
				if((characters[i].pos.y+characters[i].tex.width)>vp.size.y)
					characters[i].dir.y=0;
			}else if(characters[i].dir.y<0){
				if(characters[i].pos.y<0)
					characters[i].dir.y=0;
			}

			/* calculate the players position */
			characters[i].pos.x=characters[i].pos.x+(vp.fps.time*characters[i].dir.x);
			characters[i].pos.y=characters[i].pos.y+(vp.fps.time*characters[i].dir.y);

			/* draw the character */
			characters[i].draw();
		}
	}

}
function patty_and_winston_key(e){
	if(e.code=='ArrowUp'){
		characters[0].dir.y-=0.01;
	}else if(e.code=='ArrowDown'){
		characters[0].dir.y+=0.01;
	}else if(e.code=='ArrowLeft'){
		characters[0].dir.x-=0.01;
	}else if(e.code=='ArrowRight'){
		characters[0].dir.x+=0.01;
	}
}