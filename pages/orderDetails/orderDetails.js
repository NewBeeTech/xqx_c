// pages/orderDetails/orderDetails.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqObj:{}
  },
  loadData: function (id) {
      var that = this;
      appData.Tool.getGoodsGroupBuyInfoXCX({ cnd: id}).then(function (res) {
          console.log(res)
          that.setData({
              xqObj:res.data
          })
      }).catch(function (err) { });
  },
  //确认收货
  qusTap:function(){
      var that = this;
      appData.Tool.commitReceiveGoods({ goods_group_id: that.data.xqObj.goods_group_id, group_buy_id:'' }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },
  //取消订单
  quxTap:function(){
      var that = this;
      appData.Tool.cancelGroupOrder({ goods_group_id: that.data.xqObj.goods_group_id, group_buy_id: '' }).then(function (res) {
          console.log(res)
      }).catch(function (err) { });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData(options.id);
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