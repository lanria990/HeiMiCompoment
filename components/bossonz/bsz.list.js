 (function(bsz) {
     if (typeof module != 'undefined' && module.exports && this.module !== module) {
         module.exports = bsz
     } else if (typeof define === 'function' && define.amd) {
         define(bsz)
     } else {
         window.bsz = bsz
     }
 })(function(win) {
     var bsz = bsz || {};
     /**
      * 类继承
      * @param  {function} subClass   继承类
      * @param  {function} superClass 父亲类
      */
     function extend(subClass, superClass) {
         var F = function() {};
         F.prototype = superClass.prototype;
         subClass.prototype = new F();
         subClass.prototype.constructor = subClass;

         subClass.superclass = superClass.prototype;
         if (subClass.prototype.constructor == Object.prototype.constructor) {
             subClass.prototype.constructor = superClass;
         }
     }

     /*===========================================
      * @  全选 bsz.check
      * @warn 全局样式名：J_Table
      * @options {inserse:'是否反选'}
      * @function getCheckedTr获取选中的tr
      * @function setInputAll 设置全选 @param true||false
      * @init 初始化
      *===========================================*/
     bsz.check = {
         $table: $('.J_Table'),
         checkAll: $('input[name=checkAll]'),
         items: function() {
             return this.$table.find('input[name=items]')
         },
         init: function(opt) {
             var that = this;
             this.checkAll.click(function() {
                 that._setInputItems(this.checked);
                 that.setInputAll(this.checked);
             });
         },
         getCheckedTr: function() {
             return this.items().filter(':checked').parents('tr');
         },
         setInputAll: function(type) {
             this.checkAll.each(function() {
                 this.checked = type;
             });
         },
         _setInputItems: function(type) {
             this.items().each(function() {
                 this.checked = type;
             });
         }

     }


     /**
      * ==========================================================================
      * @class 列表类
      * @function _add,_search,_del,_delAll,_tmpl
      *
      * 删除：.J_Del, 全部删除：#delAll,搜索：#searchBut,上传:.J_Upload
      *上传成功函数 parents：tr,分页：pageList 修改:J_Edit
      *
      *@param {obejct} [opt] {base:路径，tableTplFn:列表模板}
      *
      *@author YJL 2015/03/27
      *@version 0.0.1
      *javascript``
      * bsz.list.init({base:'',tableTplFn:function(){},getPostData:function(){}})
      *
      *``````
      * ==========================================================================
      */

     /**
      * 特殊的通用操作
      */
     function SuperListOpt() {}

     SuperListOpt.prototype._uploadSucess = function(file, res, id) {
         $('#' + file.id).remove();
         if (res.code === 0) {
             $(id).parents('tr').find('img').attr('src', res.map.imgUrl);
         }
     }

     function Box() {}

     Box.prototype = {
         init: function(id, ajaxFn, idFn) {
             var $box = $(id + 'Box');
             var that = this;
             $box.find('.J_BSure').click(ajaxFn);
             $box.find('.J_BCancel,.J_BClose').click(function() {
                 $box.hide();
                 that.hideMask();
             });
             if ($(id).length) {
                 $(id).click(function() {
                     if (typeof _idFn == 'function') {
                         idFn(id);
                     } else {
                         that.clear($box);
                         that.boxShow($box);
                     }
                 });
             }
             return this;
         },
         clear: function($box) {
             var arrayType = $box.data('box').split(''); //input textarea img select
             for (var i = 0, len = arrayType.length; i < len; i++) {
                 this.clearEvent(arrayType[i], $box);
             }
         },
         clearEvent: function(type, $box) {
             switch (type) {
                 case 'input':
                 case 'textarea':
                     $box.find(type).val('');
                     break;
                 case 'select':
                     $box.find('select').val(-1);
                     break;
                 case 'Img':
                     $box.find('img').attr('src', '/static/images/img2.jpg');
                     break;
                 default:
                     return;
             }
         }

     }

     bsz.widget = {
         ajax: function(ajaxUrl, ajaxData, ajaxDone) {
             $.ajax({
                 url: ajaxUrl,
                 type: 'POST',
                 dataType: 'json',
                 data: ajaxData,
             }).done(function(res) {
                 switch (res.code) {
                     case 0:
                         ajaxDone(res);
                         break;
                     case 10002:
                         top.location.href = '/admin/linqin/login';
                         break;
                     default:
                         bsz.alert.alert(res.msg);
                 }

             }).fail(function() {
                 bsz.alert.code(-1);
             });
         }

     }

     /**
      * 通用操作
      */
     function CommonListOpt() {}

     CommonListOpt.prototype = {
         tbody: $('#container'),
         tableTplFn: function() {
             throw new Error('Unsupported operation on an abstract class .');
         },
         getPostData: function() {
             throw new Error('Unsupported operation on an abstract class .');
         },
         getData: function() {
             throw new Error('Unsupported operation on an abstract class .');
         },
         getId: function(obj) { //获取id
             var id = $(obj).parents('tr').data('id')
             if (typeof id !== 'undefined' && id != null) {
                 return null;
             }
             return id;
         },
         _pnoIs: function(data, total, pno) { //判断
             var type = !data || data.length === 0;
             if (pno > total && type && total >= 1) {
                 var _o = this.getPostData();
                 _o.page = total;
                 this._postListGet(_o);
                 return false;
             }
             return true;
         },
         _tmplTable: function(data, total, pno) { //模板
             if (this._pnoIs(data, total, pno)) {
                 var dom = this.tableTplFn({
                     items: data,
                 });
                 $('td.J_Order').each(function(i) {
                     $(this).html(i + 1);
                 });
                 this.tbody.html(dom);
                 $('#pageList').data('page').selectPage(pno, total);
                 $('#lCont').show();
                 $('#loading').hide();
             }
         },
         _initPage: function(pno) { //分页初始化
             var that = this;
             var $page = $('#pageList').myMinPage({
                 pno: pno,
                 total: 1,
                 clickFn: function(n) {
                     var data = that.getPostData();
                     data.page = n;
                     that._postListGet(data);
                 }
             });
             $('#pageList').data('page', $page);
         }
     }

     //获取分页
     CommonListOpt.prototype._postListGet = function(data) {
         var _url = this.base + 'findPageAjax.do';
         var that = this;
         data = data || this.getPostData();
         bsz.widget.ajax(_url, data, function(res) {
             that._tmplTable(res.map.list, res.map.pageIndex, res.map.pageCount);
         });
     }

     function List(opt) {
         this.base = opt.list.base || ''; //基础路径
         this.tableTplFn = opt.list.tableTplFn || function() {};
         this.getPostData = opt.list.getPostData || function() {};
         this.geData = opt.list.getData || function() {};
     }
     extend(List, CommonListOpt);

     List.prototype = {
         _postDel: function(arrayID) { //删除 和批量删除
             var _url = this.base + 'delBatchAjax.do';
             bsz.widget.ajax(_url, {
                 ids: arrayID
             }, this._postListGet);
         },
         _postPage: function(n) { //分页获取
             var data = this.getPostData();
             data.page = n;
             this._postListGet(data);
         },
         _postEdit: function(ID) { //h获取单条
             var _url = this.base + 'findDetailAjax.do';
             var that = this;
             bsz.widget.ajax(_url, {
                 id: ID
             }, function(res) {
                 that._initEdit(res.map.item, ID);
             });
         },
         _postsave: function() {
             var _url = this.base + 'saveAjax.do';
             var _data = this.getData(this);
             var that = this;
             if (_data === null) {
                 return;
             }
             bsz.widget.ajax(_url, _data, function(res) {
                 var data = that.getPostData();
                 if (!_data.id) {
                     data.page = 1;
                     data.name = '';
                 }
                 that._postListGet(data);
                 bsz.widget.boxHide(that);
             });
         },
         _del: function() { //删除
             var that = this;
             this.tbody.on('click', 'a.J_Del', function() {
                 var id = that.getId();
                 if (id) {
                     var array = [];
                     array.push(id);
                     bsz.alert.confirm('确定要删除该项吗?', that._postDel, array);
                 }
             });
         },
         _delAll: function() { //全部删除
             var that = this;
             $('#delAll').click(function() {
                 var $tr = bsz.check.getCheckedTr();
                 if ($tr.length === 0) {
                     bsz.alert.alert('请选择要删除的选项');
                 } else {
                     var ids = [];
                     $tr.each(function(i) {
                         ids[i] = $(this).data('id');
                     });
                     bsz.alert.confirm('确定要删除该项吗?', that._postDel, ids);
                 }
             });
         },
         _search: function() { //搜索
             var that = this;
             $('#searchBut').click(function() {
                 var data = that.getPostData();
                 data.page = 1;
                 that._postListGet(data);
             });
         },
         _add: function() {
             bsz.widget.initBox('#add', this._postSave);
         },
         _edit: function() { //修改
             var that = this;
             bsz.widget.initBox('#edit', this._postSave);
             this.tbody.on('click', 'a.J_Edit', function() {
                 var id = that.getId();
                 if (id) {
                     that._postEdit(id);
                 }
             })
         },
         _upload: function() { //上传初始化
             var that = this;
             $('a.J_Upload').each(function() {
                 var ID = this.id;
                 var formData = $(this).data('upload');
                 if (ID) {
                     $(this).myUpload({
                         id: '#' + ID,
                         formDataValue: {
                             uploadBusiness: formData
                         },
                         isDel: false,
                         success: function(file, res, ID) {
                             $('#' + file.id).remove();
                             if (res.code === 0) {
                                 $(ID).parents('tr').find('img').attr('src', res.map.imgUrl);
                             }
                         }
                     });
                 }
             });
         }
     };

 });