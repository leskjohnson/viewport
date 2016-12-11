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
		if(e.shiftKey){

			var canvas=vp.canvas;
			if(canvas){
				var pos=getPosition(canvas);
				var body=document.body;
				if(class_exists(body,'fullscreen')){
					canvas.style.width=vp.size.x+'px';
					canvas.style.height=vp.size.y+'px';
					canvas.style.position='relative';
					canvas.style.transition='left 1s,top 1s,width 1s,height 1s';
					canvas.style.left=(pos.x)+'px';
					canvas.style.top=(pos.y)+'px';
					setTimeout(function(){
						class_remove(body,'fullscreen');
						vp.canvas.style.position='relative';
						vp.canvas.style.transition='left 1s,top 1s,width 1s,height 1s';
						vp.canvas.style.left='0px';
						vp.canvas.style.top='0px';
					},1);
				}else{
					canvas.style.width='1%';
					canvas.style.height='1%';
					canvas.style.transition='none';
					canvas.style.left=pos.x+'px';
					canvas.style.top=pos.y+'px';
					setTimeout(function(){
						class_add(body,'fullscreen');
						canvas.style.position='fixed';
						vp.canvas.style.left='0px';
						vp.canvas.style.top='0px';
	
						vp.canvas.style.transition='left 1s,top 1s,width 1s,height 1s';
					},1);
				}
			}else{

			}

		}else class_toggle(document.getElementById('settings'),'closed');
	}
});

/* ========================================================= Modal Actions and Settings ==== */
/* event for sliding out the settings ------------------------------------------------------ */
event_add(document.getElementById('settings_button'),'click',function(e){
	var ele=document.getElementById('settings');
	if(ele)class_toggle(ele,'closed');
});
/* event for clearing the Canvas and reseting the zig zag position ------------------------ */
event_add(document.getElementById('reset_button'),'click',function(e){
	vp.clear();
	vp.pos.x=0;
	vp.pos.y=0;
	if(typeof settings.obj.reset=='function')settings.obj.reset();
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


/* ========================================================= Vieport Global Settings ======= */
/* event for changing the zigzag loop speed ------------------------------------------------ */
function viewport_bg(e){
	settings.colors.bg=e.srcElement.value;
	vp.bg=settings.colors.bg;
	vp.clear();
}
/* event for changing the zigzag loop speed ------------------------------------------------ */
function viewport_line(e){
	settings.colors.line=e.srcElement.value;
	vp.line=settings.colors.line;	
}
event_add(document.getElementById('settings_bg'),'input',viewport_bg);
event_add(document.getElementById('settings_line'),'input',viewport_line);