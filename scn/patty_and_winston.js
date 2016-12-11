/* ========================================================= Patty and Winston Object ====== */
/* patty and winston object ---------------------------------------------------------------- */
var patty_and_winston={
	/* the array for holding all the characters */
	'characters':[],
	/* the force that pushes the characters */
	'steady_force':{'x':0.001,'y':0},
	/* the dimensions of the container */
	'dimensions':{'width':500,'height':200},
	/* settings called before viewport setup */
	'setup':function(){
		settings.view='patty_and_winston';
		settings.dimensions.width=patty_and_winston.dimensions.width;
		settings.dimensions.height=patty_and_winston.dimensions.height ;
	},
	/* after viewport is setup */
	'init':function(){},
	/* start the patty_and_winston experience */
	'start':function(){
		this.events(true);
		this.characters_create();
		window.requestNextAnimationFrame(animate);
	},
	/* stop the patty_and_winsont experience */
	'stop':function(){
		this.events(false);
		this.characters_destroy();
	},
	'reset':function(){
		this.stop();
		this.start();
	},
	/* add characters to the characters array */
	'characters_create':function(){
		var ch=[];
		ch[ch.length]=new character(
			'patty',/* the name of the character */
			-128,/* x position */
			50,/* y position */
			1/* speed */
		);
		ch[ch.length]=new character(
			'winston',/* the name of the character */
			-128,/* x position */
			100,/* y position */
			0.75/* speed */
		);
		this.characters=ch;
	},
	/* empty the characters array */
	'characters_destroy':function(){
		for(var i=this.characters.length;i>=0;i--)
			this.characters.splice(i,1);
		this.characters=null;
	},
	/* key handler */
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
	/* draw loop */
	'draw':function(){

		/* clear the viewport */
		vp.clear();

		/* make the characters array easier to type */
		var ch=this.characters;

		/* if the character list is empty quit this function */
		if(ch==null)return;

		/* if the viewport (vp) exists */
		if(vp){
			/* loop through the characters and draw them in the viewport (vp.ctx) */
			for (var i=0;i<ch.length;i++){

				/* add the steady force to the character direction */
				ch[i].dir.x+=this.steady_force.x;
				ch[i].dir.y+=this.steady_force.y;

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
						if(this.steady_force.x>0)this.steady_force.x=-0.001;
					}
				}else if(ch[i].dir.x<0){
					if(ch[i].pos.x<0){
						ch[i].dir.x=0;
						/* this line reverses the direction when the wall is hit */
						if(this.steady_force.x<0)this.steady_force.x=0.001;
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
	},
	/* this is the html for patty and winston */
	'html':function(){
		var html_str='';
		html_str+='<h1><img src="img/winston_and_patty_logo.png" alt="Patty and Winston" title="Patty and Winston" /></h1>';
		html_str+='<canvas id="viewport"></canvas>';
		html_str+='<div class="buttons">';
			html_str+='<img src="img/winston_forward.png">';
			html_str+='<img src="img/patty_forward.png">';
		html_str+='</div>';
		html_str+='<style>';
		html_str+='body{background-color:#70a52a;}';
		html_str+='body #scene h1{background-color:#ff1d1d;}';
		html_str+='</style>';
		return html_str;
	},
	/* these are the settings for patty and winston */
	'sett':function(){
		var html_str='';
		return html_str;
	},
	/* these are the events for patty and winston */
	'events':function(create){
		if(create){
			event_add(window,'keydown',patty_and_winston.key);
		}else{
			event_remove(window,'keydown',patty_and_winston.key);
		}
	}
};