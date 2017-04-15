## 轮播图控件 API 文档


#### myCarousel内部参数的详细说明，使用场景多在商城轮播图，后台轮播图设置等。

>该轮播图控件依赖于jquery,css需要导入slider.css

<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">

#### 参数说明配置项

- `width`:  {Selector,Number}   [默认值：640]   轮播图的宽度

- `setbtn`: {Selector,Boolean}   [默认值：true] 是否要左右按钮

- `liclass`: {Selector,String}   [默认值：'on'] 导航的激活样式

- `auto`: {Selector,Boolean}  [默认值：'true'] 是否自动轮播

- `time`:{Selector,Number}  [默认值：3000] 自动轮播的时间


> Selector :可选


#### 暴露函数说明


| 事件名 | 参数说明 | 描述 | 备注 |
| ------- | ------- | --- | --- |
| `resize` | `width`:{Number} 轮播图的宽度| 重置 | --- |
| `remove` | --- | 销毁 | --- |






##示例

```javascript
//需要先制定carousel路径 carousel：'components/carousel/jquery-carousel.js'
//引入分页控件 require('carousel');


//调用方法
 $('#carousel').myCarousel({
      width: 640,
      auto: false,
      setbtn: false
  });

```
