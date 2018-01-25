// pages/interface/getPhone/getPhone.js
var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  getPhoneNumber: function (e) {
    var that = this;
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    // 解密后云函数返回数据格式如下
    // { "phoneNumber":"137xxxx6579", "purePhoneNumber":"137xxxx6579", "countryCode":"86", "watermark":{ "timestamp":1516762168, "appid":"wx094ede192e7efff" } }

    var user = new Bmob.User();//开始注册用户


    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;

      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var sessionKey = user.get("authData").weapp.session_key;
            console.log(user);
            var data = {
              "sessionKey": sessionKey,
              "encryptedData": encryptedData,
              "iv": iv
            }
            console.log(data);
            Bmob.Cloud.run('getPhone', data, {
              success: function (result) {
                that.setData({
                  "phoneInfo": result
                });
                console.log(result);
              },
              error: function (error) {
              }
            })

          });
        }
      });

      
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShareAppMessage: function (res) {
    var that =this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Bmob 示例',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log('成功', res)

        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {

            var user = new Bmob.User();//开始注册用户
            var iv = res.iv;
            var encryptedData = res.encryptedData;

            wx.login({
              success: function (res) {
                user.loginWithWeapp(res.code).then(function (user) {
                  var sessionKey = user.get("authData").weapp.session_key;
                  console.log(user);
                  var data = {
                    "sessionKey": sessionKey,
                    "encryptedData": encryptedData,
                    "iv": iv
                  }
                  console.log(data);
                  Bmob.Cloud.run('getPhone', data, {
                    success: function (result) {
                      that.setData({
                        "shareInfo": result
                      });
                      console.log(result);
                    },
                    error: function (error) {
                    }
                  })

                });
              }
            });

            
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})