// pages/myAccumGold/myAccumGold.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      daijieIf:false,
      ytgIf:false,
      obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMy();
  },
  //
  daijie:function(){
      this.setData({
          daijieIf: !this.data.daijieIf
      })
  },
  //
  ytgTap: function () {
      this.setData({
          ytgIf: !this.data.ytgIf
      })
  },
  //
  dqxjTap:function(){
      wx.navigateTo({
          url: '../Kim/Kim',
      })
  },
  //获取个人信息
  getMy: function () {
      var self = this;
      appData.Tool.getUserInfo().then(function (result) {
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