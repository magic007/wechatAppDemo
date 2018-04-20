//app.js

var Bmob = require('utils/bmob.js')


// var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
// const BmobSocketIo = require('utils/tunnel');
Bmob.initialize(
  '39ee83f92ff3a195130596a4eaec5ddf',
  'a1223fca87f5d229953817f5c2493446'
)
// Bmob.initialize("983bc08c5a6d2e9bafa83b2c550a8175", "1a388a666e3bf56dedbcdd9d54a60e11");

App({
  onLaunch: function () {
    var user = new Bmob.User() //开始注册用户
    user.auth().then(function (obj) {
      console.log('登陆成功')
    },
    function (err) {
        console.log('失败了', err)
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
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
