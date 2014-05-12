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
		formInputs = $('<div>');

		formPlace.append($("<div id='formWrapper'>").html(formStaticTemplate));
		overlay = $('#overlay');
		cancelEditingItem = $("#cancelEditingItem");
		formElement = $("#taskForm");
		cancelFormButton = $("#cancelFormButton");
		formInputs.insertBefore(formElement.children().first());
		cancelEditingItem.on("click", function(event) {
			event = event || window.event;
			event.preventDefault();
			overlay.addClass('hidden').removeClass('visible');
		});
		cancelFormButton.on("click", function() {
			overlay.addClass('hidden').removeClass('visible');
		});
		overlay.on("click", function(event) {
			event = event || window.event;
			event.preventDefault();
			overlay.addClass('hidden').removeClass('visible');
		});
	this.show = function () {
		overlay.addClass('visible').removeClass('hidden');
	};
	this.hide = function () {
		overlay.addClass('hidden').removeClass('visible');
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
		formInputs.html(Mustache.render(formDynamicTemplate, renderFormObj));
	};
	formElement.submit(function (event) {
		event = event || window.event;
		event.preventDefault();
		event.stopPropagation();
		self.submitHandler();
	});
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
		this.item.content = $('#newTask').val();
		($('#condition:checked').length) ? (this.item.condition = 'done') : (this.item.condition = 'active');
		this.item.tags = $('#newTag').val().split(', ');
		console.log(this.item)
		return this.item
};
InputForm.prototype.submitHandler = function() {
		this.onSubmitHandler(this.saveItemEdit());
		this.hide();
		return false;
};
return InputForm;
});