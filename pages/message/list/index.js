// message/list/index.js
var Bmob = require('../../../utils/bmob.js');
let p = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "icon60": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKiaiaebRxXica06Aqicy3kgT6AgzM24EiaecNF5rwdY960mbib3EspzG5njPKvVcTMibOSaOibNK6LcMgUXA/0",
    limit: 0,
    page: 5,//当前请求的页数
    currentPage: 0,//当前请求的页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    this.setData({
      limit: 0,
      currentPage: 0,
      page: this.p,
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.setData({
      limit: 0,
      currentPage: 0,
      page: this.p,
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.setData({
      limit: 0,
      currentPage: 0,
      page: 5,
    })
    this.getReturn(e.detail.value);
  },
  getReturn(value) {
    var that = this;

    var Diary = Bmob.Object.extend("chatList");
    var query = new Bmob.Query(Diary);



    if (value) {
      query.equalTo("nickName", { "$regex": "" + value + ".*" });
    }

    query.limit(that.data.page);
    query.skip(that.data.page * that.data.currentPage);

    console.log(that.data.page, that.data.currentPage)





    query.descending("createdAt");
    query.include("own");
    // 查询所有数据
    query.find({
      success: function (results) {

        that.onSetData(results, that.data.currentPage);
      }
    });

  },
  loadMore: function () {
    console.log("加载更多");
    this.getReturn();
  },
  onSetData: function (data) {
    console.log(data.length);
    let page = this.data.currentPage = this.data.currentPage + 1;

    //设置数据
    data = data || [];

    this.setData({
      data: page === 1 || page === undefined ? data : this.data.data.concat(data),
      isEmpty: data.length === 0 ? false : true,
      isload: true
    });
    console.log(this.data.data, page);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getReturn();
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