/* ========================================================= Animate Handler =============== */
/* ----------------------------------------------------------------------------------------- */
function animate_handler(){
	if(settings.scene=='Patty-and-Winston-Jump'){
		patty_and_winston.draw();
	
	}else if(settings.scene=='Image-Look'){
		image_look.draw();
	}

}

/* ========================================================= Scene Select Dropdown ========= */
/* ----------------------------------------------------------------------------------------- */
function scene_select(ele){
	/* create the select input */
	var html_str='<label for="scene_select">Scene Select</label>';
	html_str+='<select id="scene_select" name="scene">';
	/* create an html option for each scene in the scene_list */
	for (var i = 0; i < scene_list.length; i++)
		html_str+='<option value="'+scene_list[i]+'">'+scene_list[i]+'</option>';
	html_str+='</select>';
	ele.innerHTML=html_str;
	/* wait for dom refresh to add an input event on the select element */
	setTimeout(function(){
		event_add(document.getElementById('scene_select'),'input',scene_change);},1);
}

/* ========================================================= Scene Initiation ============== */
/* ----------------------------------------------------------------------------------------- */
function scene_init(){
	/* create the image_look prototype */	
	vp=new viewport(settings.canvas) 
	/* setup the colors */
	vp.bg=settings.colors.bg;
	vp.line=settings.colors.line;
	/* setup the canvas width and height */

	/* individual scene start up settings */
	if(settings.scene=='zigzag'){
		settings.view='zigzag';
		settings.dimensions.width=200;
		settings.dimensions.height=200;

	}else if(settings.scene=='Patty-and-Winston-Jump'){
		settings.view='patty_and_winston';
		/*settings.dimensions=patty_and_winston.dimensions;*/
		settings.dimensions.width=patty_and_winston.dimensions.width;
		settings.dimensions.height=patty_and_winston.dimensions.height ;

	}else if(settings.scene=='Image-Look'){
		settings.view='image_look';

		settings.dimensions.width=500;
		settings.dimensions.height=500;
	}

	vp.setup(settings.dimensions);

	if(settings.view=='zigzag'){
		/* if zigzag auto start is on start the zigzagloop */
		if(settings.zigzag.autostart){
			zigzagloop();
			class_add(document.getElementById('il_zig_zig_auto'),'active');
		}		
	
	}else if(settings.view=='patty_and_winston'){

	}
}

/* ========================================================= Scene Change ================== */
/* clear and load another example ---------------------------------------------------------- */
function scene_change(e){
	/*remove events from the previous scene*/
	events(settings.scene,false);
	/*get the new scene name*/
	var name=e.srcElement.value;
	/*set the new name in settings*/
	settings.scene=name;
	/*load in the html and events*/
	scene_load(name);
	/*startup the scene*/
	scene_init();
}

/* ========================================================= Scene Load ==================== */
/* clear and load another example ---------------------------------------------------------- */
function scene_load(name){

	/*get the example container to add the content of the example to*/
	var html_str='',
	view=document.getElementById('scene');
	sett=document.getElementById('scene_settings');

	/*----------------------------------------------------zigzag example*/
	if(name=='zigzag'){
		/* this is the main page html */
		if(view){
			html_str+='<h1>Zig Zag</h1>';
			html_str+='<canvas id="viewport"></canvas>';
			view.innerHTML=html_str;
		}
		/* this is the slideout settings container html */ 
		if(sett){
			html_str=' ';
			html_str+='<div class="input">';
				html_str+='<label for="zigzag_size">Background Color</label>';
				html_str+='<select id="zigzag_bg" name="zigzag_bg">';
					html_str+='<option value="white">White</option>';
					html_str+='<option value="black">Black</option>';
					html_str+='<option value="red">Red</option>';
					html_str+='<option value="green">Green</option>';
					html_str+='<option value="blue">Blue</option>';
					html_str+='<option value="purple">Purple</option>';
					html_str+='<option value="pink">Pink</option>';
					html_str+='<option value="yellow">Yellow</option>';
				html_str+='</select>';
			html_str+='</div>';
			html_str+='<div class="input">';
				html_str+='<label for="zigzag_line">Line Color</label>';
				html_str+='<select id="zigzag_line" name="zigzag_line">';
					html_str+='<option value="black">Black</option>';
					html_str+='<option value="white">White</option>';
					html_str+='<option value="red">Red</option>';
					html_str+='<option value="green">Green</option>';
					html_str+='<option value="blue">Blue</option>';
					html_str+='<option value="purple">Purple</option>';
					html_str+='<option value="pink">Pink</option>';
					html_str+='<option value="yellow">Yellow</option>';
				html_str+='</select>';
			html_str+='</div>';
			html_str+='<div class="input">';
				html_str+='<label for="zigzag_speed">Zig Zag Delay</label>';
				html_str+='<input id="zigzag_speed" name="zigzag_speed" type="range" min="0" max="500" step="25" value="125" />';
			html_str+='</div>';
			html_str+='<div class="input">';
				html_str+='<label for="zigzag_amount">Zig Zag Amount</label>';
				html_str+='<input id="zigzag_amount" name="zigzag_amount" type="range" min="1" max="5" step="1" value="1" />';
			html_str+='</div>';
			html_str+='<div class="buttons">';
				html_str+='<button id="il_zig_zig_auto"class="">Zig Zag Auto</button>';
				html_str+='<button id="il_zig_zig"class="">Zig Zag</button>';
			html_str+='</div>';
			sett.innerHTML=html_str;

		}
		/* this sets up the events for this html */
		events(name);
	
	/*-----------------------------------------Patty and Winston Jump example*/
	}else if(name=='Patty-and-Winston-Jump'){
		if(view){
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

			view.innerHTML=html_str;
		}
		if(sett){
			html_str=' ';
			html_str+='<div class="input">';
			html_str+='</div>';
			html_str+='<div class="buttons">';
			html_str+='</div>';
			sett.innerHTML=html_str;
		}
		events(name);
	
	/*-----------------------------------------image look */
	}else if(name=='Image-Look'){
		if(view){
			html_str+='<h1>Image Look</h1>';
			html_str+='<div class="buttons">';
				html_str+='<input id="input_image" name="input_image" type="file"/>';
			html_str+='</div>';
			html_str+='<canvas id="viewport"></canvas>';
			view.innerHTML=html_str;
		}
		if(sett){
			html_str=' ';
			html_str+='<div class="buttons">';
				html_str+='<button id="winston_image"><img src="img/winston_forward.png"></button>';
				html_str+='<button id="patty_image"><img src="img/patty_forward.png"></button>';
			html_str+='</div>';
			sett.innerHTML=html_str;
		}
		events(name);
	}
}

/* ========================================================= Zig Zag - setting changes ===== */
function events(type,create){
	if(!type)return;
	if(create==null)create=true;
	if (type=='zigzag'){
		if(create){
			event_add(document.getElementById('zigzag_bg'),'input',zigzag_bg);
			event_add(document.getElementById('zigzag_line'),'input',zigzag_line);
			event_add(document.getElementById('zigzag_speed'),'input',zigzag_speed);
			event_add(document.getElementById('zigzag_amount'),'input',zigzag_amount);
			event_add(document.getElementById('il_zig_zig'),'click',zigzag_button);
			event_add(document.getElementById('il_zig_zig_auto'),'click',zigzag_auto);

		}else{
			event_remove(document.getElementById('zigzag_bg'),'input',zigzag_bg);
			event_remove(document.getElementById('zigzag_line'),'input',zigzag_line);
			event_remove(document.getElementById('zigzag_speed'),'input',zigzag_speed);
			event_remove(document.getElementById('zigzag_amount'),'input',zigzag_amount);
			event_remove(document.getElementById('il_zig_zig'),'click',zigzag_button);
			event_remove(document.getElementById('il_zig_zig_auto'),'click',zigzag_auto);
			zigzagloopclear();
		}

	}else if(type=='Patty-and-Winston-Jump'){
		if(create){
			event_add(window,'keydown',patty_and_winston.key);
			patty_and_winston.start();
		}else{
			event_remove(window,'keydown',patty_and_winston.key);
			patty_and_winston.characters_destroy();
		}

	}else if(type=='Image-Look'){
		if(create){
			event_add(window,'keydown',image_look.key);
			event_add(document.getElementById('winston_image'),'click',image_look.winston);
			event_add(document.getElementById('patty_image'),'click',image_look.patty);
			event_add(document.getElementById('input_image'),'change',image_look.input);

			image_look.start();
		}else{
			event_remove(window,'keydown',image_look.key);
			event_remove(document.getElementById('winston_image'),'click',image_look.winston);
			event_remove(document.getElementById('patty_image'),'click',image_look.patty);
			event_remove(document.getElementById('input_image'),'change',image_look.input);
			// image_look.stop();
		}
	}
}