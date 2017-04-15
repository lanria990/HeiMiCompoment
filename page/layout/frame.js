var $ = require('jquery'); /*jquery引用*/

/*滚动事件*/

function fixScroll() {
	$(window).scroll(function() {
		if ($(document).scrollTop() > 141) {
			$('.sidebar').addClass('fixle');
		} else {
			$('.sidebar').removeClass('fixle');
		}
	});
}



$(function() {
	fixScroll();
});