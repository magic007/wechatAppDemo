// pages/other/other.js
var that;
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
Page({
  data: {
    loading: true,
    openId: '',
    dataInfo: [],
    PayResult: ''
  },
  onLoad: function () {
    that = this;
    // 页面初始化 options为页面跳转所带来的参数

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
                openId: result.openid
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
  verifyOrder: function (event) {//查询订单 
  //12cf41134f17b4109021d917630jsapi

    var orderid = event.detail.value.orderid;

    Bmob.Pay.queryOrder(orderid).then(function (resp) {
      console.log('resptt');
      that.setData({
        PayResult: resp,
      })
      console.log(resp);
    });
  },
  pay: function () {

    var openId = this.data.openId;

    if (!openId) {
      console.log('未获取到openId请刷新重试');
    }


    //传参数金额，名称，描述,openid
    Bmob.Pay.wechatPay(0.01, '名称1', '描述', openId).then(function (resp) {
      console.log('resp');
      console.log(resp);

      that.setData({
        loading: true,
        dataInfo: resp
      })

      //服务端返回成功
      var timeStamp = resp.timestamp,
        nonceStr = resp.noncestr,
        packages = resp.package,
        orderId = resp.out_trade_no,//订单号，如需保存请建表保存。
        sign = resp.sign;

      //打印订单号
      console.log(orderId);

      //发起支付
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packages,
        'signType': 'MD5',
        'paySign': sign,
        'success': function (res) {
          //付款成功,这里可以写你的业务代码
          console.log(res);
        },
        'fail': function (res) {
          //付款失败
          console.log('付款失败');
          console.log(res);
        }
      })

    }, function (err) {
      console.log('服务端返回失败');
      common.showTip(err.message, 'loading',{},6000);
      console.log(err);
    });




  }

})