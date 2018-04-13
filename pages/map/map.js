// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    width:"750rpx",
    height:"1000rpx"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        self.setData({
          width: res.windowWidth+"px",
          height: res.windowHeight+"px"
        });
      }
    })
  console.log(options);
    this.setData({
      obj: options,
      
    });
    this.mapCtx = wx.createMapContext('myMap');
    self.setData({
      markers: [{
        latitude: options.lat,
        longitude: options.log
      }]
    });
    self.mapCtx.moveToLocation();
    wx.openLocation({
      latitude: parseFloat(options.lat),
      longitude: parseFloat(options.log),
      name: options.name,
      scale: 18
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