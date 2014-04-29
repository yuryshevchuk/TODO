define(function(){
	var formDynamicTemplate = "<h4>{{formTitle}}:</h4><input id='newTask' type='text' required value='{{itemContent}}'><label for='newTag'>Tags:</label><input id='newTag' name='newTag' type='text' value='{{itemTags}}'><input id='condition' type='checkbox' {{checked}}><label for='condition'>Done</label>";
	return formDynamicTemplate;
})