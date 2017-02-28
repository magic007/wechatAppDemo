var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

    },
    
    about: function (e) {
         common.showModal('本程序后端使用Bmob简单实现，仅供学习使用，如想加入一起学习，请加QQ群：118541934');
    }

})