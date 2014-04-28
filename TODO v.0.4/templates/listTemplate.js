define(function(){
	var listTemplate = "{{#item}}<li class='todo-item {{condition}}' data-index='{{content}}'><input data-index='{{content}}' {{check}} type='checkbox'><a href='' data-index='{{content}}'>{{content}}</a><a href='' id='cancelEditingItem' class='cross-button-link position-right' data-index='{{content}}'></a><br>{{#tags}}<a href='' class='tags-small' data-value='{{.}}'>#{{.}}</a>{{/tags}}</li>{{/item}}";
	return listTemplate;
})