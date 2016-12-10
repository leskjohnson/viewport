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
	this.mxs={'x':0.02,'y':0.02};
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
