# 前端组件规范（暂时）
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">



## 1 前言

组件是一种处理复杂系统分解成为更好的可管理模块的方式，它可以把系统代码划分为一系列职责单一，高度解耦且可替换的模块，系统中某一部分的变化将如何影响其它部分就会变得显而易见，系统的可维护性更加简单易得。


## 2 代码风格 

##### [强制] javascript组件中所有命名必须参照[javascript规范]()
##### [强制] css组件中所有命名必须参照[css组件规范]()

##### [强制] 文件名必须全部用小写，文件名分隔符用中划线连接，版本连接符用实心点，合并文件的文件名连接符用下划线.如： 

>`m-login.min.js`和`m-login-1.0.css` 。

##### [建议] 文件夹命名暂定分类-模块名(m-loging)，所有组件都支持fis。
>
- m- : amd || cmd模块化
- a- : angular组件

##### [强制] 组件化 必须有api文档README(.md)，用来描述组件的基本情况、测试文件
>1. 时间
2. 适用场景

```javascript
	# 模块名称

	-----

	该模块的概要介绍。

	-----

	## 使用说明

	如何使用该模块，可以根据组件的具体特征，合理组织。

	## API

	需要提供 API 说明，属性、方法、事件等。
```

##### [强制] 组件化 文件中必须要有HISTORY.md

记录组件的变更，最好和 issues 进行绑定。请阅读[历史记录书写规范](https://raw.githubusercontent.com/aralejs/overlay/master/HISTORY.md)。

```javascript
### 1.1.0

* [fixed] #18 修复了 XXX 问题
* [fixed] #29 修复了 YYY 问题
* [new] #12 增加了 ZZZ 功能
* [improved] #23 优化了 BBB 代码

### 1.0.0

* [new] 第一个发布版本
```

> 模块的修改类型共有五项
>
- NEW #3 新增的属性、功能、方法、特性等等。
- FIXED #15 修复 bug 和影响使用的性能问题等。
- IMPROVED 接口增强、健壮性和性能提升、代码优化、依赖模块升级等。
- CHANGED 涉及到兼容性变化的改动。
- UNRESOLVED 已知的但本版本暂未修复的问题。


## 3 注释

##### [强制] 为了便于代码阅读和自文档化，以下内容必须包含以 `/**...*/` 形式的块注释中。

>1. 文件
2. namespace
3. 类
4. 函数或方法
5. 类属性
6. 事件
7. 全局变量
8. 常量
9. AMD 模块

## 3 文件夹规范

<!-- -Web

-- components
--|--bossonz
--|--jquery
--page
--|--

--static
--|--css
--|--js
--|--libs
--|--images
--rule
--test
--widget
--| -- m-login -->
