function View(placeForData){
	this.refreshItems = function (data){
	var activeItems = '',
		doneItems = '';
		console.log(data);
		for (var i = 0; i < data.length; i++) {
			if (data[i].condition == "active"){
				activeItems += this.generateList(data[i], i);
			} else {
				doneItems += this.generateList(data[i], i);
			};
		};
	
	placeForData.innerHTML = activeItems + doneItems;
	};
	this.generateList = function (item, i){
		return "<li class='todoItem "+ item.condition +"' data-index='" + i + "'>" + item.content + "<input class='deleteButton' type='button' value='del' data-index='" + i + "'></li>";
	};
}
