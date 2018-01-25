var Bmob = require('../../../utils/bmob.js');
var that = this;

var app = getApp();
let openid;
let objectId;


/**
 * 生成一条聊天室的消息的唯一 ID
 */
function msgUuid() {
  if (!msgUuid.next) {
    msgUuid.next = 0;
  }
  return 'msg-' + (++msgUuid.next);
}

/**
 * 生成聊天室的系统消息
 */
function createSystemMessage(content) {
  return { id: msgUuid(), type: 'system', content };
}

/**
 * 生成聊天室的聊天消息
 */
function createUserMessage(content, user,us, isMe) {
  return { id: msgUuid(), type: 'speak', content, user,us, isMe };
}

// 声明聊天室页面
Page({

  /**
   * 聊天室使用到的数据，主要是消息集合以及当前输入框的文本
   */
  data: {
    messages: [],
    inputContent: '欢迎见到大家',
    lastMessageId: 'none',
    msgObjectId: "",
    objectId: ""
  },

  /**
   * 页面渲染完成后，启动聊天室
   * */
  onReady() {

  },

  onShareAppMessage: function () {
    var that = this;
    return {
      title: 'Bmob 小程序客服管理',
      path: 'pages/interface/chatroom/chatroom',
      success: function (res) {
        // 转发成功
        console.log('成功', res)

        var currentUser = Bmob.User.current();
        that.pushMessage(createSystemMessage('恭喜' + currentUser.get('nickName') + '把聊天室成功分享给他人...'));
        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {



          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 后续后台切换回前台的时候，也要重新启动聊天室
   */
  onShow(options) {



  },
  onLoad(options) {

    var that = this;
    let openid = options.id
    this.openid = openid;

    



   // 如果登录过，会记录当前用户openid
   var newOpenid = wx.getStorageSync('openid')
   if (!newOpenid) {
     this.pushMessage(createSystemMessage('您当前未登陆...'));
   } else {

     //加载默认数据
     loadDefault(that,openid);

   }



  },

  /**
   * 页面卸载时，退出聊天室
   */
  onUnload() {
    this.quit();
  },

  /**
   * 页面切换到后台运行时，退出聊天室
   */
  onHide() {
    this.quit();
  },

  /**
   * 启动聊天室
   */
  enter() {


    
  },

  /**
   * 连接到聊天室信道服务
   */
  connect() {




  },

  /**
   * 退出聊天室
   */
  quit() {

  },

  /**
   * 通用更新当前消息集合的方法
   */
  updateMessages(updater) {
    var messages = this.data.messages;
    updater(messages);

    this.setData({ messages });

    // 需要先更新 messagess 数据后再设置滚动位置，否则不能生效
    var lastMessageId = messages.length ? messages[messages.length - 1].id : 'none';
    // console.log(lastMessageId);
    this.setData({ lastMessageId });
  },

  /**
   * 追加一条消息
   */
  pushMessage(message) {
    this.updateMessages(messages => messages.push(message));
  },

  /**
   * 替换上一条消息
   */
  amendMessage(message) {
    this.updateMessages(messages => messages.splice(-1, 1, message));
  },

  /**
   * 删除上一条消息
   */
  popMessage() {
    this.updateMessages(messages => messages.pop());
  },

  /**
   * 用户输入的内容改变之后
   */
  changeInputContent(e) {
    this.setData({ inputContent: e.detail.value });
  },

  /**
   * 点击「发送」按钮，通过信道推送消息到服务器
   **/
  sendMessage(e) {

    // 聊天室的openid
    let openid= this.openid;

    // 当前用户的openid
    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      this.pushMessage(createSystemMessage('您当前未登陆...'));
    } else {

    var that = this;


    var content = this.data.inputContent;
    if (!content) {
      return false;
    }

    var currentUser = Bmob.User.current();
    var User = Bmob.Object.extend("_User");
    var UserModel = new User();

    var objectId = currentUser.id;

    //添加一条记录
    var Diary = Bmob.Object.extend("message");
    var diary = new Diary();

    UserModel.id = objectId;
    diary.set("us", UserModel);

    //写入用户信息方便判断谁发送的消息
    diary.set("openid", newOpenid);
    diary.set("userId", openid);




    diary.set("content", content);
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function (result) {

        // loadDefault(that,openid);

        var currentUser = Bmob.User.current();
        var User = Bmob.Object.extend("_User");

        let user;
        let us =  user = {"userPic":currentUser.get("userPic"),"nickName":currentUser.get("nickName")};

        that.pushMessage(createUserMessage(content, user,us,true));

        // 发送消息给客户微信
        Bmob.Cloud.run('reply', {"userId":openid,"content":content}, {
          success: function(result) {
            let resultObj = JSON.parse(result);
            console.log(result);
            console.log(resultObj.errmsg);
            if(resultObj.errcode!="0"){
              that.pushMessage(createSystemMessage("发送失败:"+resultObj.errmsg));
            }
          },
          error: function(error) {
          }
        })

        that.setData({ inputContent: '' });
        
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });
  }




  },
});




function loadDefault(t, openid) {

  //进入聊天室先加载之前最后3条聊天记录
  var Diary = Bmob.Object.extend("message");
  var query = new Bmob.Query(Diary);
  query.descending("createdAt");
  query.equalTo("userId",openid);
  query.include("own");
  query.include("us");
  query.limit(10);
  // 查询所有数据
  query.find({
    success: function (results) {
      console.log("共查询到 " + results.length + " 条记录");
      // 循环处理查询到的数据
      let nickName;
      for (var i = results.length - 1; i >= 0; i--) {
       
        var object = results[i];
        if(!nickName && object.get('own')!=undefined){
          console.log(object)
          nickName = object.get('own').nickName;
          // 
        }
     
        t.pushMessage(createUserMessage(object.get('content'), object.get('own'),object.get('us'), object.get('openid')));
      }
      nickName = nickName!=undefined?nickName:"客户";
      wx.setNavigationBarTitle({ title: '与'+nickName+'对话中' });
     

    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}