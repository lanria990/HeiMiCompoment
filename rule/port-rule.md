# 后台接口规范
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">



## 1 前言


本文档的目标是使接口代码风格保持一致，容易被理解和被维护。

虽然本文档是针对Rap接口设计的，但是在定义使用各种接口时时，适用的部分也应尽量遵循本文档的约定。




## 2 mock风格

### 2.1模块

##### [强制] 根据项目需求和项目原型划分模块，并拟定模块名称

##### [强制] 模块名必须采用项目名_模块名称(e.g.邻亲_服务),填写项目描述，模块名分隔符用下划线连接，添加项目成员.如： 

>
- 项目名称：邻亲_生活
- 项目描述: 生活服务模块(life)
- 项目成员： cjb (蔡剑镔) yjl (yjl) 




### 2.2 模块名

#####[强制] 英文模块名全部采用小写方式,如有复数结构时则采用复数命名法，如有缩写采用缩写,如：

> scripts, styles, images, data-models

>评论 comment 缩写  cmt


### 2.3 模块页面接口制定规则


#### 2.3.1 命名

#####[强制] 接口命名：操作说明-请求方式-[完成]  (e.g.服务添加页面-同步)

>
- 请求方式有同步和异步(get | post)
- 以中划线分割

#####[强制] 页面路径命名：/[平台]/模块/页面/[操作]/index.do

>
- 平台：后台(/admin),前台(/user)等,特殊情景可不选平台
- 所有命名采用小写

#####[强制] ajax路径命名：/[平台]/模块/页面/操作Ajax.do

>
- 平台：后台(/admin),前台(/user)等,特殊情景可不选平台
- 操作命名方式采用驼峰式命名
- 关键字：ajax

```javascript

/***********************
 * 常用的操作命名
 * 保存 save开头
 * 获取 find开头
 * 删除 del 开头
 * 插件 plug开头
 ************************/

{
	"findPageAjax":"分页获取",
	"findDetailAjax":"获取单条数据",
	"delBatchAjax":"批量删除",
	"delAjax":"单条删除",
	"saveAjax":"单条保存",
	"plugGoodsAjax":"选择商品插件获取商品"
};




```


#### ANDROID || IOS

#####[强制] 接口命名：/模块/[操作]


```javascript

/***********************
 * 常用的操作命名
 * 保存 save开头(增加、修改)
 * 获取 find开头(获取列表对象)
 * 获取 get开头(获取单个对象)
 * 删除 del 开头
 ************************/

{
	"findAddress":"获取列表对象",
	"getAddress":"获取单个对象",
	"delBatchAddress":"批量删除",
	"delAddress":"单条删除",
	"saveAddress":"单条保存",
	"saveBatchAddress":"批量保存",
};
```






#### 2.3.2 填写规范

#####[强制] 模块一个功能块一个tab页，一个功能块包含多个页面，一个页面接口包含同步接口、页面操作接口

#####[强制] 添加接口需要填写操作名称、请求类型、请求链接、说明、返回格式(e.g.对象{})

###### 说明

>同步：需要在说明中填写返回页面，例如：/life/server/server.vm

>异步：说明选填

###### 请求类型
> 同步get，异步全部post

#####[强制] 表单的变量名、含义、类型、mock数据全部填写

#####[建议] 填写时建议采用json导入，并保留json对象

#####[强制] j接口创建，修改，或者需求修改，只使用【慢存】并写入log。修改代码接口时需要更新rap接口，并和相关人员沟通说明。小修改可以使用快速保存。




## 3 变量声明

### 3.1 变量

#####[强制] 使用驼峰式命名变量

示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|imgUrl |图片路径|number|@mock=0|


#####[建议] 涉及Android的，一律大写第一个字母

示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|AndroidVersion |安卓版本号|number|@mock=0|


#####[建议] 涉及iOS的，一律小写第一个，大写后两个字母

示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|iOSVersion |iOS版本号|number|@mock=0|


#####[强制] 禁止使用数据库关键词 create,order,desc,date等。

#####[强制] 涉及页面初始化`script`变量，一律需要在含义中注明(`json3`)

#####[强制] 需要填写含义、类型、mock数据

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|business |业务类型json3(0: 添加, 1: 修改)|number|@mock=0|

#####[强制] id类型变量:需要表达清楚.（e.g. 用户id:userId）



###3.2 ajax请求参数

#####[强制] 请求参数变量名含义包括对变量的解释，特殊值注明，是否需要校验，校验规则：

#### 3.2.1 校验填写规则
>
- [R]:需要校验,不需要可不填
- min: 最小值、最小长度
- max: 最大值、最大长度
- http:链接校验以http开头
- phone:手机号 (/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/)
- tel: 固话校验 ()
- email:邮箱 (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
- date:日期 
- 

#### 3.2.2 特殊值

#####[强制]  id数字加密类【不限：'empty'】（e.g. id,type,classify,area）
#####[强制]  非id数字加密类【不限：-1】（e.g. state,time）
#####[强制]  0:下架,1:上架 
#####[强制]  json3类型的参数使用 orgStr


示例：添加分类下的添加接口

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|name |[R]类型名称 (min=1,max=30)|string|---|
|state |[R]状态 (0=下架,1=上架 )|string|---|


示例：添加分类下的搜索接口

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|id | id (不限：empty )|string|---|
|state | state (不限：-1 )|number|---|


示例：json3类型

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|orgStr |类型名称 json3|array[object]|---|


```javascript
orgStr={
	type:"类型",
	url:"链接地址",
	items:[{
	//...
	}]
}

```




### 3.3 ajax响应参数

#####[强制]响应参数列表，包含`code`、`map`、`msg`(提示信息)

#### 3.3.1 code {Number} 返回码（`ABCDE`）
> 
- A：系统级错误（1）、用户可见（2）、用户不可见（3）
- BC：模块
- DE：具体操作

```javascript
{
	0:'操作成功',
	-1:'系统繁忙',
	10001:'远程服务出错',
	10002:'用户不合法',
	10003:'参数错误',
	10004:'该项存在关联项',
	10005:'该项已存在'

}
```
完整code码,请参考[code](http://) 

#### 3.3.2 map  {Object} 数据
>
1. list {Array[Object]} 数组型列表数据,当数据为空时传空数组[]
2. item {Object} 单项数据,当数据为空时传空数组[]
3. pageCount {Number} 总页数
4. pageIndex {Number} 当前页数
5. items {Array[Object]}|{Object}  子项,当数据为空时传空数组[]
6. 多个对象的时候就用逻辑名表示


示例：
```javascript
//第一种
map={
	list:[{
	//...
	},{
	//...
	}],
	pageCount:5,
	pageIndex:1
}

//第二种
map={
	item:{
		//...
	},
	pageCount:5,
	pageIndex:1
}

//多个对象的时候就用逻辑名
map={
	adList:[{//广告列表
	//...
	}],
	groomList:[{//推荐商品列表
	//...
	}]
}

```


#### 3.3.3 msg 提示信息
> 提示信息需要分为用户可见和用户不可见，用户可见的`2`开头，用户不可见`3`开头

示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|`code` |返回码 (min=1,max=30)|string|---|
|`map `| --- |object|---|
|`msg` |操作成功|string|---|


```javascript
map={
	list:[{},{}],
	pageCount:5,
	pageIndex:1
}
```




### 3.4 页面初始化

>页面初始化

- config {object}:vm中渲染对象。（e.g. 一级分类）

- json {string(json3)}：存放在script标签的对象。（e.g. 二级分类）


示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|`config` |页面初始化对象|object|---|

```javascript
config={
	typeList:{
		id:"类型id",
		name:"类型名称"
	}
	//...
}
```

示例：

| 变量名 | 含义 | 类型 | 备注 |
| ------- | ------- | --- | --- |
|`config` |页面初始化对象json3|object|---|

```javascript
<script >
	config={
		typeList:{
			id:"类型id",
			name:"类型名称"
		}
		//...
	}
</script>
```





## 3.5常用名称

### 3.5.1常用名称

#####[强制] 关于完整的命名以及他们的含义，请参考[name](http://)

```javascript 
var name={
	"title":"标题",
	"content":"内容",
	"userName":"用户名",
	"userHead":"用户头像",
	"userId":"用户id",
	"time":"时间",
	"date":"日期",
	"page":"页码",
	"name":"名称",
	"state":"状态",
	"type":"类别",
	"id":"id",
	"ids":"ids",
	"items":"list子项列表",
	"pageCount":"总页数",
	"pageIndex":"当前页数",
	"meals":"套餐",
	"imgUrl":"图片地址",
	"area":"小区",
	"areaName":"区域名称",
	"created":"创建时间",
	"imgs":"图片列表",
	"place":"省份-城市",
	"carNo":"车牌号"
}

```


***
## 4参考资料

* [mockjs](http://mockjs.com/) 
* [alloyteam-code-guide](http://alloyteam.github.io/code-guide/#js-indentation)
* [fex-team-styleguide](https://github.com/fex-team/styleguide/)
