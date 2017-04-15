## 列表组件api


bsz.list 内部类的详细说明，以下提及的功能类，都可以在bsz这个变量中访问到.

下划线开头的方法名为私有函数，不允许调用和重新实例化


### 1 列表组件方法


#### 1.1  bsz.check

##### 全选/全不选


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `init` | --- | 初始化 | --- |
| `items` |  --- | 列表选项 | --- |
| `getCheckedTr` |  --- | 获取已选项 | --- |
| `setInputAll` |  --- | 设置全选选项 | --- |


```javascript
//调用方法
bsz.check.init();

```


#### 1.2  CommonListOpt


##### 通用列表操作


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `tableTplFn` | --- | 列表模板html | 虚函数 |
| `getPostData` |  --- | 获取查询函数ajax参数数据 | 虚函数 |
| `getData` |  --- | 获取添加或者编辑保存或修改ajax参数数据 | 虚函数 |
| `getID` |  {object} 操作按钮 | 获取tr的ID | --- |
| `_pnoIs` | -data：{object}列表数据 -pno:{Number}当前页数 -total:{Number}总页数 | 判断分页是否正确，如果不对重新获取total页 | 私有函数 |
| `_tmplTable` |  -data：{object}列表数据 -pno:{Number}当前页数 -total:{Number}总页数 | 生成模板，排序，分页，loading的显示隐藏 | 私有函数 |
| `_postListGet` |  -data：{object}ajax参数 | 查询或分页获取列表数据 | url:findPageAjax.do |

>
虚函数如若使用到必须实例化，否则会抛出错误



#### 1.3  List


> 继承CommonListOpt函数



##### 普通列表操作


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `_postDel` | arrayID:{array[number]} id | 批量删除、单个删除 | url:delBatchAjax.do |
| `_postEdit` |  {id}：id | 修改获取单条信息 | url:findDetailAjax.do |
| `_postSave` |  that:{object} List函数域 | 保存单条信息 （添加和修改） | url:saveAjax.do |
| `_postChange` | {object} data {id:id,state:(0: 下架,1: 上架)} | 修改状态 |url:changeAjax.do |
| `_del` |--- |绑定删除事件 | class:a.J_Del |
| `_delAll` | --- | 绑定批量删除 |  id:delAll,必须初始化全选事件 |
| `_search` | --- | 绑定搜索分页事件| id：searchBut |
| `_add` | --- | 绑定添加弹窗事件| id：add  弹窗id:addBox |
| `initEditBox` | {object} items 单条信息数据 | 获取单条初始化弹窗| id:editBox, attr:(data-box,name)|
| `_edit` |{object} items 单条信息数据 | 绑定修改和初始化修改弹窗事件| 弹窗id:editBox,class:J_Edit|
| `_change` |---| 绑定修改状态事件| class:a.J_Change attr:(data-state) default：state 0|
| `_upload` |---| 图片上传初始化|class：a.J_Upload,formDataValue:data-upload ,id必须不同|
| `_page` |pno：{Number}| 分页初始化|id:pageList,$page分页对象存储 $('#pageList').data('page')|
| init |opt：{obejct} 参数| 列表事件初始化|opt.base && opt.tableTplFn && opt.getPostData 必填，opt.fn ：初始化事件名称|



> opt.fn值
> 
- 'search':搜索

- 'delAll'：批量删除

- 'add': 添加弹窗事件

- 'page': 分页初始化

- 'del': 绑定删除事件

- 'edit': 绑定修改和初始化修改弹窗事件

- 'upload': 图片上传初始化

- 'change': 修改状态事件




示例：
```javascript
 var bsz = require('./bsz.list.js'); //加载list模块
 var tableTplFn = __inline('./_Tb.tmpl') //加载列表模板

 require('upload') //加载upload
 require('page') //加载分页组件

/**
 * 获取分页查询ajax参数
 * @return {object} ajax参数
 */
 function getPostData() {
 	var o = {};
 	o.page = $('#pageList').data('page').getNowPage();//获取当前页
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


 bsz.check.init();//初始化全选事件
 	var list = new bsz.list();//初始化列表事件
 	list.init({
 		tableTplFn: tableTplFn,
 		getPostData: getPostData,
 		geData: getData,
 		base: '/admin/list/',//基本路径
 		fn: ['search', 'delAll', 'add', 'page', 'del', 'edit']//初始化函数
 	})

```

### 1.4  页面初始化
 

#### 页面初始化


示例

`$thead`是table的标题

```html
#set( $thead = {"checkbox":true,"width":"5%","items":[{"width":"5%","name":"序号"},{"width":"20%","name":"城事主题"},{"width":"10%","name":"用户"},{"width":"27%","name":"内容"},{"width":"18%","name":"时间"},{"width":"15%","name":"操作"}]} )
 #block("m-list")
	#widget("widget/m-list/m-list.vm" $thead)
#end
```

json 格式
```javascript

{
	"thead": {
		"checkbox": true, //是否有全选
		"width": "5%",//宽度
		"items": [{ //子项
			"width": "5%",//宽度
			"name": "序号"//名称
		},{
			"width": "20%",
			"name": "城事主题"
		},{
			"width": "10%",
			"name": "用户"
		},{
			"width": "27%",
			"name": "内容"
		},{
			"width": "18%",
			"name": "时间"
		},{
			"width": "15%",
			"name": "操作"
		}
		]
	}
}
```