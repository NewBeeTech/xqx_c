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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getInfo()
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
  getInfo: function () {
    // 获取支付成功之后的详情
    const obj = {
      token: wx.getStorageSync('token'),
      cnd: '327' // 订单ID
    }
    const that = this;
    appData.Tool.shareBargain(obj).then(function (res) {
      wx.hideLoading();
      if (res.code === 0) {
         that.setData({ pageInfo: res.data })
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
  goToGoodInfo: function () {
    wx.navigateTo({
        url: ''
    })
  }
})
