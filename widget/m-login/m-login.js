/**
 * @required[jquery,bsz]
 * @author YJL 2015/04/07
 * @description 登录 校验
 */

var $ = require('jquery');
var bsz = require('bsz.core');

/**
 * 提示
 * @param  {string} tipcont 提示内容
 */
function _tip(tipcont) {
	$('#loginError').html(tipcont);
}

/**
 * 登录校验
 * @return {obejct}  name,pwd,type
 */
function _validateLogin() {
	var $form = $('#loginForm');
	var o = {};
	var str;
	o.name = $('#userName').val();
	o.pwd = $('#passWd').val();
	o.type = false;
	if (o.name === '' && o.pwd === '') {
		str = '请输入账户名和密码';
	} else if (o.name === '') {
		str = '请输入账户名';
	} else if (o.pwd === '') {
		str = '请输入密码';
	} else if (o.pwd.length < 6 || o.pwd.length > 20) {
		str = '密码格式错误';
	} else {
		o.type = true;
	}
	if (o.type) {
		_tip('');
	} else {
		_tip(str);
	}
	return o;
}

$(function() {
	$('#loginForm').submit(function() {
		var o = _validateLogin();
		if (o.type) {
			$.ajax({
				url: '/admin/login/loginAjax.do',
				type: 'post',
				data: o,
				success: function(res) {
					if (res.code === 0) {
						window.location.href = '/';
					} else {
						_tip('账号密码错误');
					}
				},
				fail: function() {
					_tip('');
					bsz.alert.code(-1);
				}
			});
		}
		return false;
	});
});