define(function(){
	var paginationTemplate = "{{#numbOfPages}}<li><a href='' class='page' data-value='{{.}}'>{{.}}</a></li>{{/numbOfPages}}";
	return paginationTemplate;
})