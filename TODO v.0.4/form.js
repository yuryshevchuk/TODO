define(function (){
'use strict';
console.log("form.js loaded");
var InputForm = function (formPlace) {
	var self = this;
	var formElement, overlay, popup, newTask, newTag, condition, cancelEditingItem, newDiv, cancelFormButton, tagsArr;
		newDiv = document.createElement('div');
		newDiv.setAttribute('id', 'formWrapper');
		newDiv.innerHTML = "<a href='' id='overlay' class='hidden'></a><div id='popup'><div id='popupContent'><a href=''id='cancelEditingItem' class='cross-button-link position-right'></a><form id='taskForm' autocomplete='off'><h4>Add new task:</h4><input id='newTask' type='text' required><label for='newTag'>Tags:</label><input id='newTag' name='newTag' type='text'><input id='condition' type='checkbox'><label for='condition'>Done</label><input id='confirmFormButton' class='form-button position-right' type='submit' value='Confirm'></input><input type='button' id='cancelFormButton' class='red form-button position-right' value='Cancel'></input></form></div></div>";
		formPlace.appendChild(newDiv);
			overlay = document.getElementById('overlay');
			popup = document.getElementById('popup');
			newTask = document.getElementById('newTask');
			newTag = document.getElementById('newTag');
			condition = document.getElementById('condition');
			overlay = document.getElementById('overlay');
			cancelEditingItem = document.getElementById("cancelEditingItem");
			formElement = document.getElementById("taskForm");
			cancelFormButton = document.getElementById("cancelFormButton");
		tagsArr = [];
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
		this.item = item || {};
		this.renderForm(this.item);
		this.show();
	}
	this.renderForm = function (item) {
				newTask.value = (item.content) ? item.content : '';
				newTag.value = (item.tags) ? item.tags.join(', ') : '';
				condition.checked = (item.condition == 'done');
	};
	this.saveItemEdit = function (){
		this.item.content = newTask.value;
		(condition.checked) ? (this.item.condition = 'done') : (this.item.condition = 'active');
		this.item.tags = newTag.value.split(', ');
		this.hide();
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