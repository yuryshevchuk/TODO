define(function (){
'use strict';
console.log("hash.js loaded");
var vars={page: 1}, oldHash = '', massive = [], filters = [], Hash;
	if (!window.location.hash) {
		window.location.hash = '#&page=1';
	}
var Hash = function(){
	this.setStoragedFilters = function (storaged) {
		if (storaged) {
			filters = storaged;
		}
	},
	this.get = function(){
		var hash, hashes, stroke;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			vars = {filter: [], page: []};
			if (hashes.length == 0) {
				return vars;
			} else {
				hashes = hashes.split('&');
			}
		for (var i in hashes) {
			hash = hashes[i].split('=');
				if(hash[0] == "filter" && hash[1]) {
					stroke = hash[1].split(',');
					for (var i = 0; i < stroke.length; i++) {
						vars[hash[0]].push(stroke[i]);
					};
				} else if (hash[0] == "page" && hash[1]){
					vars[hash[0]] = hash[1];
				}
		}

		return vars;
	},
	this.applySavedVars = function(value){
		if (value) {
			vars = value;
		} 
	},
	this.set = function(values){
		var hash = '';
		console.log(values);
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
	},
	this.addFilter = function(val){
		var hash = this.get() || {};
		hash['filter'] = val;
		this.set(hash);
	},
	this.changePage = function(val) {
		var hash = this.get() || {};
		hash.filter = '';
		hash['page'] = val;
		this.set(hash);
	},
	this.hashEventHanler = function (){
		if(oldHash !== window.location.hash ){
			this.get();
			oldHash = window.location.hash;
			return true;
		} else {
			return false;
		}
	},
	this.getFilters = function () {
		return filters;
	},
	this.getVars = function (){
		return vars;
	},
	this.clear = function (){
		vars = {filter: [], page: [1]};
		massive = [];
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