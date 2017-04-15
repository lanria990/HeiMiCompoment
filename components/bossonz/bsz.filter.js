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
	var bsz = {};
	var $ = require('jquery');
	
	/**
	 * 数据过滤
	 *
	 */
	bsz.filter = {
		intIsNaN: function(id, defaultValue) {
			var _value = parseInt($(id).val());
			if (isNaN(_value) || _value === -1) {
				_value = defaultValue;
			}
			return _value;
		}
	}
	return bsz;
});