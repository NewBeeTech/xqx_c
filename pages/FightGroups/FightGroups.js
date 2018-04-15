// pages/MerchantList/MerchantList.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      julIf:false,
      popupIf:false,
      index:-1
  },
  toGroupDetail:function(e){
    wx.navigateTo({
      url: '../goodDetail/goodDetail',
    })
  },

  loadData:function(page){
      appData.Tool.getGoodsGroupBuyListXCX({ intPara: 0, intPara2: 0, page: page, rows:10}).then(function(res){
          console.log(res)
      }).catch(function(err){});
  },
  //页面滚动
  pageScroll:function(e){
      var bil = e.detail.scrollWidth / 375; //单位换算适应屏幕
      var top = e.detail.scrollTop;
      console.log(top)
      if (top > bil * 345 / 2){
          this.setData({
              julIf:true
          })
          console.log(true)
      }else{
          this.setData({
              julIf: false
          })
          console.log(false)
      }
  },
  //弹窗
  popupTap:function(e){
      var that = this;
      var ind = e.currentTarget.dataset.ind;
      var index = that.data.index;
      if(index == ind){
          that.setData({
              popupIf: !that.data.popupIf,
              index:ind
          })
      }else{
          that.setData({
              popupIf: true,
              index: ind
          })
      }
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
})