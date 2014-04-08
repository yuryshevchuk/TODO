var storage, list, view;

window.onload = function (){
	ul = document.getElementById("list");
	storage = new ListStorage();
	list = new Todolist(storage);
	view = new View(ul);
	ul.addEventListener("click", handler);
	inputData = document.getElementById("new-task");
	document.getElementById("add-new-task").onsubmit = addItem;
	view.refreshItems(list.getData());

};

function handler (event){
	event = event || window.event;
	var target = event.target || event.srcElement;
		console.log(target);
	var i = target.dataset.index;
	console.log(list);
		if (target.tagName == "LI") {
			list.doneItem(i);
		} else if (target.nodeName == "INPUT"){
			list.deleteItem(i);
		};
	view.refreshItems(list.getData());
};
function addItem() {
	list.addData(inputData.value);
	inputData.value = '';
	view.refreshItems(list.getData());
	return false;

}
