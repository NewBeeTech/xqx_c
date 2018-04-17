// pages/invitingAwards/invitingAwards.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    appData.Tool.getInviteInfo().then(function (result) {
      console.log(result);
      wx.hideLoading()
      self.setData({
        obj: result.data
      });
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  //
  ckTap: function () {
      wx.navigateTo({
          url: '../historyInvitation/historyInvitation',
      })
  },
  shareAction:function(){

  },
  onShareAppMessage: function (res) {
    var self = this;
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: self.data.obj.act_title,
    //   path: self.data.obj.inviteUrl,
      path:'/spellGroupHome/spellGroupHome',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'fail',
          duration: 2000
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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