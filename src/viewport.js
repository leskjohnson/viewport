function viewport(canvas) {
	this.canvas=document.getElementById(canvas);
	if(this.canvas)this.ctx = this.canvas.getContext("2d");
	this.size={'x':0,'y':0};
	this.pos={'x':0,'y':0};
	this.fps={
      	ele: null,
      	time: 60,
      	frame: 0,
      	update: 0
   	};
	this.bg='red';
	this.line='green';
	this.loop=null;
}
viewport.prototype.setup=function(dim){
	if(!this.ctx)return;
	this.size.x=dim.width;
	this.size.y=dim.height;
	this.ctx.canvas.width=dim.width;
	this.ctx.canvas.height=dim.height;
	this.ctx.canvas.style.width=dim.width+'px';
	this.ctx.canvas.style.height=dim.height+'px';
	this.ctx.moveTo(this.pos.x,this.pos.y);
	this.clear();
};
viewport.prototype.draw=function(x,y){
	this.ctx.beginPath();
	this.ctx.strokeStyle=this.line;
	this.ctx.moveTo(this.pos.x,this.pos.y);
	this.pos.x+=x;
	this.pos.y+=y;
	this.ctx.lineTo(this.pos.x,this.pos.y);
	this.ctx.stroke();
	this.ctx.closePath();
	if(this.pos.x>this.ctx.canvas.width){
		this.pos.x=0;
		if(y<-1)y=y*-1;
		this.pos.y+=y*2;		
	}
	if (this.pos.y>this.ctx.canvas.height){
		this.pos.y=20;
		this.clear();
	}
};
viewport.prototype.clear=function(){
	this.ctx.fillStyle = this.bg;
	this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
}
viewport.prototype.zigzag = function(length,amt){
	for(var i=0;i<amt;i++){
		this.draw(length,length);
		this.draw(length,-length);
	}
}
viewport.prototype.bg_update = function(e){
	settings.colors.bg=e.srcElement.value;
	this.bg=settings.colors.bg;
	vp.clear();
}