## 分页控件 API 文档




#### myMinPage内部参数的详细说明，使用场景多在商城搜索，后台列表搜索等。


<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">

#### 参数说明配置项

- `pno`:  {Selector,Number}   [默认值：1]   当前页码

- `total`: {Selector,Number}   [默认值：1] 总页码

- `isGoPage`: {Selector,Boolean}  [默认值：true], 是否显示页码跳转输入框

| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| clickFn | n：{NUMBER} | 点击`<a>`触发事件 | --- |



#### 事件说明


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `getTotal` | 返回值：{NUMBER} | 获取总页数 | --- |
| `getNowPage` | 返回值：{NUMBER} | 获取当前页 | --- |
| `selectPage` | `pno`:{Number} `total`:{Number} | 重新生成控件 | --- |


##示例

```javascript
//引入分页控件 require('minpage');

//调用方法
var $page = $('#J_Page').myMinPage({
	pno: 1,
	total: 20,
	clickFn: _postPage
});

function _postPage(n){
	//...
}
 
```