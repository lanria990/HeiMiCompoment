# 数据库规范
<link rel="stylesheet" type="text/css" href="/static/css/rule.css">
<meta charset="UTF-8">



## 1. 基础规范
1. 全部使用InnoDB引擎, MyISAM适用场景非常小
2. 字符集, 统一成utf8
3. 大数据表禁止适用count(*)操作
4. 单表行记录控制在1000万以内,行平均长度控制在16kb以内, 单表20GB以内
5. 禁止开发环境直接连接线上环境
6. 最少授权，值授予最基础的权限需求
7. 线上数据库和测试数据库尽可能保持一致
8. 系统目录， 文件，数据库，表，字段名命名长度不超过32个字符
9. 不使用select, show, update, order等保留字
10. 命名使用全英文，言之有意
11. 临时表用上tmp/temp前缀/后缀
12. 统计表加上stat/statistic前缀/后缀
13. 历史归档加上完整日期，例如：20130802
> mkdir -p /backup/user_log/2013/08  
> create table user_detail  
> create table xxx_1234  
> create table access_log_20130820

## 2. 数据库命名规范
数据库，数据表一律使用前缀  
正式数据库名使用小写英文以及下划线组成,尽量说明是那个应用或者
系统在使用的.比如:  
web_19floor_net  
web_car  

备份数据库名使用正式库名加上备份时间组成,如:  
web_19floor_net_20070403  
web_car_20070403

## 3. 数据库表命名规范
数据表名使用小写英文以及下划线组成,尽量说明是那个应用或者系统在使用的.  
相关应用的数据表使用同一前缀,如论坛的表使用cdb_前缀,博客的数据表
使用supe_前缀,  
前缀名称一般不超过5字  
比如:  
web_user  
web_group  
supe_userspace

备份数据表名使用正式表名加上备份时间组成,如:  
web_user_20070403  
web_group_20070403  
supe_userspace_20070403  

## 4. 字段命名规范
字段名称使用单词组合完成,首字母小写,后面单词的首字母大写,最好是带表名前缀.  
如 web_user 表的字段:  
userId  
userName  
userPassword  

表与表之间的相关联字段要用统一名称,  
如 web_user 表里面的 userId 和 web_group 表里面的 userId 相对应

## 5. 字段类型规范
规则:用尽量少的存储空间来存数一个字段的数据.  
比如能用int的就不用char或者varchar  
能用tinyint的就不用int  
能用varchar(20)的就不用varchar(255)  
时间戳字段尽量用int型，如created:表示从'1970-01-01 08:00:00'开始的int秒数,  
采用英文单词的过去式；gmtCreated:表示datetime类型的时间，    
即形如'1980-01-01 00:00:00'的时间串，Java中对应的类型为Timestamp

## 6. 索引规范
1. 

## 6. 数据库设计文档规范

## 7. sql语句规范
1. 所有的sql语句一路写成小写
2. 不允许使用select \*  
使用SELECT语句时，不允许使用SELECT \*  ，要使用明确的列名。目的是防止数据字段增加后的影响。使用select count(序列列)  代替select count(*)。
3. INSERT必须指定插入的字段名
使用INSERT时，必须指定插入的字段名，主要是考虑以后表结构的变动。
4. 使用表的别名
数据库查询，必须使用表的别名，且表的别名要有含义，尽量避免使用a、b、c等作为表的别名。
当在SQL语句中连接多个表时, 必须使用表的别名并把别名前缀于每个Column上。
5. 使用显式的类型转换
不要使用数据库的类型自动转换功能（如数字自动转换为字符串），应使用显式的类型转换。自动转换时往往导致该字段的索引无法使用。
6. 避免在索引列上使用计算  
*低效*
> select ..
> from dept
> where sal \* 12 > 2500;
*高效*
> select ..
> from dept
> where sal > 2500/12;
