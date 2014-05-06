define(function(){
	var upperTagsTemplate = "<a href='' id='allTagsLink' class='reset-filter'>Show All</a>{{#upperTags}}<a href='' class='upper-tags {{selection}}' data-value='{{value}}'>{{value}}</a>{{/upperTags}}";
	return upperTagsTemplate;
})