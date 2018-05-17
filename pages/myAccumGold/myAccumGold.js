// pages/myAccumGold/myAccumGold.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      daijieIf:false,
      ytgIf:false,
      obj:{},
      downloadIf:false,
      xiaojin:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMy();
  },
  loadInfo: function (e) {
      var result = e;
      var self = this;
      appData.Tool.getArrivalTradeHistoryv232().then(function (response) {
          console.log(response.data.retList);
         wx.hideLoading();
          var resultNum = 0;
          response.data.retList.forEach(function (item) {
              resultNum += (parseFloat(item.currency)*100);
              console.log(resultNum)
          });
          result.data.currency = fn(parseFloat(result.data.currency) + resultNum);
          console.log(result.data.currency)

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
          }

          result.data.not_deposite = fn(result.data.not_deposite);
          if (result.data.priorRemain) {
              result.data.priorRemain = fn(result.data.priorRemain);
          }

          self.setData({
              obj: result.data
          });
          console.log(result);
      })
  },
  //
  daijie:function(){
      this.setData({
          daijieIf: !this.data.daijieIf
      })
  },
  //弹窗
  ytgTapTc:function(){
      //   this.setData({
      //       ytgIf: !this.data.ytgIf
      // })
      wx.navigateTo({
        url: "/pages/download_app/download_app"
      });
  },
  //跳转下载
  ytgTap: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        var isiOS = !!res.model.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        console.log("是不是iOS", isiOS)
        var url = "";
        if (isiOS == true) {
          url = "https://bmini.xqx.com/download/success.html"
        } else {
          url = "https://bmini.xqx.com/download/success.html"
        }
        wx.showModal({
          title: '提示',
          content: "即将前往应用市场，下载小确幸app",
          confirmText: "立即前往",
          success: function (e) {
            if (e.confirm) {
              wx.navigateTo({
                url: "../webApp/webApp?url=" + url
              })
            }

          }
        })
      }
    })

  },
  //
  dqxjTap:function(){
      wx.navigateTo({
          url: '../Kim/Kim',
      })
  },
  //获取个人信息
  getMy: function () {
      var self = this;
      appData.Tool.getUserInfo({}).then(function (result) {
          console.log(result);
          wx.hideLoading()
          // self.loadInfo(result);
          var temp = fn(parseFloat(result.data.not_deposite) + parseFloat(result.data.depositing));
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
              return str
          }
          result.data.not_deposite = fn(result.data.not_deposite-0);
          if (result.data.priorRemain) {
            result.data.priorRemain = fn(result.data.priorRemain);
          }

          self.setData({
            obj: result.data,
            xiaojin:temp
          });

          console.log(result.data);
      })
          .catch(function (error) {
              console.log(error);
          });
  },
  //点击下载
  close2: function () {
      this.setData({
          downloadIf: true,
          ytgIf: false
      })
  },
  //关闭
  close:function(){
      this.setData({
          downloadIf: false,
      })
  },
  //保存到相册
  downloadTap: function () {
      var self = this;

      wx.getSetting({
          success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                      scope: 'scope.writePhotosAlbum',
                      success() {
                          self.download();
                      },
                      fail(err) {
                        wx.showToast({
                          title: '很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。',
                          icon: 'none',
                          duration: 5000,
                        });
                      }
                  })
              } else {
                  self.download();
              }
          }
      })

  },
  download: function () {

      wx.getImageInfo({
          src: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png',
          success: function (ret) {
              var path = ret.path;
              wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success(result) {
                      wx.showToast({
                          title: '保存成功',
                          icon: 'success',
                          duration: 2000
                      })

                  },
                  fail(err) {
                      console.log(err);
                      wx.showToast({
                          title: err.errMsg,
                          icon: 'none',
                          duration: 2000
                      })

                  }
              })
          }
      })
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
