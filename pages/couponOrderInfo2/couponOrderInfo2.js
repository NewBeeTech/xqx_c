// pages/couponOrderInfo2/couponOrderInfo2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sqtkIf:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  intoInfo:function(){
    // pages / MerchantDetails / MerchantDetails
    wx.navigateTo({
      url: '../MerchantDetails/MerchantDetails?id=' + "9976161"
    })
  },
  //
  sqtkTap:function(){
      this.setData({
          sqtkIf: !this.data.sqtkIf
      })
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