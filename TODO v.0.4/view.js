define(["mustache", "templates/listTemplate", "templates/upperTagsTemplate", "templates/paginationTemplate"], function (Mustache, listTemplate, upperTagsTemplate, paginationTemplate){
'use strict';
console.log("view.js loaded");
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

	this.renderUpperTags = function (tagScope, hash){
		var selection;
		classTagSelected.length = tagScope.length;
		for (var i = 0; i < tagScope.length; i++) {
			if (hash) {
				for (var j = 0; j < hash["filter"].length; j++) {
					if (tagScope[i] == hash["filter"][j]) {
							classTagSelected.splice(i, 0, 'selected');
					}
				}
			}
			renderData["upperTags"].push({"value": tagScope[i], "selection": classTagSelected[i]});
		}
		placeForUpperTags.innerHTML = Mustache.render(upperTagsTemplate, renderData);
		classTagSelected = [];
		renderData["upperTags"] = [];
	};
	this.clearTagsSelection = function () {
		renderData["selectedTags"] = [];
	};
};
return View;
});