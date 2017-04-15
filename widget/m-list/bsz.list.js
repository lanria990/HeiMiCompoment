 /*!
  * bsz.list.js 列表组件
  * @author YJL
  * @version 0.0.3
  * @copyright BOSSONZ
  * @namespace bsz
  * Date 2015/04/24
  */

 (function(bsz) {
 	if (typeof module != 'undefined' && module.exports && this.module !== module) {
 		module.exports = bsz
 	} else if (typeof define === 'function' && define.amd) {
 		define(bsz)
 	} else {
 		window.bsz = bsz
 	}
 })(function(win) {
 	/*
 	 * @fires module:bsz.core
 	 * @public
 	 */
 	var bsz = require('bsz.core') || {};
 	var $ = require('jquery');
 	'use strict';

 	/* ========================================================================
 	 * 掺元类 先创建一个包含各种方法的通用类，然后再用它扩充其他类
 	 * [augment  继承
 	 * @param  {[type]} receivingClass 接受方法的类
 	 * @param  {[type]} givingClass    [给予方法的类]
 	 * ```javascript
 	 * argument(Author,Mixin,'serialize');
 	 * ```
 	 * ========================================================================*/

 	function augment(receivingClass, givingClass) {
 		if (arguments[2]) { // only give certain methods
 			for (var i = 2, len = arguments.length; i < len; i++) {
 				receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
 			}
 		} else { //Give all methods
 			for (var methodName in givingClass.prototype) {
 				if (!receivingClass.prototype[methodName]) {
 					receivingClass.prototype[methodName] = givingClass.prototype[methodName];
 				}
 			}
 		}
 	}

 	/* ========================================================================
 	 * @class  全选 bsz.check
 	 * --- 全局样式名：J_Table
 	 * @options {inserse:'是否反选'}
 	 * @function getCheckedTr获取选中的tr
 	 * @function setInputAll 设置全选 @param true||false
 	 * @function init 初始化
 	 * ========================================================================*/
 	bsz.check = {
 		_table: $('.J_Table'), // @private
 		_checkAll: $('input[name=checkAll]'), // @private
 		_items: function() { // @private
 			return this._table.find('input[name=items]')
 		},
 		init: function(opt) { // @public 
 			var that = this;
 			this._checkAll.click(function() {
 				that._setInputItems(this.checked);
 				that.setInputAll(this.checked);
 			});
 		},
 		getCheckedTr: function() { // @public 
 			return this._items().filter(':checked').parents('tr');
 		},
 		setInputAll: function(type) { // @public 
 			this._checkAll.each(function() {
 				this.checked = type;
 			});
 		},
 		_setInputItems: function(type) { // @private
 			this._items().each(function() {
 				this.checked = type;
 			});
 		}
 	};

 	// bsz.widget = {
 	// 	ajax: function(ajaxUrl, ajaxData, ajaxDone) {
 	// 		$.ajax({
 	// 			url: ajaxUrl,
 	// 			type: 'POST',
 	// 			dataType: 'json',
 	// 			data: ajaxData,
 	// 		}).done(function(res) {
 	// 			switch (res.code) {
 	// 				case 0:
 	// 					ajaxDone(res);
 	// 					break;
 	// 				case 10002:
 	// 					top.location.href = '/admin/linqin/login';
 	// 					break;
 	// 				default:
 	// 					bsz.alert.alert(res.msg);
 	// 			}

 	// 		}).fail(function() {
 	// 			bsz.alert.code(-1);
 	// 			throw new Error('failed xhr.');
 	// 		});
 	// 	},
 	// 	initBox: function(id, ajaxFn, thisList, idFn) {
 	// 		var $box = $(id + 'Box');
 	// 		var that = this;
 	// 		$box.find('.J_BSure').click(function() {
 	// 			ajaxFn.call(this, thisList);
 	// 		});
 	// 		$box.find('.J_BCancel,.J_BClose').click(this.hideBox);
 	// 		if ($(id).length) {
 	// 			$(id).click(function() {
 	// 				if (typeof _idFn == 'function') {
 	// 					idFn(id);
 	// 				} else {
 	// 					that.clearBox($box);
 	// 					that.showBox($box);
 	// 				}
 	// 			});
 	// 		}
 	// 		return this;
 	// 	},
 	// 	clearBox: function($box) {
 	// 		var arrayType = $box.data('box').split(''); //input textarea img select
 	// 		for (var i = 0, len = arrayType.length; i < len; i++) {
 	// 			this.clearEventBox(arrayType[i], $box);
 	// 		}
 	// 	},
 	// 	clearEventBox: function(type, $box) {
 	// 		switch (type) {
 	// 			case 'input':
 	// 			case 'textarea':
 	// 				$box.find(type).val('');
 	// 				break;
 	// 			case 'select':
 	// 				$box.find('select').val(-1);
 	// 				break;
 	// 			case 'Img':
 	// 				$box.find('img').attr('src', '/static/images/img2.jpg');
 	// 				break;
 	// 			default:
 	// 				return;
 	// 		}
 	// 	},
 	// 	showBox: function($box) {
 	// 		$box.show();
 	// 		$('#sharemask').show();
 	// 	},
 	// 	hideBox: function(obj) {
 	// 		$(this).closest('.tip').hide();
 	// 		$('#sharemask').hide();
 	// 	}

 	// };

 	/* ========================================================================
 	 * @class 通用类
 	 * @function  tableTplFn、getPostData、getData 虚拟派生类
 	 * @function  getID 获取列表id
 	 * @param {object} tbody 内容块缓存
 	 *
 	 * @author YJL 2015/04/24
 	 * @version 0.0.1
 	 * ==========================================================================*/

 	function CommonListOpt() {}

 	CommonListOpt.prototype = {
 		tbody: $('#container'),
 		tableTplFn: function() {
 			throw new Error('Unsupported operation on an abstract class .');
 		},
 		getPostData: function() {
 			throw new Error('Unsupported operation on an abstract class .');
 		},
 		getData: function() {
 			throw new Error('Unsupported operation on an abstract class .');
 		},
 		getID: function(obj) { //获取id
 			var id = $(obj).parents('tr').data('id')
 			if (typeof id === 'undefined' && id == null) {
 				return null;
 			}
 			return id;
 		},
 		_pnoIs: function(data, total, pno) {
 			//判断
 			var type = !data || data.length === 0;
 			if (pno > total && type && total >= 1) {
 				var _o = this.getPostData();
 				_o.page = total;
 				this._postListGet(_o);
 				return false;
 			}
 			return true;
 		},
 		_tmplTable: function(data, pno, total) { //模板
 			if (this._pnoIs(data, total, pno)) {
 				var hrefData = this.getPostData();
 				var dom = this.tableTplFn({
 					items: data,
 					data: hrefData
 				});
 				this.tbody.html(dom);
 				bsz.check.setInputAll(false);
 				$('td.J_Order').each(function(i) {
 					$(this).html(i + 1);
 				});
 				$('#pageList').data('page').selectPage(pno, total);
 				$('#lCont').show();
 				$('#loading').hide();
 			}
 		}
 	}

 	/**
 	 * 获取列表数据
 	 * @param  {object} data ajax参数
 	 */
 	CommonListOpt.prototype._postListGet = function(data) {
 		var _url = this.base + 'findPageAjax.do';
 		var that = this;
 		data = data || this.getPostData();
 		bsz.widget.ajax(_url, data, function(res) {
 			//调用table模板
 			that._tmplTable(res.map.list, res.map.pageIndex, res.map.pageCount);
 		});
 	}


 	/* ==========================================================================
 	 * @class 列表类
 	 * @function _add,_search,_del,_delAll,_tmpl
 	 * @extend CommonListOpt
 	 * ========================================================================
 	 * -- 删除：.J_Del, 全部删除：#delAll,搜索：#searchBut,上传:.J_Upload
 	 * -- 上传成功函数 parents：tr,分页：pageList 修改:J_Edit
 	 * -- ajax路径：
 	 * ------ 更改状态 url:base(基本路径) + changeAjax.do
 	 * ------ 批量删除 url:base(基本路径) + delBatchAjax.do
 	 * ------ 获取单条 url:base(基本路径) + findDetailAjax.do
 	 * ------ 单条保存 url:base(基本路径) + saveAjax.do
 	 * ========================================================================
 	 * @param {obejct} [opt] {base:路径，tableTplFn:列表模板}
 	 * @author YJL 2015/04/24
 	 * @version 0.0.1
 	 * javascript```
 	 * 		bsz.list.init({base:'',tableTplFn:function(){},getPostData:function(){}})
 	 * ```
 	 * ==========================================================================*/

 	function List() {}


 	augment(List, CommonListOpt); //继承 CommonListOpt

 	/**
 	 * 批量删除 删除
 	 * @param  {array[number]} arrayID 数组
 	 */
 	List.prototype._postDel = function(arrayID) {
 		var _url = this.base + 'delBatchAjax.do';
 		var that = this;
 		bsz.widget.ajax(_url, {
 			ids: arrayID
 		}, function(res) {
 			that._postListGet();
 		}, that);
 	}

 	/**
 	 * 修改获取单条信息
 	 * @param  {id} ID id
 	 */
 	List.prototype._postEdit = function(ID) {
 		var _url = this.base + 'findDetailAjax.do';
 		var that = this;
 		bsz.widget.ajax(_url, {
 			id: ID
 		}, function(res) {
 			that.initEditBox(res.map.item); //初始化弹窗
 		});
 	}

 	/**
 	 * 保存单条信息 （添加和修改）
 	 * @param  {object} that List函数域
 	 */
 	List.prototype._postSave = function(that) {
 		var _url = that.base + 'saveAjax.do';
 		var _data = that.getData(this);
 		var _that = this;
 		if (_data === null) {
 			return;
 		}
 		bsz.widget.ajax(_url, _data, function(res) {
 			var data = that.getPostData();
 			if (!_data.id) {
 				data.page = 1;
 				data.name = '';
 			}
 			that._postListGet(data);
 			bsz.widget.hideOBox(_that);
 		});
 	}

 	/**
 	 * 修改状态
 	 * @param  {object} data {id:id,state:(0: 下架,1: 上架)}
 	 * changeAjax.do 更改状态ajax
 	 */
 	List.prototype._postChange = function(data) {
 		var _url = this.base + 'changeAjax.do';
 		var me = this;
 		bsz.widget.ajax(_url, data, function(res) {
 			me._postListGet();
 		}, me);
 	}

 	/**
 	 * 绑定删除事件
 	 */
 	List.prototype._del = function() {
 		var that = this;
 		this.tbody.on('click', 'a.J_Del', function() {
 			var id = that.getID(this);
 			if (!!id) {
 				var array = [];
 				array.push(id);
 				bsz.alert.confirm('确定要删除该项吗?', that._postDel, array, that);
 			}
 		});
 	}

 	/**
 	 * 批量删除
 	 * @warn id delAll
 	 */
 	List.prototype._delAll = function() {
 		var that = this;
 		$('#delAll').click(function() {
 			var $tr = bsz.check.getCheckedTr();
 			if ($tr.length === 0) {
 				bsz.alert.alert('请选择要删除的选项');
 			} else {
 				var ids = [];
 				$tr.each(function(i) {
 					ids[i] = $(this).data('id');
 				});
 				bsz.alert.confirm('确定要删除该项吗?', that._postDel, ids, that); //修正this指向问题
 			}
 		});
 	}

 	/**
 	 * 搜索
 	 * @warn id searchBut
 	 */
 	List.prototype._search = function() { //搜索
 		var that = this;
 		$('#searchBut').click(function() {
 			var data = that.getPostData();
 			data.page = 1;
 			that._postListGet(data);
 		});
 	}

 	/**
 	 * 添加弹窗
 	 * @warn id add addBox
 	 */
 	List.prototype._add = function() {
 		bsz.widget.initBox('#add', this._postSave, this);
 	}

 	/**
 	 * 获取单条初始化弹窗
 	 * @param  {object} items 单条信息数据
 	 * @warn id:editBox, attr:(data-box,name)
 	 * @throws {string} If data-box == undefined
 	 */
 	List.prototype.initEditBox = function(items) {
 		try {
 			var $box = $('#editBox').data('id', items.id);
 			var type = $box.data('box').split(' ');
 			if ($.inArray('img', type)) {
 				$box.find('img').attr('src', items.imgUrl)
 			}

 			//根据 name赋值
 			$box.find('[name]').each(function() {
 				this.value = items[this.name];
 			});

 			bsz.widget.showBox($box);
 		} catch (e) {
 			throw new Error('edit box attribute data-box is empty error.')
 		}
 	}

 	/**
 	 * 绑定修改和初始化修改弹窗事件
 	 * @param  {object} items 单条信息数据
 	 * @warn id:editBox,class:J_Edit
 	 */
 	List.prototype._edit = function() { //修改
 		var that = this;
 		bsz.widget.initBox('#edit', this._postSave, this);
 		this.tbody.on('click', 'a.J_Edit', function() {
 			var id = that.getID(this);
 			if (!!id) {
 				that._postEdit(id);
 			}
 		});
 	}

 	/**
 	 * 修改状态
 	 * @warn class:a.J_Change attr:(data-state)
 	 * @default state 0
 	 */
 	List.prototype._change = function() {
 		var that = this;
 		this.tbody.on('click', 'a.J_Change', function() {
 			var o = {};
 			o.id = that.getID(this);
 			o.state = parseInt($(this).data('state'));
 			if (isNaN(o.state)) {
 				o.state = 0;
 			}
 			if (!!o.id) {
 				// that._postChange(o);
 				bsz.alert.confirm('确定更改状态?', that._postChange, o, that); //增加confirm判断
 			}

 		});
 	}

 	/**
 	 * 图片上传初始化
 	 * @warn class J_Upload,formDataValue:data-upload ,id不同
 	 */
 	List.prototype._upload = function() { //上传初始化
 		var that = this;
 		$('a.J_Upload').each(function() {
 			var ID = this.id;
 			var formData = $(this).data('upload');
 			if (ID) {
 				$(this).myUpload({
 					id: '#' + ID,
 					formDataValue: {
 						uploadBusiness: formData
 					},
 					isDel: false,
 					success: function(file, res, ID) {
 						$('#' + file.id).remove();
 						if (res.code === 0) {
 							$(ID).parents('tr').find('img').attr('src', res.map.imgUrl);
 						}
 					}
 				});
 			}
 		});
 	}

 	/**
 	 * 分页初始化
 	 * @param  {number} pno 当前页
 	 * @event $('#pageList').data('page') 存储
 	 */
 	List.prototype._page = function(pno) {
 		var that = this;
 		var $page = $('#pageList').myPage({
 			pno: pno,
 			total: 1,
 			clickFn: function(n) {
 				var data = that.getPostData();
 				data.page = n;
 				that._postListGet(data);
 			}
 		});
 		$('#pageList').data('page', $page);
 	}

 	/**
 	 * @public 初始化
 	 * @param  {obejct} opt 参数
 	 * @event 初始化获取列表
 	 * @override tableTplFn getPostData getData base
 	 * @const base
 	 * @throws {string} If opt.base && opt.tableTplFn && opt.getPostData 必填
 	 */
 	List.prototype.init = function(opt) {

 		if (!opt.base && !opt.tableTplFn && !opt.getPostData) {
 			throw new Error('base,tableTplFn,getPostData is must rewrite');
 		}
 		//@override 覆盖事件
 		this.base = opt.base || ''; //基础路径
 		this.tableTplFn = opt.tableTplFn || function() {};
 		this.getPostData = opt.getPostData || function() {};
 		this.getData = opt.getData || function() {};
 		this.initEditBox = opt.initEditBox || this.initEditBox;

 		//循环绑定事件
 		var array = opt.fn || [];
 		for (var i = 0; i < array.length; i++) {
 			try {
 				this['_' + array[i]]();
 			} catch (e) {
 				throw new Error(array[i] + ' is not a function');
 			}
 		}
 		//初始化列表
 		this._postListGet();
 	}

 	bsz.list = List;
 	return bsz;
 });