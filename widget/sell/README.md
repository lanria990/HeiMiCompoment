## sell商品添加套餐模块初始化


#### 文件
- ---sell.vm
- ---sell.md
- ---test/page/admin/add.json：模板数据
 

#### 数据说明


```javascript
template:[{
	attrs:[{
	//...
	}],
	"edit":1,//1|0
	"id": 1,
	"linkImg": 1,//1|0
	"name": "属性一"
}]

template:{array[object]} 数组

$items = template[i];

$items.edit:{number} 是否可修改

$items.linkImg:{number} 是否和图片挂钩

$items.id:{number} id:是不可重复 模块id

$items.name {string}:大分类名称

$items.attrs[i].isChecked {boolean}:是否选中
$items.attrs[i].id {number}: id
$items.attrs[i].edit {number}: 是否可修改
$items.attrs[i].name {string}: 名称

```
