# 盒子模型

<!-- <link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.css"> -->
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">


### 盒子模型元素分类


##### 1块级元素`display：block`

>- 1.一个块级元素独占一行。
- 2.的高度、宽度、行高以及顶和底边距都可设置
- 3.元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。

##### 2内联元素`display:inline`

>- 1.和其他元素都在一行上；
- 2.元素的高度、宽度、及顶部和底部外边距不可设置；
- 3.元素的宽度就是它包含的文字或图片的宽度，不可改变。备注：内容元素的上下padding会和相邻元素叠在一起


##### 3内联块状元素`display:inline-block`

>- 1.和其他元素都在一行上；
- 2.元素的高度、宽度、行高以及顶和底边距都可设置。



### 盒子模型的属性


> margin，padding，border都有上下左右四个值


###  可置属性和非可置属性


##### 如:textare,input,select,button带有样式的属性叫做可置属性，可置属性在非html5的文档流下父级div line-height不起作用如今加上文本就会起作用，如下所示：

##### 但是在html稳定流下父级div的line-height是起作用的。如下所示


#### line-height和vertical-align的区别


##### 单行文字垂直居中显示，用line-height，将line-height值与外部标签盒子的高度值设置成一致就可以了。

##### 父容器高度固定，文字可能一行，两行或更多行的垂直居中用line-height

##### 如何父级的line-height超出了子集的高度，则会溢出


#### margin: 0 auto和  text-align: center的区别 

##### text-align:center;是使标签的内容居中而margin: 0 auto;是针对父级元素居中，如果没有父级元素则针对浏览器居中