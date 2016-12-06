/* ========================================================= Window Loaded Event =========== */
/* event for when the window loads --------------------------------------------------------- */
event_add(window,'load',function(e){

	// this is what setups up the example
	example(settings.view);

	setTimeout(function(){

		/* create the image_look prototype */	
		vp=new viewport(settings.canvas) 
		/* setup the colors */
		vp.bg=settings.colors.bg;
		vp.line=settings.colors.line;
		/* setup the canvas width and height */
		vp.setup(settings.dimensions);

		var ele=document.getElementById('example_list');
		if(ele){
			var html_str='<select id="example_select" name="example">';
			for (var i = 0; i < example_list.length; i++)
				html_str+='<option value="'+example_list[i]+'">'+example_list[i]+'</option>';
			html_str+='</select>';
			ele.innerHTML=html_str;
			setTimeout(function(){
				event_add(document.getElementById('example_select'),'input',example_change);
			},1);
		}


		if(settings.view=='zigzag'){
			/* if zigzag auto start is on start the zigzagloop */
			if(settings.zigzag.autostart){
				zigzagloop();
				class_add(document.getElementById('il_zig_zig_auto'),'active');
			}		
		}
	},1);

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
});