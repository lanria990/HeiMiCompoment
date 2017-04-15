## 弹窗api



### 使用注意事项
------------------------
- 弹窗需要给定id，规则【触发事件的id+Box】
- 需要给弹窗初始化类型 data-box【input select img textarea】
- 弹窗中的需要初始化的填充对象需要指定name, name名和后台返回的数据一致

示例


后台返回数据

```javascript
item={
	'name':'名称',
	'state':'状态',
	'order':'显示顺序'
}

```

html代码
```html
<div class="mask-tip mask-tip-defualt tip dn" id="editBox" data-box="input select">
 <div class="dialog">
 <div class="mask-tip-title">修改
    <button type="button" class="close J_BClose" title="关闭">×</button>
  </div>
  <div class="div-box">
        <label class="control-label col-md-3">名称</label>
        <div class="col-md-7">
          <input class="form-control" placeholder="" type="text" name="name" maxlength="10">
        </div>
    </div>
    <div class="div-box">
        <label class="control-label col-md-3">状态</label>
        <div class="col-md-7">
          <select name="state" class="form-control">
          	<option value="1">上架</option>
          	<option value="0">下架</option>
          </select>  
        </div>
    </div>
    <div class="div-box">
        <label class="control-label col-md-3">显示顺序</label>
        <div class="col-md-7">
          <input class="form-control" placeholder="" type="text" name="order" maxlength="10">
        </div>
    </div>  
  <div class="mask-tip-con algin-center"></div>
  <div class="mask-tip-btn algin-center">
    <button type="button" class="btn btn-success sure J_BSure">确认</button>
    <button type="button" class="btn btn-default-border cacel J_BCancel">取消</button>
  </div>
  </div>
</div>


```
