// pages/my/my.js
var app = getApp();
var appData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        downloadIf: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //
    myjinTap: function () {
        wx.navigateTo({
            url: '../myAccumGold/myAccumGold',
        })
    },
    //
    wdsfTap: function (e) {
      console.log(e);
        wx.navigateTo({
          url: '../identityCode/identityCode?loginname=' + e.currentTarget.dataset.loginname,
        })
    },
    //
    wdyhTap: function () {
        wx.navigateTo({
            url: '../wholeOrder/wholeOrder',
        })
    },
    //
    yqTap: function () {
        wx.navigateTo({
            url: '../invitingAwards/invitingAwards',
        })
    },
    //
    cjwtTap: function () {
        wx.navigateTo({
          url: '../problem/problem',
        })
    },
    btnDlone:function(){
      this.setData({
        downloadIf: !this.data.downloadIf
      })
    },
    close:function(){
      this.setData({
        downloadIf: !this.data.downloadIf
      })
    },
    //
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
        appData.Tool.getUserInfo().then(function (result) {
          wx.hideLoading()
            console.log(result);
            self.setData({
                obj: result.data
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
        this.getMy();
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

    },
    downloadApp:function(){
     
      wx.navigateTo({
        url: '../webApp/webApp'
      })
    }
})