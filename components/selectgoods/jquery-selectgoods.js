/**
 * jquery选择组件
 * @author YJL 2015-07-09
 *
 */

(function(factory) {
  if (typeof module != 'undefined' && module.exports && this.module !== module) {
    var $ = require('jquery');
    require('page');
    factory($, window, document);
  } else if (typeof define === 'function' && define.amd) {
    define(function(require) {
      require('page');
      var $ = require('jquery');
      factory($, window, document);
    });
  } else {
    factory();
  }
})(function($, window, document, undefined) {
  var SelectOne = function(ele, opt) {
    this.$element = ele;
    this.defaults = {
      isMultiply: true, //是否多选
      isImg: true, //是否显示图片
      isPrice: true, //价格
      isTime: true,
      boxId: 'selectPan',
      search: {
        isSelect: true, //select框
        isSelectMultiplyLevel: true, //多级分类
        isInput: true, //input框
        isAjax: true, //是否ajax获取多级分类
        selectSource: '', //获取多级分类ajax url
        selectEmpty: 'empty', //获取多级分类不限
        getSelectData: function() { //获取多级分类ajax参数
        }
      },
      ajaxOption: {
        getSearchData: function() { // 获取搜索数据参数
        },
        ajaxDataFilter: function(res) {
          return res;
        },
        source: '' //分页获取ajax路径
      },
      data: {
        select: [], //初始化数据
        input: '',
        content: [],
        selectName: [],
        selectMultiply: []
      },
      pageOption: { //是否分页
        pno: 1, //当前页码
        total: 10, //总页码
        mode: 'click' //模式(click)
      },
      fillOption: {
        selector: '.J_Select', //选择器
        fnName: 'focus',
        clickCall: function(data) { //选中回调事件

        }
      },
      lang: { //语言
        title: '选择控件',
        close: 'X',
        alt: '图片',
        operat: '推荐',
        operatText: '&#xe69d;',
        searchInputText: '&#xe663;',
        cancelButton: '取消',
        sureButton: '保存'
      }
    }

    this.options = $.extend({}, this.defaults, opt);
  }
  Array.prototype.getValue = function(id) {
    var data = this;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return data[i];
      }
    }
  }

  SelectOne.prototype = {
    _html: function(data) {
      this.options.content = data;
      var ddh = [];
      var i, len, href, _src;
      var isPrice = this.options.isPrice;
      var isImg = this.options.isImg;
      var isTime = this.options.isTime;
      var lang = this.options.lang;
      for (i = 0, len = data.length; i < len; i++) {
        href = this._getHrefHTML(data[i].url);
        ddh.push('<li class=\'choose-line\' data-id=\'' + data[i].id + '\'>');
        ddh.push('<dl class=\'choose-item clear-fix\'>');
        if (isImg) {
          _src = data[i].img === '' ? '#' : data[i].img;
          ddh.push('<dt class=\'choose-pic\'>');
          ddh.push('<a ' + href + '><img alt=' + lang.alt + ' src=\'' + _src + '\'></a>');
          ddh.push('</dt>');
        }
        ddh.push('<dd class=\'choose-detail\'>');
        ddh.push('<p class=\'choose-detail-title\'>');
        ddh.push('<a ' + href + ' title=\'' + data[i].title + '\'>' + data[i].title + '</a></p>');
        if (isPrice) {
          ddh.push('<p class=\'choose-detail-price\'>');
          ddh.push('<span class=\'choose-detail-symbol\'>￥</span><span class=\'choose-detail-value\'>' + parseFloat(data[i].price / 100).toFixed(2) + '</span></p>');
        }
        if (isTime) {
          ddh.push('<p class=\'choose-detail-time\'>');
          ddh.push('<span class=\'choose-detail-value\'>' + (data[i].time || '') + '</span></p>');
        }
        ddh.push('</dd>');
        ddh.push('<dd class=\'choose-operation\'><a href=\'javascript:;\' class=\'J_TRecOpt iconfont\' title=\'' + lang.operat + '\' data-id=\'' + data[i].id + '\'>' + lang.operatText + '</a> </dd>');
        ddh.push('</dl>');
        ddh.push('</li>');
      }
      if (data.length === 0) {
        ddh.push('<li>暂无数据</li>');
      }
      return ddh.join('');
    },
    _getHrefHTML: function(url) {
      if (!url || url === ' ') {
        url = '#'
      }
      return 'href=\'' + url + '\'target=\'_blank\'';
    },
    _tmplCont: function(data, pageIndex, pageCount) { //填充
      var boxId = '#' + this.options.boxId;
      data = this.options.ajaxOption.ajaxDataFilter(data) || data; //数据分析
      var ddh = this._html(data);
      $(boxId + 'Foot').data('page').selectPage(pageIndex, pageCount);
      $(boxId + 'Cont').empty().html(ddh);
    },
    _getSearchData: function() { //获取搜索条件
      var boxId = '#' + this.options.boxId;
      var o = {};
      this.element.find('select').each(function(index, el) {
        o[this.name] = $(this).val();
      });
      o.title = $(boxId + 'Text').val();
      if (!!this.options.pageOption) {
        o.page = $(boxId + 'Foot').data('page').getNowPage() || 1;
      }
      return o;
    },
    _ajaxSearch: function(olddata) {
      var me = this;
      var data = me.options.ajaxOption.getSearchData(this) || me._getSearchData();
      if (data == null) {
        return;
      }
      $.ajax({
        url: me.options.ajaxOption.source,
        type: 'post',
        dataType: 'json',
        data: data,
        success: function(res) {
          if (res.code === 0) {
            me._tmplCont(res.map.list, res.map.pageIndex, res.map.pageCount);
          }
        }
      });
    },
    _ajaxDataSelect: function() {
      var o = {};
      this.element.find('slect').each(function() {
        if (!!this.name) {
          o[this.name] = $(this).val();
        }
      });
      return o;
    },
    _ajaxSelect: function(pId) {
      var me = this;
      var ajaxData = me.options.search.getSelectData(pId, this) || me._ajaxDataSelect();
      $.ajax({
        url: me.options.search.selectSource,
        type: 'post',
        dataType: 'json',
        data: ajaxData,
        success: function(res) {
          if (res.code === 0) {
            me._selectMultiply(res.map.list);
          }
        }
      });
    },
    _selectFilterData: function(pId) { //select数据分析
      var data = this.options.data.selectMultiply;
      pId = parseInt(pId);
      var array = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId === pId) {
          array.push(data[i]);
        }
      }
      this._selectMultiply(array);
    },
    _setMultiplyData: function(id) {
      var data = this.options.data.content.getValue(id);
      if (!!data) {
        this.arrayId.push(data);
      }
    },
    _delMultiplyData: function(id) {
      var data = this.arrayId;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          this.arrayId.splice(i, 1);
        }
      }
    },
    _multiplyEvent: function() {
      var element = this.element;
      var boxId = this.options.boxId;
      var $multiply = $('#' + boxId + 'Multiply');
      var _id;
      var me = this;
      this.arrayId = [];
      $('#' + boxId + 'Url').find('a').click(function(event) {
        if ($(this).hasClass('selected')) {
          return false;
        }
        $(this).addClass('selected').siblings().removeClass('selected');
        $($(this).attr('href')).show().siblings('.choose-panel').hide();
        return false;
      });
      element.find('#' + boxId + 'Cont').find('a.J_TRecOpt').click(function() {
        _id = $(this).data('id');
        if ($multiply.find('li[data-id=' + _id + ']').length) {
          return false;
        }
        me._setMultiplyData(_id);
        $(this).parents('li').clone().appendTo($multiply);
      });
      $multiply.on('click', 'a.J_TRecOpt', function() {
        me._delMultiplyData(_id);
        $(this).parents('li').remove();
      });
    },
    _hide: function() {
      this.element.fadeOut();
    },
    _isValue: function(nodeName) {
      var _value;
      switch (nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
          _value = 'val';
          break;
        default:
          _value = 'text';
      }
      return _value;
    },
    _setValue: function(data, array) {
      try {
        this.fillOption[this._value](data);
        this.options.fillOption.clickCall(array);
        this._hide();
      } catch (e) {
        throw ('selector is undefined.');
      }
    },
    _create: function() {
      var me = this;
      var element = this.element;
      var boxId = this.options.boxId;
      var fillOption = me.options.fillOption;
      //关闭
      element.find('.choose-close').click(function() {
        me._hide();
      });
      if (!!fillOption.fnName) {
        $(document).on(fillOption.fnName, fillOption.selector, function() {
          me._value = me._isValue(this.nodeName);
          me.fillOption = $(this);
          element.fadeIn();
        });
      }


      //单选
      if (!this.options.isMultiply) {
        element.find('#' + boxId + 'Cont').find('a.J_TRecOpt').click(function() {
          var _id = $(this).data('id');
          var arrayData = me.options.data.content.getValue(_id) || {};
          me._setValue(arrayData.title || '', arrayData);
        });
      } else { //多选
        element.find('.J_BSave').click(function(e) {
          var arrayTitle = [];
          for (var i = me.arrayId.length - 1; i >= 0; i--) {
            arrayTitle.push(me.arrayId[i].title);
          }
          me._setValue(arrayTitle.join(','), me.arrayId);

        });
        element.find('.J_BCancel').click(function(e) {
          me._hide();
        });
      }

      //搜索
      if (me.options.search.isSelect || me.options.search.isInput) {
        element.find('.J_TRSearch').click(function() {
          me._ajaxSearch(this.value);
          return false;
        });
      }
    },
    _selectMultiply: function(data) {
      data = data || this.options.data.selectMultuply || [];
      var length = this.element.find('select').length + 1;
      var _name = this.options.data.selectName[length] || this.options.data.selectName[0] + length;
      var ddh = this._getSerchSelectHtml(data, _name);
      $(ddh).appendTo(this.element.find('.choose-select'));
    },
    _selectMultiplyEvent: function() {
      var me = this;
      this.element.on('change', 'select', function() {
        var cid = $(this).find('option:selected').data('children');
        $(this).nextAll().remove();
        if (cid && cid != 'undefined') {
          me.SelectMultiplyLevel($(this).val());
        }
      }).change();
    },
    _getSerchInputHtml: function() {
      var ddh = [];
      var _value = this.options.data.input || '';
      var _text = this.options.lang.searchInputText;
      ddh.push('<span class=\'choose-input\'>');
      ddh.push('<input name=\'query\' value=\'' + _value + '\' lang=\'zh-CN\' id=\'' + this.options.boxId + 'Text\'>');
      ddh.push('<a class=\'J_TRSearch iconfont\' title=\'搜索\' href=\'#\'>' + this.options.lang.searchInputText + '</a>');
      ddh.push('</span>');
      return ddh.join('');
    },
    _getSerchSelectHtml: function(data, name, type) {
      var ddh = [];
      if (data.length === 0 && !type) {
        return '';
      }
      ddh.push('<select class=\'choose-select-cont\' name=\'' + (name || '') + '\'>');
      if (type) {
        ddh.push('<option value=\'' + this.options.search.selectEmpty + '\' data-children=\'0\'>不限</option>');
      }
      for (var i = 0; i < data.length; i++) {
        ddh.push('<option  value=\'' + data[i].id + '\' data-children=\'' + (data[i].children || 0) + '\'>' + (data[i].name || '') + '</option>');
      }
      ddh.push('</select>');
      return ddh.join('');
    },
    _appendTo: function() {
      var ddh = [];
      var boxId = this.options.boxId;
      ddh.push('<div class=\'dn\' id=' + boxId + '>');
      ddh.push('<div class=\'choose-box\' >');
      ddh.push('<div class=\'choose-title\'><span>' + this.options.lang.title + '</span><span class=\'choose-close\'>' + this.options.lang.close + '</span></div>');
      ddh.push('<div class=\'choose-control\' >');
      ddh.push('<div class=\'choose-search\'>');
      if (this.options.search.isSelect) {
        ddh.push('<span class=\'choose-select\'>');
        ddh.push(this._getSerchSelectHtml(this.options.data.select, this.options.data.selectName[0], true));
        ddh.push('</span>');
      }
      if (this.options.search.isInput) {
        ddh.push(this._getSerchInputHtml());
      }
      ddh.push('</div>');
      if (this.options.isMultiply) {
        ddh.push('<div class=\'choose-url\' id=\'' + boxId + 'Url\'><a href=\'#' + boxId + 'ContPanel\' class=\'J_TROption selected\'>内容</a><a href=\'#' + boxId + 'MultiplyPanel\' class=\'J_TRSelected\'>已选</a></div>')
        ddh.push('<div id=\'' + boxId + 'MultiplyPanel\' class=\'dn choose-panel\'>')
        ddh.push('<ul id=\'' + boxId + 'Multiply\' ></ul>');
        ddh.push('<div class=\'choose-btn algin-center\'>')
        ddh.push('<a class=\'btn btn-success J_BSave\'>' + this.options.lang.sureButton + '</a>')
        ddh.push('<a class=\'btn btn-default-border J_BCancel\'>' + this.options.lang.cancelButton + '</a>')
        ddh.push('</div>');
        ddh.push('</div>');
      }
      ddh.push('<div id=\'' + boxId + 'ContPanel\' class=\'choose-panel\'>')
      ddh.push('<ul class=\'choose-content\' id=\'' + boxId + 'Cont\'>');
      if (this.options.data.content) {
        ddh.push(this._html(this.options.data.content))
      }
      ddh.push('</ul>');

      ddh.push('<div id=\'' + boxId + 'Foot\'></div>');
      ddh.push('</div>');
      ddh.push('</div>');
      ddh.push('</div>');
      ddh.push('<div class=\'zcvr s-mask\'></div>');
      ddh.push('</div>');
      this.element = $(ddh.join('')).appendTo(this.$element);
    },
    init: function() {
      var me = this;
      me._appendTo();

      //多选
      if (this.options.isMultiply) {
        me._multiplyEvent();
      }
      //多级分类ajax
      if (!this.options.search.isAjax) {
        this.SelectMultiplyLevel = this._selectFilterData;
      } else {
        this.SelectMultiplyLevel = this._ajaxSelect;
      }

      //多级分类
      if (this.options.search.isSelectMultiplyLevel) {
        this._selectMultiplyEvent();
      }

      //分页
      if (!this.options.ajaxOption) {
        var _pageid = '#' + this.options.boxId + 'Foot';
        this.options.pageOption.clickFn = function(n) {
          var _ajaxData = me._getSearchData();
          _ajaxData.page = n;
          $.ajax({
            url: me.options.ajaxOption.source,
            type: 'post',
            dataType: 'json',
            data: _ajaxData,
            success: function(res) {
              if (res.code === 0) {
                me._tmplCont(res.map.list, res.map.pageIndex, res.map.pageCount);
              }
            }
          });
        }
        var $page = $(_pageid).myPage(this.options.pageOption);
        $(_pageid).data('page', $page);
      }

      me._create();
    }
  }

  $.fn.mySelect = function(options) {
    var beautifier = new SelectOne(this, options);
    beautifier.init()
    return beautifier;
  }
});