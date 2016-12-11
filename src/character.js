/* this is the container for characters (stores the characters state) */
function character(opt) {
// function character(character,x,y,speed,sx,sy,dx,dy,fx,fy) {

	/* setup the texture */
  	this.tex=new Image();
  	if(!opt.tex)this.tex.src='img/spritesheet.png';
  	else this.tex.src=opt.tex;

  	/* setup the name --> 'name':'Les', <-- */
	if(!opt.name)opt.name='Anonymous';
	if(!opt.sprite)opt.sprite={'x':1,'y':1};

	/* setup the position --> 'x':0,'y':0, <-- */
  	if(!opt.pos)opt.pos={'x':0,'y':0};
  	this.pos=opt.pos;

  	/* setup the initial direction velocity --> 'dx':0,'dy':0, <-- */
	if(!opt.dx)opt.dx=0;
	if(!opt.dy)opt.dy=0;
	this.dir={'x':opt.dx,'y':opt.dy};

  	/* setup the initial friction dampening --> 'fx':0,'fy':0, <-- */
	if(!opt.fx)opt.fx=0;
	if(!opt.fy)opt.fy=0;
	this.fri={'x':opt.fx,'y':opt.fy};

  	/* setup the initial scale --> 'fx':0,'fy':0, <-- */
	if(!opt.sx)opt.sx=1;
	if(!opt.sy)opt.sy=1;
	this.scl={'x':opt.sx,'y':opt.sy};

  	/* setup the max speed for directions --> 'mxs_x':0,'mxs_y':0, <-- */
  	if(!opt.mxs)opt.mxs={};
	if(!opt.mxs.x)opt.mxs.x=0.02;
	if(!opt.mxs.y)opt.mxs.y=0.02;
	this.mxs={'x':0.02,'y':0.02};

  	/* setup the max speed for directions --> 'sprite_x':0,'sprite_y':0, <-- */
  	if(!opt.sprite)opt.sprite={};
	if(!opt.sprite.x)opt.sprite.x=1;
	if(!opt.sprite.y)opt.sprite.y=1;
	this.sprite={'x':opt.sprite.x,'y':opt.sprite.y};

  	/* setup the cell for spritesheet -->  <-- */
  	if(!opt.cell)opt.cell={
		'i':0,
		'c':{'x':4,'y':4},
		'p':{'x':0,'y':0},
		's':{'x':64,'y':64}

  	};
	this.cell=opt.cell;

  	/* setup the speed modifier --> 'sped':0, <-- */
	if(!opt.speed)opt.speed=1;
  	this.speed=opt.speed;
}
/* draw the character into the viewport (vp.ctx) */
character.prototype.draw=function(){
	/* get the texture width and height */
	var scl={'x':this.tex.width/this.cell.c.x,'y':this.tex.height/this.cell.c.y};
	/* drop the character into the canvas */
	vp.ctx.drawImage(this.tex,this.cell.p.x*this.cell.s.x,this.cell.p.y*this.cell.s.y,scl.x,scl.y,this.pos.x,this.pos.y,scl.x,scl.y);
}
/* set the character direction */
character.prototype.dir=function(x,y){vp.pos.x=x;vp.pos.y=y;}
