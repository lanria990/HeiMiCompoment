/**
 * 核心模块，各种常用的方法
 * @author YJL 2015-03-26
 *
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
	/**
	 * 掺元类 先创建一个包含各种方法的通用类，然后再用它扩充其他类
	 * [augment  继承
	 * @param  {[type]} receivingClass 接受方法的类
	 * @param  {[type]} givingClass    [给予方法的类]
	 * ```javascript
	 * argument(Author,Mixin,'serialize');
	 * ```
	 */
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

	var bsz = {};
	bsz.alert = {
		code: function() { //提示码alert弹窗
			throw new Error('Unsupported operation on an abstract class .');
		},
		alert: function() { //alert弹窗
			throw new Error('Unsupported operation on an abstract class .');
		},
		confirm: function() { //confirm弹窗
			throw new Error('Unsupported operation on an abstract class .');
		}
	}
	bsz.alert = require('widget/m-alert/m-alert');
	bsz.alert.confirm = require('widget/m-confirm/m-confirm');



	// 对外提供接口
	bsz.widget = {
		ajax: function(ajaxUrl, ajaxData, ajaxDone, scope) {
			$.ajax({
				url: ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: ajaxData,
			}).done(function(res) {
				switch (res.code) {
					case 0:
						scope = scope || this;
						ajaxDone.call(scope, res);
						break;
					case 10002:
						top.location.href = '/admin/linqin/login';
						break;
					default:
						bsz.alert.alert(res.msg);
				}

			}).fail(function() {
				bsz.alert.code(-1);
				throw new Error('failed xhr.');
			});
		},
		initBox: function(id, ajaxFn, thisList, idFn) {
			var $box = $(id + 'Box');
			var that = this;
			$box.find('.J_BSure').click(function() {
				ajaxFn.call(this, thisList);
			});
			$box.find('.J_BCancel,.J_BClose').click(this.hideBox);
			if ($(id).length) {
				$(id).click(function() {
					if (typeof _idFn == 'function') {
						idFn(id);
					} else {
						that.clearBox($box);
						that.showBox($box);
					}
				});
			}
			return this;
		},
		clearBox: function($box) {
			var arrayType = $box.data('box').split(''); //input textarea img select
			for (var i = 0, len = arrayType.length; i < len; i++) {
				this.clearEventBox(arrayType[i], $box);
			}
		},
		clearEventBox: function(type, $box) {
			switch (type) {
				case 'input':
				case 'textarea':
					$box.find(type).val('');
					break;
				case 'select':
					$box.find('select').val(-1);
					break;
				case 'img':
					$box.find('img').attr('src', '/static/images/img2.jpg');
					break;
				default:
					return;
			}
		},
		showBox: function($box) {
			$box.show();
			$('#sharemask').show();
		},
		hideBox: function(obj) {
			$(this).closest('.tip').hide();
			$('#sharemask').hide();
		},
		hideOBox: function(obj) {
			$(obj).closest('.tip').hide();
			$('#sharemask').hide();
		}
	};
	return bsz;
});