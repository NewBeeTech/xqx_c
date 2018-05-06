// pages/check/check.js
var app = getApp();
var appData = app.globalData;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    info: {},
    money: 0,
    resultMoney: 0,
    ratio: 0.00,
    isChoose: "nor",
    resultRatio:"0.00",
    merchantId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.warn(options);
    // 判断用户是不是新用户
    var id = options.q.split("merchantId%3D")[1];
    console.warn('res', id);
    let that = this;
    that.setData({
      merchantId: id
    })
    wx.login({
      success: res => {
        // console.log("在这")
       console.log(res)
        // 获取用户信息
        wx.getSetting({
          success: result => {
            // console.log("在获取用户信息")
            // console.log(result)

            wx.getUserInfo({
              success: data => {
                // console.log("走到这")
                // let url = 'http://ccpp.denong.com/app_person/XCXController/get3rdSession';
                let url = 'https://mini.xqx.com/app_person/XCXController/get3rdSession';
                let param = {
                  code: res.code,
                  iv: data.iv,
                  encryptedData: data.encryptedData
                }
                wx.request({
                  url: url,
                  data: app.jsonToString(param),
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    if (res.data.needRegister == true) {
                      wx.reLaunch({
                        url: '/pages/boundNumber/boundNumber?page=check'
                      })
                      wx.setStorage({
                        key: 'session',
                        data: res.data.session
                      })
                      wx.setStorage({
                        key: 'token',
                        data: res.data.token
                      })
                    }else{
                      wx.setStorage({
                        key: 'session',
                        data: res.data.session
                      })
                      wx.setStorage({
                        key: 'token',
                        data: res.data.token
                      })
                      if (options.q) {
                        console.log(options.q);
                        // http%3A%2F%2Fmini.xqx.com%2Fapp_person%2F%3FmerchantId%3D10099
                        var res = options.q.split("%2Fapp_person%2F%3FmerchantId%3D")[1];
                        console.log(res);
                        // that.loadInfo(res);
                      }
                      that.loadInfo(options.id);
                      // that.loadInfo('10099');
                    }
                  },
                  fail: function (res) {

                  },

                })
                // this.postRequest(url, param, function (res) {

                // })
                if (result.authSetting['scope.userInfo']) {

                }
              },
              fail: data => { }
            })


          },
        })
      }
    })

    // console.log(options);




  },
  choose: function () {

  },
  goBackHome: function() {
    wx.reLaunch({
      url: '/pages/spellGroupHome/spellGroupHome'
    });
  },
  inputMoney: function (e) {
    this.setData({
      resultRatio: "0.00"
    });
    var self = this;
    // if (self.data.money > 999999.99) {
    //   wx.showToast({
    //     title: "请输入0.01-999999.99的金额",
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    // if (self.data.money < 0.01) {
    //   wx.showToast({
    //     title: "请输入0.01-999999.99的金额",
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
    if (this.data.info.discountMode == "MR") {
      this.setData({
        money: e.detail.value,
        resultMoney: this.data.info.rebate == 0 ? e.detail.value : e.detail.value * parseFloat(this.data.info.rebate)/10
      });

    }
    if (this.data.info.discountMode == "MD") {
      console.log(this.data.info.mInfo);
      var self = this;

      var result = e.detail.value;
      self.setData({
        money: parseFloat(e.detail.value),
        resultMoney: result
      });
      this.data.info.mInfo.forEach(function (item) {

        if (parseFloat(e.detail.value) >= parseFloat(item.full / 100)) {

          result = result > parseFloat(e.detail.value) - parseFloat(item.subtract / 100) || result == 0 ? parseFloat(e.detail.value) - parseFloat(item.subtract / 100) : result;

          self.setData({
            money: parseFloat(e.detail.value),
            resultMoney: result
          });

        }
      });
    }
    if (this.data.info.discountMode == 'undefined' || this.data.info.discountMode == 'null' || !this.data.info.discountMode) {
      this.setData({
        money: parseFloat(e.detail.value),
        resultMoney: parseFloat(e.detail.value) //减去 减满
      });
      console.log(this.data.resultMoney);
    }

    var resultM = this.data.resultMoney == 0 ? "" : this.data.resultMoney;

    console.log(this.data.resultMoney);

    resultM = Math.ceil(resultM * 1000) / 1000;
    resultM = Math.ceil(Math.ceil(resultM * 1000) / 10) / 100;

    resultM = ~~resultM / 100 == resultM / 100 ? resultM  + ".00" : ~~(resultM * 100) / 100;
    var resultMStr = resultM + "";

    if (resultMStr.split(".").length > 1) {
      if (resultMStr.split(".")[1].length < 2) {
        resultMStr = resultM + "0";
      }
    }
    this.setData({
      resultMoney:resultMStr
    });

    var r = !this.data.ratio || this.data.resultMoney == 0 ? 0: (this.data.ratio * this.data.resultMoney / 100 <= 0.01 ? 0.01 : this.data.ratio * this.data.resultMoney / 100) ;
    r = Math.round(r * 1000)/1000;
    r = Math.round(Math.round(r * 1000) / 10) / 100;
    console.log(Math.round(r * 1000)/10);
    console.log(r );

    var str = r+"";

    if (str.split(".").length>1){
      if (str.split(".")[1].length < 2 ){
        str = r+"0";
      }
    }else{
      r = ~~r / 100 == r / 100 ? r / 100 + ".00" : ~~(r * 100) / 100;
      str = r+"";
    }
    console.log(str);
    this.setData({
      resultRatio: str
    });
    if (this.data.info.ratio){
      if (r < 0.01){
        this.setData({
          resultRatio: 0.01
        });
      }
    }

  },

  //
  inputFinish: function (e) {
    // var self = this;
    // if (self.data.money != '' &&(self.data.money == 0 || self.data.money >= 999999.99)) {
    //   wx.showToast({
    //     title: "请输入0.01-999999.99的金额",
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }
  },
  qrmdTap: function () {

    var self = this;

    /**
     * money	String	是	实际支付金额
session	String	是	session
token	String	是	token
merchantId	String	是	商户id
origionPrice	String	是	原始价格
discountId	String	是	折扣id 打折id 满减此项为空
discounInfo	String	是	折扣信息 打折为 打折具体数值 满减为商户详情mInfo
     */
    // var decimal = (self.data.money).toString().split('.');
    // if (self.data.money == '' && (self.data.money < 0.01 || self.data.money >= 999999.99) || decimal[1].length > 2) {
    //     console.log(1111)
    //   wx.showToast({
    //     title: "请输入0.01-999999.99的金额",
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }
    // console.log(self.data.money2)
    // if (self.data.money2 <= 0 || self.data.money2 >= 999999.99) {
        // wx.showToast({
        //     title: "请输入0.01-999999.99的金额",
        //     icon: 'none',
        //     duration: 2000
        // })
        // return;
    // }
    console.log(self.data.money);
    if (parseFloat(self.data.money) < 0.01 || parseFloat(self.data.money) > 999999.99){
      wx.showToast({
        title: "请输入0.01-999999.99的金额",
        icon: 'none',
        duration: 2000
      })
      return;
}

    appData.Tool.getToLocation("session").then(function (session) {
      console.log(session);
      var config = { merchantName: self.data.info.name, money: self.data.resultMoney * 100 + "", session: session, origionPrice: self.data.money * 100+"", merchantId: self.data.info.id, ratio: self.data.info.ratio ? self.data.info.ratio : "0" };
      console.log(config);
      appData.Tool.createPay(config).then(function (result) {
        wx.hideLoading()
        console.log(result);
        wx.requestPayment({
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '/pages/PaymentSuccess/PaymentSuccess?tradeId=' + result.tradeId,
            })
          },
          'fail': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }).catch(function (error) {
        console.log(error);
      });
    })

  },
  loadInfo: function (id) {
    var self = this;
    appData.Tool.getMerchantDiscountInfo({ cnd: id }).then(function (result) {
      wx.hideLoading()

      self.setData({
        info: result.data,
        ratio: parseFloat(result.data.ratio)

      });
      console.log(self.data.info);
    }).catch(function (error) {
      console.log(error);
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
    let that = this;
    wx.login({
      success: res => {
        // console.log("在这")
        console.log(res)
        // 获取用户信息
        wx.getSetting({
          success: result => {
            // console.log("在获取用户信息")
            // console.log(result)

            wx.getUserInfo({
              success: data => {
                // console.log("走到这")
                // let url = 'http://ccpp.denong.com/app_person/XCXController/get3rdSession';
                let url = 'https://mini.xqx.com/app_person/XCXController/get3rdSession';
                let param = {
                  code: res.code,
                  iv: data.iv,
                  encryptedData: data.encryptedData
                }
                wx.request({
                  url: url,
                  data: app.jsonToString(param),
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    if (res.data.needRegister == true) {
                      wx.reLaunch({
                        url: '/pages/boundNumber/boundNumber?page=check'
                      })
                      wx.setStorage({
                        key: 'session',
                        data: res.data.session
                      })
                      wx.setStorage({
                        key: 'token',
                        data: res.data.token
                      })
                    } else {
                      wx.setStorage({
                        key: 'session',
                        data: res.data.session
                      })
                      wx.setStorage({
                        key: 'token',
                        data: res.data.token
                      })
                      if (that.data.merchantId) {
                        // console.log(options.q);
                        // http%3A%2F%2Fmini.xqx.com%2Fapp_person%2F%3FmerchantId%3D10099
                        // var res = options.q.split("%2Fapp_person%2F%3FmerchantId%3D")[1];
                        // console.log(res);
                        // that.loadInfo(res);
                      }
                      that.loadInfo(that.data.merchantId);
                      // that.loadInfo('10099');
                    }
                  },
                  fail: function (res) {

                  },

                })
                // this.postRequest(url, param, function (res) {

                // })
                if (result.authSetting['scope.userInfo']) {

                }
              },
              fail: data => { }
            })


          },
        })
      }
    })
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
/*赶出来的代码，*一样的代码*/
