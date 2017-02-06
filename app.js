//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("4195da08a4bfe3814a4284de579fd8c0", "f0fd39c21b7ffab76c530eb5d63b3415");
Bmob.initialize("e6bcb70bc0442250f7a655efcc8ffa3a", "4e43c8b1e491f7dc6ebda23e0f57a7ac");
// Bmob.initialize("e98d77118557b0014b19af3226ed950b", "7d0004dc751a05754a6dd755b1fc5931"); //本地
App({ 
  onLaunch: function () {
      //    wx.login({
      //     success: function(res) {
      //         if (res.code) {
      //             //发起网络请求
      //             console.log(res.code)

      //             //reset password
      //             Bmob.User.requestOpenId(res.code, {
      //                 success: function(result) {
      //                     console.log(result)                         
      //                 },
      //                 error: function(error) {
      //                     // Show the error message somewhere
      //                     console.log("Error: " + error.code + " " + error.message);
      //                 }
      //             });
      //         } else {
      //             console.log('获取用户登录态失败！' + res.errMsg)
      //         }
      //     }
      // });
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