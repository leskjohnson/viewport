/* ========================================================= Window Loaded Event =========== */
/* event for when the window loads --------------------------------------------------------- */
event_add(window,'load',function(e){
	/* find the scene_list element */
	var ele=document.getElementById('scene_list');
	/*fill the scene_list with a select dropdown of the scenes */
	if(ele)scene_select(ele);

	/*load in the html and events*/
	scene_load(settings.scene);
	scene_init();
});		

/* ========================================================= Keydown Events ================ */
/* event for sliding out the settings ------------------------------------------------------ */
event_add(document,'keydown',function(e){
	if(e.code=='Space'){
		if(e.shiftKey)class_toggle(document.body,'fullscreen');
		else class_toggle(document.getElementById('settings'),'closed');
	}
});

/* ========================================================= Modal Actions and Settings ==== */
/* event for sliding out the settings ------------------------------------------------------ */
event_add(document.getElementById('settings_toggle'),'click',function(e){
	var ele=document.getElementById('settings');
	if(ele)class_toggle(ele,'closed');
});
/* event for closing the settings menu ----------------------------------------------------- */
event_add(document.getElementById('settings_close'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele){
		class_add(ele,'closed');
	}
});
/* event for toggling the settings menu modal state ----------------------------------------- */
event_add(document.getElementById('settings_modal'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele){
		if(class_exists(ele,'modal')){
			class_remove(ele,'modal');
			class_remove(e.srcElement,'active');
		}else{
			class_add(ele,'modal');
			class_add(e.srcElement,'active');
		} 
	}
});
/* theme settings - add class name to document.body ------------------------------------------ */
event_add(document.getElementById('settings_color'),'click',function(e){
	preventEvent(e);
	if(class_exists(document.body,'color')){
		class_remove(document.body,'color');
		class_remove(e.srcElement,'active');
		e.srcElement.innerHTML='Theme - B&amp;W';
	}else{
		class_add(document.body,'color');
		class_add(e.srcElement,'active');
		e.srcElement.innerHTML='Theme - Color';
	}
});
/* event for clearing the Canvas and reseting the zig zag position ------------------------ */
event_add(document.getElementById('il_clear'),'click',function(e){
	vp.clear();
	vp.pos.x=0;
	vp.pos.y=0;
	if(settings.scene=='Patty-and-Winston-Jump')
		patty_and_winston.stop();
		patty_and_winston.start();
});

/* ========================================================= Scene Loop ==================== */
/* scene recurring event ------------------------------------------------------------------- */
/*function sceneloop() {
    vp.loop=window.setTimeout(function(){
		vp.zigzag(
			settings.zigzag.size,
			settings.zigzag.loop
		);
        zigzagloop(settings.zigzag.delay);
    }, settings.zigzag.delay);
}*/
/* destroy sceneloop ------------------------------------------------------------------------ */
/*function sceneloopclear(){
	window.clearTimeout(vp.loop);
	vp.loop=null;
}*/
