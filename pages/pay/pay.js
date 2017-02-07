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
  pay:function(){

     Bmob.Pay.wechatPay(0.01,'名称','描述').then(function (obj) {
          
            console.log(obj);

        }, function (err) {
           console.log('eerr');
            console.log(err);
        });



//     wx.requestPayment({
//    'timeStamp': '1486362934',
//    'nonceStr': 'fyLCF4kwreIPkfs3',
//    'package': 'prepay_id=wx20170206143536185c69b57b0760088807',
//    'signType': 'MD5',
//    'paySign': 'CECD6D0CAEED6BD509D838F3A5CBB617',
//    'success':function(res){
//      console.log(res)
//       common.showTip(res, 'loading');
//    },
//    'fail':function(res){
//      common.showTip(res, 'loading');
//      console.log(res)
//    }
// })


  }

})