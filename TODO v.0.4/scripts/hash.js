define(function (){
'use strict';
console.log("hash.js loaded");

var Hash = function(){
	var hashObject = {filter: [], page: []}, oldHash = '';
	if (!window.location.hash) {
		window.location.hash = '#page=1';
	}
	this.get = function(){
		var hash, hashes, arr;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			hashObject = {filter: [], page: []};
				if (hashes.length == 0) {
					return hashObject;
				} else {
					hashes = hashes.split('&');
				}
					for (var i in hashes) {
						hash = hashes[i].split('=');
						arr = hash[1].split(',');
							for (var i = 0; i < arr.length; i++) {
								hashObject[hash[0]].push(arr[i]);
							}
					}
		return hashObject;
	};
	this.set = function(){
		// var hash = '';
		// console.log(hashObject);
		// for (var key in hashObject) {
		// 	if (Array.isArray(hashObject[key]) && hashObject[key].length) {
		// 		hash += key + "=" + hashObject[key].join(',');
		// 	} else {
		// 		hash += "&" + key + "=" + hashObject[key];
		// 	}
		// }
		// window.location.hash = hash;
		var hash = '', filters;
		hash += 'page=' + hashObject['page'];
		filters = hashObject["filter"].join(',');
			if (filters){
				hash += '&filter=' + filters;
			}
		window.location.hash = hash;
	};
	this.addUniqueItemToArray = function(name, val){
		if (hashObject[name].indexOf(val) == '-1') {
			hashObject[name].push(val);
		} else {
			for (var i = 0; i < hashObject[name].length; i++) {
				if (hashObject[name][i] == val) {
					hashObject[name].splice(i, 1);
				}
			}
		}
		this.set();
	};
	this.putVariable = function(name, val) {
		hashObject[name] = val;
		this.set();
	};
	this.hashEventHandler = function (){
		if(oldHash !== window.location.hash ){
			this.get();
			oldHash = window.location.hash;
			return true;
		} else {
			return false;
		}
	};
	this.getHashObject = function (name){
		if (name) {
			return hashObject[name];
		} else {
			return hashObject;
		}
		
	};
};
Hash.prototype.clear = function (){
		window.location.hash = '#page=1';
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