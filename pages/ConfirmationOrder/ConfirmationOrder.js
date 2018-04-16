// pages/ConfirmationOrder/ConfirmationOrder.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo: {},
    buyNum: 1,
  },
  
  loadInfo: function (id) {
    var self = this;
    return new Promise(function (success, fail) {
      var config = {cnd:id};
      // if (create_person_id) {config.create_person_id = create_person_id};
      // if (group_buy_id) {config.group_buy_id = group_buy_id};
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
  toPay: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.loadInfo(options.id);
  }
})