// pages/PaymentSuccess/PaymentSuccess.js
var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeId:0,
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    tradeId: options.tradeId
  });
  console.log(options.tradeId);
  this.loadData(options.tradeId);
  },

  loadData: function (tradeId){
    var self = this;
    appData.Tool.getTradeDetail({ cnd: tradeId}).then(function(res){
      console.log(res);
      wx.hideLoading();
      self.setData({
        info:res.data
      });
      const info = res.data;
      self.info.curR = ~~(info.real_charge * 100 * info.cur_ratio / 100) ? ~~(info.real_charge * 100 * info.cur_ratio / 100) / 100 : 0.01;
    }).catch(function(err){
      console.warn(err);
      wx.hideLoading();
      // wx.showToast({
      //   title: err.message,
      //   duration:2000
      // })
    });
  },
  //
  toNext: function () {
    console.log("OK");
    var self = this;
    wx.redirectTo({
      url: '../DetailsOfTheBill/DetailsOfTheBill?id=' + self.data.tradeId
    })
  },
  goBackHome: function() {
    wx.reLaunch({
      url: '/pages/spellGroupHome/spellGroupHome'
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
