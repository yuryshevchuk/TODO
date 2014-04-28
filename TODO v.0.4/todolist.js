define(function (){
'use strict';
console.log("todolist.js loaded");
var Todolist = function (storage) {
	var data = {}, tagScope = [], numbOfPages, filterResult={};
	this.getData = function (filterObject) {
		var filteredData=[];
		if (filterObject) {
			if(filterObject.filter){

				for (var i = 0; i < filterObject.filter.length; i++) {
					filteredData[filterObject.filter[i]] = this.filterItems(filterObject.filter[i]);
				}
				for (var key in filteredData) {
					for (var i = 0; i < filteredData[key].length; i++) {
						filterResult[filteredData[key][i].content] = filteredData[key][i];
					}
				}

				if (Object.keys(filterResult).length) {
					return this.pagination(filterResult, filterObject.page);
				} else {
					return this.pagination(data, filterObject.page);
				} 
			} 
		}
		if (!data.length){
			data = this.loadData();
				if (filterObject) {
					return this.pagination(data, filterObject.page);
				} else {
					return data;
				}
		}
	};
	this.pagination = function (enteredData, page) {
		var pageFilter = [], result = {};
		numbOfPages = Math.ceil(Object.keys(enteredData).length/6);
		if (page && page <= numbOfPages) {
				for (var key in enteredData) {
					if (enteredData[key]){
						pageFilter.push(enteredData[key]);
					}
				}
				for (var i = page*6 - 6; i < page*6; i++) {
					if (pageFilter[i]) {
						result[pageFilter[i].content] = pageFilter[i];
					}
				}
		} else {
			return enteredData;
		}
		return result;
	};
	this.getNumberOfPages = function (){
		return numbOfPages;
	};
	this.clearFilteredData = function (){
		for (var key in filterResult) {
			delete filterResult[key];
		}
		return filterResult;
	}
	this.loadData = function () {
		return storage.getData();
	};
	this.saveData = function () {
		return storage.saveData(data);
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
		return this.saveData(data);
	};
	this.replaceItem = function(item) {
		data.splice(item.index, 1, item);
		return this.saveData(data);
	};
	this.getItem = function (i) {
		
		return data[i];
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
					if (tagScope.indexOf(data[key].tags[i]) == '-1') {
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
