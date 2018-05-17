var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: {
      money: 0,
      ratio: 0,
      name: '',
      join_time: ''
    },
    orderId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log('options.orderId:', options.orderId)
     this.getInfo(options.orderId)
     this.setData({ orderId: options.orderId})
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
  getInfo: function (orderId) {
    // 获取支付成功之后的详情
    const obj = {
      token: wx.getStorageSync('token'),
      cnd: orderId // 订单ID
    }
    const that = this;
    appData.Tool.shareBargain(obj).then(function (res) {
      wx.hideLoading();
      if (res.code === 0) {
         that.setData({ pageInfo: res.data })
         // const xiaojin = (res.data.currency / 100) > 1 ? (res.data.money * res.data.ratio / 10000).toFixed(2) : 0.01;
         // that.setData({ "pageInfo.xiaojin": xiaojin})
      } else {
        wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
        })
      }
    }).catch(function (err) {
        wx.hideLoading();
        console.log(err)
    });
  },
  // TODO: 跳转到详情
  goToGoodInfo: function () {
    wx.navigateTo({
        url: `/pages/BargainDetails/BargainDetails?id=${this.data.orderId}`
    })
  }
})
