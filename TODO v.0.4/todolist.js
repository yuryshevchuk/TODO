define(function (){
'use strict';
console.log("todolist.js loaded");
var Todolist = function (storage, numbOfItemsOnPage) {
	var data = {}, tagScope = [], numbOfPages, filterResult={};
	this.getData = function (filterObject) {
		var filteredData=[];
		tagScope = [];
		if (filterObject) {
				for (var i = 0; i < filterObject.filter.length; i++) {
					filteredData[filterObject.filter[i]] = this.filterItems(filterObject.filter[i]);
				}
				for (var key in filteredData) {
					for (var i = 0; i < filteredData[key].length; i++) {
						filterResult[filteredData[key][i].content] = filteredData[key][i];
					}
				}
				if (Object.keys(filterResult).length) {
					return this.pagination(filterResult, filterObject.page, numbOfItemsOnPage);
				} else {
					return this.pagination(data, filterObject.page, numbOfItemsOnPage);
				}
		}
		if (!Object.keys(data).length){
			data = this.loadData();
				return data;
		}
	};
	this.pagination = function (enteredData, page) {
		var pageFilter = [], result = {};
		numbOfPages = Math.ceil(Object.keys(enteredData).length/numbOfItemsOnPage);
		if (page && page <= numbOfPages) {
				for (var key in enteredData) {
					if (enteredData[key]){
						pageFilter.push(enteredData[key]);
					}
				}
				for (var i = page*numbOfItemsOnPage - numbOfItemsOnPage; i < page*numbOfItemsOnPage; i++) {
					if (pageFilter[i]) {
						result[pageFilter[i].content] = pageFilter[i];
					}
				}
		} else {
			return enteredData;
		}
		filterResult={};
		return result;
	};
	this.getNumberOfPages = function (){
		console.log(numbOfPages);
		return numbOfPages;
	};
	this.loadData = function () {
		return storage.getData("Items");
	};
	this.saveData = function () {
		return storage.saveData("Items", data);
	};
	this.addData = function (item) {
		if (item){
			item.index = 'add';
			data[item.content]=item;
		}
		return this.saveData(data);
	};
	this.toogleItemStatus = function (i){
		(data[i].condition == "active") ? data[i].condition = "done" : data[i].condition = "active";
		return this.saveData(data);
	};
	this.deleteItem = function (i) {
		delete data[i];
		if (filterResult[i]) {
			delete filterResult[i];
		}
		return this.saveData(data);
	};
	this.getItem = function (i) {
		for (var key in data) {
			if (data[key].content == i) {
				return data[key];
			};
		}
	};
	this.filterItems = function(filterValue) {
		var filteredData = [];
		for (var key in data){
			if (data[key].tags.indexOf(filterValue) != '-1') {
				filteredData.push(data[key]);
			}
		}
		return filteredData;
	};
	this.getTags = function () {
		this.getData();
		var smallTagLinks = {};
		for (var key in data) {
					if (data[key].tags){
						for (var i = 0; i < data[key].tags.length; i++) {
							this.getUpperTags(data[key].tags[i]);
							smallTagLinks[data[key].content] = data[key].tags[i];
						}
					}
				}
		return smallTagLinks;
	};
	this.getUpperTags = function () {
		this.getData();
		for (var key in data) {
			if (data[key].tags){
				for (var i = 0; i < data[key].tags.length; i++) {
					if (tagScope.indexOf(data[key].tags[i]) == '-1' && data[key].tags[i]) {
						tagScope.push(data[key].tags[i]);
					}
				}
			}
		}
		return tagScope;
	};
};

return Todolist;
});
