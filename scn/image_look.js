var image_look={
	'image':new Image(),
	'canvas_img':null,
	'start':function(){
  		image_look.image.src='img/winston_forward.png';
		window.requestNextAnimationFrame(animate);
	},
	'stop':function(){

	},
	'draw':function(){
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
	}
};