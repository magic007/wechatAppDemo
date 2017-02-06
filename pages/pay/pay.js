// pages/other/other.js
var that;
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
Page({
  data: {
    loading: true
  },
  onLoad: function () {
    that = this;
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getOpenId: function () {
    //获取open id，请在官网填写微信小程序key
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)

          Bmob.User.requestOpenId(res.code, {
            success: function (result) {
              that.setData({
                loading: true,
                url: result.openid
              })
              console.log(result)
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          common.showTip('获取用户登录态失败！', 'loading');
        }
      }
    });
  }
})