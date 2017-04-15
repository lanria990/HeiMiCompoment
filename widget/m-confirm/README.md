## confirm弹窗api

 confirm弹窗是bsz.core的方法之一，依赖于jquery。

#### 文件介绍
- ---_m-confirm.tmpl:html代码块 
- ---m-confirm.js
- ---m-confirm.css
- ---m-confirm.md



####方法介绍


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| confirm |{string} content 内容块 {object} opt 参数 {object} arg 回调函数函数的参数| 提示警告 | 暴露 |



实例：

```javascript

bsz.confirm.confirm('提示内容',postDel,ID);//postDel:回调函数，ID:回调函数参数


```