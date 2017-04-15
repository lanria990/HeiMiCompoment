/*
 *Diagram1.0
 *YJL
 *Copyright 2014, 5, MIT License
 */

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
		factory(jQuery);
	}
})(function($, window, document, undefined) {
	var Diagram = function(ele, opt) {
		this.$element = ele;
		this.defaults = {
			width: 650, //轮播图的宽度
			setbtn: true, //是否要左右按钮
			liclass: 'on', //导航的样式
			auto: true, //是否自动轮播
			time: 3000 //自动轮播的时间
		};
		this.options = $.extend({}, this.defaults, opt);

	};
	Diagram.prototype = {
		_remove: function() {
			var move = this.move;
			window.clearInterval(move);
			this.$element.find('.swipe-wrap').empty();
		},
		_create: function() {
			var ele = this.$element,
				wrap = ele.find('.swipe-wrap'),
				img = wrap.find('img'),
				imgurl = wrap.find('.imgurl'),
				li = ele.find('li'),
				that = this,
				index, len = li.length,
				oldIndex;

			this.wrap = wrap;
			this.imglen = img.length;
			this.imgurl = imgurl;
			this._init(0);
			li.click(function() {
				index = $(this).index();
				oldIndex = ele.find('.on').index();
				if (oldIndex === len - 1 && index === 0) {
					that._lastnext(imgurl);
				} else if (oldIndex === 0 && index === len - 1) {
					that._lastprev(imgurl);
				} else {
					that._move($(this).index());
				}
			});
			if (this.options.auto) {
				this._automove();

			}
		},
		_automove: function() {
			var move = this._setTime();
			this.move = move;
			var time, type = false,
				that = this;
			this.$element.mouseover(function() {
				time = setTimeout(function() {
					window.clearInterval(move);
					type = true;
				}, 200);

			}).mouseout(function() {
				clearTimeout(time);
				if (type) {
					move = that._setTime();
					type = false;
				}
			});
		},
		_setTime: function() {
			var that = this,
				index = this._getIndex(),
				imgurl = this.$element.find('.imgurl').not('.next').not('.prev'),
				move,
				len = imgurl.length,
				time = this.options.time;
			window.clearInterval(this.move);
			move = window.setInterval(function() {
				index++;
				if (index >= len) {
					index = 0;
					that._lastnext(imgurl);
				} else {
					that._move(index);
				}
			}, time);
			return move;
		},
		_move: function(index) {
			this.wrap.animate({
				left: -this.options.width * index
			});
			this._class(index);
		},
		_addClass: function(index) {
			index = index % this.$element.find('li').length
			this.$element.find('li').eq(index).addClass('on').siblings().removeClass('on');
		},
		_init: function(thisLeft) {
			var $img = this.wrap.find('img');
			this.imglen = $img.length;
			this._move(thisLeft);
		},
		_imgUrl: function() {
			return this.wrap.find('.imgurl').not('.next').not('.prev');
		},
		_class: function(index) {
			index = index % this.$element.find('li').length;
			var liclass = this.options.liclass;
			this.$element.find('li').eq(index).addClass(liclass).siblings().removeClass(liclass);
		},
		_getButton: function() {
			return '<div class=\'wrap-btn dn\'> <span class=\'prev image-btn\'>prev</span><span class=\'next image-btn \'>next</span></div>';
		},
		_getIndex: function() {
			return this.$element.find('.on').index();
		},
		_lastprev: function(imgurl) {
			var $imgurl = this._imgUrl(),
				len = $imgurl.length,
				index = len - 1;
			if (!this.wrap.find('.prev').length) {
				$imgurl.clone().insertBefore($imgurl.eq(0)).addClass('prev');
			}
			this.wrap.css({
				left: -this.options.width * (index + 1)
			});
			this._move(index);
		},
		_lastnext: function() {
			var that = this,
				$imgurl = this._imgUrl(),
				len = $imgurl.length,
				index = 0;
			if (!this.wrap.find('.next').length) {
				$imgurl.clone().insertAfter($imgurl.eq(len - 1)).addClass('next');
			}
			this.wrap.animate({
				left: -that.options.width * (len)
			}, function() {
				that.wrap.css({
					left: -that.options.width * (index)
				});
			});
			this._class(index);
		},
		_buttonCreat: function(obj) {
			var that = this,
				imgurl = this.imgurl,
				index, len = imgurl.length,
				li = this.$element.find('li');
			obj.find('span.prev').click(function() {
				index = that._getIndex();
				index--;
				if (index < 0) {
					that._lastprev(imgurl);
				} else {
					that._move(index);
				}
			});
			obj.find('span.next').click(function() {
				index = that._getIndex();
				index++;
				if (index >= len) {
					that._lastnext(imgurl);
				} else {
					that._move(index);
					that._class(li.eq(index).children());
				}
			});
			this.$element.mouseenter(function() {
				obj.show();
			}).mouseleave(function() {
				obj.hide();
			});

		},
		_appendTo: function() {
			var ddh = this._getButton(),
				$button = $(ddh).appendTo(this.$element);
			this._buttonCreat($button);
		},
		_resize: function(width) {
			var index = this._getIndex();
			this.options.width = width;
			if (this.options.auto) {
				window.clearInterval(this.move);
				this._automove();
			}
			this._init(index);
		},
		init: function() {
			this._create();
			if (this.options.setbtn) {
				this._appendTo();
			}

		}
	};

	$.fn.myCarousel = function(options) {
		var carousel = new Diagram(this, options);
		carousel.init();
		//调用其方法
		this.resize = function(width) {
			carousel._resize(width);
		};
		this.remove = function() {
			carousel._remove();
		};
		return this;
	};
});