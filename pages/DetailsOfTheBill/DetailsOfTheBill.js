// pages/DetailsOfTheBill/DetailsOfTheBill.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData(options.id);
    
  },
  loadData: function (id) {
    var self = this;
    console.log(id);
    appData.Tool.getTradeDetail({cnd:id}).then(function (result) {
      console.log(result);

      function fn(a){
          var t = a ? new Date(a) : new Date();
          function fnt(z) {return z < 10 ? '0' + z : z};
        return fnt(t.getFullYear()) + '-' + fnt(t.getMonth() + 1) + '-' + fnt(t.getDate()) + ' ' + t.toUTCString().split(' ')[4];
      };

      if (result.data.fund_trans_state==1){
          result.data.TMDtime = fn(result.data.expect_time);
      }else{
          result.data.TMDtime = new Date().getMonth()+2+'-15';
      }

      self.setData({
        obj: result.data,
      });
      wx.hideLoading()
    })
      .catch(function (error) {
        console.log(error);
        wx.hideLoading()
       
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