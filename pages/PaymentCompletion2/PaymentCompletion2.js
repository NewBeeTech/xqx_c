<<<<<<< HEAD
// pages/PaymentCompletion/PaymentCompletion.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  loadData: function (page) {
      appData.Tool.getCreateGroupBuyInfoXCX({ cnd: 0, create_person_id: 0, group_buy_id:0 }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },
  
  qurBtn: function (page) {
      appData.Tool.createGroupBuyXCX({ cnd: 0, num: 0, money: 0, merchant_id: 0, ratio: 0, address_id: 0,name:0,create_person_id: 0, group_buy_id: 0 }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData();
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
=======
// pages/PaymentCompletion/PaymentCompletion.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  loadData: function (page) {
      appData.Tool.getCreateGroupBuyInfoXCX({ cnd: 0, create_person_id: 0, group_buy_id:0 }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },
  
  qurBtn: function (page) {
      appData.Tool.createGroupBuyXCX({ cnd: 0, num: 0, money: 0, merchant_id: 0, ratio: 0, address_id: 0,name:0,create_person_id: 0, group_buy_id: 0 }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData();
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
>>>>>>> master
})