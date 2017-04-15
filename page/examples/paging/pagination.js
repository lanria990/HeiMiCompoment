var $ = require('jquery');
var $page;
require('page');
require('minpage');

//ajax加载
function _postPage(n) {
	//....
	$page.selectPage(n, 20)
}

$(function() {
	$page = $('#J_Page').myPage({
		pno: 1,
		total: 20,
		clickFn: _postPage,
		isGoPage: false,
		isShowTotalPage: false,
		isShowMore: false
	});
	var $page2 = $('#J_Page2').myPage({
		pno: 1,
		total: 10,
		clickFn: function(n) {
			$page2.selectPage(n)
		},
		pageContClass: 'pagination-page pagination-none',
		gopageWrapId: 'kkpager_gopage_wrap2',
		gopageButtonId: 'kkpager_btn_go2',
		gopageTextboxId: 'kkpager_btn_go_input2'
	})

	var $page3 = $('#J_Page3').myPage({
		pno: 1,
		total: 10,
		clickFn: function(n) {
			$page3.selectPage(n)
		},
		pageContClass: 'pagination-page pagination-page-min',
		gopageWrapId: 'kkpager_gopage_wrap3',
		gopageButtonId: 'kkpager_btn_go3',
		gopageTextboxId: 'kkpager_btn_go_input3'
	})

	var $page4 = $('#J_Page4').myPage({
		pno: 1,
		total: 10,
		mode: 'link',
		linkFn: function(n) {
			var hrefFormer = 'http://www.bossonz.com/?';
			var hrefLatter = 'query=搜索内容page=' + n;
			return hrefFormer + hrefLatter + '" target="_blank"'
				//那么首页（第1页）就是http://www.xx.com/news/20131212.html
				//第2页就是http://www.xx.com/news/20131212_2.html
				//第n页就是http://www.xx.com/news/20131212_n.html
				// hrefFormer
		},
		gopageWrapId: 'kkpager_gopage_wrap4',
		gopageButtonId: 'kkpager_btn_go5',
		gopageTextboxId: 'kkpager_btn_go_input5'
	})
	var $page5 = $('#J_Page5').myMinPage({
		pno: 1,
		total: 10,
		clickFn: function(n) {
			$page5.selectPage(n)
		}
	});
	var $page6 = $('#J_Page6').myMinPage({
		pno: 1,
		total: 10,
		isGoPage:false,
		clickFn: function(n) {
			$page6.selectPage(n)
		}
	});
	
});