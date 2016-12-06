/* ========================================================= Example Application =========== */
/* clear and load another example ---------------------------------------------------------- */
function example(name){

	/*get the example container to add the content of the example to*/
	var html_str='',
	view=document.getElementById('example');
	sett=document.getElementById('example_settings');

	/*----------------------------------------------------zigzag example*/
	if(name=='zigzag'){
		if(view){
			html_str+='<h2>Zig Zag</h2>';
			html_str+='<canvas id="viewport"></canvas>';
			view.innerHTML=html_str;
		}
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
		events(name);
	
	/*-----------------------------------------paddy_and_winston example*/
	}else if(name='patty_and_winston'){
		if(view){
			html_str+='<h2>Patty and Winston</h2>';
			html_str+='<canvas id="viewport"></canvas>';
			html_str+='<div class="buttons">';
				html_str+='<img src="img/patty_forward.png">';
				html_str+='<img src="img/winston_forward.png">';
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
	}
}
function example_change(e){
	var name=e.srcElement.value;
	events(name,false);
	example(name);
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
		}		
	}
}

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