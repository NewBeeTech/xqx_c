// pages/choiseCity/choiseCity.js
var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
     city:'',
     citys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options.city)
      this.setData({
        city:options.city
      })
      appData.Tool.getCityList({})
        .then(function (result) {
          wx.hideLoading();
          console.log(result);
          var citylist = result.data.xcxCCPPCityList;
          that.setData({
            citys: citylist
          })
        }).catch(function (err) {
          console.log(err);
      });
  },
  goToHome:function(e){
    var data=e.currentTarget.dataset;
    var codeid = data.codeid;
    var city = data.city;
    wx.removeStorageSync('codeid');
    wx.removeStorageSync('city');
    // console.log(wx.getStorageSync('codeid'))
    wx.setStorageSync('codeid', codeid);
    wx.setStorageSync('city', city)
    wx.setStorage({
      key: "citybox",
      data: { city:data.city, codeid:data.codeid },
      success: function () {
        wx.navigateBack();   //返回上一个页面
      }
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
