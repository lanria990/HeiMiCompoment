/**
 * 提示框重构
 * @implements {json} code.json 提示码
 * @implements {jquery}
 * @author YJL 2015/04/28
 */

var codes = __inline('./code.json');
var promptTplFn = __inline('./_m-prompt.tmpl');
var minPromptTplFn = __inline('./_m-min-prompt.tmpl');
var $ = require('jquery')

function _remove() {
	var $box = $(this).parents('.tip');
	$box.addClass('out');
	setTimeout(function() {
		$box.remove();
	})
}


/**
 * prompt弹出框
 * @param  {string} content    提示内容
 * @param  {string} errorLevel 错误提示等级
 * @param  {string} title      标题
 * @default title   '提示信息'
 * @default content '系统繁忙，请稍后再试。'
 * @default errorLevel 'info'
 */
function prompt(opt) {
	// opt.title = opt.title || '提示信息';
	// opt.errorLevel = opt.errorLevel || 'info';
	opt.button = {};
	opt.button.sure = false;
	opt.button.close = true;
	var dom = $(promptTplFn({
		item: opt
	}));
	// dom.find('button[data-dismiss=modal]').click(function(event) {
	// 	dom.hide(function() {
	// 		dom.remove();
	// 	});
	// });
	dom.appendTo('body').children().show();
	if (opt.button.close) {
		dom.find('button.cacel').click(_remove);
	}
	if (opt.close) {
		dom.find('button.close').click(_remove);
	}
	if (opt.sure) {
		if (typeof opt.button.success === 'function') {
			dom.find('button.sure').click(function() {
				opt.button.success(this);
			});
		} else {
			dom.find('button.sure').click(_remove);
		}
	}
}


function minPrompt(opt) {
	switch (opt.error) {
		case 'success':
			opt.tipText = '&#xe684;';
			break;
		case 'fail':
			opt.tipText = '&#xe6ea;';
			break;
		case 'warn':
			opt.tipText = '&#xe672;';
			break;
		case 'loading':
			opt.tipText = '';
			break;
	}
	opt.time = opt.time || 600;
	var dom = $(minPromptTplFn({
		content: opt.content,
		tipClass: opt.error || 'warn',
		tipText: opt.tipText || ''
	}));
	dom.show().appendTo('body').addClass('in');
	if (!opt.auto) {
		dom.delay(opt.time).fadeOut('400', function() {
			dom.remove();
		});
	}
}

/**
 * 提示码
 * @param  {number} num 提示码数字
 */
function code(num) {
	prompt(codes[num]);
}
return {
	code: code,
	prompt: prompt,
	pop: minPrompt
};