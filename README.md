小程序demo更新记录
===================

### 增删改，登录，注册，图片上传演示
----------
打开Demo你可以这样操作:


![](http://i.imgur.com/61gfDgW.gif)
![](http://i.imgur.com/0uHVr5W.gif)


##个别开发者还未申请小程序，这里提供一个一些账户
1. appkey：wx77d6b7031c1e4763
![](http://i.imgur.com/UxKDqme.png)
2. 登录演示应用账号 `zhongguovu@gmail.com` 密码：`123456`


##使用方法
>###使用视频教程

#### 链接地址：[小程序视频教程](http://docs.bmob.cn/data/wechatApp/a_faststart/doc/index.html "小程序视频教程")
###说明
----------
本小程序示例不需要购买任何相关服务器，开箱即用。如是之前平台老用户则不需重复申请账号，并且打通之前的Android，IOS，等平台数据，本示例整合了常用的功能，开发请按照以下步骤操作。

###将sdk引入到微信小程序中
----------
1. 将`utils`目录下`bmob.js`,`underscore.js` 复制至项目中utils目录下
2. App.js 初始化SDK


		var Bmob = require('utils/bmob.js');  
		Bmob.initialize("4195da08a4bfe3814a4284de579fd8c0", "f0fd39c21b7ffab76c530eb5d63b3415");

3. 建立diary表创建title，content字段




###`DEMO` 数据查询简单示例
----------
#####具体请查看`Demo` 代码

    var Diary= Bmob.Object.extend("diary");
      var query = new Bmob.Query(Diary);
      // 查询所有数据
      query.limit(that.data.limit);
      query.find({
        success: function(results) {
          // 循环处理查询到的数据
          that.setData({
            diaryList:results
          })
        },
        error: function(error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
>Tip: 如果你对数据处理要求比较高，可以引入`underscore.js`库。

###配置AppId和AppSecret
----------
登录网址后台点击`应用`->`设置`->`微信小程序帐号服务配置`填写```AppID```,`AppSecret`。
>Tip: 如果你的小程序不需要获取用户`open id`功能，则不需要配置。


----------

#### <i class="icon-file"></i> 版本 v3.3.0
> **Note:**
> - 增加主人通知接口
> - 增加图文素材示例


#### <i class="icon-file"></i> 版本 v3.2.0
> **Note:**
> - 增加webSocket通讯协议
> - 增加群聊示例

#### <i class="icon-file"></i> 版本 v3.1.0
> **Note:**
> 
> - 模板调用图片，支持链试调用。 例如： obj.pic.url 
> - 连表查询，不在需要重写对象。支持链试调用。  obj.user.nickname

#### <i class="icon-file"></i> 版本 v3.0.0
> **Note:**
> 
> - 此版本主要变动开发者请求API地址，兼容微信白名单工单
> - index代码增加模板消息推送。

#### <i class="icon-file"></i> 版本 v2.1.0
> **Note:**
> 
> - 增加日记详细页面
> - 修复小程序点击事件冒泡问题catchtap
> - 首页增加模糊搜索
> - 修复我发布的没显示bug

#### <i class="icon-file"></i> 版本 v2.0.2
> **Note:**
> 
> - 增加我发布的
> - 修复部分bug


#### <i class="icon-file"></i> 版本 v2.0.1
> **Note:**
> 
> - 图片上传增加批量上传
> - 页面底部增加版权

#### <i class="icon-file"></i> 版本 v2.0.0
> **Note:**
> 
> - 增加新接口，生成二维码应用内推广链接
> - 升级UI2.0
> - 增加反馈功能模版

#### <i class="icon-file"></i> 版本 v1.1.0
> **Note:**
> 
> - 增加新登录接口，使用请看app.js
> - 增加新图片删除接口，使用请看接口图片上传

#### <i class="icon-file"></i> 版本 v1.0.0
> **Note:**
> 
> - 增加微信支付接口，只需填写key即可微信收款


#### <i class="icon-file"></i> 版本 v0.5.0
> **Note:**

> - 修复返回当前用户延时问题
> - 修复修改用户表缓存没更新问题

----------

#### <i class="icon-file"></i> 版本 v0.4.2
> **Note:**

> - 修复短信验证Bug
> - 添加短信验证Demo

----------

#### <i class="icon-file"></i> 版本 v0.4.1
> **Note:**

> - 修复注册跳转错误
> - 增加获取OpenId示例

----------


#### <i class="icon-file"></i> 版本 v0.4.0
> **Note:**

> - 添加接口示例
> - 添加短信发送示例
> -  添加退出账户操作
> -  增加个人信息展示

----------

#### <i class="icon-file"></i> 版本 v0.3.0
> **Note:**

> - 添加微信小程序关联Bmob后端填写key
> -  小程序获取openid

----------

#### <i class="icon-file"></i> 版本 v0.2.0
> **Note:**

> - 修复部分bug
> - 增加文件上传

----------

#### <i class="icon-file"></i> 版本 v0.1.0
> **Note:**

> - 数据增删改查
> - 登录
> - 注册
>-  短信



----------

> **Tip:** 更多信息请查看[官方文档](http://docs.bmob.cn/data/wechatApp/a_faststart/doc/index.html "官方使用文档")  ，如需帮助可以加入小程序讨论QQ群：**118541934**。
