// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nub:1,
    info:{}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = [{
      url: "http://logo.denong.com/Fo5sLJvQc9JUSDvIZ7c7ZWJuOJS_", material_name: "怡庭 Bistrot B", id: "9976161", price: "30", fen: "10", orangePrice: "53", name: "黑椒牛柳"
    }, { url: "http://logo.denong.com/Fo5sLJvQc9JUSDvIZ7c7ZWJuOJS_", material_name: "山海楼(德胜门店)", id: "9976162", price: "50", fen: "40", orangePrice: "66", name: "黑椒牛排" }];

    var id = options.id;
    console.log(options);
    var info = {};
    if (options.id =="9976161"){
      info = list[0];
    }
    if (options.id == "9976162"){
      info = list[1];
    }

this.setData({
  info:info
});
  },
  navToBus:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../MerchantDetails/MerchantDetails'
    })
  },
  leftTap:function(){
      var nub = this.data.nub - 1;
      this.setData({
          nub: nub ? nub:1
      })
  },
  rightTap: function () {
      var nub = this.data.nub + 1;
      this.setData({
          nub: nub
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