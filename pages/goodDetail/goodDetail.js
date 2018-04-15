// pages/goodDetail/goodDetail.js
var DateTool = require("../../Tools/DateTool.js");
var app = getApp();
var appData = app.globalData;
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertTop:0,
    isShow:"none",
    goodsInfo:{},
    groupInfo:{},
    groups: [{ time: 1523766688, dateString: "0" }, { time: 1523795430, dateString:"0" }]
  },
  oneKeyGroup: function (e){
    wx.navigateTo({
      url: '../ConfirmationOrder/ConfirmationOrder?cnd=' +e.currentTarget.dataset.id,
    })
  },
  
  loadData: function (id) {
    var self = this;
    return new Promise(function (success, fail) {
      var config = { cnd:id };
      
      appData.Tool.getGoodsGroupBuyInfoXCX(config).then(function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.code === 0) {
          success();
          self.setData({
            goodsInfo: res.data
          });
         
        } else {
          wx.showToast({
            title: res.message,
            duration: 2000
          })
        }

      }).catch(function (err) {
        wx.hideLoading();
      });
    });
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  backHome:function(){
    wx.navigateBack();
  },
  startTimer:function(){
    var self = this;
    timer = setInterval(function(){
      // self.data.groups[0].dateString = DateTool.toHHMMSS(self.data.groups[0].time);
    },500);
  },
  stopTimer:function(){
    clearInterval(timer);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  showAlert:function(){
    this.setData({
      alertTop:50,
      isShow:"block"
    });
  },
  close:function(){
    this.setData({
      alertTop: 0,
      isShow: "none"
    });
  },
  goToConfirmationOrder:function(){
    wx.navigateTo({
      url: '../ConfirmationOrder/ConfirmationOrder',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startTimer();
    console.log(options.id);
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
    clearInterval(timer);
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