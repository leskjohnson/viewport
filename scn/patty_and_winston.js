var patty_and_winston={
	'characters':[],
	'steady_dir':{'x':0.001,'y':0},
	'dimensions':{'width':500,'height':200},
	'start':function(){
		this.characters_create();
		window.requestNextAnimationFrame(animate);
	},
	'stop':function(){
		this.characters_destroy();
	},
	'characters_create':function(){
		var ch=[];
		ch[ch.length]=new character(
			'patty',
			-128,/* x position */
			50,/* y position */
			1/* speed */
		);
		ch[ch.length]=new character(
			'winston',
			-128,/* x position */
			100,/* y position */
			0.75/* speed */
		);
		this.characters=ch;
	},
	'characters_destroy':function(){
		for(var i=this.characters.length;i>=0;i--)
			this.characters.splice(i,1);
		this.characters=null;
	},
	'key':function(e){
		if(e.code=='ArrowUp'){
			patty_and_winston.characters[0].dir.y-=0.01;
		}else if(e.code=='ArrowDown'){
			patty_and_winston.characters[0].dir.y+=0.01;
		}else if(e.code=='ArrowLeft'){
			patty_and_winston.characters[0].dir.x-=0.01;
		}else if(e.code=='ArrowRight'){
			patty_and_winston.characters[0].dir.x+=0.01;
		}
	},
	'draw':function(){
		vp.clear();
		var ch=this.characters;
		if(ch==null)return;
		/* if the viewport (vp) exists */
		if(vp){
			/* loop through the characters and draw them in the viewport (vp.ctx) */
			for (var i=0;i<ch.length;i++){

				/* add the steady force to the character direction */
				ch[i].dir.x+=this.steady_dir.x;
				ch[i].dir.y+=this.steady_dir.y;

				/* limit the movement speed */
				if(ch[i].dir.x>ch[i].mxs.x)ch[i].dir.x=ch[i].mxs.x;
				else if(ch[i].dir.x<-ch[i].mxs.x)ch[i].dir.x=-ch[i].mxs.x;
				if(ch[i].dir.y>ch[i].mxs.y)ch[i].dir.y=ch[i].mxs.y;
				else if(ch[i].dir.y<-ch[i].mxs.y)ch[i].dir.y=-ch[i].mxs.y;

				/* calculate the left and right boundary and to reverse the direction force */
				if(ch[i].dir.x>0){
					/* the position plus the width of the texture hit the wall */
					if((ch[i].pos.x+ch[i].tex.width)>vp.size.x){
						ch[i].dir.x=0;
						/* this line reverses the direction when the wall is hit */
						if(this.steady_dir.x>0)this.steady_dir.x=-0.001;
					}
				}else if(ch[i].dir.x<0){
					if(ch[i].pos.x<0){
						ch[i].dir.x=0;
						/* this line reverses the direction when the wall is hit */
						if(this.steady_dir.x<0)this.steady_dir.x=0.001;
					}
				}
				/* calculate the up and down boundary and stop the direction force */
				if(ch[i].dir.y>0){
					if((ch[i].pos.y+ch[i].tex.width)>vp.size.y)
						ch[i].dir.y=0;
				}else if(ch[i].dir.y<0){
					if(ch[i].pos.y<0)
						ch[i].dir.y=0;
				}

				/* calculate the players position */
				ch[i].pos.x=ch[i].pos.x+(vp.fps.time*ch[i].dir.x);
				ch[i].pos.y=ch[i].pos.y+(vp.fps.time*ch[i].dir.y);

				/* draw the character */
				ch[i].draw();
			}
		}		
	}
};