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
    cnd:'',
    create_person_id:'',
    group_buy_id:''
  },
  
  loadInfo: function () {
    var self = this;
    return new Promise(function (success, fail) {
        var config = { cnd: self.data.cnd};
      // if (create_person_id) {config.create_person_id = create_person_id};
      // if (group_buy_id) {config.group_buy_id = group_buy_id};
        appData.Tool.getCreateGroupBuyInfoXCX(config).then(function (res) {
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
  //编辑地址
  bjAddress:function(){
      var obj = this.data.groupInfo;
      wx.navigateTo({
          url: '../WriteAddress/WriteAddress?address_id=' + obj.address_id + '&a1=' + obj.receiveName + '&a2=' + obj.phone + '&create_person_id=' + this.data.create_person_id + '&group_buy_id=' + this.data.group_buy_id
      })
  },
  //减
  ja1:function(){
      if (this.data.buyNum > 1) {
          this.setData({
              buyNum:this.data.buyNum-1
          })
       }
  },
  //加
  ja2: function () {
        this.setData({
            buyNum: this.data.buyNum + 1
        })
  },
  //立即支付
  toPay: function () {
      var that = this;
      var obj ={
          cnd: that.data.cnd,
          num: that.data.buyNum,
          money: that.data.groupInfo.group_price * that.data.buyNum,
          merchant_id: that.data.groupInfo.merchant_id,
          ratio: that.data.groupInfo.ratio,
          address_id: that.data.groupInfo.address_id,
          name: that.data.groupInfo.name,
          create_person_id: that.data.create_person_id,
          group_buy_id: that.data.group_buy_id
      };
      appData.Tool.createGroupBuyXCX(obj).then(function (res) {
          console.log(res)
          wx.hideLoading();

          if (res.data.package) {
              wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success:function(e){
                      wx.showToast({
                          title: '支付成功',
                          complete:function(){
                              wx.redirectTo({
                                  url:'../wholeOrder/wholeOrder'
                              })
                          }
                      })
                  },
                  fail: function (er) {
                      console.log(er)
                      wx.showToast({
                          title:'支付失败'
                      })
                  },
              })
          }
      }).catch(function (err) {
          wx.hideLoading();
          console.log(err)
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.cnd = options.cnd;
      this.data.create_person_id = options.create_person_id;
      this.data.group_buy_id = options.group_buy_id;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.loadInfo();
  },
})