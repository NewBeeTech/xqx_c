// pages/identityCode/identityCode.js

var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ph = "";
    for (var i = 0; i < options.loginname.length;i++){
      var v = options.loginname[i];
      if (i == 3 || i == 4 || i == 5 || i == 6){
          v = "*"
        }
        ph += v
    }
      syjsIf:false
      var self = this;
      this.setData({
        phone: ph
      });
      appData.Tool.createQRCode().then(function (result) {
        wx.hideLoading()
        console.log(result);
        self.setData({
          obj: result.data
        });
      })
        .catch(function (error) {
          console.log(error);
        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  syjsTap:function(){
      this.setData({
          syjsIf: !this.data.syjsIf
      })
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