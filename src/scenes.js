/* ========================================================= Scene Select Dropdown ========= */
/* ----------------------------------------------------------------------------------------- */
function scene_select(ele){
	/* create the select input */
	var html_str='<select id="scene_select" name="scene">';
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
	}else if(settings.scene=='patty_and_winston'){
		settings.view='';
	}else if(settings.scene=='Patty-and-Winston-Jump'){
		settings.view='patty_and_winston';
		settings.dimensions.width=500;
		settings.dimensions.height=200;
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
			html_str+='<h2>Zig Zag</h2>';
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
			html_str+='<h2>Patty and Winston</h2>';
			html_str+='<h3>Jump</h3>';
			html_str+='<canvas id="viewport"></canvas>';
			html_str+='<div class="buttons">';
				html_str+='<img src="img/winston_forward.png">';
				html_str+='<img src="img/patty_forward.png">';
			html_str+='</div>';

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
	
	/*-----------------------------------------paddy_and_winston example*/
	}else if(name=='patty_and_winston'){
		if(view){
			html_str+='<h2>Patty and Winston</h2>';
			html_str+='<div class="buttons">';
				html_str+='<img src="img/patty_forward.png">';
				html_str+='<img src="img/patty_right.png">';
			html_str+='</div>';
			html_str+='<div class="buttons">';
				html_str+='<img src="img/winston_forward.png">';
				html_str+='<img src="img/winston_right.png">';
			html_str+='</div>';

			view.innerHTML=html_str;
		}
		if(sett){
			html_str=' ';
			html_str+='<div class="buttons">';
				html_str+='<img src="img/winston_forward.png">';
				html_str+='<img src="img/patty_forward.png">';
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
	}
}

/* ========================================================= Zig Zag Loop ================== */
/* zig zag function for creating a recurring event ----------------------------------------- */
function zigzagloop() {
    vp.loop=window.setTimeout(function(){
		vp.zigzag(
			settings.zigzag.size,
			settings.zigzag.loop
		);
        zigzagloop(settings.zigzag.delay);
    }, settings.zigzag.delay);
}
/* zig zag function for destroy a recurring event ------------------------------------------- */
function zigzagloopclear(){
	window.clearTimeout(vp.loop);
	vp.loop=null;
}
/* ========================================================= Zig Zag Functions ============= */
/* event for changing the zigzag loop speed ------------------------------------------------ */
function zigzag_bg(e){
	settings.colors.bg=e.srcElement.value;
	vp.bg=settings.colors.bg;
	vp.clear();
}
/* event for changing the zigzag loop speed ------------------------------------------------ */
function zigzag_line(e){
	settings.colors.line=e.srcElement.value;
	vp.line=settings.colors.line;	
}
/* event for changing the zigzag loop speed ------------------------------------------------ */
function zigzag_speed(e){
	settings.zigzag.delay=e.srcElement.value;
}
/* event for changing the zigzag loop speed ------------------------------------------------ */
function zigzag_amount(e){
	settings.zigzag.loop=e.srcElement.value;;
}
/* event for when the Zig Zag button is clicked -------------------------------------------- */
function zigzag_button(e){
	preventEvent(e);
	vp.zigzag(settings.zigzag.size,settings.zigzag.loop);	
}
/* event for when the Zig Zag Auto button is clicked ---------------------------------------- */
function zigzag_auto(e){
	preventEvent(e);	
	if(vp.loop==null){/* if the imagelook loop isn't set */
		zigzagloop();/* start the zig zag loop */
		class_add(this,'active');/* make the Zig Zag Auto button active */
	}else{
		zigzagloopclear();/* stop the zig zag loop */
		class_remove(this,'active');/* make the Zig Zag Auto button inactive */
	}	
}