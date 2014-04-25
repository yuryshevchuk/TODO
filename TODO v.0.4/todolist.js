


define("todolist", function (){

'use strict';
console.log("list loaded");
var Todolist = function (storage) {
	var data = {}, tagScope = [], numbOfPages, filterResult={};
	return {
	getData : function (filterObject) {
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
	},
	pagination : function (enteredData, page) {
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
	},
	getNumberOfPages : function (){
		return numbOfPages;
	},
	clearFilteredData : function (){
		for (var key in filterResult) {
			delete filterResult[key];
		}
		return filterResult;
	},
	loadData : function () {
		return storage.getData();
	},
	saveData : function () {
		return storage.saveData(data);
	},
	addData : function (item) {
		if (item){
			item.index = 'add';
			data[item.content]=item;
		}
		return Todolist.saveData(data);
	},
	toogleItemStatus : function (i){
		(data[i].condition == "active") ? data[i].condition = "done" : data[i].condition = "active";
		return Todolist.saveData(data);
	},
	deleteItem : function (i) {
		delete data[i];
		return Todolist.saveData(data);
	},
	replaceItem : function(item) {
		data.splice(item.index, 1, item);
		return Todolist.saveData(data);
	},
	getItem : function (i) {
		return data[i];
	},
	filterItems : function(filterValue) {
		var filteredData = [];

		for (var key in data){
			if (data[key].tags.indexOf(filterValue) != '-1') {
				filteredData.push(data[key]);
			}
		}

		return filteredData;
	},
	getTags : function () {
		Todolist.getData();
		var smallTagLinks = {};
		for (var key in data) {
					if (data[key].tags){
						for (var i = 0; i < data[key].tags.length; i++) {
							Todolist.getUpperTags(data[key].tags[i]);
							smallTagLinks[data[key].content] = data[key].tags[i];
						}
					}
				}
		return smallTagLinks;
	},
	getUpperTags : function () {
		Todolist.getData();
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
	}
};
};
return Todolist;
}());
