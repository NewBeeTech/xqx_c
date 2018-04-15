// pages/ConfirmationOrder/ConfirmationOrder.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo:{},
    buyNum:1
  },
  loadInfo: function (id, create_person_id, create_person_id){
    var self = this;
    return new Promise(function (success, fail) {
      var config = { cnd: id };
      if (create_person_id) { config.create_person_id = create_person_id };
      if (group_buy_id) { config.group_buy_id = group_buy_id };
      appData.Tool.getGoodsGroupBuyInfoXCX(config).then(function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.code === 0) {
          success();
          self.setData({
            groupInfo: res.data
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
  toPay:function(){
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInfo(options.id);
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