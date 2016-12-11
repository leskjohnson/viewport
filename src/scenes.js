/* ========================================================= Scene Load - HTML ============= */
/* clear and load another example ---------------------------------------------------------- */
function scene_load(name){
	/*get the scene container to add the content of the scene in to*/
	var html_str='',
	view=document.getElementById('scene');
	sett=document.getElementById('scene_settings');

	/*set the obj for the scene to run*/
	settings.obj=scene_list[name];

	/*this gets the html and settings from the scene object*/
	if(view)view.innerHTML=settings.obj.html();
	if(sett)sett.innerHTML=settings.obj.sett();

	/* this sets up the events for the html */
	events(name);
}

/* ========================================================= Events Handler ================ */
function events(type,create){
	if(!type)return;
	if(create==null)create=true;
	if(create){
		if(typeof settings.obj.start=='function')
			settings.obj.start();
	}else{
		if(typeof settings.obj.stop=='function')
			settings.obj.stop();
	}
}

/* ========================================================= Animation Handler ============= */
/* this is for using the animation call back ----------------------------------------------- */
function animate_handler(){if(typeof settings.obj.draw=='function')settings.obj.draw();}

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
	if(typeof settings.obj.setup=='function')
		settings.obj.setup();

	/* setup the viewport */
	vp.setup({
		'width':settings.dimensions.width,
		'height':settings.dimensions.height
	});

	/* initiate - after setup */
	if(typeof settings.obj.init=='function')
		settings.obj.init();
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

/* ========================================================= Scene Select Dropdown ========= */
/* ----------------------------------------------------------------------------------------- */
function scene_select(ele){
	/* create the select input */
	var html_str='<label for="scene_select">Scene Select</label>';
	html_str+='<select id="scene_select" name="scene">';
		/* create an html option for each scene in the scene_list */
		for(scene in scene_list)
			html_str+='<option value="'+scene+'">'+scene+'</option>';		
	html_str+='</select>';
	ele.innerHTML=html_str;
	/* wait for dom refresh to add an input event on the select element */
	setTimeout(function(){
		event_add(document.getElementById('scene_select'),'change',scene_change);},1);
}