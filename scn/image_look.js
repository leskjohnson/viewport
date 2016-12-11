var image_look={
	'image':new Image(),
	'canvas_img':null,
	'dimensions':{'width':500,'height':500},
	'setup':function(){
		settings.view='image_look';
		settings.dimensions.width=this.dimensions.width;
		settings.dimensions.height=this.dimensions.height;
	},
	'init':function(){},
	'start':function(){
  		image_look.image.src='img/winston_forward.png';
		window.requestNextAnimationFrame(animate);
		this.events(true);
	},
	'stop':function(){
		this.events(false);
	},
	'draw':function(){
		vp.clear();
		vp.ctx.drawImage(this.image,0,0,vp.ctx.canvas.width,vp.ctx.canvas.height);
	},
	'key':function(){
		console.log('image_look-key');
	},
	'image_loaded':function(){
		image_look.image.src=image_look.canvas_img.result;
		vp.clear();
	},
	'input':function(){
		var input=document.getElementById('input_image'),
			file=input.files[0],
			fr=new FileReader();
		fr.onload=image_look.image_loaded;   // onload fires after reading is complete
		fr.readAsDataURL(file);    // begin reading
		image_look.canvas_img=fr;
	},
	'winston':function(e){
		preventEvent(e);
		vp.clear();
  		image_look.image.src='img/winston_forward.png';
	},
	'patty':function(e){
		preventEvent(e);
		vp.clear();
  		image_look.image.src='img/patty_forward.png';
	},
	'html':function(){
		var html_str='';
		html_str+='<h1>Image Look</h1>';
		html_str+='<div class="buttons">';
			html_str+='<input id="input_image" name="input_image" type="file"/>';
		html_str+='</div>';
		html_str+='<canvas id="viewport"></canvas>';
		return html_str;
	},
	'sett':function(){
		var html_str=' ';
		html_str+='<div class="buttons">';
			html_str+='<button id="winston_image"><img src="img/winston_forward.png"></button>';
			html_str+='<button id="patty_image"><img src="img/patty_forward.png"></button>';
		html_str+='</div>';
		return html_str;
	},
	'events':function(create){
		if(create){
			event_add(window,'keydown',image_look.key);
			event_add(document.getElementById('winston_image'),'click',image_look.winston);
			event_add(document.getElementById('patty_image'),'click',image_look.patty);
			event_add(document.getElementById('input_image'),'change',image_look.input);
		}else{
			event_remove(window,'keydown',image_look.key);
			event_remove(document.getElementById('winston_image'),'click',image_look.winston);
			event_remove(document.getElementById('patty_image'),'click',image_look.patty);
			event_remove(document.getElementById('input_image'),'change',image_look.input);
		}
	}
};