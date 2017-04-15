 (function(bsz) {
 	if (typeof module != 'undefined' && module.exports && this.module !== module) {
 		module.exports = bsz
 	} else if (typeof define === 'function' && define.amd) {
 		define(bsz)
 	} else {
 		window.bsz = bsz
 	}
 })(function(win) {
 	var bsz = {};

 	/**
 	 * 过滤数据类
 	 * @class
 	 */
 	function Filter() {}
 	Filter.prototype = {
 		_El: function(dU, Z) {
 			if (!dU || !Z || !Z.replace) return Z || '';
 			return Z.replace(dU.r, function($1) {
 				var bu = dU[!dU.i ? $1.toLowerCase() : $1];
 				return bu != null ? bu : $1;
 			});
 		},
 		reverse: function(str) { // html 转化成带格式的文本
 			var a = {
 				r: /\<br\/>|\<br>|\&amp;|\&#39;|&nbsp;|\&gt;|\&lt;|\&quot;|\r;/g,
 				'<br/>': '\n',
 				'<br>': '\n',
 				'&amp;': '&',
 				'&#39;': '\'',
 				'&nbsp;': ' ',
 				'&gt;': '>',
 				'&lt;': '<',
 				'&quot;': '"',
 				'': '\r'
 			};
 			return this._El(a, str);
 		},
 		filter: function(str) { // 带格式的文本内容转化成html
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
 			return this._El(a, str);
 		}
 	};
 	
 	bsz.filter = new Filter();



 });