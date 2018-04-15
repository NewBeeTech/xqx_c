// pages/wholeOrder/wholeOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page:1,//页码
      Ddarr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //详情
  gmTap: function () {
      wx.navigateTo({
          url: '../orderDetails/orderDetails?id=' + e.currentTarget.dataset.id
      })
  },
  //售后
  sohTap:function(){
      wx.navigateTo({
          url: '../customerService/customerService',
      })
  },

  //获取用户全部订单
  getDdList:function(){
      var that = this;
      appData.Tool.getGoodsGroupOrderListXCX({ page: that.data.page, rows:10 }).then(function (res) {
        console.log(res)
        that.setData({
            Ddarr: that.data.Ddarr.concat(res.data.list)
        })
      })
          .catch(function (err) {})
  },

  //下拉加载
  xijSoll:function(){
      this.setData({
          page:this.data.page+1
      });
      this.getDdList();
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