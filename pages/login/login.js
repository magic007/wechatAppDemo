var Bmob = require('../../utils/bmob.js');
var common=require('../../utils/common.js');
var app = getApp()
Page({
    
    onLoad:function(){
        //获取open id，请在官网填写微信小程序key
        wx.login({
          success: function(res) {
              if (res.code) {
                  //发起网络请求
                  console.log(res.code)

                  Bmob.User.requestOpenId(res.code, {
                      success: function(result) {
                          console.log(result)                         
                      },
                      error: function(error) {
                          // Show the error message somewhere
                          console.log("Error: " + error.code + " " + error.message);
                      }
                  });
              } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
              }
          }
      });
    } ,
    formSubmit:function(event){

        Bmob.User.logIn(event.detail.value.username,event.detail.value.paswd, {
            success: function(user) {
                wx.getStorage({
                    key: Bmob._getBmobPath(Bmob.User._CURRENT_USER_KEY),
                    success: function(res) {
                        var Data =JSON.parse(res.data) ;
                        console.log(Data)
                        if(!Data.code){
                            common.showTip("登录成功,正在跳转","sucess",function(){
                                wx.redirectTo({
                                    url: '../index/index'
                                })
                            });
                        }
                        else{
                            common.showTip("对不起，您输入的用户名或密码错误","loading");
                        }
                    }
                })
            },
            error: function(user, error) {
                // The login failed. Check error to see why.
                console.log(error)
            }
        });
    }     
})