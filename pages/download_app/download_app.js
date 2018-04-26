Page({
  copyLink: function() {
    wx.setClipboardData({
      data: 'https://mini.xqx.com/app_person_addition/download/success.html',
      success: function() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        });
      }
    })
  },
});
