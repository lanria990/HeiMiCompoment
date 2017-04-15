# Android 编码规范
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">


[1 前言]()


[2 命名]()


## 1 前言

这份文档是在Google Java编程风格规范的基础上对android编码规范的补充


## 2 命名

### 2.1 类中常用方法的命名

#### [强制]采用小驼峰式命名法(lowerCamelCase)

类的获取方法（一般具有返回值）一般要求在被访问的字段名前加上 get，get 前缀方法返回的是单个值，find 前缀的方法返回的是列表值。

```javascript
示例 如：

getUser()    获取单个用户 get

findUsers()  获取用户列表 find

```

类的布尔型的判断方法一般要求方法名使用单词 is或has 做前缀，或者使用具有逻辑意义的单词，例如 equal 或 equals。

```javascript
示例：

isNetWorkConnected()

hasAuthority()

```


### 2.2 xml命名

#### [强制]Xml采用snake(蛇形)命名方式，且全部由小写字母组成，单词之间用下划线(_)连接

2.2.1 布局文件中的id命名

命名规则：采用view缩写 + '_' + 逻辑名

示例：

TextView : tv_
EditView : edt_
ImageView : img_
Button : btn_
RadioGroup : rg_
RadioButton : rb_
CheckBox : ck_
LinearLayout : lyt_
RelativeLayout : ryt_
ListView : lst_
... ...
2.2.2 xml文件命名

适配器文件： 模块名 + _ item _ + 逻辑名 如：个人中心相册列表 usr_item_album

可共用文件： include + _ + 逻辑名 如：底部菜单栏 include_menu

fragment/activity文件：模块名 + _ + 逻辑名 如：个人中心 usr_center

2.3 控件java后台命名

控件命名使用Camel(驼峰)命名法

命名规则：控件缩写名称开头 + 逻辑名。

示例：

TextView ： tv_title --> tvTitle

Button ： btn_order_type --> (java) btnOrderType