function Todolist (storage) {
	var data = [];
	this.getData = function () {
		if (!data.length){
			data = this.loadData();
		}
		return data;
	};
	this.loadData = function () {
		return storage.getData();
	};
	this.saveData = function (data) {
		return storage.saveData(data);
	}
	this.addData = function (itemValue) {
		if (itemValue){
			var item = {content: itemValue, condition: 'active'}
				data.push(item);
				return this.saveData(data);
		};
		return false;
	};
	this.doneItem = function (i){
		(data[i].condition == "active") ? data[i].condition = "done" : data[i].condition = "active";
		return this.saveData(data);
	};
	this.deleteItem = function (i) {
		data.splice(i, 1);
		return this.saveData(data);
	};
};
