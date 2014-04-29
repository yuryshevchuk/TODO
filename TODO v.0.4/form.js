define(["mustache", "templates/formStaticTemplate", "templates/formDynamicTemplate"], function (Mustache, formStaticTemplate, formDynamicTemplate){
'use strict';
console.log("form.js loaded");
var InputForm = function (formPlace) {
	var self = this;
	var formElement, overlay, popup, newTask, newTag, condition, cancelEditingItem, taskFormWrapper, cancelFormButton, formInputs, tagsArr;
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
		


		formInputs.innerHTML = Mustache.render(formDynamicTemplate, renderFormObj);
		formElement.insertBefore(formInputs, formElement.firstChild);
		newTask = document.getElementById('newTask');
		newTag = document.getElementById('newTag');
		condition = document.getElementById('condition');

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
	this.addNew = function () {
		this.editItem();
	};
	this.editItem = function(item) {
		console.log(item);
		this.item = item || {};
		this.renderForm(this.item);
		this.show();
	}
	this.renderForm = function (item) {
		console.log(item);
				renderFormObj['itemContent'] = (item.content) ? item.content : '';
				(item.content) ? (renderFormObj['formTitle'] = 'EDIT YOUR TASK') : (renderFormObj['formTitle'] = 'ADD NEW TASK');
				renderFormObj['itemTags'] = (item.tags) ? item.tags.join(', ') : '';
				(item.condition == 'done') ? (renderFormObj['checked'] = 'checked') : (renderFormObj['checked'] = '')
				formInputs.innerHTML = Mustache.render(formDynamicTemplate, renderFormObj);
	};
	this.saveItemEdit = function (){
		newTask = document.getElementById('newTask');
		newTag = document.getElementById('newTag');
		condition = document.getElementById('condition');
		this.item.content = newTask.value;
		(condition.checked) ? (this.item.condition = 'done') : (this.item.condition = 'active');
		this.item.tags = newTag.value.split(', ');
		this.item.index = 'edited';
		this.hide();
		console.log(this.item);
		return this.item
	};
	formElement.onsubmit = function (event) {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();
		self.submitHandler();
	};
};

InputForm.prototype.submitHandler = function() {
		this.onSubmitHandler(this.saveItemEdit());
		return false;
};

InputForm.prototype.cancelHandler = function (event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	self.onCancel(item);
};
return InputForm;
});