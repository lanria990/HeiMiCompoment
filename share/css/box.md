
# 盒子模型
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">



### 什么是盒子模型


- 所有页面中的元素都可以看成是一个盒子，占据着一定的空间

- 一个页面由很多的盒子组成，盒子与盒子之间互相影响

- 通过调整边框和距离等参数，可以调整盒子的位置和大小



###盒子模型的组成


内容（conternt）+边框（bording）+内边距（padding）+外边距（margin）四部分组成。


###盒子模型的三个属性


margin，padding，border都有上下左右四个值,盒子模型属性上、右、下、左(顺时针)的缩写如下：

```css
div{
	padding:20px 10px 15px 30px;
}

```

盒子模型属性分开写代码如下：

```css
div{
	padding-top:20px;
	padding-right:20px;
	padding-bottom:20px;
	padding-left:20px;
}

```

### 盒子模型-元素分类



#### 块级元素：display：block；

- 一个块级元素独占一行。

- 元素的高度、宽度、行高以及顶和底边距都可设置

- 元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

####  内联元素：display:inline；

- 和其他元素都在一行上；

- 元素的高度、宽度、行高及顶部和底部边距不可设置；

- 元素的宽度就是它包含的文字或图片的宽度，不可改变。


#### 内联块状元素：display:inline-block；

- 和其他元素都在一行上；

- 元素的高度、宽度、行高以及顶和底边距都可设置。

> 图片下方出现几像素的空白间隙vertical-align: top;

> 内联元素和内联块元素除了以上区别以外内联块元素在ie7及以下是不兼容的,

参考资料如下：

* [css中display:inline-block](http://zhidao.baidu.com/link?url=u1mhPBoHfLHnlHVuvqDeHExXm3sI4gYS_HCmoSQC-XfygK17hTBKLKRKfuKNSuWVmJ25NUP_FqYbGcY2Bkp4gK)

* [display:inline、block、inline-block的区别](http://www.cnblogs.com/jdonson/archive/2011/06/10/2077932.html)

* [IE6、7中display:inline-block的测试](http://www.wufangbo.com/ie6-ie7-display-inline-block/)

* [display:inline block inline-block三者元素之间的区别及特点](http://www.kuqin.com/webpagedesign/20120915/330761.html)
	
	

### 可置属性和非可置属性

- 如:textare,input,select,button带有样式的属性叫做可置属性，可置属性在非html5的文档流下父级div line-height不起作用如今加上文本就会起作用，代码如下：

```html
	<div class="box" style="line-height:100px">
		<input type="text">
	</div>

	<div class="box" style="line-height:100px">
		<input type="text">若有textNode文本,又另当别论。
	</div>

```



### line-height和vertical-align的区别 



- 单行文字垂直居中显示，就是使用line-height，将line-height值与外部标签盒子的高度值设置成一致就可以了。 但如何实现父容器高度固定，文字可能一行，两行或更多行这时候如果要居中用的是vertical-align，但是vertical-align的父级要结合 display: table-cell;一起使用才能达到垂直居中的效果。代码如下：

```html
<ul class="zxx_align_box_4 fix">
        <li>
            <div><img src="http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg"></div>
        </li>
    </ul>
```

```css
.zxx_align_box_4 li{
	float:left; 
	margin-right:13px;
}
.zxx_align_box_4 li div{
	display:table-cell; 
	width:144px;
 	height:144px; 
 	border:1px solid #beceeb;  
 	text-align:center; 
 	vertical-align:middle;
 }
.zxx_align_box_4 li div img{
	vertical-align:middle;
}

```

- 如果父级的line-height超出了子集的高度，则会溢出。溢出并不是代表脱离文档流，还是在正常流中，只是在没有定位属性的兄弟元素中，后面的元素的层级会比前面元素的高会覆盖前面的元素，并且溢出的部分不计算在高度里面。

[参考资料](http://www.css88.com/archives/2048)


### margin: 0 auto和  text-align: center的区别:


- text-align:center;是使标签的内容居中而margin: 0 auto;是针对父级元素居中，如果没有父级元素则针对浏览器居中,但是需要注意的一点是：margin: 0 auto;在ie兼容模式下不起作用,这时候需要在body加上text-align: center；
代码如下：

```html
<div class="box">
	<div>text-align:center;是使标签的内容居中而margin: 0 

	auto;是针对父级元素居中，如果没有父级元素则针对浏览器居中</div>
</div>

```

```css
	.box{ 
		text-align: center; 
		width:900px; 
		border: 1px solid #000; 
		margin: 0 auto
	}
	.box div{ 
		width: 300px; 
		border: 1px solid red;
	}

```

### 详解行高、行距、内容区、行内框、行框


- 行高:指的是文本行的基线间的距离。

- 行距:行高与字体尺寸的差称为行距（一行底线到下一行顶线的垂直距离）

- 内容区:底线和顶线包裹的区域，即下图深灰色背景区域。

- 行内框:每个行内元素会生成一个行内框，行内框是一个浏览器渲染模型中的一个概念，无法显示出来:在没有其他因素影响的时候（padding等），行内框等于内容区域，而设定行高时行内框高度不变，半行距【（行高-字体size）/2】分别增加/减少到内容区域的上下两边（深蓝色区域）

- 行框（line box），行框是指本行的一个虚拟的矩形框，是浏览器渲染模式中的一个概念，并没有实际显示。行框高度等于本行内所有元素中行内框最大的值（以行高值最大的行内框为基准，其他行内框采用自己的对齐方式向基准对齐，最终计算行框的高度），当有多行内容时，每行都会有自己的行框。

- [行内框、行框demo](./html.html)

```html
<div style="background-color:#ccc;">
    <span style="font-size:1em;background-color:#666;">博森创想网络科技有限公司</span>
    <span style="font-size:3em;background-color:#999;">博森创想网络科技有限公司</span>
</div>
```

- [行高计算demo](./html.html)


如果父元素的line-height有单位，那么继承的值则是换算后的一个具体的px级别的值；

而如果属性值没有单位，它的line-height会根据本身的font-size值重新计算得到新的line-height 值。

代码如下：

此时案例一的p line-height:10px*150%=15px

```html
<div style="border:dashed 1px #0e0;line-height:150%;font-size:10px;">
    <p style="font-size:30px;">
        博森创想网络科技有限公司<br/>
        博森创想网络科技有限公司
    </p>
</div>


<div style="border:dashed 1px #0e0;line-height:1.5;font-size:10px;">
    <p style="font-size:30px;">
        博森创想网络科技有限公司<br/>
        博森创想网络科技有限公司
    </p>
</div>

```

>参考资料：   

* [CSS行高——line-height](http://www.cnblogs.com/dolphinX/p/3236686.html)
* [行高：line-height属性[1]](http://www.ddcat.net/blog/?p=227)
* [CSS基线之道](http://www.qianduan.net/css-baseline-road/)

  

