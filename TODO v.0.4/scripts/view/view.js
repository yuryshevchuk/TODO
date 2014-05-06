define(["libs/mustache", "view/templates/listTemplate", "view/templates/upperTagsTemplate", "view/templates/paginationTemplate"], function (Mustache, listTemplate, upperTagsTemplate, paginationTemplate){
'use strict';
console.log("view.js loaded");
var View = function (placeForData, placeForUpperTags, placeForPagination){
	this.placeForData = placeForData;
	this.placeForUpperTags = placeForUpperTags;
	this.placeForPagination = placeForPagination;
	this.selectedTags = [];
	this.renderData = {
		"item": [],
		"upperTags": [],
		"pagination": []
	};
};
View.prototype.refreshItems = function (data, pagination, activePage){
			if (pagination != 1) {
				for (var i = 1; i <= pagination; i++) {
					if (activePage == i) {
						this.renderData["pagination"][i-1] = {"number": i, "active": "activePage"};
					} else {
						this.renderData["pagination"][i-1] = {"number": i, "active": ""};
					}
				}
			}
				for (var key in data) {
					if (data[key].condition == 'active') {
						data[key]["check"] = '';
						this.renderData["item"].unshift(data[key]);
					} else {
						data[key]["check"] = "checked='checked'";
						this.renderData["item"].splice(this.renderData["item"].length, 0, data[key]);
					}
				}
					this.placeForData.innerHTML = Mustache.render(listTemplate, this.renderData);
					this.placeForPagination.innerHTML = Mustache.render(paginationTemplate, this.renderData);
		this.renderData["item"] = [];
		this.renderData["pagination"] = [];
	};
View.prototype.renderUpperTags = function (tagScope, hash){
		this.selectedTags.length = tagScope.length;
		for (var i = 0; i < tagScope.length; i++) {
			if (hash) {
				for (var j = 0; j < hash["filter"].length; j++) {
					if (tagScope[i] == hash["filter"][j]) {
							this.selectedTags.splice(i, 0, 'selected');
					}
				}
			}
			this.renderData["upperTags"].push({"value": tagScope[i], "selection": this.selectedTags[i]});
		}
		this.placeForUpperTags.innerHTML = Mustache.render(upperTagsTemplate, this.renderData);
		this.selectedTags = [];
		this.renderData["upperTags"] = [];
	};
return View;
});