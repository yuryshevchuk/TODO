
var vars, oldHash = '', massive = [], hash = '';
window.location.hash = '#&page=1';
Hash = {
	get: function(){
		var hash, splitter, hashes;
			hashes = decodeURIComponent(window.location.hash.substr(1));
			splitter = '&';
			vars = {filter: [], page: []};
		if (hashes.length == 0) {
			return vars;
		} else {
			hashes = hashes.split(splitter);
		};
		console.log(hashes);
		for (var i in hashes) {
			hash = hashes[i].split('=');
			console.log(hash);
			if(hash[0] == "filter" && hash[1]) {
				vars[hash[0]].push(hash[1]);
			} else if (hash[0] == "page" && hash[1]){
				vars[hash[0]] = hash[1];
			}
		};
		console.log(vars);
		return vars;
	},
	set: function(values){
		console.log(values);
		for (var i in values) {
			if (values.hasOwnProperty(i)) {
				hash += '&' + i + '=' + values[i];
			}
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
		hash['page'] = val;
		this.set(hash);
	},
	hashEventHanler: function (){
			if(oldHash !== window.location.hash ){
					this.get();
						console.log('1');
					oldHash = window.location.hash;
					return true;
			} else {

				return false;
			};
	},
	getVars: function (){
		if (!vars.page) {
			delete vars.page;
		}
		if (!vars.filter) {
			delete vars.filter;
		}
		return vars;
	},
	clear: function (){
		hash = '';
		vars = {filter: [], page: [1]};
		massive = [];
		window.location.hash = '#&page=1';
	}
};

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