/**
 * 提示框重构
 * @implements {json} code.json 提示码
 * @implements {jquery}
 * @author YJL 2015/04/28
 */

var codes = __inline('./code.json');
var alertTplFn = __inline('./_m-alert.tmpl');
var $ = require('jquery')

/**
 * alert弹出框
 * @param  {string} content    提示内容
 * @param  {string} errorLevel 错误提示等级
 * @param  {string} title      标题
 * @default title   '提示信息'
 * @default content '系统繁忙，请稍后再试。'
 * @default errorLevel 'info'
 */
function alert(content, errorLevel, title) {
	if (content === '') {
		content = '系统繁忙，请稍后再试。';
	}
	if (content == null) {
		content = '无效操作';
	}
	var dom = $(alertTplFn({
		title: title || '提示信息',
		content: content,
		errorLevel: errorLevel || 'info'
	}));
	dom.find('button[data-dismiss=modal]').click(function(event) {
		dom.hide(function() {
			dom.remove();
		});
	});
	dom.show().appendTo('body').addClass('in');
}

/**
 * 提示码
 * @param  {number} num 提示码数字
 */
function code(num) {
	alert(codes[num]);
}

/**
 * 暴露方法
 */
exports.code = code;
exports.alert = alert;