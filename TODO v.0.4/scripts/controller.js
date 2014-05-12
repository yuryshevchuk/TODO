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
	ul.on("click", ".list-item", listEventHandler);
	ul.on("click", ".cross-button-link", deleteHandler);
	ul.on("click", ".tags-small", tagEventHandler);
	ul.on("click", ".checkbox", toogleHandler);
	$("#allTags").on("click", filterClearHandler);
	form.onSubmitHandler = submitFormHandler;
	upperTags.on("click", ".upper-tags", tagEventHandler);
	pagination.on("click", ".page", paginationEventHandler);

		setInterval(function hashHandler(){
			if (hash.hashEventHandler()) {
				refresh();
			};
		}, 5);
})();

function refresh () {
	view.refreshItems(list.getData(filtration.filter(list.getData(), hash.getHashObject())), filtration.getNumberOfPages(), hash.getHashObject("page"));
	view.renderUpperTags(list.getUpperTags(), hash.get());
};

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
	hash.putVariable("page", $(this).data('value'));
};

function tagEventHandler (event) {
	event = event || window.event;
	event.preventDefault();
	hash.addUniqueItemToArray("filter", $(this).data('value'));
	hash.putVariable("page", 1);
	return false;
};

function filterClearHandler (event) {
	event = event || window.event;
	event.preventDefault();
	event.stopPropagation();
	hash.clear();
};

function listEventHandler (event){
	event = event || window.event;
	event.preventDefault();
	form.editItem(list.getItem($(this).data('index')));
};

function deleteHandler (event){
	event = event || window.event;
	event.preventDefault();
	list.deleteItem($(this).data('index'));
	refresh();
	hash.putVariable("page", filtration.getActivePage());
};

function toogleHandler (){
	list.toogleItemStatus($(this).data('index'));
	view.refreshItems(list.getData(filtration.filter(list.getData(), hash.getHashObject())), filtration.getNumberOfPages(), hash.getHashObject("page"));
};

});