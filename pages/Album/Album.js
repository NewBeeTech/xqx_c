// pages/Album/Album.js
var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      navList:[],
      navIndex:0,
      imgList:[],
      obj:{},
      merchantId:""
  },
  showMax:function(e){
      var index = e.currentTarget.dataset.index;
    wx.navigateTo({
        url: "../AlbumDetail/AlbumDetail?index=" + index
     })
  },

  //nav
  navList:function(e){
      var that = this;
      var index = e.currentTarget.dataset.index;
      that.setData({
          navIndex: index
      })
      console.log(this.data.navList,this.data.merchantId, index);
      this.loadImages(this.data.merchantId, index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var id = options.id;
    if(!id){return};
    this.loadType(options.id);

  },
  loadType: function (id) {
    this.setData({
      merchantId: id
    })
    var self = this;
    appData.Tool.getMerchantPicCatelogs({ merchantId: id }).then(function (result) {
      wx.hideLoading();
      console.log(result);
      self.setData({
        navList: result.data.catelogs,
        merchant_id: result.data.catelogs[0].merchant_id
      });
      self.loadInfo(result.data.catelogs[0].merchant_id);
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  loadInfo: function (index) {
    this.loadImages(index,"");
  },
  loadImages: function (merchantId, catelogId){
    console.log(merchantId, catelogId);
    var self = this;
    
    appData.Tool.getMerchantStorePics({ merchantId: merchantId, catelogId: catelogId }).then(function (result) {
      wx.hideLoading()
      console.log(result);
      self.setData({
        imgList: result.data.pics,
        
      });
      appData.photos = result.data.pics;
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