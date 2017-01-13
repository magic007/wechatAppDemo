//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp();
var that;
Page({
  data:{
      writeDiary:false,
      loading:false,
      windowHeight: 0,
      windowWidth: 0,
      limit:10,
      diaryList:[],
      modifyDiarys:false
  },
  onLoad: function () {
    that=this;

  },
  onShow:function(){
    var Diary= Bmob.Object.extend("diary");
      var query = new Bmob.Query(Diary);
      // 查询所有数据
      query.limit(that.data.limit);
      query.find({
        success: function(results) {
          // 循环处理查询到的数据
          that.setData({
            diaryList:results
          })
        },
        error: function(error) {
          alert("查询失败: " + error.code + " " + error.message);
        }
      });
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullUpLoad:function (e) {
    var limit = that.data.limit + 2
    this.setData({
      limit: limit
    })
    this.onShow()
  },
  toAddDiary:function(){
    that.setData({
      writeDiary:true
    })
  },
  addDiary:function(event){
    var title=event.detail.value.title;
    var content=event.detail.value.content;
    if(!title){
      common.showTip("标题不能为空","loading");
    }
    else if(!content){
      common.showTip("内容不能为空","loading");
    }
    else{
      that.setData({
        loading:true
      })
      //增加日记
      var Diary = Bmob.Object.extend("diary");
      var diary = new Diary();
      diary.set("title",title);
      diary.set("content",content);
      //添加数据，第一个入口参数是null
      diary.save(null, {
        success: function(result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          common.showTip('添加日记成功');
          that.setData({
            writeDiary:false,
            loading:false
          })
          that.onShow()
        },
        error: function(result, error) {
          // 添加失败
          common.showTip('添加日记失败，请重新发布','loading');
          
        }
      });
    }
    
  },
  closeLayer:function(){
    that.setData({
      writeDiary:false
    })
  },
  deleteDiary:function(event){
    var objectId=event.target.dataset.id;
    wx.showModal({
      title: '操作提示',
      content: '确定要删除要日记？',
      success: function(res) {
        if (res.confirm) {
            //删除日记
            var Diary = Bmob.Object.extend("diary");
            //创建查询对象，入口参数是对象类的实例
            var query = new Bmob.Query(Diary);
            query.equalTo("objectId", objectId);
            query.destroyAll({
              success: function(){
                  common.showTip('删除日记成功');
                  that.onShow();
              },
              error: function(err){
                  common.showTip('删除日记失败','loading');
              }
            });
        }
      }
    })
  },
  toModifyDiary:function(event){
    var nowTile=event.target.dataset.title;
    var nowContent=event.target.dataset.content;
    var nowId=event.target.dataset.id;
    that.setData({
      modifyDiarys:true,
      nowTitle:nowTile,
      nowContent:nowContent,
      nowId:nowId
    })
  },
  modifyDiary:function(e){
     //修改日记
    var modyTitle=e.detail.value.title;
    var modyContent=e.detail.value.content;
    var objectId=e.detail.value.content;
    var thatTitle=that.data.nowTitle;
    var thatContent=that.data.nowContent;
    if((modyTitle!=thatTitle||modyContent!=thatContent)){
      if(modyTitle==""||modyContent==""){
        common.showTip('标题或内容不能为空','loading');
      }
      else{
        console.log(modyContent)
        var Diary = Bmob.Object.extend("diary");
        var query = new Bmob.Query(Diary);
        // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
        query.get(that.data.nowId, {
            success: function(result) {
              
              // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
              result.set('title',modyTitle);
              result.set('content',modyContent);
              result.save();
              common.showTip('日记修改成功','success',function(){
                that.onShow();
                that.setData({
                  modifyDiarys:false
                })
              });
              
              // The object was retrieved successfully.
            },
            error: function(object, error) {

            }
        });
      }
    }
    else if(modyTitle==""||modyContent==""){
      common.showTip('标题或内容不能为空','loading');
    }
    else{
      that.setData({
        modifyDiarys:false
      }) 
      common.showTip('修改成功','loading');
    }
  },
  closeAddLayer:function(){
    that.setData({
      modifyDiarys:false
    })
  }
  
})
