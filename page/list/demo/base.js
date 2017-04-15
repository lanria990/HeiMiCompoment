 /*!
  * m-list.js 列表组件
  * @event 必须包含getPostData/getData/
  * @author YJL
  * @version 0.0.1
  * @copyright BOSSONZ
  * @namespace bsz
  * Date 2015/04/24
  */
 var bsz = require('widget/m-list/bsz.list.js');
 var tableTplFn = __inline('/static/libs/list/_baseTb.tmpl') //加载列表模板
 require('upload') //加载upload
 var $page;
 require('page'); //加载分页组件
 // console.log(bsz)

 function _baseUrl() {
   return '/admin/list/';
 }

 /**
  * 获取分页查询ajax参数
  * @return {object} ajax参数
  */
 function getPostData() {
   var o = {};
   o.page = $('#pageList').data('page').getNowPage();
   o.name = $('#searchText').val();
   o.type = $('#type').val();
   o.state = $('#state').val();
   return o;
 }

 /**
  * 获取添加或修改弹窗ajax参数
  * @param  {object} obj 弹窗指向
  * @return {obejct}     ajax参数
  */

 function getData(obj) {
   var o = {};
   //校验，renturn null;
   return o;
 }



 $(function() {
   bsz.check.init(); //初始化全选事件
   var list = new bsz.list(); //初始化列表事件
   list.init({
     tableTplFn: tableTplFn,
     getPostData: getPostData,
     getData: getData,
     base: '/admin/list/', //基本路径
     fn: ['search', 'delAll', 'page', 'del', 'change'] //初始化函数
   })
 });