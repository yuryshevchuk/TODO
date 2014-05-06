define(function (){
'use strict';
var Filtration = function (numbOfItemsOnPage) {
	this.numbOfItemsOnPage = numbOfItemsOnPage;
	this.filterResult={};
	this.numbOfPages;
	this.activePage;
};
Filtration.prototype.filter = function (data, filterObject) {
	var filteredData=[];
		if (filterObject) {
			this.filterResult={};
			if (filterObject.filter) {
				for (var i = 0; i < filterObject.filter.length; i++) {
					filteredData[filterObject.filter[i]] = this.filterItems(filterObject.filter[i], data);
				}
				for (var key in filteredData) {
					for (var i = 0; i < filteredData[key].length; i++) {
						this.filterResult[filteredData[key][i].index] = filteredData[key][i];
					}
				}
				if (Object.keys(this.filterResult).length) {
					return this.paginate(this.filterResult, filterObject.page, this.numbOfItemsOnPage);
				} else {
					return this.paginate(data, filterObject.page, this.numbOfItemsOnPage);
				}
			}
		}
	};
Filtration.prototype.paginate = function (enteredData, page){
		var pageFilter = [], result = {};
		this.numbOfPages = Math.ceil(Object.keys(enteredData).length/this.numbOfItemsOnPage);
		if (page > this.numbOfPages) {
			page = this.numbOfPages;
		}
		this.activePage = page;
		if (page) {
				for (var key in enteredData) {
					if (enteredData[key]){
						pageFilter.push(enteredData[key]);
					}
				}
				for (var i = page*this.numbOfItemsOnPage - this.numbOfItemsOnPage; i < page*this.numbOfItemsOnPage; i++) {
					if (pageFilter[i]) {
						result[pageFilter[i].content] = pageFilter[i];
					}
				}
		} else {
			return enteredData;
		}
		return result;
	};
Filtration.prototype.filterItems = function(filterValue, data) {
		var filteredData = [];
		for (var key in data){
			if (data[key].tags.indexOf(filterValue) != '-1') {
				filteredData.push(data[key]);
			}
		}
		return filteredData;
	};
Filtration.prototype.getNumberOfPages = function (){
		return this.numbOfPages;
	};
Filtration.prototype.getActivePage = function (){
		return this.activePage;
	};
return Filtration;
});