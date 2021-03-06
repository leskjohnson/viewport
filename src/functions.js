/*  binds events to an element - Cross Browser */
var event_add=function(object,type,callback){  
  if(object==null||typeof(object)=='undefined')return;
  if(object.addEventListener){
    object.addEventListener(type,callback,false);
  }else if(object.attachEvent){
    object.attachEvent('on'+type,callback);
  }else{object['on'+type]=callback;}
};
/* removes events from an element - Cross Browser */
var event_remove=function(object,type,callback){
	if(object==null||typeof(object)=='undefined')return;
	if(object.removeEventListener){
		object.removeEventListener(type,callback);
	}else if(object.detachEvent){
		object.detachEvent('on'+type,callback);
	}
};
/* manipulate element class names */
function class_exists(ele,className){return new RegExp(' '+className+' ').test(' '+ele.className+' ');};	
function class_add(ele,className){if(!class_exists(ele,className))ele.className+=' '+className;};
function class_remove(ele,className){var newClass=' '+ele.className.replace(/[\t\r\n]/g,' ')+' ';if(class_exists(ele,className)){while (newClass.indexOf(' '+className+' ')>=0) newClass=newClass.replace(' '+className+' ',' ');ele.className=newClass.replace(/^\s+|\s+$/g,' ');}};
function class_toggle(ele,className){var newClass=' '+ele.className.replace(/[\t\r\n]/g,' ')+' ';if(class_exists(ele,className)){while (newClass.indexOf(' '+className+' ')>=0) newClass=newClass.replace(' '+className+' ',' ');ele.className=newClass.replace(/^\s+|\s+$/g,' ');}else ele.className+=' '+className;};
/* stop normal event action */
function preventEvent(e){if(e.preventDefault) e.preventDefault();else e.returnValue=false;}

/* calculateFps adapted from Core HTML5 Canvas
 * David Geary (www.corehtmlcanvas.com) */
function calculateFps(now) {
   	var cur_fps = 1000 / (now - vp.fps.frame);
   	vp.fps.frame = now;
   	if (now - vp.fps.update > 1000)
   		vp.fps.update = now; 
   	return cur_fps; 
}
function animate(now){
	calculateFps(now);
	requestNextAnimationFrame(animate);
	if(typeof animate_handler=='function')animate_handler();
}

/*https://www.kirupa.com/html5/get_element_position_using_javascript.htm*/
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}