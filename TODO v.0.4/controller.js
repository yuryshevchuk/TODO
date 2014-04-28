require(["form", "hash", "storage", "todolist", "view"], function(InputForm, Hash, ListStorage, Todolist, View){
'use strict';
var storage, list, view, form, addItemLink, upperTags, smallTags, ul, body, resetFilter, pagination;
console.log("controller.js loaded");

(function (){

	ul = document.getElementById("list");
	upperTags = document.getElementById("tags");
	addItemLink = document.getElementById("addNewItemLink");
	body = document.getElementsByTagName("body").item(0);
	pagination = document.getElementById("paginationUl");

		storage = new ListStorage();
		list = new Todolist(storage);
		view = new View(ul, upperTags, pagination);
		form = new InputForm(body);
			addItemLink.addEventListener("click", addItemLinkHandler);
			ul.addEventListener("click", listEventHandler);
			ul.addEventListener("click", tagEventHandler);
			form.onSubmitHandler = submitFormHandler;
			upperTags.addEventListener("click", tagEventHandler);
			pagination.addEventListener("click", paginationEventHandler);
			view.renderUpperTags(list.getUpperTags());
			//Hash.applySavedVars(storage.getData("Vars"));
				setInterval(function hashHandler(){
					if (Hash.hashEventHanler()) {
						view.refreshItems(list.getData(Hash.getVars()), list.getNumberOfPages());
						//storage.saveData("Vars", Hash.getVars());
					};
				}, 5);
}());

function submitFormHandler (item) {
	(!item.index) ? list.addData(item) : list.saveData();
	view.renderUpperTags(list.getUpperTags());
	view.refreshItems(list.getData(Hash.getVars()), list.getNumberOfPages());
};
function addItemLinkHandler(event) {
	event = event || window.event;
	event.preventDefault();
			form.addNew();
};


function paginationEventHandler(event) {
	event = event || window.event;
	event.preventDefault();
	event.stopPropagation();
	var target = event.target || event.srcElement;
	if(target.dataset.value) {
		Hash.changePage(target.dataset.value);
	}
};

function tagEventHandler (event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
		if (target.dataset.value) {
			console.log()
			Hash.addFilter(target.dataset.value);
			view.renderUpperTags(list.getUpperTags(), target.dataset.value);
			Hash.changePage(1);
		}
		if (target.className == "reset-filter") {
			Hash.clear();
			view.clearTagsSelection();
			list.clearFilteredData();
			view.renderUpperTags(list.getUpperTags());
		}
	return false;
};

function listEventHandler (event){
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
	var i = target.dataset.index;
			if (target.tagName == "INPUT") {
				list.toogleItemStatus(i);
				view.refreshItems(list.getData(Hash.getVars()), list.getNumberOfPages());
			} else if (target.tagName == "A" && target.id =="cancelEditingItem"){
				list.deleteItem(i);
				view.refreshItems(list.getData(Hash.getVars()), list.getNumberOfPages());
				view.renderUpperTags(list.getUpperTags());
				Hash.changePage(list.getNumberOfPages());
			} else if (target.tagName == "A" && target.dataset.index){
				form.editItem(list.getItem(i));
		}
};
});