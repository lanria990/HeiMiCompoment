## 分页控件 API 文档




#### myPage内部参数的详细说明，使用场景多在商城搜索，后台列表搜索，订单等。


<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">

#### 参数说明配置项

- `pno`:  {Selector,Number}   [默认值：1]   当前页码

- `total`: {Selector,Number}   [默认值：1] 总页码

- `totalRecords`: {Selector,Number}   [默认值：0] 总数据条数

- `mode`: {Selector,String}  [默认值：'click'] 模式(link 或者 click)

- `isShowFirstPageBtn`:{Selector,Boolean}  [默认值：true],是否显示首页按钮

- `isShowLastPageBtn`: {Selector,Boolean}  [默认值：true], 是否显示尾页按钮

- `isShowPrePageBtn`: {Selector,Boolean}  [默认值：true], 是否显示上一页按钮

- `isShowNextPageBtn`: {Selector,Boolean}  [默认值：true], 是否显示下一页按钮

- `isShowTotalPage`: {Selector,Boolean}  [默认值：true], 是否显示总页数

- `isShowTotalRecords`: {Selector,Boolean}  [默认值：false], 是否显示总记录数

- `isShowMore`: {Selector,Boolean}  [默认值：true], 是否显示更多...

- `isGoPage`: {Selector,Boolean}  [默认值：true], 是否显示页码跳转输入框

- `hrefFormer`: {Selector,String}  [默认值：''], 链接前部

- `hrefLatter`: {Selector,String}  [默认值：''], 链接尾部

- `pageContClass`:{Selector,String}  [默认值：'pagination-page'], 分页样式

- `gopageWrapId`: {Selector,String}  [默认值：'kkpager_gopage_wrap'],分页输跳转内容块id 

- `gopageButtonId`: {Selector,String}  [默认值：'kkpager_btn_go'], 分页跳转按钮id'

- `gopageTextboxId`: {Selector,String}  [默认值：'kkpager_btn_go_input'], 分页输入框id'

- `lang`: {Selector,Object}  , 分页控件文本,
	- 	`firstPageText`:{Selector,String}  [默认值：'<<'], 文本

	- 	`firstPageTipText`: {Selector,String}  [默认值：'首页'], title文本

	- 	`lastPageText`: {Selector,String}  [默认值：'>>'], 文本

	- 	`lastPageTipText`: {Selector,String}  [默认值：'尾页'], title文本

	- 	`prePageText`: {Selector,String}  [默认值：'<'], 文本'

	- 	`prePageTipText`: {Selector,String}  [默认值：'上一页'], title文本 

	- 	`nextPageText`: {Selector,String}  [默认值：'>'], 文本'

	- 	`nextPageTipText`: {Selector,String}  [默认值：'下一页'], title文本 

	- 	`totalPageBeforeText`:{Selector,String}  [默认值：'共'], 文本 

	- 	`totalPageAfterText`:{Selector,String}  [默认值：'页'], 文本 

	- 	`totalRecordsAfterText`: {Selector,String}  [默认值：'条数据'], 文本

	- 	`gopageBeforeText`: {Selector,String}  [默认值：'转到'], 文本 

	- 	`gopageButtonOkText`: {Selector,String}  [默认值：'确定'], 文本

	- 	`gopageAfterText`: {Selector,String}  [默认值：'页'], 文本 

	- 	`buttonTipBeforeText`:{Selector,String}  [默认值：'第'], 文本

	- 	`buttonTipAfterText`:{Selector,String}  [默认值：'页'], 文本 



> Selector :可选



| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| clickFn | n：{NUMBER} | 点击`<a>`触发事件 | --- |
| linkFn | n：{NUMBER} | `<a>`的href 链接拼接 | --- |



#### 事件说明


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `getTotal` | 返回值：{NUMBER} | 获取总页数 | --- |
| `getNowPage` | 返回值：{NUMBER} | 获取当前页 | --- |
| `selectPage` | `pno`:{Number} `total`:{Number} | 重新生成控件 | --- |



####  注意事项

##### 如果在一个页面中多次初始化分页函数，需要指定gopageWrapId、gopageButtonId、gopageTextboxId参数




##示例

```javascript
//引入分页控件 require('page');

//调用方法
var $page = $('#J_Page').myPage({
	pno: 1,
	total: 20,
	clickFn: function(n) {
		$page.selectPage(n)
	}
});

 //引入分页控件 require('page');
//初始化方法
var $page = $('#J_Page').myPage({
    pno: 1,
    total: 5,
    mode：'link'
    linkFn: _linkPage
});

//链接拼接
function _linkPage(n){
     //....
}
```
