var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this

    },
    
    about: function (e) {
         common.showModal('本程序后端使用Bmob简单实现，仅供学习使用，如想加入一起学习，请加QQ群：118541934');
    }

})