window.View = (function (){

var View = function (placeForData, placeForUpperTags, placeForPagination){
	var multipleSelect = [], selectedTags = [], classTagSelected = [];

	var renderData = {
		"item": [],
		"check": '',
		"tags": '',
		"upperTags": [],
		"selectedTags": [],
		"numbOfPages": []
	};

	this.refreshItems = function (data, numbOfPages){

		var listTemplate = "{{#item}}<li class='todo-item {{condition}}' data-index='{{content}}'><input data-index='{{content}}' {{check}} type='checkbox'><a href='' data-index='{{content}}'>{{content}}</a><a href='' id='cancelEditingItem' class='cross-button-link position-right' data-index='{{content}}'></a><br>{{#tags}}<a href='' class='tags-small' data-value='{{.}}'>#{{.}}</a>{{/tags}}</li>{{/item}}";
		var paginationTemplate = "{{#numbOfPages}}<li><a href='' class='page' data-value='{{.}}'>{{.}}</a></li>{{/numbOfPages}}";
			if (numbOfPages != 1) {
				for (var i = 1; i <= numbOfPages; i++) {
					renderData["numbOfPages"].push(i);
				}
			}
				for (var key in data) {
					if (data[key].condition == 'active') {
						data[key]["check"] = '';
						renderData["item"].unshift(data[key]);
					} else {
						data[key]["check"] = "checked='checked'";
						renderData["item"].splice(renderData["item"].length, 0, data[key]);
					}
				}
					placeForData.innerHTML = Mustache.render(listTemplate, renderData);
					placeForPagination.innerHTML = Mustache.render(paginationTemplate, renderData);
		renderData["item"] = [];
		renderData["numbOfPages"] = [];
	};

	this.renderUpperTags = function (tagScope, dataValue){
		var template = "<a href='' id='allTagsLink' class='reset-filter'>Show All</a>";
		var selection;
		classTagSelected.length = 50;
		if (dataValue && selectedTags.indexOf(dataValue) == '-1') {
			renderData["selectedTags"].push(dataValue);
		}
			for (var i = 0; i < tagScope.length; i++) {
				for (var j = 0; j < renderData["selectedTags"].length; j++) {
					if (tagScope[i] == renderData["selectedTags"][j]) {
						classTagSelected.splice(i, 0, 'selected');
					}
				}
				renderData["upperTags"].push({"value": tagScope[i], "selection": classTagSelected[i]});
			}
		template += "{{#upperTags}}<a href='' class='upper-tags {{selection}}' data-value='{{value}}'>{{value}}</a>{{/upperTags}}";
		placeForUpperTags.innerHTML = Mustache.render(template, renderData);
		classTagSelected = [];
		renderData["upperTags"]=[];
	};
	this.clearTagsSelection = function () {
		renderData["selectedTags"] = [];
		classTagSelected = [];
	};
};
return View;
}());