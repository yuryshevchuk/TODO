define(function (){
'use strict';
console.log("todolist.js loaded");
var Todolist = function (storage) {
	this.data = {};
	this.tagScope = [];
	this.numbOfPages;
	this.filterResult={};
	this.storage = storage;
};
Todolist.prototype.getData = function (filtered) {
		this.tagScope = [];
		if (!Object.keys(this.data).length){
			this.data = this.loadData();
		}
		if (filtered) {
			return filtered;
		}
		return this.data;
	};
Todolist.prototype.getCurrentData = function () {
		return this.data;
	};
Todolist.prototype.loadData = function () {
		return this.storage.getData("Items");
	};
Todolist.prototype.saveData = function () {
		return this.storage.saveData("Items", this.data);
	};
Todolist.prototype.addData = function (item) {
		if (item){
			var now = new Date();
			item.index = now.getTime();
			this.data[item.index]=item;
		}
		return this.saveData();
	};
Todolist.prototype.toogleItemStatus = function (i){
		(this.data[i].condition == "active") ? this.data[i].condition = "done" : this.data[i].condition = "active";
		return this.saveData();
	};
Todolist.prototype.deleteItem = function (i) {
		delete this.data[i];
		return this.saveData();
	};
Todolist.prototype.getItem = function (i) {
		return this.data[i];
	};
Todolist.prototype.filterItems = function(filterValue) {
		var filteredData = [];
		for (var key in this.data){
			if (this.data[key].tags.indexOf(filterValue) != '-1') {
				filteredData.push(this.data[key]);
			}
		}
		return filteredData;
	};
Todolist.prototype.getUpperTags = function () {
		for (var key in this.data) {
			if (this.data[key].tags){
				for (var i = 0; i < this.data[key].tags.length; i++) {
					if (this.tagScope.indexOf(this.data[key].tags[i]) == '-1') {
						this.tagScope.push(this.data[key].tags[i]);
					}
				}
			}
		}
		return this.tagScope;
	};
return Todolist;
});
