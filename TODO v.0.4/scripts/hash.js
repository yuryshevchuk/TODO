define(function (){
'use strict';
console.log("hash.js loaded");

var Hash = function(){
	if (!window.location.hash) {
		this.clear();
	}
	this.hashObject = {
		filter: [],
		page: []
	};
	this.oldHash = '';
};
Hash.prototype.get = function(){
		var hash, hashes, arr;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			this.hashObject = {filter: [], page: []};
				if (hashes.length == 0) {
					return this.hashObject;
				} else {
					hashes = hashes.split('&');
				}
					for (var i in hashes) {
						hash = hashes[i].split('=');
						arr = hash[1].split(',');
							for (var i = 0; i < arr.length; i++) {
								this.hashObject[hash[0]].push(arr[i]);
							}
					}
		return this.hashObject;
	};
Hash.prototype.set = function(){
		var hashParts = [];
		for (var key in this.hashObject) {
			if (Array.isArray(this.hashObject[key]) && this.hashObject[key].length) {
				hashParts.push(key + "=" + this.hashObject[key].join(','));
			} else {
				hashParts.push(key + "=" + this.hashObject[key]);
			}
		}
		window.location.hash = hashParts.join("&");
	};
Hash.prototype.addUniqueItemToArray = function(name, val){
		if (this.hashObject[name].indexOf(val) == '-1') {
			this.hashObject[name].push(val);
		} else {
			for (var i = 0; i < this.hashObject[name].length; i++) {
				if (this.hashObject[name][i] == val) {
					this.hashObject[name].splice(i, 1);
				}
			}
		}
		this.set();
	};
Hash.prototype.putVariable = function(name, val) {
		this.hashObject[name] = val;
		this.set();
	};
Hash.prototype.hashEventHandler = function (){
		if(this.oldHash !== window.location.hash ){
			this.get();
			this.oldHash = window.location.hash;
			return true;
		} else {
			return false;
		}
	};
Hash.prototype.getHashObject = function (name){
		if (name) {
			return this.hashObject[name];
		} else {
			return this.hashObject;
		}
	};
Hash.prototype.clear = function (){
		window.location.hash = '#page=1';
};
return Hash;
});
