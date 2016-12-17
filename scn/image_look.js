var image_look={
	'image':new Image(),
	'tiles':[],
	'tile_data':{'wm':3,'hm':3,'w':0,'h':0,'c':0},
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
  		image_look.image.onload=function(){image_look.map('create');};
		window.requestNextAnimationFrame(animate);
		this.events(true);
	},
	'stop':function(){
		this.events(false);
	},
	'map':function(type){
		if(type=='create'){
			vp.clear();
			vp.ctx.drawImage(this.image,0,0,vp.ctx.canvas.width,vp.ctx.canvas.height);

			setTimeout(function(){
				// image_look.map('create');
				image_look.tiles=[];
				var td=image_look.tile_data;
				td.w=image_look.dimensions.width/td.wm;
				td.h=image_look.dimensions.height/td.hm;
				td.c=td.wm*td.hm;
				for(var i=0;i<image_look.tile_data.wm;i++){
					for(var j=0;j<image_look.tile_data.hm;j++){
						var img_data=vp.ctx.getImageData(
							i*td.w,
							j*td.h,
							(i*td.w)+td.w,
							(j*td.h)+td.h
						);
						image_look.tiles[image_look.tiles.length]=img_data;
					}
				}
			},1);

		}

	},
	'draw':function(){
		if (this.tiles.length>0){
			var c=0;
			vp.clear();
			var scale={'x':0.5,'y':1};
			for(var i=0;i<this.tile_data.wm;i++){
				for(var j=0;j<this.tile_data.hm;j++){

					vp.ctx.putImageData(
						this.tiles[c],
						i*this.tile_data.w,
						j*this.tile_data.h
					);

					/*Red rectangle to show where the image has been divided*/
					vp.ctx.beginPath();
					vp.ctx.lineWidth="8";
					vp.ctx.strokeStyle="red";
					vp.ctx.rect(
						i*this.tile_data.w-3,
						j*this.tile_data.h-3,
						i*this.tile_data.w+this.tile_data.w,
						j*this.tile_data.h+this.tile_data.h
					); 
					vp.ctx.stroke();
					c++;
				}
			}
			console.log('drew '+c+' pixels');
		}
	},
	'key':function(){
		console.log('image_look-key');
	},
	'image_loaded':function(){
		vp.clear();
		image_look.image.src=image_look.canvas_img.result;
		image_look.map('create');

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
		image_look.map('create');
	},
	'patty':function(e){
		preventEvent(e);
		vp.clear();
  		image_look.image.src='img/patty_forward.png';
		image_look.map('create');
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