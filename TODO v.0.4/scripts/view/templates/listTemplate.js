define(function(){
	var listTemplate = "{{#item}}<li class='todo-item {{condition}}' data-index='{{index}}'><input data-index='{{index}}' {{check}} type='checkbox'><a href='' data-index='{{index}}'>{{content}}</a><a href='' id='cancelEditingItem' class='cross-button-link position-right' data-index='{{index}}'></a><br>{{#tags}}<a href='' class='tags-small' data-value='{{.}}'>#{{.}}</a>{{/tags}}</li>{{/item}}";
	return listTemplate;
})