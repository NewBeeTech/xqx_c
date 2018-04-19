// pages/boundNumber/boundNumber.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: "",
    code: "",
    isAgree: false,
    time:60,
    timer:null
  },
  inputDone: function (e) {
    if (e.detail.value.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
    }
  },
  toAgree: function () {
    console.log("....");
    this.setData({
      isAgree: !this.data.isAgree
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
  },
  getPhoneNumber: function (res) {
    console.log(res);
    wx.hideLoading();
    appData.Tool.getToLocation("session").then(function (session) {
      console.log(session);
      appData.Tool.info({ session: session, iv: res.detail.iv, encryptedData: res.detail.encryptedData }).then(function (res) {
        wx.hideLoading();
        console.log(res);

        if (res.code == 2) {
          wx.hideLoading();
          wx.showToast({
            title: "授权失败请重新一键授权",
            icon: 'none',
            duration: 2000
          })
          return;
        }
        if (res.code == 0){
          appData.Tool.saveToLocation("tocken", res.data.tocken);
          appData.Tool.saveToLocation("userId", res.data.userId);
          wx.reLaunch({
            url: '../spellGroupHome/spellGroupHome'
          })
        }
        
      }).catch(function (error) {
        wx.hideLoading();
        wx.showToast({
          title: error.message,
          duration:2000
        })
      });
    });

  },
  getPhone: function (e) {
    console.log(e);
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  getCode: function (e) {
    console.log(e);
    this.setData({
      code: e.detail.value
    })
  },
  codeDone: function (e) {
    if (this.data.code.length < 6) {
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({
      code: e.detail.value
    })
  },
  getCode: function () {

    var self = this;
    // timer = setInterval(function(){
    //   self.setData({
    //     time: --self.data.time <= 0 ? 0 : self.data.time
    //   });
    //   self.setData({
    //     isAgree: this.data.time < -0 ? true : false
    //   });
    //   if (self.data.time<-0){
    //     clearInterval(timer);
    //   }
    // },1000);
    // if (this.data.phoneNumber.length < 11) {
    //   wx.showToast({
    //     title: '请输入正确的手机号',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    var self = this;
    console.log(this.data.phoneNumber);
    appData.Tool.checkLoginNameV1({ loginName: this.data.phoneNumber }).then(function (res) {
      wx.hideLoading();
      console.log(res);
      self.setData({
        code: res.data.code
      });
      wx.showToast({
        title: '已发送验证码',
        duration:2000
      })
    }).catch(function (error) {
      wx.hideLoading();
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      })
    });
  },
  register: function () {
    var self = this;
    // if (this.data.code.length < 6) {
    //   wx.showToast({
    //     title: '请输入正确的验证码',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    appData.Tool.getToLocation("session").then(function (session) {
      console.log(session);
      appData.Tool.register({ loginName: self.data.phoneNumber, smsCode: self.data.code+"", session: session, registerFlag: "sms" }).then(function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.code == 3) {
          wx.showToast({
            title: '用户已注册',
          })
          return
        }
        wx.reLaunch({
          url: '../spellGroupHome/spellGroupHome'
        })

      }).catch(function (error) {
        console.log(error);
        wx.hideLoading();
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 2000
        })
      });
    });

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