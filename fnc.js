var event_add=function(object,type,callback){
	if(object==null||typeof(object)=='undefined')return;
	if(object.addEventListener){
		object.addEventListener(type,callback,false);
	}else if(object.attachEvent){
		object.attachEvent('on'+type,callback);
	}else{object['on'+type]=callback;}
};
var event_remove=function(object,type,callback){
	if(object==null||typeof(object)=='undefined')return;
	if(object.removeEventListener){
		object.removeEventListener(type,callback);
	}else if(object.detachEvent){
		object.detachEvent('on'+type,callback);
	}
};
function class_exists(ele,className){return new RegExp(' '+className+' ').test(' '+ele.className+' ');};	
function class_add(ele,className){if(!class_exists(ele,className))ele.className+=' '+className;};
function class_remove(ele,className){var newClass=' '+ele.className.replace(/[\t\r\n]/g,' ')+' ';if(class_exists(ele,className)){while (newClass.indexOf(' '+className+' ')>=0) newClass=newClass.replace(' '+className+' ',' ');ele.className=newClass.replace(/^\s+|\s+$/g,' ');}};
function class_toggle(ele,className){var newClass=' '+ele.className.replace(/[\t\r\n]/g,' ')+' ';if(class_exists(ele,className)){while (newClass.indexOf(' '+className+' ')>=0) newClass=newClass.replace(' '+className+' ',' ');ele.className=newClass.replace(/^\s+|\s+$/g,' ');}else ele.className+=' '+className;};
function preventEvent(e){if(e.preventDefault) e.preventDefault();else e.returnValue=false;}
