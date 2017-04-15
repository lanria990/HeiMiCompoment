/**
 *  @author YJL 2015/05/06
 *  @description 整理手机编辑模块功能 文字和图片的{添加、编辑、上移、下移}
 */

var $ = require('jquery');
require('upload');
// var bsz = require('bsz.core');
var imgTplFn = __inline('./_img.tmpl');
var textTplFn = __inline('./_text.tmpl');
var phoneCont = $('#J_Phone_Cont');

function _reverse(str) { // html 转化成带格式的文本
	str = str.replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&amp;/g, '&')
		.replace(/&#39;/g, '\'')
		.replace(/&quot;/g, '"')
		.replace(/&nbsp;/g, ' ')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<');
	return str;
}

function _filter(str) { // 带格式的文本内容转化成html
	var a = {
		r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		' ': '&nbsp;',
		'"': '&quot;',
		'\'': '&#39;',
		'\n': '<br/>',
		'\r': ''
	};
	var _El = function(dU, Z) {
		if (!dU || !Z || !Z.replace) return Z || '';
		return Z.replace(dU.r, function($1) {
			var bu = dU[!dU.i ? $1.toLowerCase() : $1];
			return bu != null ? bu : $1;
		});
	}
	return _El(a, str);
}

/**
 * 排序，对内容块上下移动进行排序
 */
function _lisort() {
	var $div = phoneCont.find('div.J_P_Cont'),
		len = $div.length,
		up, down;
	$div.each(function(i) {
		var up = $(this).find('.J_P_Up'),
			down = $(this).find('.J_P_Down');
		if (i === 0) {
			up.addClass('up-disable');
			down.removeClass('down-disable');
			if (len === 1) {
				down.addClass('down-disable');
			}
		} else if (i === len - 1) {
			down.addClass('down-disable');
			up.removeClass('up-disable');
		} else {
			up.removeClass('up-disable');
			down.removeClass('down-disable');
		}
	});

}

/**
 * 获取父亲
 * @return {obj} 内容块
 */
function _getParentDiv(obj) {
	return $(obj).parents('div.J_P_Cont')
}

/**
 * 编辑器自动滚动到底部
 * @return {[type]} [description]
 */
function _editScroll(dom) {
	$(dom).appendTo(phoneCont);
	_lisort();
	var h = phoneCont.height();
	$('#J_Phone_Scroll').animate({
		scrollTop: h
	}, 400);
}

/**
 * [_tpmlImg 模板函数img]
 * @param  {[string]} src [路径]
 * @return {[type]}     [description]
 */
function _tpmlImg(src) {
	var dom = imgTplFn({
		src: src
	});
	_editScroll(dom);
}

/**
 * [_tpmlText 添加文字模板]
 * @param  {[string]} content [添加的内容]
 * @return {[type]}         [description]
 */
function _tpmlText(content) {
	var dom = $(textTplFn({
		cont: content
	}));
	_editScroll(dom);
}

/**
 * 隐藏弹窗
 * @return {[type]} [description]
 */
function _boxHide() {
	var $box = $(this).parents('.tip');
	$box.data('edit', null);
	$box.hide();
	$('#sharemask').hide();
}

/**
 * 显示弹窗
 * @return {[type]} [description]
 */
function _boxShow(obj) {
	$(obj).show();
	$('#sharemask').show();
}


/**
 * [_getPhoneData 获取手机端内容]
 * @return {array[object]} [description]
 */
function _getPhoneData() {
	var data = [];
	var o = {};
	phoneCont.find('.J_P_Cont').each(function(i) {
		o = {};
		o.type = parseInt($(this).data('type'));
		if (o.type === 0) {
			o.value = _reverse($(this).find('.content').html());
		} else {
			o.value = $(this).find('img.J_Img').attr('src')
		}
		data.push(o);
	});
	return data;
}

/**
 * [_initPhone 初始化手机端内容]
 * @param  {[array[object]} data []
 */
function _initPhone(data) {
	var dom = '';
	for (var i = 0; i < data.length; i++) {
		if (data[i].type === 0) {
			dom += textTplFn({
				cont: _filter(data[i].value)
			});
		} else {
			dom += imgTplFn({
				src: data[i].value
			});
		}
	}
	_editScroll(dom);
}

/**
 * [_addText 手机端添加文字]
 */
function _addText() {
	var $edit = $('#J_P_EditBox');
	var obj = $edit.data('edit');
	var content = _filter($edit.find('textarea').val());
	if (!!obj) {
		$(obj).find('.content').html(content);
		_boxHide.apply(this);
		return;
	}
	_tpmlText(content);
	_boxHide.apply(this);
	// bsz.widget.boxHide(this);
}

/**
 * 修改手机内容
 * @param  {obejct} obj 编辑内容块对象
 * @return {[type]}     [description]
 */
function _initModifyPhone(obj) {
	var type = parseInt($(obj).data('type'));
	if (type === 0) {
		var cont = $(obj).find('.content').html();
		var $edit = $('#J_P_EditBox');
		$('#J_P_EditArea').val(_reverse(cont));
		$edit.data('edit', obj);
		_boxShow($edit);
	} else {
		var $editImg = $('#J_P_EditImgBox');
		$editImg.data('edit', obj);
		var _src = $(obj).find('img').attr('src');
		$('#J_P_EditImg').attr('src', _src);
		_boxShow($editImg);
	}
}



/**
 * 编辑图片弹窗初始化
 */
function _initEditImg() {
	var $box = $('#J_P_EditImgBox');
	$box.find('.J_BSure').click(function() {
		var obj = $box.data('edit'),
			_src = $('#J_P_EditImg').attr('src');
		if (!!obj) {
			$(obj).find('img').attr('src', _src);
		}
		_boxHide.apply(this);
	});
	$box.find('.J_BCancel').click(_boxHide);
}

/**
 * 编辑文字弹窗初始化
 */
function _initEditText() {
	var $box = $('#J_P_EditBox');
	$box.find('.J_BSure').click(_addText);
	$box.find('.J_BCancel').click(_boxHide);
}

function init() {
	_initEditImg();
	_initEditText();
	//手机上传图片
	$('#J_Phone_Upload').myUpload({
		id: '#J_Phone_Upload',
		formDataValue: {
			uploadBusiness: 'ct_phone'
		},
		isDel: false,
		success: function(file, res) {
			$('#' + file.id).remove();
			if (res.code === 0) {
				_tpmlImg(res.map.imgUrl)
			}
		}
	});

	//图片编辑
	$('#J_P_EditImgUpload').myUpload({
		id: '#J_P_EditImgUpload',
		formDataValue: {
			uploadBusiness: 'ct_phone'
		},
		isDel: false,
		success: function(file, res) {
			$('#' + file.id).remove();
			if (res.code === 0) {
				$('#J_P_EditImg').attr('src', res.map.imgUrl);
			}
		}
	});

	$('#J_Phone_Text').click(function() {
		$('#J_P_EditArea').val('');
		_boxShow('#J_P_EditBox');
	});

	//手机端内容、删除、上移、下移
	phoneCont.on('click', 'a.J_P_Del', function() {
		_getParentDiv(this).remove();
		_lisort();
	}).on('click', 'a.J_P_Modify', function() {
		_initModifyPhone(_getParentDiv(this));
	}).on('click', 'a.J_P_Up', function() {
		if ($(this).hasClass('up-disable')) {
			return;
		}
		var $div = _getParentDiv(this);
		$div.insertBefore($div.prev());
		_lisort();
	}).on('click', 'a.J_P_Down', function() {
		if ($(this).hasClass('down-disable') || $('.J_Down').length === 1) return;
		var $div = _getParentDiv(this);
		$div.insertAfter($div.next());
		_lisort();
	});
}

// init();

// phoneCont.data('phone-edit',{
// 	init:init,
// 	getData: _getPhoneData,
// 	initModify: _initModifyPhone
// });
// phoneCont.data('init',init);
// phoneCont.data('init',init);
module.exports = {
	init: init,
	getData: _getPhoneData,
	initModify: _initModifyPhone
}