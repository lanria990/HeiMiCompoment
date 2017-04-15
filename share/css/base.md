# css基础知识

<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">


### 认识CSS样式



CSS全称为“层叠样式表 (Cascading Style Sheets)”，它主要是用于定义HTML内容在浏览器内的显示样式。


### Html和CSS的关系


- HTML是网页内容的载体。内容就是网页制作者放在页面上想要让用户浏览的信息，可以包含文字、图片、视频等。

-  CSS样式是表现。就像网页的外衣。比如，标题字体、颜色变化，或为标题加入背景图片、边框等。所有这些用来改变内容外观的东西称之为表现。


###CSS代码语法


- css 样式由选择符和声明组成，而声明又由属性和值组成,例如：

```css
p {
	color:red
}
```

> 其中p代表选择符,color代表属性,red代表值

- 当有多条声明时，中间可以英文分号“;”分隔，如下所示：

```css
p{
	font-size:12px;
	color:red;
}

```

- 为了使用样式更加容易阅读，可以将每条代码写在一个新行内，如下所示：

```css
p{
   font-size:12px;
   color:red;

}

```



###CSS样式分类


- 内联式css:就是把css代码直接写在现有的HTML标签中，如：

```html

<p style="color:red">这里文字是红色。</p>

```

- 嵌入式css:就是可以把css样式代码写在<style type="text/css"></style>标签之间，如：

```css
	p{ 
	  	font-size:12px;
	    color::red;
	    font-weight:bold;  
    }

```

- 外部式css：就是把css代码写一个单独的外部文件中，这个css样式文件以“.css”为扩展名，在`<head>`内（不是在`<style>`标签内）使用`<link>`标签将css样式文件链接到HTML文件内，如下面代码：

```html

<link href="base.css" rel="stylesheet" type="text/css" />

```

>`备注：相同权值的情况下内联式 > 嵌入式 > 外部式`



###网页样式表的三种来源



- 用户代理样式表：即浏览器默认样式

- 用户样式表：通常是外部css文件，存储在用户的计算机上被用户所调用

- 作者样式表：由css作者自己创建

> `备注：默认情况下作者样式表会覆盖用户样式表，用户样式表会覆盖用户代理样式表,作者样式表中应该尽量少使用！important因为它会干扰规则`




###继承



- 继承是指将属性值从父元素传递到子元素的方式,如下span继承了p的clolor属性值


```html
p{
	color:red
}
<p>三年级时,我还是一个<span>胆小如鼠</span> 的小女孩。</p>
```

> `但注意有一些css样式是不具有继承性的。如border:1px solid red;`




