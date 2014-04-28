define(function (){
'use strict';
console.log("storage.js loaded");
var ListStorage = function() {
	var localStorage = window['localStorage'],
		savedItems = localStorage.getItem("Items");
};
ListStorage.prototype.getData = function (key) {
	var itemsToSave = localStorage.getItem(key);
		if (itemsToSave) {
			var dataToDisplay = JSON.parse(itemsToSave);
		} else {dataToDisplay = {}}
	return dataToDisplay;
};
ListStorage.prototype.saveData = function (key, data) {
	return localStorage.setItem(key, JSON.stringify(data));
};
return ListStorage;
});