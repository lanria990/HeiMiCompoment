/*
@author Yang
@version 1.0
@param 左边列表值 类型：数组         listOne:[1,2,3,4,5,6],
@warn 注意事项，使用拖拽排序时出现滚动条容易出现bug
@return 
		获取总页数:getTotal,
		获取当前页：getNowPage,
		重构分页函数:selectPage
、、、、javascript、、、
$('body').myPager();


、、、、 、、、、
*/
;
(function(factory) {
	if (typeof module != 'undefined' && module.exports && this.module !== module) {
		var $ = require('jquery');
		factory($, window, document);
	} else if (typeof define === 'function' && define.amd) {
		define(function(require) {
			var $ = require('jquery');
			factory($, window, document);
		})
	} else {
		factory();
	}
})(function($, window, document, undefined) {
	//定义Beautifier的构造函数
	var Beautifier = function(ele, opt) {
			this.$element = ele;
			this.defaults = {
				// appendID: 'body', //填充对象
				pno: 1, //当前页码
				total: 1, //总页码
				totalRecords: 0, //总数据条数
				mode: 'click', //模式(link 或者 click)
				isShowFirstPageBtn: true, //是否显示首页按钮
				isShowLastPageBtn: true, //是否显示尾页按钮
				isShowPrePageBtn: true, //是否显示上一页按钮
				isShowNextPageBtn: true, //是否显示下一页按钮
				isShowTotalPage: true, //是否显示总页数
				isShowTotalRecords: false, //是否显示总记录数
				isShowMore: true,
				isGoPage: true, //是否显示页码跳转输入框
				hrefFormer: '', //链接前部
				hrefLatter: '', //链接尾部
				pageContClass: 'pagination-page',
				gopageWrapId: 'kkpager_gopage_wrap',
				gopageButtonId: 'kkpager_btn_go',
				gopageTextboxId: 'kkpager_btn_go_input',
				lang: {
					firstPageText: '&#xe6e5;',
					firstPageTipText: '首页',
					lastPageText: '&#xe6e6;',
					lastPageTipText: '尾页',
					prePageText: '&#xe6e8;',
					prePageTipText: '上一页',
					nextPageText: '&#xe6e7;',
					nextPageTipText: '下一页',
					totalPageBeforeText: '共',
					totalPageAfterText: '页',
					gopageBeforeText: '到第',
					gopageButtonOkText: 'go',
					gopageAfterText: '页',
					buttonTipBeforeText: '第',
					buttonTipAfterText: '页'
				},
				clickFn: function(n) {},
				linkFn: function(n) {

					if (n == 1) {
						return this.hrefFormer + this.hrefLatter;
					}
					return this.hrefFormer + '_' + n + this.hrefLatter;

				}
			}

			this.options = $.extend({}, this.defaults, opt);

		}
		//定义Beautifier的方法
	Beautifier.prototype = {
		_getTotal: function() {
			return this.options.total;
		},
		_getNowPage: function() {
			return this.pno;
		},
		_getLink: function(n) {
			//这里的算法适用于比如：
			//hrefFormer=http://www.xx.com/news/20131212
			//hrefLatter=.html
			//那么首页（第1页）就是http://www.xx.com/news/20131212.html
			//第2页就是http://www.xx.com/news/20131212_2.html
			//第n页就是http://www.xx.com/news/20131212_n.html
			return this.options.linkFn(n)
				//if(n == 1){
				//				return this.options.hrefFormer + this.options.hrefLatter;
				//			}
				//			return this.options.hrefFormer + '_' + n + this.options.hrefLatter;
		},
		_getHref: function(n) {
			//默认返回'#'
			return '#';
		},
		_getHandlerStr: function(n) {
			if (this.options.mode == 'click') {
				return 'href="' + this._getHref(n) + '"data-page="' + n + '"';
			}
			//link模式，也是默认的
			return 'href="' + this._getLink(n) + '"';
		},
		_disablehtml: function() {
			return '<div class="bg"></div>';
		},
		_nowPagehtml: function(count) {
			return '<div class="page-wrap pagewrap-hover"><span class="page-cur ">' + count + '</span>'
		},
		_html: function() {
			'<div class="pagination-pages"><div class="pagination-page"></div><div class="pagination-count"></div></div>'
		},

		_firstHtml: function() {
			var str_first = '',
				lang = this.options.lang;
			if (this.hasPrv) {
				str_first = '<a ' + this._getHandlerStr(1) + ' title="' + (lang.firstPageTipText || lang.firstPageText) + '"class = "page-first" ><i class="icon iconfont"> ' + lang.firstPageText + ' </i></a>';
			} else {
				//str_first = //'<span class='disabled'>'+lang.firstPageText+'</span>';
			}
			return str_first;
		},
		_next: function() {
			var ddh = '',
				lang = this.options.lang;
			if (this.hasNext) {
				ddh = '<a ' + this._getHandlerStr(this.next) + 'title="' + (lang.nextPageTipText || lang.nextPageText) + '" class= "page-next"><span class="icon iconfont">' + lang.nextPageText + ' </span></a> ';
			} else {
				ddh = '<a class="page-next disable" data-page="' + this.next + '"><span class="disabled icon iconfont" >' + lang.nextPageText + '</span></a>';
			}
			return ddh;
		},
		_prev: function() {
			var str_prv = '',
				lang = this.options.lang;
			if (this.hasPrv) {
				str_prv = '<a ' + this._getHandlerStr(this.prv) + ' title="' + (lang.prePageTipText || lang.prePageText) + '" class = "page-prev" ><i class="icon iconfont">' + lang.prePageText + '</i></a>';
			} else {
				str_prv = '<a class="page-prev disable " data-page="' + this.prv + '"><span class="icon iconfont icon-btn-prev-2-disable" >' + lang.prePageText + '</span></a>';
			}
			return str_prv;
		},
		_last: function() {
			var ddh = '',
				lang = this.options.lang;
			if (this.hasNext) {
				ddh = '<a ' + this._getHandlerStr(this.total) + 'title="' + (lang.lastPageTipText || lang.lastPageText) + '" class= "page-last icon iconfont"> ' + lang.lastPageText + '</a>';
			} else {
				ddh = '<a class="page-last disable " data-page="' + this.total + '"><span class="disabled icon iconfont">' + lang.lastPageText + '</span> </a>';
			}
			return ddh;
		},
		_total: function() {
			var ddh = '',
				lang = this.options.lang;
			ddh = '&nbsp;<span class="pagination-count">' + lang.totalPageBeforeText;
			if (this.options.isShowTotalPage) {
				ddh += this.total + lang.totalPageAfterText;
				if (this.isShowTotalRecords) {
					ddh += '/';
				}
			}
			if (this.options.isShowTotalRecords) {
				ddh += this.totalRecords + lang.totalRecordsAfterText;
			}

			ddh += '</span>';
			return ddh;

		},
		_goPage: function() {
			var ddh = '',
				lang = this.options.lang;
			ddh = '<span id="' + this.options.gopageWrapId + '" class="page-num-wrap">' + '<label>&nbsp;' + lang.gopageBeforeText + '</label>' +
				'<input type="text" id="' + this.options.gopageTextboxId + '" value=\'' + this.next + '\' class=\'pagenum\' />' + lang.gopageAfterText + '<input type=\'button\' id=\'' + this.options.gopageButtonId + '\'  value=\'' + lang.gopageButtonOkText + '\'class = "btn-jump" / > ' + '</span>';
			return ddh;
		},
		//不刷新页面直接手动调用选中某一页码
		_selectPage: function(m, n) {

			if (!isNaN(m)) {
				this.options.pno = m;
			}
			if (!isNaN(n)) {
				this.options.total = n;
			}
			this.element.remove();
			this.init();
		},
		gopage: function() {
			var $goInput = $('#' + this.options.gopageTextboxId),
				str_page = $goInput.val();
			if (isNaN(str_page)) {
				$goInput.val(this.next);
				return;
			}
			var n = parseInt(str_page);
			if (n < 1) n = 1;
			if (n > this.total) n = this.total;
			if (n == this.pno) return;
			if (this.options.mode == 'click') {
				this._clickHandler(n);
			} else {
				window.location = this._getLink(n);
			}

		},
		_clickHandler: function(n) {
			this.options.clickFn(parseInt(n));
			return false;
		},
		_create: function() {
			var $goInput = $('#' + this.options.gopageTextboxId),
				ele = this.element,
				$a = ele.find('a'),
				$go = $('#' + this.options.gopageButtonId),
				that = this;
			$goInput.on('keypress', function(event) {
				event = event || window.event;
				var code = event.keyCode || event.charCode;
				//delete key
				if (code == 8) return true;
				//enter key
				if (code == 13) {

					that.gopage();
					return false;
				}
				//copy and paste
				if (event.ctrlKey && (code == 99 || code == 118)) return true;
				//only number key
				if (code < 48 || code > 57) return false;
				return true;
			});
			$go.click(function() {
				that.gopage();
			});
			if (this.options.mode == 'click') {
				$a.click(function() {
					if ($(this).hasClass('disable')) return false;
					var n = $(this).data('page');
					that._clickHandler(n);
					return false;
				});
			}


		},
		_appendTo: function() {
			var str = '',
				str_first = '',
				str_prv = '',
				str_next = '',
				str_last = '',
				str_span = '',
				total_info = '',
				gopage_info = '',
				lang = this.options.lang,
				i, begin, end, ele;
			if (this.options.isShowMore) {
				str_span = '<span class="page-split">...</span>';
			}
			if (this.options.isShowFirstPageBtn) {
				str_first = this._firstHtml();
			}
			if (this.options.isShowPrePageBtn) {
				str_prv = this._prev();
			}
			if (this.options.isShowNextPageBtn) {
				str_next = this._next();
			}
			if (this.options.isShowLastPageBtn) {
				str_last = this._last();
			}
			if (this.options.isShowTotalPage || this.options.isShowTotalRecords) {
				total_info = this._total();
			}
			if (this.options.isGoPage) {
				gopage_info = this._goPage();
			}
			//分页处理
			if (this.total <= 8) {
				for (i = 1; i <= this.total; i++) {
					if (this.pno == i) {
						str += '<span class="page-cur ">' + i + '</span>';
					} else {
						str += '<a ' + this._getHandlerStr(i) + ' title=\'' + lang.buttonTipBeforeText + i + lang.buttonTipAfterText + '\' class = "page" > ' + i + ' </a>';
					}
				}
			} else {
				if (this.pno <= 5) {
					for (i = 1; i <= 7; i++) {
						if (this.pno == i) {
							str += '<span class="page-cur ">' + i + '</span>';
						} else {
							str += '<a ' + this._getHandlerStr(i) + ' title=\'' + lang.buttonTipBeforeText + i + lang.buttonTipAfterText + '\'class = "page" > ' + i + ' </a>';
						}
					}
					str += str_span;
				} else {
					if (this.options.isShowMore) {
						str += '<a ' + this._getHandlerStr(1) + ' title=\'' + lang.buttonTipBeforeText + '1 ' + lang.buttonTipAfterText + '\'class = \'page\' > 1 </a>';
						str += '<a ' + this._getHandlerStr(2) + ' title=\'' + lang.buttonTipBeforeText + '2 ' + lang.buttonTipAfterText + '\'class = \'page\' > 2 </a>';
						str += str_span;
						begin = parseInt(this.pno) - 2;
						end = parseInt(this.pno) + 2;
					} else {
						begin = parseInt(this.pno) - 3;
						end = parseInt(this.pno) + 3;

					}
					if (!this.options.isShowMore && end > this.total) {
						end = this.total;
						begin = end - 6;
						if (this.pno - begin < 2) {
							begin = begin - 1;
						}
					} else if (this.options.isShowMore && end + 4 > this.total) {
						end = this.total;
						begin = end - 4;
						if (this.pno - begin < 2) {
							begin = begin - 1;
						}
					} else if (end + 1 == this.total) {
						end = this.total;
					}


					for (i = begin; i <= end; i++) {
						if (this.pno == i) {
							str += '<span class=\'page-cur\'>' + i + '</span>';
						} else {
							str += '<a ' + this._getHandlerStr(i) + ' title=\'' + lang.buttonTipBeforeText + i + lang.buttonTipAfterText + '\'class = \'page\' > ' + i + ' </a>';
						}
					}
					if (end != this.total) {
						str += str_span;
					}
				}


			}
			str = '<div class="' + this.options.pageContClass + '">' + str_first + str_prv + str + str_next + str_last + total_info + gopage_info + '</div>';

			ele = $(str).appendTo(this.$element)
			this.element = ele;

		},
		init: function() {
			this.pno = isNaN(this.options.pno) ? 1 : this.options.pno;
			this.total = isNaN(this.options.total) ? 1 : this.options.total;
			this.totalRecords = isNaN(this.options.totalRecords) ? 0 : this.options.totalRecords;
			if (this.pno < 1) this.pno = 1;
			this.total = (this.total <= 1) ? 1 : this.total;
			this.next = (this.pno >= this.total - 1) ? this.total : (this.pno + 1);
			this.hasPrv = (this.pno > 1);
			this.hasNext = (this.pno < this.total);
			this.prv = (this.pno <= 2) ? 1 : (this.pno - 1);
			this._appendTo();
			this._create();

		}
	}
	$.fn.myPage = function(options) {
		var beautifier = new Beautifier(this, options);
		beautifier.init();
		this.getTotal = function() {
			return beautifier._getTotal();
		}
		this.getNowPage = function() {
				return beautifier._getNowPage();
			}
			//@param:m 当前页数
			//@param:n总页数
		this.selectPage = function(m, n) {
			return beautifier._selectPage(m, n);
		};
		return this;
	}
})
//(jQuery, window, document);