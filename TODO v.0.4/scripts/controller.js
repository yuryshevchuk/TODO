require(["form", "hash", "storage", "todolist", "view/view", "config"], function(InputForm, Hash, ListStorage, Todolist, View, config){
'use strict';
var storage, list, view, form, hash, addItemLink, upperTags, smallTags, ul, body, resetFilter, pagination, pages;
console.log("controller.js loaded");

(function (){

	ul = document.getElementById("list");
	upperTags = document.getElementById("tags");
	addItemLink = document.getElementById("addNewItemLink");
	body = document.getElementsByTagName("body").item(0);
	pagination = document.getElementById("paginationUl");

		storage = new ListStorage();
		list = new Todolist(storage, config["numberOfNotes"]);
		view = new View(ul, upperTags, pagination);
		form = new InputForm(body);
		hash = new Hash();
			
			addItemLink.addEventListener("click", addItemLinkHandler);
			ul.addEventListener("click", listEventHandler);
			ul.addEventListener("click", tagEventHandler);
			form.onSubmitHandler = submitFormHandler;
			upperTags.addEventListener("click", tagEventHandler);
			pagination.addEventListener("click", paginationEventHandler);
		
				setInterval(function hashHandler(){
					if (hash.hashEventHandler()) {
						refresh();
					};
				}, 5);
}());

function refresh () {
	view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages(), hash.getHashObject("page"));
	view.renderUpperTags(list.getUpperTags(), hash.get());
}
function submitFormHandler (item) {
	(!item.index) ? list.addData(item) : list.saveData();
	refresh();
};
function addItemLinkHandler(event) {
	event = event || window.event;
	event.preventDefault();
		form.addNew();
};


function paginationEventHandler(event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
		if(target.dataset.value) {
			hash.putVariable("page", target.dataset.value);
		}
};

function tagEventHandler (event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
		if (target.dataset.value) {
			hash.addUniqueItemToArray("filter", target.dataset.value);
			hash.putVariable("page", 1);
		}
		if (target.className == "reset-filter") {
			hash.clear();
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
			view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages(), hash.getHashObject("page"));
		} else if (target.tagName == "A" && target.id =="cancelEditingItem"){
			list.deleteItem(i);
			refresh();
				if (list.getNumberOfPages() == (hash.getHashObject("page") - 1)) {
					hash.putVariable("page", list.getNumberOfPages());
				} else {
					hash.putVariable("page", hash.getHashObject("page"));
				}
		} else if (target.tagName == "A" && target.dataset.index){
			form.editItem(list.getItem(i));
		}
};
});