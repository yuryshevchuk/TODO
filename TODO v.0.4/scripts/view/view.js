define(["libs/mustache", "view/templates/listTemplate", "view/templates/upperTagsTemplate", "view/templates/paginationTemplate"], function (Mustache, listTemplate, upperTagsTemplate, paginationTemplate){
'use strict';
console.log("view.js loaded");
var View = function (placeForData, placeForUpperTags, placeForPagination){
	var selectedTags = [];

	var renderData = {
		"item": [],
		"upperTags": [],
		"pagination": []
	};

	this.refreshItems = function (data, pagination, activePage){
			if (pagination != 1) {
				for (var i = 1; i <= pagination; i++) {
				if (activePage == i) {
					renderData["pagination"][i-1] = {"number": i, "active": "activePage"};
				} else {
					renderData["pagination"][i-1] = {"number": i, "active": ""};
					}
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
		renderData["pagination"] = [];
	};

	this.renderUpperTags = function (tagScope, hash){
		var selection;
		selectedTags.length = tagScope.length;
		for (var i = 0; i < tagScope.length; i++) {
			if (hash) {
				for (var j = 0; j < hash["filter"].length; j++) {
					if (tagScope[i] == hash["filter"][j]) {
							selectedTags.splice(i, 0, 'selected');
					}
				}
			}
			renderData["upperTags"].push({"value": tagScope[i], "selection": selectedTags[i]});
		}
		placeForUpperTags.innerHTML = Mustache.render(upperTagsTemplate, renderData);
		selectedTags = [];
		renderData["upperTags"] = [];
	};
};
return View;
});