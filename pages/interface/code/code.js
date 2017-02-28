var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
var app = getApp()
Page({

    onLoad: function () {

    },
    formSubmit: function (event) {
        var path = event.detail.value.path;
        var width = event.detail.value.width;

        Bmob.generateCode({ "path": path, "width": width }).then(function (obj) {

            common.showModal('发送成功');

        }, function (err) {
            common.showModal('发送成功');
            common.showTip('失败' + err);
        });
    }
})