// define(function(require, exports, module) {
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
    if (!$) {
        var $ = require('jquery');
    }
    var Beautifier = function(ele, opt) {
        this.$element = ele, this.defaults = {
            pno: 1,
            //当前页码
            total: 1,
            isGoPage: true, //是否显示页码跳转输入框
            //总页码
            //totalRecords		: 0, //总数据条数	
            clickFn: function() {} //点击事件
        }, this.options = $.extend({}, this.defaults, opt);
    };
    //定义Beautifier的方法
    Beautifier.prototype = {
        _clickHandler: function(n) {
            this.options.clickFn(parseInt(n));
            return false;
        },
        _goPage: function(ele) {
            var $goInput = ele.find('input'),
                str_page = $goInput.val();
            if (isNaN(str_page)) {
                $goInput.val(this.next);
                return;
            }
            var n = parseInt(str_page);
            if (n < 1) n = 1;
            if (n > this.total) n = this.total;
            if (n == this.pno) return;
            this._clickHandler(n);
        },
        _getTotal: function() {
            return this.options.total;
        },
        _getNowPage: function() {
            return this.pno;
        },
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
        _create: function() {
            var ele = this.element,
                that = this;
            ele.find('a.min-page-prev').click(function() {
                if ($(this).hasClass('min-page-disable')) return false;
                var n = $(this).data('page');
                that._clickHandler(n);
                return false;
            });
            ele.find('a.min-page-next').click(function() {
                if ($(this).hasClass('min-page-disable')) return false;
                var n = $(this).data('page');
                that._clickHandler(n);
                return false;
            });
            ele.find('.min-page-now').on('keypress', function(event) {
                event = event || window.event;
                var code = event.keyCode || event.charCode;
                //delete key
                if (code == 8) return true;
                //enter key
                if (code == 13) {
                    that._goPage(ele);
                    return false;
                }
                //copy and paste
                if (event.ctrlKey && (code == 99 || code == 118)) return true;
                //only number key
                if (code < 48 || code > 57) return false;
                return true;
            });
        },
        _appendTo: function() {
            //var ddh=this._html.join(');
            var ddh = '';
            ddh += '<div class=\'min-page\'>';
            if (this.pno == 1) {
                ddh += '<a href=\'#\'  class=\'icon iconfont  min-page-prev min-page-disable\' data-page=\'' + this.prv + '\'>&#xe6e8;</a>';
            } else {
                ddh += '<a href=\'#\'  class=\' icon iconfont  min-page-prev\' data-page=\'' + this.prv + '\'>&#xe6e8;</a>';
            }
            if (this.options.isGoPage) {
                ddh += '<div class="min-page-cont"><input type=\'text\' value=\'' + this.pno + '\' class=\'min-page-now\' data-now=\'' + this.pno + '\'>';
                ddh += '/' + '<span class=\'min-page-total\' data-page=\'' + this.total + '\'>' + this.total + '</span></div>';
            }else{
                 ddh += '<span class="min-page-current">' + this.pno + '</span>';
                ddh += '/' +this.total ;
            }
            if (this.pno == this.total) {
                ddh += '<a href=\'#\' class=\'icon iconfont  min-page-next min-page-disable\' data-page=\'' + this.next + '\'>&#xe6e7;</a>';
            } else {
                ddh += '<a href=\'#\' class=\'icon iconfont min-page-next\' data-page=\'' + this.next + '\'>&#xe6e7;</a>';
            }
            ddh += '</div>';

            this.element = $(ddh).appendTo(this.$element);
            this._create();
        },
        init: function() {
            this.pno = isNaN(this.options.pno) ? 1 : parseInt(this.options.pno);
            this.total = isNaN(this.options.total) ? 1 : parseInt(this.options.total);
            if (this.pno < 1) this.pno = 1;
            this.total = this.total <= 1 ? 1 : this.total;
            this.next = this.pno >= this.total - 1 ? this.total : this.pno + 1;
            this.hasPrv = this.pno > 1;
            this.hasNext = this.pno < this.total;
            this.prv = this.pno <= 2 ? 1 : this.pno - 1;
            this._appendTo();
        }
    };
    //在插件中使用Beautifier对象
    $.fn.myMinPage = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        beautifier.init();
        //获取总页数
        this.getTotal = function() {
            return beautifier._getTotal();
        };
        //获取当前页数
        this.getNowPage = function() {
            return beautifier._getNowPage();
        };
        //@param:m 当前页数
        //@param:n总页数
        this.selectPage = function(m, n) {
            return beautifier._selectPage(m, n);
        };
        return this;
    };
    // })(jQuery, window, document);
});