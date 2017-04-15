 var $ = require('jquery');
 var bsz = require('bsz.core');
 require('selectgoods');
 var sgoods;

 /**
  * 获取基本
  * @return {string} 路径
  */
 function _base() {
 	return '/admin/usermgr/index/';

 }

 /**
  * 初始化选择商品控件
  */
 function _initSelectGoods() {
 	var type = window.typeList || [];
 	var data = {};
 	data.content = [{
 		'id': 1,
 		'title': ' 苹果',
 		'sid': 123,
 		'gsTypeId': 122,
 		'img': 'http://dummyimage.com/200x100',
 		'price': 190000,
 		'url': 'wdekee.io'
 	}, {
 		'id': 2,
 		'title': ' 苹果',
 		'gsSubTypeId': 123,
 		'gsTypeId': 122,
 		'img': 'http://dummyimage.com/200x100',
 		'price': 190000,
 		'url': 'gvcl.edu'
 	}, {
 		'id': 3,
 		'title': ' 苹果',
 		'gsSubTypeId': 123,
 		'gsTypeId': 122,
 		'img': 'http://dummyimage.com/200x100',
 		'price': 190000,
 		'url': 'crs.gov'
 	}]

 	//选商品初始化
 	$('body').mySelect({
 		isMultiply: false, //是否多选
 		isImg: true, //是否显示图片
 		isPrice: true, //价格
 		isTime: true,
 		boxId: 'selectPan',
 		search: {
 			isSelect: true, //select框
 			isSelectMultiplyLevel: true, //多级分类
 			isInput: true, //input框
 			isAjax: false, //是否ajax获取多级分类
 			selectEmpty: 'empty',
 			getSelectData: function() { //获取多级分类ajax参数
 			}
 		},
 		ajaxOption: {
 			getSearchData: function() { // 获取搜索数据参数
 			},
 			ajaxDataFilter: function(res) {
 				return res;
 			},
 			source: '' //分页获取ajax路径
 		},
 		data: {
 			select: [{
 				id: '1',
 				name: '超市',
 				children: 0
 			}, {
 				id: 2,
 				name: '超市1',
 				children: 1
 			}], //初始化数据
 			input: '',
 			content: data.content,
 			selectName: ['typeId'],
 			selectMultiply: [{
 				id: 1,
 				name: 'dd',
 				parentId: 2
 			}]
 		},
 		pageOption: null,
 		fillOption: {
 			selector: '.J_Input', //选择器
 			fnName: 'focus',
 			clickCall: function(data) { //选中回调事件

 			}

 		}
 	});
 }

 /**
  * 发布首页
  */
 function _publish() {
 	var _url = _base() + 'submitAjax.do';
 	bsz.widget.ajax(_url, {}, function() {
 		bsz.alert.alert('发表成功');
 	});
 }

 $(function() {
 	_initSelectGoods()
 		// $(document).on('focus', '.J_Input', function() {
 		// 	sgoods = $(this);
 		// 	$('#selectPan').show();
 		// });

 	//发布
 	$('#publish').click(function(event) {
 		bsz.alert.confirm('确认发布？请细心核对所有数据，一经发布，无法恢复', _publish);
 	});
 });