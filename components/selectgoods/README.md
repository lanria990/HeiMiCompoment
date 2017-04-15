## 选择控件 API 文档


#### mySelect内部参数的详细说明，使用场景多在商城轮播图选择商品，后台轮播图设置选择资讯等。

>选择控件控件依赖于jquery,page分页组件,jquery-selectgoods.css

<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">

#### 参数说明配置项

- `isMultiply`:  {Selector,Boolean}   [默认值：true]   是否多选值

- `isImg`: {Selector,Boolean}   [默认值：true] 是否显示图片

- `isPrice`: {Selector,Boolean}  [默认值：true] 是否显示价格

- `isTime`: {Selector,Boolean}  [默认值：true] 是否显示时间

- `boxId`: {Selector,string}  [默认值：'selectPan'] 容器的id，不指定则默认为'selectPan'，多次初始化id相同会导致插件失效

- `source`:{Selector,String}  [默认值：''] ajax获取内容路径,分页ajax路径

- `search`:{Selector,Object}  , 搜索区域设置
	
	- 	`isSelect`: {Selector,Boolean}  [默认值：true] 搜索是否开启select选项

	- 	`isSelectMultiplyLevel`: {Selector,Boolean}  [默认值：true] 搜索是否开启select多级选项

	- 	`isAjax`: {Selector,Boolean}  [默认值：true] 搜索是否开启select ajax获取多级选项 false采用data.selectMultiply 填充

	- 	`selectEmpty`: {Selector,string}  [默认值：'empty'] 搜索开启select ajax获取多级分类不限的值

	- 	`selectSource`: {Selector,string}  [默认值：''] 搜索ajax获取多级分类ajaxurl

	- 	`getSelectData`: {Selector,Function}  ，搜索ajax获取多级分类ajax参数
	
	- 	`isInput`: {Selector,Boolean}  [默认值：true] 搜索是否开启input选项

- `ajaxOption`:{Selector,Object}  , 内容获取ajax配置 

	-	`getSearchData` {Selector,Function}  , 获取搜索数据参数

	-	`ajaxDataFilter` {Selector,Function}  ,  获取搜索数据分析

	-	`source` {Selector,String}  ,  Ajax 获取数据的 URL 地址设置固定的异步加载 url 字符串，请注意地址的路径，确保内容能正常加载

- `data`:{Selector,Object}  , 初始化数据

	-	`select` {Selector,Array[Object]}  , [默认值：[]] , 初始化搜索slect数据

	-	`selectMultiply` {Selector,Array}  , [默认值：[]] , 初始化搜索slect 多级数据名称

	-	`selectName` {Selector,Array}  , [默认值：[]] ,初始化搜索slect 多级名称

	-	`input` {Selector,String}  ,[默认值：''] ,初始化搜索input value

	-	`content` {Selector,String}  , [默认值：[]] ,初始化内容区域数据

- `pageOption`:{Selector,Object}  , 分页控件文本。 [`null` || `false`] 表示不开启分页。具体参照[分页api文档](/pagination/api)

	-	`pno` {Selector,Number}  , 当前页码

	-	`total` {Selector,Number}  , 总页码


- `fillOption`:{Selector,Object}  , 填充区域 [`null` || `false`] 表示不开启填充区域。

	-	`selector` {Selector,String}  , [默认值：'.J_Select'] ,选择器

	-	`fnName` {Selector,String}  ,[默认值：'focus'] , 选择器绑定函数

	-	`clickCall` {Selector,Function}  ,填充回调事件

- `lang`:{Selector,Object}  , 语言 。

	-	`title` {Selector,String}  , [默认值：'选择控件'] ,组件标题

	-	`close` {Selector,String}  , [默认值：'X'] ,关闭按钮

	-	`alt` {Selector,String}  , [默认值：'图片'] ,图片alt

	-	`operat` {Selector,String}  , [默认值：'推荐'] ,操作按钮title

	-	`operatText` {Selector,String}  , [默认值：'&#xe69d;'] ,操作按钮值

	-	`searchInputText` {Selector,String}  , [默认值：'&#xe663;'] ,搜索按钮值

	-	`cancelButton` {Selector,String}  , [默认值：'取消'] ,关闭按钮值

	-	`sureButton` {Selector,String}  , [默认值：'保存'] ,确定按钮值


> Selector :可选

-`pageOption`

	-	`mode` {Function}  , 模式(click) 内置


### 函数说明


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `getSelectData` | this:组件对象指向，需要返回值object对象 | 获取多级分类ajax参数  | --- |
| `getSearchData`  | this:组件对象指向，需要返回值object对象 | 获取搜索数据参数 | --- |
| `ajaxDataFilter`   | data:responseDataArray(JSON) / JSON / String | 用于对 Ajax 返回数据进行预处理的函数 | --- |
|`clickCall`    | data:点击选中对象值 {Selector,object 或 array[object]}| 用于捕获单击选中之后的事件回调函数 | 多选为array[object] |

```javascript

//获取多级分类ajax参数
function getSelectData(me){
	//me 代表selectOne对象 isAjax:true
	//....
	return obejct;
}

//获取分页搜索数据参数
function getSearchData(me){
	//me 代表selectOne对象
	//....
	return obejct;
}

//分页搜索ajax内容返回值
function ajaxDataFilter(data){
	//data ajax返回内容对象

	var array=[];
	for(var p in  data){
		var o={};
		o.id=data[p].fId;
		//...
		array.push(o);
	}

	//...
	return array;//array[obejct]返回值是 selectgoods 支持的JSON 数据结构即可
}

/*
 *用于捕获单击选中之后的事件回调函数
*/
function clickCall(data){
	/*
	 *isMultiply
	 *	true: data{array[object]}
	 *	false: data{object}
	*/	
	//...
}

```


### 数据格式


#####  `data.content `或 搜索ajax返回数据格式必须包含的对象有

- `id`	编号 

- `title`	显示的名称字符串

- `img`	isImg:true 图片路径

- `time`	isTime:true 时间

- `price`	isPrice:true 价格

- `url` 标题链接的目标 无显示#






##示例

```javascript
//需要先制定selectgoods路径 selectgoods：'components/selectgoods/jquery-selectgoods.js'
//加载页面依赖的#require("static/css/selectgoods/jquery-selectgoods.css")
  require('selectgoods');//加载selectgoods模块


//调用方法
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
```
