var phoneEdit = require('widget/m-phone-edit/m-phone-edit');
var data = {};
$(function() {
	phoneEdit.init(); //初始化
	phoneEdit.getData(); //获取内容
	// phoneEdit.initModify(data) //初始化手机端编辑器内容
});