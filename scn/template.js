var template_scene={
	'setup':function(){},
	'init':function(){},
	'start':function(){},
	'stop':function(){},
	'draw':function(){},
	'html':function(){
		var html_str='';
		html_str+='<h1>Template Scene</h1>';
		html_str+='<p>Content goes here.</p>';
		return html_str;
	},
	'sett':function(){
		var html_str='';
		html_str+='<h2>Template Settings</h2>';
		html_str+='<div id="template_settings_button" class="buttons">';
			html_str+='<button class="button" onclick="preventEvent(event);">Buttons</button></div>';
		html_str+='</div>';
		html_str+='<div class="input">Settings can go here.</div>';
		return html_str;
	},
	'events':function(create){
		if(create){
		}else{
		}
	},
};