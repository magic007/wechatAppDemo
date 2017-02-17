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



        var Diary = Bmob.Object.extend("diary");
        var query = new Bmob.Query(Diary);
        // 查询所有数据
        query.limit(that.data.limit);
        query.find({
            success: function (results) {
                // 循环处理查询到的数据
                that.setData({
                    diaryList: results
                })
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });


    },
    deleteItem: function (event) {
        var objectId = event.target.dataset.id;
        console.log(event);
        console.log(objectId);
        var that= this;
        wx.showActionSheet({
            itemList: ['删除', '查看', '分享'],
            success: function (res) {
                console.log(res.tapIndex)
                if (res.tapIndex == 0) {
                    wx.showModal({
                        title: '操作提示',
                        content: '确定要删除要日记？',
                        success: function (res) {
                            if (res.confirm) {
                                //删除日记
                                var Diary = Bmob.Object.extend("diary");
                                //创建查询对象，入口参数是对象类的实例
                                var query = new Bmob.Query(Diary);
                                query.equalTo("objectId", objectId);
                                query.destroyAll({
                                    success: function () {
                                        common.showTip('删除日记成功');
                                        that.onShow();
                                    },
                                    error: function (err) {
                                        common.showTip('删除日记失败', 'loading');
                                    }
                                });
                            }
                        }
                    })
                }
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },
    logout: function (e) {

        Bmob.User.logOut();
        common.showTip('退出Bmob账户成功');
    }

})