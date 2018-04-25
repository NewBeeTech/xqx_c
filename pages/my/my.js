// pages/my/my.js
var app = getApp();
var appData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        downloadIf: false,
        obj:{},
        xiaojin:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },


    loadInfo:function(e){
        var result = e;
        var self = this;
        appData.Tool.getArrivalTradeHistoryv232().then(function (response) {
            console.log(response.data.retList);
            wx.hideLoading();

            var resultNum = 0;
            response.data.retList.forEach(function (item) {
                resultNum += (parseFloat(item.currency) * 100);
            });
            result.data.currency = parseFloat(result.data.currency) + resultNum;

            function fn(a) {
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

            result.data.currency = fn(result.data.currency);

            self.setData({
                obj: result.data
            });

            console.log(result);



        })
    },
    //我的累计金
    myjinTap: function () {
        wx.navigateTo({
            url: '../myAccumGold/myAccumGold',
        })
    },
    //我的身份码
    wdsfTap: function (e) {
      console.log(e);
        wx.navigateTo({
          url: '../identityCode/identityCode?loginname=' + e.currentTarget.dataset.loginname,
        })
    },
    //我的订单
    wdyhTap: function () {
        wx.navigateTo({
            url: '../wholeOrder/wholeOrder',
        })
    },
    //邀请奖励
    yqTap: function () {
        wx.navigateTo({
            url: '../invitingAwards/invitingAwards',
        })
    },
    //常见问题
    cjwtTap: function () {
        wx.navigateTo({
          url: '../problem/problem',
        })
    },
    //更多获金体验，请下载小确幸app
    btnDlone:function(){
      this.setData({
        downloadIf: !this.data.downloadIf
      })
    },
    close:function(){
    //   this.setData({
    //     downloadIf: !this.data.downloadIf
    //   })
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.model)
          var isiOS = !!res.model.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          console.log("是不是iOS",isiOS)
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
              }
            })
          }else{
            self.download();
          }
        }
      })

    },
    download:function(){

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
    //获取个人信息
    getMy: function () {
        var self = this;
        appData.Tool.getUserInfo({}).then(function (result) {
          wx.hideLoading()
            console.log(result);
            // self.loadInfo(result);
            var temp = fn(parseFloat(result.data.not_deposite) + parseFloat(result.data.depositing));
            function fn(a) {
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

            self.setData({
              obj: result.data,
              xiaojin: temp
            });

        })
            .catch(function (error) {
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
        this.getMy();
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

    },
    downloadApp:function(){
     wx.showModal({
         title: '',
         content: '',
     })
      wx.navigateTo({
        url: '../webApp/webApp'
      })
    }
})
