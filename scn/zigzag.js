/* ========================================================= Zig Zag Object ================ */
/* zig zag object -------------------------------------------------------------------------- */
var zigzag={
	'settings':{
		'width':200,
		'height':200,
		'autostart':true,/*start automatic zig zag on load*/
		'delay':125, /*how much time between zig zag draws*/
		'size':10, /*the size of the zig zag*/
		'loop':1 /*how many zigzags to draw at a time*/
	},
	'setup':function(){
		// console.log('setup',this);
		settings.view='zigzag';
		settings.dimensions.width=this.settings.width;
		settings.dimensions.height=this.settings.height;
	},
	'init':function(){
		/* if zigzag auto start is on start the zigzagloop */
		if(zigzag.settings.autostart){
			zigzag.loop();
			class_add(document.getElementById('zigzag_auto'),'active');
		}		
	},
	'start':function(){
		this.events(true);
	},
	'stop':function(){
		this.events(false);
		zigzag.loop_clear();
	},

/* zig zag function for creating a recurring event ----------------------------------------- */
	'loop':function(){
	    vp.loop=window.setTimeout(function(){
			vp.zigzag(
				zigzag.settings.size,
				zigzag.settings.loop
			);
	        zigzag.loop(zigzag.settings.delay);
	    }, zigzag.settings.delay);
	},

/* zig zag function to clear the recurrin event --------------------------------------------- */
	'loop_clear':function(){
		window.clearTimeout(vp.loop);
		vp.loop=null;
	},
	'speed':function(e){
		zigzag.settings.delay=e.srcElement.value;
	},
	'amount':function(e){
		zigzag.settings.loop=e.srcElement.value;;
	},
	'button':function(e){
		preventEvent(e);
		vp.zigzag(zigzag.settings.size,zigzag.settings.loop);	
	},
	'auto':function(e){
		preventEvent(e);	
		if(vp.loop==null){/* if the imagelook loop isn't set */
			zigzag.loop();/* start the zig zag loop */
			class_add(this,'active');/* make the Zig Zag Auto button active */
		}else{
			zigzag.loop_clear();/* stop the zig zag loop */
			class_remove(this,'active');/* make the Zig Zag Auto button inactive */
		}	
	},
/* event for changing the zigzag loop speed ------------------------------------------------ */
	'speed':function(e){
		zigzag.settings.delay=e.srcElement.value;
	},
/* event for changing the zigzag amount drawn *8+-659--------------------------------------- */
	'amount':function(e){
		zigzag.settings.loop=e.srcElement.value;;
	},
	'button':function(e){
		preventEvent(e);
		vp.zigzag(zigzag.settings.size,zigzag.settings.loop);	
	},
	'auto':function(e){
		preventEvent(e);	
		if(vp.loop==null){/* if the imagelook loop isn't set */
			zigzag.loop();/* start the zig zag loop */
			class_add(this,'active');/* make the Zig Zag Auto button active */
		}else{
			zigzag.loop_clear();/* stop the zig zag loop */
			class_remove(this,'active');/* make the Zig Zag Auto button inactive */
		}	
	},
	'html':function(){
		var html_str='';
		html_str+='<h1>Zig Zag</h1>';
		html_str+='<canvas id="viewport"></canvas>';
		return html_str;
	},
	'sett':function(){
		var html_str=' ';
		html_str+='<h2>Zig Zag</h2>';
		html_str+='<div class="buttons">';
			html_str+='<button id="zigzag_auto"class="">Zig Zag Auto</button>';
			html_str+='<button id="zigzag_vp"class="">Zig Zag</button>';
		html_str+='</div>';
		html_str+='<div class="input">';
			html_str+='<label for="zigzag_speed">Zig Zag Delay</label>';
			html_str+='<input id="zigzag_speed" name="zigzag_speed" type="range" min="0" max="500" step="25" value="125" />';
		html_str+='</div>';
		html_str+='<div class="input">';
			html_str+='<label for="zigzag_amount">Zig Zag Amount</label>';
			html_str+='<input id="zigzag_amount" name="zigzag_amount" type="range" min="1" max="5" step="1" value="1" />';
		html_str+='</div>';
		return html_str;
	},
	'events':function(create){
		if(create){
			event_add(document.getElementById('zigzag_speed'),'change',zigzag.speed);
			event_add(document.getElementById('zigzag_amount'),'change',zigzag.amount);
			event_add(document.getElementById('zigzag_vp'),'click',zigzag.button);
			event_add(document.getElementById('zigzag_auto'),'click',zigzag.auto);

		}else{
			event_remove(document.getElementById('zigzag_speed'),'change',zigzag.speed);
			event_remove(document.getElementById('zigzag_amount'),'change',zigzag.amount);
			event_remove(document.getElementById('zigzag_vp'),'click',zigzag.button);
			event_remove(document.getElementById('zigzag_auto'),'click',zigzag.auto);
		}
	}
};
