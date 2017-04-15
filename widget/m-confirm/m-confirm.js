/**
 * comfirm 弹窗
 * @implements {jquery}
 * @author YJL 2015/04/28
 */


var modalTplFn = __inline('./_m-confirm.tmpl');
var $ = require('jquery')

var noop = function() {};
var defaultOptions = {
	title: '',
	confirmed: noop,
	canceled: noop,
	confirmTxt: '确认',
	cancelTxt: '取消'
}

/**
 * comfirm 弹窗
 * @param  {string} content 内容块
 * @param  {object} opt     参数
 * @param  {[type]} arg     回调函数函数的参数
 * @param {Object} scope 	函数作用域
 * @event 回调函数
 */
module.exports = function(content, opt, arg,scope) {
	if (typeof opt === 'function') {
		opt = {
			confirmed: opt
		};
	}
	opt = $.extend({}, defaultOptions, opt);
	var dom = $(modalTplFn({
		content: content,
		title: opt.title || '提示信息',
		confirmTxt: opt.confirmTxt,
		cancelTxt: opt.cancelTxt
	}));

	dom.appendTo('body')
		.on('click', '.J_FSure', function() {
			scope = scope || this;
			opt.confirmed.apply(scope, [arg]);
			// opt.confirmed(arg)
			dom.fadeOut(function() {
				dom.remove();
			});
		})
		.on('click', '.btn-cancel', function() {
			dom.remove();
		}).addClass('in').show()
		.on('click', '.J_FClose', function() {
			dom.remove();
		});
};