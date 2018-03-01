// pages/interface/article/index.js
var Bmob = require('../../../utils/bmob.js');
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
    var that = this;
      var Diary = Bmob.Object.extend("_Article");
      var query = new Bmob.Query(Diary);
      // query.equalTo("title", "bmob");
      // query.containedIn("title", ["Bmob", "hello", "sure"]);
      // query.ascending(列名称);
      // 查询当前数据数据
      // var ks = [{ "createdAt": { "$gte": { "__type": "Date", "iso": "2014-07-15 00:00:00" } } },
      // { "createdAt": { "$lte": { "__type": "Date", "iso": "2014-07-15 23:59:59" } } }];
      // query.equalTo("$and", ks);
      query.find({
        success: function(results) {
          console.log("共查询到 " + results.length + " 条记录");
          // 循环处理查询到的数据
          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            console.log(object.id + ' - ' + object.get('title'));
          }
          that.setData({
            results: results
          });
        },
        error: function(error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
      
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})