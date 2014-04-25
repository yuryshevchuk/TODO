


define('ListStorage',['domReady!'], function (){

'use strict';
console.log("storage loaded");
var ListStorage = function() {
	var localStorage = window['localStorage'],
		savedItems = localStorage.getItem("Items");
};

ListStorage.prototype.getData = function () {
	var itemsToSave = localStorage.getItem("Items");
		if (itemsToSave) {
			var dataToDisplay = JSON.parse(itemsToSave);
		} else {dataToDisplay = {}}
	return dataToDisplay;
};

ListStorage.prototype.saveData = function (data) {
	return localStorage.setItem("Items", JSON.stringify(data));
};

return ListStorage;

});