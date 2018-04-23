var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: {},
    cnd:'',
    addressInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getAddress();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.loadInfo();
  },
  getGoodInfo: function () {
      // 获取支付详情
      const obj = {
        token: wx.getStorageSync('token'),
        cnd: '' // 订单ID
      }
      appData.Tool.getBargainInfo(obj).then(function (res) {
        wx.hideLoading();
        if (res.code === 0) {

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
  //编辑地址
  bjAddress:function(){
      var obj = this.data.groupInfo;
      wx.navigateTo({
          url: '../WriteAddress/WriteAddress?address_id=' + obj.address_id + '&create_person_id=' + this.data.create_person_id + '&group_buy_id=' + this.data.group_buy_id + '&a1=' + this.data.groupInfo.receiveName + '&a2=' + this.data.groupInfo.phone + '&a3=' + this.data.groupInfo.address
      })
  },
  //立即支付
  toPay: function () {
      var that = this;
      if (!that.data.groupInfo.address_id){
          wx.showToast({
              title: '请先添加地址',
              icon:'none'
          });
          return
      };
      var obj ={
          cnd: that.data.cnd,
          orderId: that.data.orderId,
          token: wx.getStorageSync('token')
      };
      console.log(obj);
      appData.Tool.bargainPay(obj).then(function (res) {
          console.log(res)
          wx.hideLoading();
          if (res.code === 0) {
            this.setData({
              goodInfo: res.data
            })
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
  getAddress: function () {
    // 获取收获地址
    appData.Tool.getAddressList(obj).then(function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.code === 0) {
           this.setData({
             addressInfo: res.data
           })
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
  }
})
