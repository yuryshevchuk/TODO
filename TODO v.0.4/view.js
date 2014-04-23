window.View = (function (){
'use strict';
var View = function (placeForData, placeForUpperTags, placeForPagination){
	var multipleSelect = [], selectedLink = {}, selectedTags = [], classTagSelected = [];
	this.refreshItems = function (data){
		var activeItems = '',
			doneItems = '';
				for (var key in data) {
					if (data[key].condition == "active"){
						activeItems += this.renderList(data[key], key, '');
					} else {
						doneItems += this.renderList(data[key], key, "checked='checked'");
					}
				}
		placeForData.innerHTML = activeItems + doneItems;
	};

	this.renderList = function (item, i, check){
		var tags = this.renderSmallTags(item);
		return "<li class='todo-item "+item.condition+"' data-index='"+i+"'><input "+check+" data-index='"+i+"' type='checkbox'><a href='' data-index='"+i+"'>"+item.content+"</a><a href='' id='cancelEditingItem' class='cross-button-link position-right' data-index='" + i + "'></a><br>"+tags+"</li>";
	};

	this.renderSmallTags = function (item) {
		var smallTagLinks = "";
			if (item.tags) {
				for (var i = 0; i < item.tags.length; i++) {
					smallTagLinks += "<a href='' class='tags-small' data-value='"+item.tags[i]+"'>#"+item.tags[i]+"</a>";
				}
			}
	return smallTagLinks;
	};

	this.renderUpperTags = function (tagScope, dataValue){
		var upperTagLinks = "<a href='' id='allTagsLink' class='reset-filter'>Show All</a>";
		classTagSelected = [];
		classTagSelected.length = 50;
		if (dataValue && selectedTags.indexOf(dataValue) == '-1') {
			selectedTags.push(dataValue);
		}
		console.log(selectedTags);
		for (var i = 0; i < tagScope.length; i++) {
			for (var j = 0; j < selectedTags.length; j++) {
				if (tagScope[i] == selectedTags[j]) {classTagSelected.splice(i, 0, 'selected')};
			};
			console.log(classTagSelected);
			upperTagLinks += "<a href='' class='upper-tags "+classTagSelected[i]+"' data-value='"+tagScope[i]+"'>"+tagScope[i]+"</a>";
		}
			placeForUpperTags.innerHTML = upperTagLinks;
	};
	this.clearTagsSelection = function () {
		selectedTags = []; 
		classTagSelected = [];
	};
	this.renderPagination = function (numbOfPages) {
		var pagination = '';
		for (var i = 0; i < numbOfPages; i++) {
			pagination += "<li><a href='' class='page' data-value='"+(i+1)+"'>"+(i+1)+"</a></li>";
		}
		placeForPagination.innerHTML = pagination;
	};
};
return View;
}());