window.Hash = (function (){
'use strict';
var vars={page: 1}, oldHash = '', massive = [], filters = [], Hash;
window.location.hash = '#&page=1';
Hash = {
	get: function(){
		var hash, splitter, hashes, stroke;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			splitter = '&';
			vars = {filter: [], page: []};
			if (hashes.length == 0) {
				return vars;
			} else {
				hashes = hashes.split(splitter);
			}
		console.log(hashes);
		for (var i in hashes) {
			hash = hashes[i].split('=');
			console.log(hash);
				if(hash[0] == "filter" && hash[1]) {
					stroke = hash[1].split(',');
					for (var i = 0; i < stroke.length; i++) {
						vars[hash[0]].push(stroke[i]);
					};
				} else if (hash[0] == "page" && hash[1]){
					vars[hash[0]] = hash[1];
				}
		}
		console.log(vars);
		return vars;
	},
	set: function(values){
		console.log(values);
		var hash = '';
		if (values.page) {
			hash += '&page=' + values.page;
		}
		if (values.filter && filters.indexOf(values.filter) == '-1') {
			filters.push(values.filter);
		}
		if (filters.join(',')){
			hash += '&filter=' + filters.join(',');
		}
		window.location.hash = hash;
	},
	addFilter: function(val){
		var hash = this.get() || {};
		hash['filter'] = val;
		this.set(hash);
	},
	changePage: function(val) {
		var hash = this.get() || {};
		hash.filter = '';
		hash['page'] = val;
		this.set(hash);
	},
	hashEventHanler: function (){
		if(oldHash !== window.location.hash ){
			this.get();
			oldHash = window.location.hash;
			return true;
		} else {
			return false;
		}
	},
	getVars: function (){
		return vars;
	},
	clear: function (){
		vars = {filter: [], page: [1]};
		massive = [];
		filters = [];
		window.location.hash = '#&page=1';
	}
};
return Hash;
}());

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