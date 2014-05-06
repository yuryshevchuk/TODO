define(["libs/mustache", "view/templates/formStaticTemplate", "view/templates/formDynamicTemplate"], function (Mustache, formStaticTemplate, formDynamicTemplate){
'use strict';
console.log("form.js loaded");
var InputForm = function (formPlace) {
	var self = this;
	var formElement, overlay, popup, cancelEditingItem, taskFormWrapper, cancelFormButton, formInputs, tagsArr;
	var renderFormObj = {
		'itemContent': '',
		'itemTags': '',
		'checked': '',
		'formTitle': ''
	};
		tagsArr = [];
		taskFormWrapper = document.createElement('div');
		formInputs = document.createElement('div');
		taskFormWrapper.setAttribute('id', 'formWrapper');
		taskFormWrapper.innerHTML = formStaticTemplate;
		formPlace.appendChild(taskFormWrapper);
		overlay = document.getElementById('overlay');
		popup = document.getElementById('popup');
		cancelEditingItem = document.getElementById("cancelEditingItem");
		formElement = document.getElementById("taskForm");
		cancelFormButton = document.getElementById("cancelFormButton");
		formElement.insertBefore(formInputs, formElement.firstChild);
		cancelEditingItem.addEventListener("click", function(event) {
			event = event || window.event;
			event.preventDefault();
			overlay.setAttribute('class', 'hidden');
		});
		cancelFormButton.addEventListener("click", function() {
			overlay.setAttribute('class', 'hidden');
		});
		overlay.addEventListener("click", function(event) {
			event = event || window.event;
			event.preventDefault();
			overlay.setAttribute('class', 'hidden');
		});
	this.show = function () {
		overlay.setAttribute('class', 'visible');
	};
	this.hide = function () {
		overlay.setAttribute('class', 'hidden');
	};
	this.onSubmitHandler = function () {
	};
	this.onCancelHandler = function () {
	};
	this.renderForm = function (item) {
		renderFormObj['itemContent'] = (item.content) ? item.content : '';
		(item.content) ? (renderFormObj['formTitle'] = 'EDIT YOUR TASK') : (renderFormObj['formTitle'] = 'ADD NEW TASK');
		renderFormObj['itemTags'] = (item.tags) ? item.tags.join(', ') : '';
		(item.condition == 'done') ? (renderFormObj['checked'] = 'checked') : (renderFormObj['checked'] = '')
		formInputs.innerHTML = Mustache.render(formDynamicTemplate, renderFormObj);
	};
	formElement.onsubmit = function (event) {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();
		self.submitHandler();
	};
};

InputForm.prototype.addNew = function () {
		this.editItem();
};
InputForm.prototype.editItem = function(item) {
		this.item = item || {};
		this.renderForm(this.item);
		this.show();
};
InputForm.prototype.saveItemEdit = function (){
		this.item.content = document.getElementById('newTask').value;
		(document.getElementById('condition').checked) ? (this.item.condition = 'done') : (this.item.condition = 'active');
		this.item.tags = document.getElementById('newTag').value.split(', ');
		return this.item
};
InputForm.prototype.submitHandler = function() {
		this.onSubmitHandler(this.saveItemEdit());
		this.hide();
		return false;
};
return InputForm;
});