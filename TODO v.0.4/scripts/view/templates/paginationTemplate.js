define(function(){
	var paginationTemplate = "{{#pagination}}<li><a href='' class='page {{active}}' data-value='{{number}}'>{{number}}</a></li>{{/pagination}}";
	return paginationTemplate;
})