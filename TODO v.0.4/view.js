window.View = (function (){
'use strict';
var View = function (placeForData, placeForUpperTags, placeForPagination){
	var multipleSelect = [], selectedTags = [], classTagSelected = [];

	var renderData = {
		"activeItems": '',
		"doneItems": '',
		"item": '',
		"i": '',
		"check": '',
		"tags": ''
	};

	this.refreshItems = function (data){
		var template = "{{{activeItems}}}{{{doneItems}}}";
				for (var key in data) {
					if (data[key].condition == "active"){
						renderData["activeItems"] +=(this.renderList(data[key], key, ''));
					} else {
						renderData["doneItems"] += this.renderList(data[key], key, "checked='checked'");
					}
				}
		placeForData.innerHTML = Mustache.render(template, renderData);
		renderData["activeItems"] = '';
		renderData["doneItems"] = '';
	};

	this.renderList = function (item, i, check){
		renderData["item"] = item;
		renderData["i"] = i;
		renderData["check"] = check;
		this.renderSmallTags();
		var template = "<li class='todo-item {{item.condition}}' data-index='{{i}}'><input {{check}} data-index='{{i}}' type='checkbox'><a href='' data-index='{{i}}'>{{item.content}}</a><a href='' id='cancelEditingItem' class='cross-button-link position-right' data-index='{{i}}'></a><br>{{{tags}}}</li>";
		return Mustache.render(template, renderData);
	};

	this.renderSmallTags = function () {
		var template = "";
			if (renderData["item"].tags) {
					template += "{{#item.tags}}<a href='' class='tags-small' data-value='{{.}}'>#{{.}}</a>{{/item.tags}}";
			}
		renderData["tags"] = Mustache.render(template, renderData);
	};

	this.renderUpperTags = function (tagScope, dataValue){
		var upperTagLinks = "<a href='' id='allTagsLink' class='reset-filter'>Show All</a>";
		classTagSelected = [];
		classTagSelected.length = 50;
		if (dataValue && selectedTags.indexOf(dataValue) == '-1') {
			selectedTags.push(dataValue);
		}
		for (var i = 0; i < tagScope.length; i++) {
			for (var j = 0; j < selectedTags.length; j++) {
				if (tagScope[i] == selectedTags[j]) {classTagSelected.splice(i, 0, 'selected')};
			};
			upperTagLinks += "<a href='' class='upper-tags "+classTagSelected[i]+"' data-value='"+tagScope[i]+"'>"+tagScope[i]+"</a>";
		}
			placeForUpperTags.innerHTML = upperTagLinks;
	};

	this.clearTagsSelection = function () {
		selectedTags = []; 
		classTagSelected = [];
	};

	this.renderPagination = function (numbOfPages) {
		var pagination = '';
		if (numbOfPages != 1) {
			for (var i = 0; i < numbOfPages; i++) {
			pagination += "<li><a href='' class='page' data-value='"+(i+1)+"'>"+(i+1)+"</a></li>";
			}
		}
		placeForPagination.innerHTML = pagination;
	};
};
return View;
}());