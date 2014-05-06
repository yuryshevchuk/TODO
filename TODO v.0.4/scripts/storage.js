define(function (){
'use strict';
console.log("storage.js loaded");
var ListStorage = function() {
	var localStorage = window['localStorage'];
};
ListStorage.prototype.getData = function (key) {
	var storaged = localStorage.getItem(key);
		if (storaged) {
			var dataToDisplay = JSON.parse(storaged);
		} else {dataToDisplay = {}}
	return dataToDisplay;
};
ListStorage.prototype.saveData = function (key, data) {
	return localStorage.setItem(key, JSON.stringify(data));
};
return ListStorage;
});