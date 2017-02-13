function showTip(sms,icon,fun,t){
    if(!t){
        t=1000;
    }
    wx.showToast({
        title: sms,
        icon:icon,
        duration: t,
        success:fun
    })
}

module.exports.showTip = showTip;