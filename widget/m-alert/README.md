## alert弹窗api

 alert弹窗是bsz.core的方法之一，依赖于jquery。

#### 文件介绍
- ---_m-alert.tmpl:html代码块 
- ---code.json:提示码
- ---m-alert.js:
- ---m-alert.md

#####code.json默认数据

```javascript
    "0": "操作成功",
	"-1": "系统繁忙",
	"10001": "远程服务出错",
	"10002": "用户不合法",
	"10003": "参数错误",
	"10004": "该项存在关联项",
	"10005": "该项已存在",
	"20106": "名称已经存在",
	"701": "发货成功",
	"801": "修改成功"
```

####方法介绍


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| alert | {string} content 提示内容 {string} errorLevel 错误提示等级 {string} title 标题| 弹出框 | --- |
| code | {number} num 提示码数字| 弹出框 | --- |



实例：

```javascript

bsz.alert.alert('提示内容');

bsz.alert.code(-1);//-1:系统繁忙


```