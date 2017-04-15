#组件后台 登录login 

#### 登录模块 

	m-开头的是fis模块的组件
>
+ 用户名密码
+ 登录校验（判空,密码长度判断）
+ 提示采用 bsz模块的alert


```javascript
//后台路径
'/admin/login/loginAjax.do'
//后台参数
o={
	name:'用户名',
	pwd:'密码' 
}

```
>注意事项：如果需要密码加密请引入base64.js|md5.js|sha1.js，统一密钥，修改js
需要修改 js中的ajax路径和登录成功的路径

```javascript
var add = new Base64();
var str = add.encode('密码');
//或者
var str = hex_md5('密码')
//或者
var str = hex_sha1('密码')
 
```
> author: YJL 2015/04/07 