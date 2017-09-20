//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
Page({
  
  data: {
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    diaryList: [],
    modifyDiarys: false
  },
  onReady: function (e) {

  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
        console.log('成功', res)

        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {
            

            //内部调用云端代码
            var currentUser = Bmob.User.current();
            var data = {
              "objectId": currentUser.id, "encryptedData": res.encryptedData, "iv": res.iv
              };
            console.log(data);
           
            // console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function (obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function (err) {
              console.log(err)
            });

            data = {"objectId": currentUser.id, "encryptedData": "Q3h+kMwbKZ52BsxgNT4GS5LTYeLLGIXnA/BZrg/9iMJBD5Qv3Fs5H66xe9ml7iNIsOBEtaeUG0InAxbZOhn1qEeAJ2aC3wYpjARR4pCYA1v87+bj9khaUDY6pvaKX5/4TFHrofKAmA0gTT6bSaHyiw==", "iv": "YHoSkWomdfiyvAWHoYvKiQ=="};
            console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function (obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function (err) {
              console.log(err)
            });

          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function () {

   
    that = this;

    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })

    var k ='http://bmob-cdn-12917.b0.upaiyun.com/2017/07/18/d99d3bb7400cb1ed808f34896bff6fcc.jpg';

    var newUrl = k.replace("http://bmob-cdn-12917.b0.upaiyun.com","https://bmob-cdn-12917.bmobcloud.com")
    
    console.log(newUrl);

    //批量更新数据
    // var query = new Bmob.Query('diary');
    // query.find().then(function (todos) {
    //   todos.forEach(function (todo) {
    //     todo.set('title', "无需后端编程");
    //   });
    //   return Bmob.Object.saveAll(todos);
    // }).then(function (todos) {
    //   // 更新成功
    // }, function (error) {
    //   // 异常处理
    // });


  },
  noneWindows: function () {
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  onShow: function () {

    getList(this);


    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullUpLoad: function (e) {
    var limit = that.data.limit + 2
    this.setData({
      limit: limit
    })
    this.onShow()
  },
  toAddDiary: function () {
    that.setData({
      writeDiary: true
    })
  },
  addDiary: function (event) {
    var title = event.detail.value.title;
    var content = event.detail.value.content;
    var formId = event.detail.formId;
    console.log("event", event)
    if (!title) {
      common.showTip("标题不能为空", "loading");
    }
    else if (!content) {
      common.showTip("内容不能为空", "loading");
    }
    else {
      that.setData({
        loading: true
      })
      var currentUser = Bmob.User.current();

      var User = Bmob.Object.extend("_User");
      var UserModel = new User();

      // var post = Bmob.Object.createWithoutData("_User", "594fdde53c");

      //增加日记
      var Diary = Bmob.Object.extend("diary");
      var diary = new Diary();
      diary.set("title", title);
      diary.set("formId", formId);//保存formId
      diary.set("content", content);
      if (currentUser) {
        UserModel.id = currentUser.id;
        diary.set("own", UserModel);
      }
      //添加数据，第一个入口参数是null
      diary.save(null, {
        success: function (result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          common.showTip('添加日记成功');
          that.setData({
            writeDiary: false,
            loading: false
          })

          var currentUser = Bmob.User.current();

          //成功后发送模板消息，这个只能在手机上测试，模拟器里面没有formid
          // var temp = {
          //   "touser": currentUser.get("openid"),
          //   "template_id": "B-2GcobfYnptevxY8G3SdA72YLYGZpOoJO_FEHlouWg",
          //   "page": "",
          //   "form_id": formId,
          //   "data": {
          //     "keyword1": {
          //       "value": "SDK测试内容",
          //       "color": "#173177"

          //     },
          //     "keyword2": {
          //       "value": "199.00"
          //     },
          //     "keyword3": {
          //       "value": "123456789"
          //     },
          //     "keyword4": {
          //       "value": "2015年01月05日 12:30"
          //     }
          //     ,
          //     "keyword5": {
          //       "value": "恭喜您支付成功，如有疑问请反馈与我"
          //     }
          //   }
          //   , "emphasis_keyword": "keyword1.DATA"
          // }
          // console.log(temp);
          // Bmob.sendMessage(temp).then(function (obj) {
          //   console.log('发送成功');


          // }, function (err) {

          //   common.showTip('失败' + err);
          // });


          //成功后发送主人模板消息，这个只需把openid改正确即可接收到， Bmob后端云公众号回复openid 
          // var temp = {
          //   "touser": "oUxY3w_jURG89H5wCIvJDPjJ5s2o",
          //   "template_id": "-ERkPwp0ntimqH39bggQc_Pj55a18CYLpj-Ert8-c8Y",
          //   "url": "http://www.baidu.cn/",
          //   "data": {
          //     "first": {
          //       "value": "您好，Restful 失效，请登录控制台查看。",
          //       "color": "#c00"
          //     },
          //     "keyword1": {
          //       "value": "Restful 失效"
          //     },
          //     "keyword2": {
          //       "value": "2017-07-03 16:13:01"
          //     },
          //     "keyword3": {
          //       "value": "高"
          //     },
          //     "remark": {
          //       "value": "如果您十分钟内再次收到此信息，请及时处理。"
          //     }
          //   }
          // }
          // console.log(temp);
          // Bmob.sendMasterMessage(temp).then(function (obj) {
          //   console.log('发送成功');


          // }, function (err) {

          //   common.showTip('失败' + err);
          // });



          that.onShow()
        },
        error: function (result, error) {
          // 添加失败
          common.showTip('添加日记失败，请重新发布', 'loading');

        }
      });
    }

  },
  closeLayer: function () {
    that.setData({
      writeDiary: false
    })
  },
  deleteDiary: function (event) {

   
var that =this;
  
  

    var objectId = event.target.dataset.id;
    wx.showModal({
      title: '操作提示',
      content: '确定要删除要日记？',
      success: function (res) {
        if (res.confirm) {
          //删除日记
          var Diary = Bmob.Object.extend("diary");
          // var query = new Bmob.Query('diary');
          // query.find().then(function (todos) {
          //   return Bmob.Object.destroyAll(todos);
          // }).then(function (todos) {
          //   console.log(todos);
          //   // 更新成功
          // }, function (error) {
          //   // 异常处理
          // });

          //创建查询对象，入口参数是对象类的实例
          var query = new Bmob.Query(Diary);
          query.get(objectId, {
            success: function (object) {
              // The object was retrieved successfully.
              object.destroy({
                success: function (deleteObject) {
                  console.log('删除日记成功');
                  getList(that)
                },
                error: function (object, error) {
                  console.log('删除日记失败');
                }
              });
            },
            error: function (object, error) {
              console.log("query object fail");
            }
          });
        }
      }
    })
  },
  toModifyDiary: function (event) {
    var nowTile = event.target.dataset.title;
    var nowContent = event.target.dataset.content;
    var nowId = event.target.dataset.id;
    that.setData({
      modifyDiarys: true,
      nowTitle: nowTile,
      nowContent: nowContent,
      nowId: nowId
    })
  },
  modifyDiary: function (e) {
    var t = this;
    modify(t, e)
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
    getList(this);
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    getList(this);
  },
  inputTyping: function (e) {
    //搜索数据
    getList(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  closeAddLayer: function () {
    that.setData({
      modifyDiarys: false
    })
  }

})


/*
* 获取数据
*/
function getList(t, k) {
  that = t;
  var Diary = Bmob.Object.extend("diary");
  var query = new Bmob.Query(Diary);
  var query1 = new Bmob.Query(Diary);

  //会员模糊查询
  if (k) {
    query.equalTo("title", { "$regex": "" + k + ".*" });
    query1.equalTo("content", { "$regex": "" + k + ".*" });
  }

  //普通会员匹配查询
  // query.equalTo("title", k);

  query.descending('createdAt');
  query.include("own")
  // 查询所有数据
  query.limit(that.data.limit);

  var mainQuery = Bmob.Query.or(query, query1);
  mainQuery.find({
    success: function (results) {
      // 循环处理查询到的数据
      console.log(results);
      that.setData({
        diaryList: results
      })
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}

function modify(t, e) {
  var that = t;
  //修改日记
  var modyTitle = e.detail.value.title;
  var modyContent = e.detail.value.content;
  var objectId = e.detail.value.content;
  var thatTitle = that.data.nowTitle;
  var thatContent = that.data.nowContent;
  if ((modyTitle != thatTitle || modyContent != thatContent)) {
    if (modyTitle == "" || modyContent == "") {
      common.showTip('标题或内容不能为空', 'loading');
    }
    else {
      console.log(modyContent)
      var Diary = Bmob.Object.extend("diary");
      var query = new Bmob.Query(Diary);
      // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
      query.get(that.data.nowId, {
        success: function (result) {

          // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
          result.set('title', modyTitle);
          result.set('content', modyContent);
          result.save();
          common.showTip('日记修改成功', 'success', function () {
            that.onShow();
            that.setData({
              modifyDiarys: false
            })
          });

          // The object was retrieved successfully.
        },
        error: function (object, error) {

        }
      });
    }
  }
  else if (modyTitle == "" || modyContent == "") {
    common.showTip('标题或内容不能为空', 'loading');
  }
  else {
    that.setData({
      modifyDiarys: false
    })
    common.showTip('修改成功', 'loading');
  }
}