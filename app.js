//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("4195da08a4bfe3814a4284de579fd8c0", "f0fd39c21b7ffab76c530eb5d63b3415");
// Bmob.initialize("e6bcb70bc0442250f7a655efcc8ffa3a", "4e43c8b1e491f7dc6ebda23e0f57a7ac");
// Bmob.initialize("2b515d918cf5e1b45b5ad89164fcd7ff", "927950dd9128da998c752d1addfcf47e"); //调试支付
// Bmob.initialize("e98d77118557b0014b19af3226ed950b", "7d0004dc751a05754a6dd755b1fc5931"); //本地
App({ 
  onLaunch: function () {
    var user = new Bmob.User();//开始注册用户

     
      var newOpenid = wx.getStorageSync('openid')
      if (!newOpenid) {

        wx.getUserInfo({
          success: function (result) {

            var userInfo = result.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;


            wx.login({
              success: function (res) {
                user.loginWithWeapp(res.code).then(function (user) {
                  var openid = user.get("authData").weapp.openid;
                  console.log(user, 'user', user.id, res);

                  if (user.get("nickName")) {
                    // 第二次访问
                    console.log(user.get("nickName"), 'res.get("nickName")');                 

                    wx.setStorageSync('openid', openid)
                  } else {

                    var u = Bmob.Object.extend("_User");
                    var query = new Bmob.Query(u);
                    query.get(user.id, {
                      success: function (result) {
                        wx.setStorageSync('own', result.get("uid"));
                      },
                      error: function (result, error) {
                        console.log("查询失败");
                      }
                    });


                  }



                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号

                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });




                  //下面这块代码主要是兼容本系统之前的老用户
                }, function (err) {
                  console.log(err, 'errr');
                });

              }
            });

          }
        });

      }


  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})