// pages/ConfirmationOrder/ConfirmationOrder.js

// 点击去参团
// 传参 cnd  create_person_id    group_buy_id    
// 数据与joinList的数据对应
// cnd  对应 joinList 中的 goods_group_id   
// create_person_id  对应 joinList 中的 person_id    
// group_buy_id 对应 joinList 中的 id
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
          function fn(a){
              if (typeof a == 'string') { return a };
              var str = a / 100 + '';
              var i = str.indexOf('.');
              if (i != -1) {
                  if (str.length != i + 3) {
                      str += '0';
                  }
              } else {
                  str += '.00';
              }
              return str;
          };
          res.data.group_price = fn(res.data.group_price);
          res.data.price = fn(res.data.price);
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
          url: '../WriteAddress/WriteAddress?address_id=' + obj.address_id + '&create_person_id=' + this.data.create_person_id + '&group_buy_id=' + this.data.group_buy_id + '&a1=' + this.data.groupInfo.receiveName + '&a2=' + this.data.groupInfo.phone + '&a3=' + this.data.groupInfo.address
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
      if (!that.data.groupInfo.address_id){
          wx.showToast({
              title: '请先添加地址',
              icon:'none'
          });
          return
      };
      if (that.data.groupInfo.group_price * 100 * that.data.buyNum==0) {
          wx.showToast({
              title: '至少支付0.01元',
              icon: 'none'
          });
          return
      };
      var obj ={
          cnd: that.data.cnd,
          num: that.data.buyNum,
          money: that.data.groupInfo.group_price*100 * that.data.buyNum,
          merchant_id: that.data.groupInfo.merchant_id,
          ratio: that.data.groupInfo.ratio,
          address_id: that.data.groupInfo.address_id,
          name: that.data.groupInfo.name,
          create_person_id: that.data.create_person_id,
          group_buy_id: that.data.group_buy_id,
          orderId: that.data.orderId
      };
      console.log(obj);
      appData.Tool.createGroupBuyXCX(obj).then(function (res) {
          console.log(res)
          wx.hideLoading();
          if (!res.data){
              wx.showToast({
                  title: res.message,
                  icon:'none'
              })
              return
          };

          if (res.data.package) {
              wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success:function(e){
                    console.log(e);
                      wx.showToast({
                          title: '支付成功',
                          complete:function(){
                              wx.redirectTo({
                                url: '../DetailsPayment/DetailsPayment?id=' + res.data.orderId
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