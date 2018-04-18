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
      downloadIf:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMy();
  },
  //
  daijie:function(){
      this.setData({
          daijieIf: !this.data.daijieIf
      })
  },
  //弹窗
  ytgTapTc:function(){
        this.setData({
            ytgIf: !this.data.ytgIf
      })
  },
  //跳转下载
  ytgTap: function () {
      wx.navigateTo({
          url: '../webApp/webApp',
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
      appData.Tool.getUserInfo().then(function (result) {
          console.log(result);
          wx.hideLoading()

          function fn(a){
              var str = ~~(a / 100) + '';
              var i = str.indexOf('.');
              if (i != -1) {
                  if (str.length != i + 3) {
                      str += '0';
                  }
              } else {
                  str += '.00';
              }
              return str
          };

          result.data.currency = fn(result.data.currency);
          result.data.not_deposite = fn(result.data.not_deposite);
          if (result.data.priorRemain){
              result.data.priorRemain = fn(result.data.priorRemain);
          }
          
          self.setData({
              obj: result.data
          });
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