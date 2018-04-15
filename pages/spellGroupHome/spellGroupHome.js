// pages/spellGroup/spellGroup.js
var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toNextPage:function(e){
    console.log(e);
  
    var pageIndex = e.currentTarget.dataset.page;
    var pages = ["../homePage/homePage", "../FightGroups/FightGroups","../search/search", '../goodDetail/goodDetail']
    wx.navigateTo({
      url: pages[pageIndex],
    })
  },
  loadUserStatus:function(){
    app.getUserLocation(function (addr) {
      app.login(function () {
        wx.hideLoading();
        console.log(wx.getStorageSync("token"));
        appData.Tool.getAddressData({ location: addr }).then(function (result) {
          wx.hideLoading();
          wx.setStorageSync("city", result.data.id);
          wx.setStorageSync("level", result.data.level);
          
        })
          .catch(function (err) {
            console.log(err);
            wx.hideLoading();
            wx.showToast({
              title: err.message,
              icon: 'none',
              duration: 2000
            })
          });
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUserStatus();
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