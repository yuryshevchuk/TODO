require(["form", "hash", "storage", "todolist", "view/view", "config", "filtration", "libs/jquery"], function(InputForm, Hash, ListStorage, Todolist, View, config, Filtration, jQuery){
'use strict';
var storage, list, view, form, hash, addItemLink, upperTags, smallTags, ul, body, resetFilter, pagination, filtration;
console.log("controller.js loaded");

(function (){

	ul = $("#list");
	upperTags = $("#tags");
	addItemLink = $("#addNewItemLink");
	body = $("body");
	pagination = $("#paginationUl");

		storage = new ListStorage();
		list = new Todolist(storage);
		view = new View(ul, upperTags, pagination);
		form = new InputForm(body);
		hash = new Hash();
		filtration = new Filtration(config["numberOfNotes"]);
			
			addItemLink.on("click", addItemLinkHandler);
			ul.on("click", listEventHandler);
			ul.on("click", tagEventHandler);
			form.onSubmitHandler = submitFormHandler;
			upperTags.on("click", tagEventHandler);
			pagination.on("click", paginationEventHandler);
		
				setInterval(function hashHandler(){
					if (hash.hashEventHandler()) {
						refresh();
					};
				}, 5);
})();

function refresh () {
	view.refreshItems(list.getData(filtration.filter(list.getData(), hash.getHashObject())), filtration.getNumberOfPages(), hash.getHashObject("page"));
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
			view.refreshItems(list.getData(filtration.filter(list.getData(), hash.getHashObject())), filtration.getNumberOfPages(), hash.getHashObject("page"));
		} else if (target.tagName == "A" && target.id =="cancelEditingItem"){
			list.deleteItem(i);
			refresh();
			hash.putVariable("page", filtration.getActivePage());
		} else if (target.tagName == "A" && target.dataset.index){
			form.editItem(list.getItem(i));
		}
};
});