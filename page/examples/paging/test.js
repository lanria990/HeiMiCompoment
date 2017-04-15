var $ = require('jquery');
var $page;
require('page');

//此处放ajax加载
function _postPage(n) {
	//....
	$page.selectPage(n, 20)
}

$(function() {
	//此处放初始化方法  
	$page = $('#J_Page').myPage({
		pno: 1,
		total: 20,
		clickFn: _postPage,
		isGoPage: false,
		isShowTotalPage: false,
		isShowMore: false
	});
});