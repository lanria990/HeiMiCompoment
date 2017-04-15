 /*!
  * m-list.js 列表组件
  * @event 必须包含getPostData/getData/
  * @author YJL
  * @version 0.0.1
  * @copyright BOSSONZ
  * @namespace bsz
  * Date 2015/04/24
  */

 var bsz = require('./bsz.list.js');
 var tableTplFn = __inline('./_Tb.tmpl') //加载列表模板

 require('upload') //加载upload
 require('page') //加载分页组件
   // console.log(bsz)
   // 
 function _baseUrl() {
     // return '/admin/life/sm/type/first/';
     return '/admin/ct/type/';
   }
   /**
    * 获取分页查询ajax参数
    * @return {object} ajax参数
    */
 function getPostData() {
   var o = {};
   o.page = 1;
   o.name = $('#searchText').val();
   return o;
 }

 /**
  * 获取添加或修改弹窗ajax参数
  * @param  {object} obj 弹窗指向
  * @return {obejct}     ajax参数
  */
 function getData(obj) {
     var o = {};
     return o;
   }
   /**
    * 修改状态
    * @param  {object} data {id:id,state:(0: 下架,1: 上架)}
    */
 function _postChange(data) {
   var _url = _baseUrl() + 'change_ajax.do';
   $.ajax({
     url: _url,
     type: 'POST',
     dataType: 'json',
     data: data
   }).done(function(res) {
     if (res.code === 0) {
       bsz.alert.code(801);
       var data = _getPageData();
       _postFindGet(data);
     } else {
       bsz.alert.alert(res.msg);
     }
   }).fail(function(res) {
     bsz.alert.code(res.code);
   });

 }

 $(function() {
   bsz.check.init(); //初始化全选事件
   var list = new bsz.list(); //初始化列表事件
   list.init({
     tableTplFn: tableTplFn,
     getPostData: getPostData,
     geData: getData,
     base: '/admin/list/', //基本路径
     fn: ['search', 'delAll', 'add', 'page', 'del', 'edit', 'change'] //初始化函数
   })
   console.log(list);
   //删除修改
   $(document).on('click', 'a.J_Del', function() {
     var id = $(this).parents('tr').data('id');
     if (id == null || typeof id === 'undefined') {
       return;
     }
     var arry = [];
     arry.push(id);
     bsz.alert.confirm('确定要删除该项吗?', _postDel, arry);
   }).on('click', 'a.J_Change', function() {
     var data = {};
     data.id = parseInt($(this).parents('tr').data('id'));
     data.state = parseInt($(this).data('state'));
     if (isNaN(data.id) || typeof data.id === 'undefined') {
       return;
     }
     if (isNaN(data.state)) {
       data.state = 0;
     }
     _postChange(data)
   }).on('click', 'a.J_Edit', _initEditBox);
   // 
   // $.ajax({
   // 	url: '/find',
   // 	// type: 'POST',
   // 	// dataType: 'json',
   // })
   // .then(function() {
   // 	console.log('success');
   // })
   // .fail(function() {
   // 	console.log('error');
   // })
   // .always(function() {
   // 	console.log('complete');
   // });

 });