
var storage, list, view, form, addItemLink, cancelEditingItem, upperTags, smallTags, ul, body, resetFilter;

window.onload = function (){
	ul = document.getElementById("list");
	upperTags = document.getElementById("tags");
	addItemLink = document.getElementById("addNewItemLink");
	body = document.getElementsByTagName("body").item(0);
	pagination = document.getElementById("paginationUl");
		storage = new ListStorage();
		list = new Todolist(storage);
		view = new View(ul, upperTags, pagination);
		form = new Form(body);
			addItemLink.addEventListener("click", addItemLinkHandler);
			ul.addEventListener("click", listEventHandler);
			form.onSubmitHandler = submitFormHandler;
			upperTags.addEventListener("click", tagEventHandler);
			pagination = ("click", paginationEventHandler);
		view.renderUpperTags(list.getUpperTags());
		view.refreshItems(list.getData());
		view.renderPagination(list.getNumberOfPages());
				setInterval(function hashHandler(){
					if (Hash.hashEventHanler()) {
						view.refreshItems(list.getData(Hash.getVars()));
						resetFilter = document.getElementById('allTagsLink');
						resetFilter.addEventListener("click", resetFilterEvent);
					};
						smallTags = document.getElementsByClassName('tags-small');
							for (var i = 0; i < smallTags.length; i++) {
								smallTags[i].addEventListener("click", tagEventHandler);
							};
				}, 10);
		
};

function submitFormHandler (item) {
	(!item.index) ? list.addData(item) : list.saveData();
	view.renderUpperTags(list.getUpperTags());
	view.refreshItems(list.getData());
	view.renderPagination(list.getNumberOfPages());
}
function addItemLinkHandler(event) {
	event = event || window.event;
	event.preventDefault();
			form.addNew();
};
function resetFilterEvent() {
	Hash.clear();
	view.refreshItems(list.getData());
};

function paginationEventHandler(event) {
	event = event || window.event;
	event.preventDefault();
	event.stopPropagation();
	var target = event.target || event.srcElement;
	target.setAttribute("class", "activePage");
	console.log(target.dataset.value);
		Hash.changePage(target.dataset.value);
};

function tagEventHandler (event) {
	event = event || window.event;
	event.preventDefault();
	var target = event.target || event.srcElement;
		if (target.dataset.value) {
			Hash.addFilter(target.dataset.value);
			view.renderUpperTags(list.getUpperTags());
		};

	return false;
};

function listEventHandler (event){
	event = event || window.event;
	var target = event.target || event.srcElement;
	var i = target.dataset.index;
			if (target.tagName == "INPUT") {
				list.toogleItemStatus(i);
				view.refreshItems(list.getData());
			} else if (target.tagName == "A" && target.id =="cancelEditingItem"){
				list.deleteItem(i);
				view.renderUpperTags(list.getUpperTags());
				view.refreshItems(list.getData());
				view.renderPagination(list.getNumberOfPages());
			} else if (target.tagName == "A" && target.dataset.index){
				form.editItem(list.getItem(i));
		}
};