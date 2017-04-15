var $ = require('jquery'); /*jquery引用*/
var prompt = require('widget/m-prompt/m-prompt');

$(function() {
	prompt.pop({
		content: '发送错误',
		error: 'fail'
	});
	// prompt.prompt({
	// 	cont: {
	// 		content: '发送错误'
	// 	},
	// 	error: 'fail'
	// });


	$('#mask-tip-btngree').click(function(event) {
		// $('.mask-tip-gree').addClass('mask-tip-in');
		prompt.prompt({
			boxClass: 'mask-tip-gree',
			title: '付款提示',
			cont: {
				content: '发送错误'
			},
			close: true,
			error: 'fail'
		});

	});

	$('#mask-tip-btndefualt').click(function(event) {
		prompt.prompt({
			// boxClass: 'mask-tip',
			title: '付款提示',
			cont: {
				content: '发送错误'
			},
			close: true,
			error: 'fail'
		});
	});

	$('#mask-tip-icon').click(function(event) {
		prompt.prompt({
			title: '付款提示',
			icon:'&#xe672;',
			cont: {
				content: '发送错误'
			},
			close: true,
			error: 'fail'
		});

	});

	$('#mask-tip-algin').click(function(event) {
		prompt.prompt({
			title: '付款提示',
			icon:'&#xe672;',
			cont: {
				content: '发送错误'
			},
			close: true,
			error: 'fail'
		});

	});

	$('#mask-tip-operation').click(function(event) {
		prompt.prompt({
			boxClass:'mask-operation',
			title: '付款提示',
			cont: {
				icon:'&#xe672;',
				class:'fail',
				content: '发送错误'
			},
			close: true,
			error: 'fail'
		});

	});

	$('#mask-tip-operations').click(function(event) {
		// $('.mask-tip-operations').addClass('mask-tip-in');
		prompt.prompt({
			boxClass:'mask-tip-operations',
			title:'提示',
			cont: {
				icon:'&#xe672;',
				class:'success mar',
				content: '注册出错'
			},
			close: true
			// error: 'fail'
		});

	});

	$('#mask-tip-time').click(function(event) {
		prompt.prompt({
			boxClass:'mask-tip-operations',
			title:'',
			titleClass:'title-background',
			cont: {
				icon:'&#xe672;',
				class:'success mar',
				content: '注册出错'
			},
			close: true
			// error: 'fail'
		});

	});

	// $('#mask-tip-time,#mask-tip-operations,#mask-tip-operation,#mask-tip-btngree,#mask-tip-btndefualt,#mask-tip-icon,#mask-tip-algin').click(function(event) {
	// 	$('.m-mask').addClass('in').removeClass('dn');

	// });

	// $('.close,.sure,.cacel').click(function(event) {
	// 	$('.mask-tip-time,.mask-tip-operations,.mask-tip-operation,.mask-tip-gree,.mask-tip-defualt,.mask-tip-icon,.mask-tip-algin').removeClass('mask-tip-in');
	// 	$('.m-mask').removeClass('in').addClass('dn')
	// });
});