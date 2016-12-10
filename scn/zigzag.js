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