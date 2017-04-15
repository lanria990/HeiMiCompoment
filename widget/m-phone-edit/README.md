#组件手机端编辑器  

#### 手机端编辑模块 

手机编辑器方法的详细说明，适用于后台商城手机端编辑，文字没有格式

#### 函数
| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| init | ------- | 事件初始化 | --- |
| getData | ------- | 获取手机端编辑器数据 | --- |
| initModify | ------- | 初始化手机端编辑器内容 | --- |

示例
```javascript
var phoneEdit = require('widget/m-phone-edit/m-phone-edit');
phoneEdit.init();//初始化
phoneEdit.getData() //获取内容
phoneEdit.initModify(data) //初始化手机端编辑器内容

```



#### 具体的函数说明

| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| _reverse | str：{string} | html 转化成带格式的文本 | --- |
| _filter |  str：{string} | 带格式的文本内容转化成html | --- |
| _lisort |  --- | 排序，对内容块上下移动进行排序 | --- |
| _getParentDiv |  obj:{object} | 获取父亲对象 | --- |
| _editScroll |  dom:{string} 内容 | 编辑器自动滚动到底部 | --- |
| _tpmlImg |  src:{string} 路径 | 模板函数img | --- |
| _tpmlText |  content:{string} 内容 | 添加文字模板 | --- |
| _boxHide | ---| 隐藏弹窗 | --- |
| _boxShow | obj:{object} |显示弹窗 | --- |
| _getPhoneData |---|获取手机端编辑器内容 | --- |
| _initPhone |data：{array[object]}|初始化手机端编辑器内容 | --- |
| _addText |---|手机端编辑器添加文字 | --- |
| _initModifyPhone| obj:{object}|修改手机端编辑器内容 | --- |
| _initEditImg|---|编辑图片弹窗初始化 | --- |
| _initEditText|---|编辑文字弹窗初始化 | --- |
| init|---|事件初始化 | --- |





