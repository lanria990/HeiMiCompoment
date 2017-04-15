# 布局模型
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">


###什么是布局模型


- 布局模型与盒模型一样都是 CSS 最基本、 最核心的概念。 但布局模型是建立在盒模型基础之上,布局模型分为，流动模型（Flow），浮动模型 (Float)，层模型（Layer）

- 所有 CSS 布局技术都应建立在这4 个最基本的概念之上：盒模型、流动、浮动和定位。千变万 化的技巧应用其实都是这些基本概念在舞动，而且如果理解了核心概念的真谛，那么创建 CSS 布局 实际上就是按图索骥了。



####流动模型

就是说网页在默认状态下的 HTML 网页元素都是根据流动模型来分布网页内容的。如果是块元素它的排序是从上而下的。在流动模型下，内联元素都会在所处的包含元素内从左到右水平分布显示。代码如下：

```html
<p style="border:1px solid red">博森创想网络科技有限公司</p>
<p style="border:1px solid red">博森创想网络科技有限公司</p>
<span style="background:red">博森创想网络科技</span>
<span style="background:red">博森创想网络科技</span>
<span style="background:red">博森创想网络科技</span>

```


####浮动模型

浮动是完全不同于流动的另一种布局模型， 它遵循浮动规则，但仍能看到流动对它的潜在影响。 任何元素在默认情况下是不能够浮动的，但都可以用CSS 定义为浮动，如 div、list、p、table，以及 img 等元素都可以被定义为浮动，事实上即使是如 span、strong 等这样的内联元素也可以被定义为浮动。其特点是：
通过 CSS 的 float 属性定义元素向左或向右浮动。其语法demo代码如下：


```css
div{/*可以指定任何元素*/
	float:left;/*取值还包括right，none*/
}

```

```html
<div style="width:50%; height:300px; background:red; float:left;">博森创想网络科技</div>
<div style="width:50%; height:300px; background:#ccc; float:left;">博森创想网络科技</div>

```


######浮动清除 


浮动的自由性也给布局带来很多麻烦， CSS 为此又增加了 clear 属性， 它能够一定程度上控制浮 动布局中出现的混乱现象。其值包括：left，right，both，none；


[清浮动 Demo]()


####层模型


简单的说就是含有positon属性的元素，层布局模型就像是图像软件PhotoShop中非常流行的图层编辑功能一样，每个图层能够精确定位操作，但在网页设计领域，由于网页大小的活动性，层布局没能受到热捧。但是在
网页上局部使用层布局还是有其方便之处的。


#### 层模型有三种形式：

- 固定定位(position: fixed)

- 绝对定位(position: absolute)

- 相对定位(position: relative)



##### 绝对定位(position: absolute)

```html
<div class="box1">
    <div class="box2">我是针对box1绝对定位</div>
</div>
<div class="box3"> 我是针对浏览器绝对定位</div>

```

```css
<style>
	.box1{
	    width: 500px;
	    height: 500px;
	    background: red;
	    position: relative;
	}
	.box2{
	    position: absolute;
	    top: 20px; 
	    left: 20px;
	    width: 400px;
	    height: 400px;
	    background: #ccc;
	}
	.box3{
	    position: absolute;
	    background: #ccc;
	    min-width: 200px;
	    height: 200px;
	    right: 20%;
	    top: 70%;
	}
</style>

```



##### 相对定位(position: relative)

```html
<div class="box4">
    <div class="box5">我是相对box4定位</div>
</div>
```

```css
<style>
	.box4{
    width: 500px;
    height: 500px;
    background: #000;
	}
	.box5{
	    position: relative;top: 20px; left: 20px;
	    width: 400px;
	    height: 400px;
	    background: #ccc;
	}
</style>

```


##### 固定定位(position: fixed)

```html
<a style="position: fixed;
    right: 10%;
    bottom: 10%;
    width: 20px;
    display: inline-block;
    text-align: center;
    border: 1px solid red;
    padding: 20px;">
    我是浮动定位
</a>

```

#### [以上三种布局的demo](./layout.html)

### 根据所学知识练一练

- 利用所学知识做返回顶部的按钮

- 利用所学知识实现针对浏览器绝对定位表单，如邻邻后台的添加修改弹出框

- 利用所学知识实现图片根据父亲曾垂直居中

- 利用所学知识计算以下子级元素的行高、行距



```html
<div style="line-height:2em;font-size:16px;">
	<div style="font-size:30px;">
	</div>
</div>
<div style="line-height:1.2;font-size:16px;">
	<div style="font-size:30px;">
	</div>
</div>

```