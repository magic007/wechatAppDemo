var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
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

    },
    addFeedback: function (event) {
        var that = this;
        var contact = event.detail.value.contact;
        var content = event.detail.value.content;
      
        if (!contact) {
            common.showTip("标题不能为空", "loading");
            return false;
        }
        else if (!content) {
            common.showTip("内容不能为空", "loading");
            return false;
        }
        else {
            that.setData({
                loading: true
            })
            //增加日记
            var Diary = Bmob.Object.extend("feedback");
            var diary = new Diary();
            diary.set("contact", contact);
            diary.set("content", content);
  
            //添加数据，第一个入口参数是null
            diary.save(null, {
                success: function (result) {
                    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                    common.showModal('保存反馈成功，点击确定返回。','提示',function(){
                        wx.navigateBack();
                    });
                   
                    // wx.navigateBack();
                    that.setData({
                        loading: false
                    })

                },
                error: function (result, error) {
                    // 添加失败
                    common.showModal('保存反馈失败，请重新发布');

                }
            });
        }

    },

})