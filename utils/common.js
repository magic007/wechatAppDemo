function showTip(sms,icon,fun){
    wx.showToast({
        title: sms,
        icon:icon,
        duration: 1000,
        success:fun
    })
}

module.exports.showTip = showTip;