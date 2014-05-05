require(["form", "hash", "storage", "todolist", "view"], function(InputForm, Hash, ListStorage, Todolist, View){
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
		list = new Todolist(storage, 6);
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
					if (hash.hashEventHanler()) {
						view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages());
						view.renderUpperTags(list.getUpperTags(), hash.get());
						storage.saveData("Hash", window.location.hash);
						pages = document.querySelectorAll('.page');
						if (pages.length) {
							pages[hash.getActivePage()-1].setAttribute('class', 'activePage');
						}
					};
				}, 5);
			window.location.hash = storage.getData("Hash");
			view.renderUpperTags(list.getUpperTags(), hash.get());
}());

function submitFormHandler (item) {
	(!item.index) ? list.addData(item) : list.editData(item, form.getUneditedContent());
	view.renderUpperTags(list.getUpperTags(), hash.get());
	view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages());
	pages = document.querySelectorAll('.page');
	if (pages.length) {
		pages[hash.getActivePage()-1].setAttribute('class', 'activePage');
	}
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
			hash.changePage(target.dataset.value);
		}
};

function tagEventHandler (event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
		if (target.dataset.value) {
			hash.addFilter(target.dataset.value);
			hash.changePage(1);
		}
		if (target.className == "reset-filter") {
			hash.clear();
			view.clearTagsSelection();
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
			view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages());
		} else if (target.tagName == "A" && target.id =="cancelEditingItem"){
			list.deleteItem(i);
			view.refreshItems(list.getData(hash.getHashObject()), list.getNumberOfPages());
			view.renderUpperTags(list.getUpperTags(), hash.get());
			hash.changePage(hash.getActivePage());
		} else if (target.tagName == "A" && target.dataset.index){
			form.editItem(list.getItem(i));
		}
	pages = document.querySelectorAll('.page');
	if (pages.length) {
		pages[hash.getActivePage()-1].setAttribute('class', 'activePage');
	}
};
});