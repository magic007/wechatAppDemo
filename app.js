//app.js
var Bmob = require('utils/bmob.js')
// var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
// const BmobSocketIo = require('utils/tunnel');
Bmob.initialize(
  '39ee83f92ff3a195130596a4eaec5ddf',
  'a1223fca87f5d229953817f5c2493446'
)

App({
  onLaunch: function() {
    var user = new Bmob.User() //开始注册用户
    user.auth()
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})
