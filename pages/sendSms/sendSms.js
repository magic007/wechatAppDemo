var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
        verifySmsCode: '',
        phone: '',
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
    sendSms: function (event) {
        var that = this
        var phone = event.detail.value.phone;
        Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": phone }).then(function (obj) {
            that.setData({
                phone: phone
            })
            common.showTip('发送成功' + "smsId:" + obj.smsId);

        }, function (err) {
            common.showTip('发送失败' + err);
        });

    },
    verifySmsCode: function (event) {
        var phone = this.data.phone;
        var verifyCode = event.detail.value.verifyCode;
        if (!phone) {
            common.showTip('请发送短信后再验证');
            return false;
        } else if (!verifyCode) {
            common.showTip('请输入验证码');
            return false;
        }

        Bmob.Sms.verifySmsCode(phone, verifyCode).then(function (obj) {
            common.showTip('验证成功' + "smsId:" + obj.msg);
            that.setData({
                verifySmsCode: "验证成功"
            })
        }, function (err) {
            common.showTip('验证失败' + err);
            that.setData({
                verifySmsCode: "验证失败"
            })
        });
    }
})