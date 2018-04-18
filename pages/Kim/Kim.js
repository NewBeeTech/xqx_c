// pages/Kim/Kim.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      popupIf:false,
      obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  loadData: function () {
    var self = this;
    appData.Tool.getArrivalTradeHistoryv232().then(function (result) {
      console.log(result);
      wx.hideLoading()
      var temp = parseFloat(result.data.notDeposite) + parseFloat(result.data.priorRemain);
      var str = ~~(temp/ 100) + '';
      var i = str.indexOf('.');
      if (i != -1) {
          if (str.length != i + 3) {
              str += '0';
          }
      } else {
          str += '.00';
      }

      result.data.notDeposite = str;
      self.setData({
        obj: result.data,
        xiaojin:temp
      });
    })
      .catch(function (error) {
        wx.hideLoading()
        console.log(error);
      });
  },
  toInfo:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../DetailsOfTheBill/DetailsOfTheBill?id='+id,
    })
  },
  //
  zdqxTap: function () {
      wx.navigateTo({
          url: '../Kim/Kim',
      })
  },
  //弹窗
  popupTap:function(){
      this.setData({
          popupIf: !this.data.popupIf
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