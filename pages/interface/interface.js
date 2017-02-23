var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
Page({
    data: {        
        userInfo: {},
    },
    onLoad:function(){
        var that = this 
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    autuLogin:function(){
        common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
    }

})