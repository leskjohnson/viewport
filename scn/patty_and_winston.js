/* ========================================================= Patty and Winston Object ====== */
/* patty and winston object ---------------------------------------------------------------- */
var patty_and_winston={
	'active_char':0,
	/* the array for holding all the characters */
	'characters':[],
	/* the force that pushes the characters */
	'steady_force':{'x':0.001,'y':0},
	/* the dimensions of the container */
	'dimensions':{'width':500,'height':200},
	/* settings called before viewport setup */
	'background':new Image(),
	'setup':function(){
		settings.view='patty_and_winston';
		settings.dimensions.width=this.dimensions.width;
		settings.dimensions.height=this.dimensions.height ;
		this.background.src='img/grass.jpg';
	},
	/* after viewport is setup */
	'init':function(){},
	/* start the patty_and_winston experience */
	'start':function(){
		this.characters_create();
		this.events(true);
		window.requestNextAnimationFrame(animate);
	},
	/* stop the patty_and_winsont experience */
	'stop':function(){
		this.characters_destroy();
		this.events(false);
	},
	'reset':function(){
		this.stop();
		this.start();
	},
	/* add characters to the characters array */
	'characters_create':function(){
		var ch=[];
		ch[ch.length]=new character({
			'name':'patty',/* the name of the character */
			'sprite':{'x':0.25,'y':0.25},
			'pos':{'x':-128,'y':0},
			'speed':1,/* speed */
			'speed_max':{'x':1,'y':1},
			'scale':{'x':1,'y':1},
			'cell':{
				'i':0,
				'p':{'x':0,'y':1},
				'c':{'x':4,'y':4},
				's':{'x':128,'y':128}
			}
		});
		ch[ch.length]=new character({
			'name':'winston',/* the name of the character */
			'sprite':{'x':1,'y':1},
			'pos':{'x':-128,'y':100},
			'speed':0.75,/* speed */
			'cell':{
				'i':0,
				'c':{'x':4,'y':4},
				'p':{'x':1,'y':1},
				's':{'x':128,'y':128}
			}
		});
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
			patty_and_winston.characters[patty_and_winston.active_char].dir.y-=0.01;
		}else if(e.code=='ArrowDown'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.y+=0.01;
		}else if(e.code=='ArrowLeft'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.x-=0.01;
		}else if(e.code=='ArrowRight'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.x+=0.01;
		}
		console.log(e.code);
	},
	/* draw loop */
	'draw':function(){

		/* make the characters array easier to type */
		var ch=this.characters;

		/* if the character list is empty quit this function */
		if(ch==null)return;

		/* if the viewport (vp) exists */
		if(vp){

			/* clear the viewport */
			// vp.clear();

			/*this draws the grass this acts the same as vp.clear() */
			var drawn=false,
			tile={
				'image':this.background,
				'scl':{
					'x':this.background.width,
					'y':this.background.height
				},
				'pos':{'x':0,'y':0}
			};
			while(!drawn){
				vp.ctx.drawImage(tile.image,tile.pos.x,tile.pos.y,tile.scl.x,tile.scl.y);
				if(tile.pos.x>vp.size.x){tile.pos.x=0;tile.pos.y+=tile.scl.y;}
				else tile.pos.x+=tile.scl.x;
				if(tile.pos.y>vp.size.y&&tile.pos.x>vp.size.x)drawn=true;
			}

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
					if((ch[i].pos.x+(ch[i].tex.width/ch[i].cell.c.x))>vp.size.x){
						ch[i].dir.x=0;
						ch[i].cell.p.y=2;
						/* this line reverses the direction when the wall is hit */
						if(this.steady_force.x>0)this.steady_force.x=-0.001;
					}
				}else if(ch[i].dir.x<0){
					if(ch[i].pos.x<0){
						ch[i].dir.x=0;
						ch[i].cell.p.y=1;
						/* this line reverses the direction when the wall is hit */
						if(this.steady_force.x<0)this.steady_force.x=0.001;
					}
				}

				/* calculate the up and down boundary and stop the direction force */
				if(ch[i].dir.y>0){
					if((ch[i].pos.y+ch[i].tex.height/ch[i].cell.c.y)>vp.size.y)
						ch[i].dir.y=0;
				}else if(ch[i].dir.y<ch[i].tex.height/ch[i].cell.c.y){
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
			html_str+='<button id="winston_select"><img src="img/winston_forward.png"></button>';
			html_str+='<button id="patty_select"><img src="img/patty_forward.png"></button>';
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
			event_add(document.getElementById('patty_select'),'click',patty_and_winston.patty_select);
			event_add(document.getElementById('winston_select'),'click',patty_and_winston.winston_select);
		}else{
			event_remove(window,'keydown',patty_and_winston.key);
			event_remove(document.getElementById('patty_select'),'click',patty_and_winston.patty_select);
			event_remove(document.getElementById('winston_select'),'click',patty_and_winston.winston_select);
		}
	},
	'patty_select':function(e){preventEvent(e);patty_and_winston.active_char=0;},
	'winston_select':function(e){preventEvent(e);patty_and_winston.active_char=1;}
};