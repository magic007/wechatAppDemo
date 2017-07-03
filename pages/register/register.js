var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var that;
var app = getApp()
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
    formSubmit: function (event) {

        wx.showLoading({
            title: '用户注册中，请稍后！',
        })

        var accoutPswd = event.detail.value.accoutPswd;
        var accoutPswd1 = event.detail.value.accoutPswd1;
        var accoutName = event.detail.value.accoutName;
        if (accoutPswd == accoutPswd1 && accoutPswd != "" && accoutName != "") {
            var user = new Bmob.User();
            user.set("username", accoutName);
            user.set("password", accoutPswd);
            user.signUp(null, {
                success: function (res) {
                    that.setData({
                        loading: true,
                    })
                    wx.hideLoading()
                    common.showTip("注册成功请登录", "success", function () {
                        wx.redirectTo({
                            url: '../login/login'
                        })
                    });

                    console.log(res)
                    // wx.getStorage({
                    //     key: Bmob._getBmobPath(Bmob.User._CURRENT_USER_KEY),
                    //     success: function(res) {
                    //         var Data =JSON.parse(res.data) ;
                    //         if(Data.code=="202"){
                    //             common.showTip("该用户名已经存在！","loading");
                    //         }
                    //         else{
                    //             common.showTip("注册成功请登录","success",function(){
                    //                 wx.redirectTo({
                    //                  url: '../login/login'
                    //                 })
                    //             });
                    //         }
                    //     }
                    // })
                },
                error: function (userData, error) {
                    that.setData({
                        loading: true,
                    })
                    console.log(userData)
                    console.log("userData")

                    console.log(error)
                },
                complete: function (userData) {
                    that.setData({
                        loading: true,
                    })
                }
            });
        }
        else {
            wx.showLoading({
                title: '信息填写错误！',
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 2000)
            console.log("信息填写错误")
        }

    }
})