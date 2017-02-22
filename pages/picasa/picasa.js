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
  delImg: function () {//图片删除
    var path = "http://bmob-cdn-8595.b0.upaiyun.com/2017/02/20/04d1c76c40f1c2e0809fa409bbf72e57.jpg";
    var s = new Bmob.Files.del(path).then(function (res) {
      if (res.msg == "ok") {
        console.log('删除成功');
        common.showModal("删除成功");
      }
      console.log(res);
    }, function (error) {
      console.log(error)
    }
    );
 

  },
  upImg: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({
          loading: false
        })
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 0) {
           var newDate = new Date();
          var newDateStr = newDate.toLocaleDateString();

          var extension = /\.([^.]*)$/.exec(tempFilePaths[0]);
          if (extension) {
            extension = extension[1].toLowerCase();
          }
          var name = newDateStr + "." + extension;//上传的图片的别名
          
          
          var file = new Bmob.File(name, tempFilePaths);
          file.save().then(function (res) {
            that.setData({
              loading: true,
              url: res.url()
            })
          }, function (error) {
            console.log(error)
          });

          //如果你突然发现这个文件传了又想立即删了，可以直接执行
          file.destroy();
        }

      }
    })
  }
})