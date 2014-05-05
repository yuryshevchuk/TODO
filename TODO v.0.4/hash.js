define(function (){
'use strict';
console.log("hash.js loaded");
var hashObject={}, oldHash = '', filters = [], Hash;
	if (!window.location.hash) {
		window.location.hash = '#&page=1';
	}
var Hash = function(){
	this.get = function(){
		var hash, hashes, filter;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			hashObject = {filter: [], page: []};
			if (hashes.length == 0) {
				return hashObject;
			} else {
				hashes = hashes.split('&');
			}
		for (var i in hashes) {
			hash = hashes[i].split('=');
				if(hash[0] == "filter" && hash[1]) {
					filter = hash[1].split(',');
					for (var i = 0; i < filter.length; i++) {
						hashObject[hash[0]].push(filter[i]);
					};
				} else if (hash[0] == "page" && hash[1]){
					hashObject[hash[0]] = hash[1];
				}
		}
		filters = hashObject.filter;
		return hashObject;
	};
	this.set = function(values){
		var hash = '';
		if (values.page) {
			hash += '&page=' + values.page;
		}
		if (values.filter && filters.indexOf(values.filter) == '-1') {
			filters.push(values.filter);
		} else {
			for (var i = 0; i < filters.length; i++) {
				if (filters[i] == values.filter) {
					filters.splice(i, 1);
				}
			}
		}
		if (filters.join(',')){
			hash += '&filter=' + filters.join(',');
		}
		window.location.hash = hash;
	};
	this.addFilter = function(val){
		var hash = this.get() || {};
		hash['filter'] = val;
		this.set(hash);
	};
	this.changePage = function(val) {
		var hash = this.get() || {};
		hash.filter = '';
		hash['page'] = val;
		this.set(hash);
	};
	this.getActivePage = function () {
		return hashObject.page;
	};
	this.hashEventHanler = function (){
		if(oldHash !== window.location.hash ){
			this.get();
			oldHash = window.location.hash;
			return true;
		} else {
			return false;
		}
	};
	this.getHashObject = function (){
		return hashObject;
	};
	this.clear = function (){
		hashObject = {filter: [], page: []};
		filters = [];
		window.location.hash = '#&page=1';
	}
};
return Hash;
});

/*for (var i in hashes) {
			if (hashes.hasOwnProperty(i)) {
				hash = hashes[i].split('=');
				console.log(hash);
				if (hash!=undefined){
					massive.push(hash[1]);
					vars[hash[0]] = massive;
				};
			};
		};*/