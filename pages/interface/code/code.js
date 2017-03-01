var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
var app = getApp()
Page({
    data: {
        "imageBytes": ""
    },
    noneWindows: function () {
        this.setData({
            imageBytes: ""
        })
    },
    onLoad: function () {

    },
    formSubmit: function (event) {
        var path = event.detail.value.path;
        var width = event.detail.value.width;
        var that = this;
        Bmob.generateCode({ "path": path, "width": width }).then(function (obj) {
            console.log(obj);
            that.setData({
                imageBytes: obj.imageBytes
            })

        }, function (err) {

            common.showTip('失败' + err);
        });
    }
})