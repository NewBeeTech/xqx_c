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
      const orderId = options.orderId
      // const orderId = '956'
      this.getAddress();
      this.getGoodInfo(orderId);
  },
  onShow: function () {
    this.getAddress();
  },
  getGoodInfo: function (orderId) {
      // 获取支付详情
      const token = wx.getStorageSync('token');
      const obj = {
        cnd: orderId // 订单ID
      }
      if (token) {
        obj.token = token;
      }

      const that = this;
      appData.Tool.getBargainInfo(obj).then(function (res) {
        wx.hideLoading();
        if (res.code === 0) {
          // goodInfo.group_price/100*goodInfo.ratio/100).toFixed(2)
           that.setData({
             goodInfo: res.data,
             'goodInfo.extra': parseInt(res.data.currency/100) > 1 ? (res.data.currency/100).toFixed(2) : 0.01
             // res.data.group_price/100*res.data.ratio/100
            // 'goodInfo.extra': parseInt(self.groupPrice*100 * self.ratio) > 1 ? parseInt(self.groupPrice*100 * self.ratio) : 1
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
  //编辑地址
  bjAddress:function(){
      var obj = this.data.addressInfo;
      if (obj.id) {
        wx.navigateTo({
            url: '/pages/WriteAddress/WriteAddress?address_id=' + obj.id + '&create_person_id=' + obj.person_id + '&group_buy_id=' + 0 + '&a1=' + obj.name + '&a2=' + obj.phone + '&a3=' + obj.address
        })
      }else {
        wx.navigateTo({
            url: '/pages/WriteAddress/WriteAddress?address_id=' + '' + '&create_person_id=' + '' + '&group_buy_id=' + '' + '&a1=' + '' + '&a2=' + '' + '&a3=' + ''
        })
      }

  },
  //立即支付
  toPay: function () {
      var that = this;
      if (!this.data.addressInfo.id){
          wx.showToast({
              title: '请先添加地址',
              icon:'none'
          });
          return
      };
      var obj ={
          cnd: that.data.goodInfo.orderId,
          address_id: that.data.addressInfo.id,
          token: wx.getStorageSync('token'),
          session: wx.getStorageSync('session'),
      };
      appData.Tool.bargainPay(obj).then(function (res) {
          console.log(res)
          wx.hideLoading();
          if (res.code === 0) {
            // 调起支付
            const data = res.data;
            console.log('data:====>', data)
            wx.requestPayment({
               'appId': data.appId,
               'timeStamp': data.timeStamp,
               'nonceStr': data.nonceStr,
               'package': data.package,
               'signType': data.signType,
               'paySign': data.paySign,
               'success':function(res){
                 wx.redirectTo({
                     url: `/pages/bargainSuccessPage/bargainSuccessPage?orderId=${that.data.goodInfo.orderId}`
                 });
               },
               'fail':function(res){
                 console.log('res:', res)
                 wx.showToast({
                     title: res.err_desc,
                     icon: 'none',
                     duration: 2000
                 })
               }
            })
          } else if (res.code === 2) {
            wx.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000
            });
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/spellGroupHome/spellGroupHome'
              });
            }, 2000);
          }else {
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
    const that = this;
    appData.Tool.getAddressList({}).then(function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.code === 0) {
           that.setData({
             addressInfo: res.data || {}
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
