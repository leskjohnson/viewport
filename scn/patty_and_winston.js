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
		settings.dimensions.width=patty_and_winston.dimensions.width;
		settings.dimensions.height=patty_and_winston.dimensions.height ;
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

		/* Direction Button controls (dynamic) */
		if(e.which==38||e.code=='ArrowUp'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.y-=0.01;
		}else if(e.which==40||e.code=='ArrowDown'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.y+=0.01;
		}else if(e.which==37||e.code=='ArrowLeft'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.x-=0.01;
		}else if(e.which==39||e.code=='ArrowRight'){
			patty_and_winston.characters[patty_and_winston.active_char].dir.x+=0.01;
		
		/* Patty keyboard controls */
		}else if(e.which==87){/* W key */
			patty_and_winston.characters[0].dir.y-=0.01;
		}else if(e.which==83){/* S key */
			patty_and_winston.characters[0].dir.y+=0.01;
		}else if(e.which==65){/* A key */
			patty_and_winston.characters[0].dir.x-=0.01;
		}else if(e.which==68){/* D key */
			patty_and_winston.characters[0].dir.x+=0.01;

		/* Winston keyboard controls */
		}else if(e.which==79){/* O key */
			patty_and_winston.characters[1].dir.y-=0.01;
		}else if(e.which==76){/* L key */
			patty_and_winston.characters[1].dir.y+=0.01;
		}else if(e.which==75){/* K key */
			patty_and_winston.characters[1].dir.x-=0.01;
		}else if(e.which==186){/* : key */
			patty_and_winston.characters[1].dir.x+=0.01;

		}
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
		html_str+='<div class="info">';
			html_str+='<div class="pandw-keys">';
				html_str+='<h2>Keys</h2>';	
			
				html_str+='<div class="pandw-keys-wrap">';
					html_str+='<h3>Dynamic Character Controller</h3>';
					html_str+='<h4>Character buttons are below the Viewport.</h4>';

					html_str+='<div class="row head">';
						html_str+='<div class="col">Action</div>';
						html_str+='<div class="col">Key</div>';
					html_str+='</div>';

					html_str+='<div class="row">';
						html_str+='<div class="col">Move Up</div>';
						html_str+='<div class="col">Up Arrow</div>';
					html_str+='</div>';
			
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Down</div>';
						html_str+='<div class="col">Down Arrow</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Left</div>';
						html_str+='<div class="col">Left Arrow</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Right</div>';
						html_str+='<div class="col">Right Arrow</div>';
					html_str+='</div>';
				html_str+='</div>';
				
				html_str+='<div class="pandw-keys-wrap">';
				html_str+='<h3>Patty</h3>';

					html_str+='<div class="row head">';
						html_str+='<div class="col">Action</div>';
						html_str+='<div class="col">Key</div>';
					html_str+='</div>';

					html_str+='<div class="row">';
						html_str+='<div class="col">Move Up</div>';
						html_str+='<div class="col">W</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Down</div>';
						html_str+='<div class="col">S</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Left</div>';
						html_str+='<div class="col">A</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Right</div>';
						html_str+='<div class="col">D</div>';
					html_str+='</div>';
			
				html_str+='</div>';
				
				html_str+='<div class="pandw-keys-wrap">';
					html_str+='<h3>Winston</h3>';

					html_str+='<div class="row head">';
						html_str+='<div class="col">Action</div>';
						html_str+='<div class="col">Key</div>';
					html_str+='</div>';

					html_str+='<div class="row">';
						html_str+='<div class="col">Move Up</div>';
						html_str+='<div class="col">O</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Down</div>';
						html_str+='<div class="col">L</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Left</div>';
						html_str+='<div class="col">K</div>';
					html_str+='</div>';
				
					html_str+='<div class="row">';
						html_str+='<div class="col">Move Right</div>';
						html_str+='<div class="col">:</div>';
					html_str+='</div>';
			
				html_str+='</div>';

			html_str+='</div>';

		html_str+='</div>';
		html_str+='<style>';
		html_str+='body{background-color:#70a52a;}';
		html_str+='body #scene h1{background-color:#ff1d1d;}';
		html_str+='.pandw-keys{max-width:500px;padding:0 1rem;margin:auto;}';
		html_str+='.pandw-keys-wrap{background-color:#000;color:#FFF;padding:1rem;border-radius:1%;box-shadow:0 0 10px;margin-bottom:1rem;}';
		html_str+='.pandw-keys h3,.pandw-keys h4{text-align:left;border-bottom:1px solid;}';
		html_str+='.pandw-keys .row.head{background-color:#d2d2d2;color:#000;}';
		html_str+='.pandw-keys .row{text-align:center;}';
		html_str+='.pandw-keys .row .col{border-right:1px dotted;padding:0 1%;border-bottom:1px solid;width:46%;}';
		html_str+='.pandw-keys .row .col:last-child{border-right:0;}';
		html_str+='</style>';
		return html_str;
	},
	/* these are the settings for patty and winston */
	'sett':function(){
		var html_str='A little something.';
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