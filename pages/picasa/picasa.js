// pages/other/other.js
var that;
var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
Page({
  data:{    
      loading:true
  },
  onLoad:function(){
    that=this;
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  upImg:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
          that.setData({
            loading:false
          })
          var tempFilePaths = res.tempFilePaths;
          if(tempFilePaths.length>0){
              var name="1.jpg";//上传的图片的别名
              var file=new Bmob.File(name,tempFilePaths);
              file.save().then(function(res){
                that.setData({        
                  loading:true,
                  url:res.url()
                })
              },function(error){
                console.log(error)
              })
          }
          
      }
    })
  }  
})