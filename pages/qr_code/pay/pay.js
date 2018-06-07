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
    panduanMon:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.warn(options);
    // 判断用户是不是新用户
    var id = options.q.split("merchantId%3D")[1];
    console.warn('res', id);
    console.log(id)
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
                        // var res = options.q.split("%2Fapp_person%2F%3FmerchantId%3D")[1];
                        var res = options.q.split("%3D")[1];
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
  // 优惠活动与实付金额
  inputMoney: function (e) {
    this.setData({
      panduanMon: e.detail.value
    })
    if (e.detail.value <= 100000.00 && e.detail.value>=0.01) {
      this.setData({
        resultRatio: "0.00",
        money: e.detail.value
      });
      var self = this;
    
      // 打折
      if (this.data.info.discountMode == "MR") {
        this.setData({
          money:e.detail.value,
          resultMoney: this.data.info.rebate == 0 ? e.detail.value : e.detail.value *parseFloat(this.data.info.rebate)/10
        });
      }

      // 满减
      if (this.data.info.discountMode == "MD") {
        console.log(this.data.info.mInfo);
        var self = this;

        var result = e.detail.value;
        console.log(result)
        self.setData({
          money: e.detail.value,
          resultMoney: result
        });
        this.data.info.mInfo&&this.data.info.mInfo.forEach(function (item) {

          if (parseFloat(e.detail.value) >= parseFloat(item.full / 100)) {

            result = result > e.detail.value-item.subtract / 100 || result == 0 ? e.detail.value-item.subtract / 100 : result;
            result=parseFloat(result).toFixed(2);
            self.setData({
              money: e.detail.value,
              resultMoney: result
            });
            console.log(result)
          }
        });
      }
      // 如果没有满减或打折
      if (this.data.info.discountMode == 'undefined' || this.data.info.discountMode == 'null' || !this.data.info.discountMode) {
        this.setData({
          money: e.detail.value,
          resultMoney: e.detail.value //减去 减满
        });
        console.log(this.data.resultMoney);//实付金额
      }

      // 实付金额
      var resultM = this.data.resultMoney == 0 ? "" : this.data.resultMoney;

      // console.log(this.data.resultMoney);

      resultM = Math.ceil(resultM * 1000) / 1000;
      resultM = Math.ceil(Math.ceil(resultM * 1000) / 10) / 100;
      console.log(resultM)
      console.log(resultM/100)
      // ~~：转换为数字（实付金额后面加小数点）
      resultM = ~~resultM / 100 == resultM / 100 ? resultM  + ".00" : resultM;
      // console.log((resultM * 100))
      var resultMStr = resultM + "";
      // console.log(resultMStr)
      if (resultMStr.split(".").length > 1) {
        if (resultMStr.split(".")[1].length < 2) {
          resultMStr = resultM + "0";
        }
      }
      console.log(resultMStr)
      console.log(typeof resultMStr)
      this.setData({
        resultMoney:resultMStr
      });

      let resultRatio = parseFloat(resultMStr) * this.data.ratio / 100;
      console.warn(resultRatio);
      if (resultRatio < 0.01) {
        this.setData({
          resultRatio: 0.01,
        });
      } else {
        resultRatio = resultRatio && resultRatio.toFixed && resultRatio.toFixed(2)
        this.setData({
          resultRatio: resultRatio,
        });
      }

    }else{
      if (e.detail.value<0.01){
          this.setData({
            resultMoney:"0.00"
          })
      }
      if (e.detail.value>100000.00){
          wx.showToast({
            title: "单笔金额最大为十万元，请重新输入",
            icon: 'none',
            duration: 1000
          })
          return;
      } 
     
    }


  },

  //
  inputFinish: function (e) {
    var self = this;
    console.log(self.data.money)
    // if (self.data.money>100000.00) {
    //   wx.showToast({
    //     title: "单笔金额最大为十万元，请重新输入",
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // }

    // if (self.data.money != '' && (self.data.money == 0)) {
    //   wx.showToast({
    //     title: "单笔金额最小为一分，请重新输入",
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // }

    var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (re.test(self.data.money)) {
      return true;
    } else {
      wx.showToast({
        title: "只支持输入小数点后两位，请重新输入",
        icon: 'none',
        duration: 2000
      })
      return false;
    }
  },
  qrmdTap: function () {

    var self = this;

    console.log(self.data.money);


    if (self.data.resultMoney <=0) {
        wx.showToast({
          title: "请输入金额",
          icon: 'none',
          duration: 2000
        })
        return false;
      }
 
    var re = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (!re.test(self.data.money)) {
      wx.showToast({
        title: "只支持输入小数点后两位，请重新输入",
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (self.data.panduanMon > 100000.00) {
      wx.showToast({
        title: "单笔金额最大为十万元，请重新输入",
        icon: 'none',
        duration: 1000
      })
      return false;
    } 

    appData.Tool.getToLocation("session").then(function (session) {
      var strnum=Math.floor(self.data.resultMoney*100)+"";
      var strmon = Math.floor(self.data.money * 100) + ""
      console.log(strnum)
      console.log(session);
      var config = { merchantName: self.data.info.name, money: strnum, session: session, origionPrice: strmon, merchantId: self.data.info.id, ratio: self.data.info.ratio ? self.data.info.ratio : "0" };
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
      console.log(result)
      
      self.setData({
        info: result.data,
        ratio: parseFloat(result.data.ratio)
      });
      console.log(self.data.ratio);
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
  onShow: function (e) {
    this.setData({
      resultMoney:''
    })


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
                        that.loadInfo(that.data.merchantId);
                      }
                      console.log(that.data.merchantId)
                     
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
