// pages/MerchantDetails/MerchantDetails.js
var timer = require('../../components/wxTimer/wxTimer.js')

var app = getApp();
var appData = app.globalData;

Page({
  data: {
    list: [
      // {
        // id:'账单id',
        // group_buy_id:'1',
        // goods_group_id: '砍价商品id',
        // merchant_name: '商户名称',
        // store_logo: '商户logo',
        // name: '商品名称',
        // img_url: '../../images/img/dui.png',
        // deadLine: '12314231223',
        // group_price:133,
        // price:4555,
        // now_price: 200,
        // ratio: '返金比例',
        // order_state: '账单状态'
      // }
    ],
    wxTimerList: {},
    page: 1
  },
  toBarginDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: `/pages/BargainDetails/BargainDetails?id=${id}`,
    })
  },
  toPayment: function (e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
        url: `/pages/bargainConfirmOrder/bargainConfirmOrder?orderId=${id}`,
    })
  },
  toBarginOwn: function (e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
        url: `/pages/bargainOwnPage/bargainOwnPage?id=${id}`,
    })
  },
  pageScroll: function (e) {
      var bil = e.detail.scrollWidth / 375; //单位换算适应屏幕
      var top = e.detail.scrollTop;
      console.log(top)
      if (top > bil * 345 / 2) {
          this.setData({
              julIf: true
          })
          console.log(true)
      } else {
          this.setData({
              julIf: false
          })
          console.log(false)
      }
  },
  //上滑加载
  shjiaz: function () {
      this.data.page += 1
      this.loadData(this.data.page);
  },
  loadData: function () {
      var self = this;
      var config = { page: self.data.page, rows: 10 };
      appData.Tool.getMyBargains(config).then(function (result) {
          wx.hideLoading();
          const oldList = self.data.list
          result.data.list.map((item) => {
            item.chazhi = (item.now_price - item.group_price > 0 ? ((item.now_price - item.group_price) / 100) : 0).toFixed(2)
          })
          const list = oldList.concat(result.data.list);

          self.setData({
              list,
          });
          list.map((item) => {
            var wxTimer = new timer({
                beginTime:item.deadLine,
                name: `wxTimer${item.id}`,
                // complete:function(){
                //     console.log("完成了")
                // }
            })
            wxTimer.start(self);
          })

      })
          .catch(function (error) {
              console.log(error);
          });
  },
  showAll:function(){

    this.setData({
      services: this.data.services.length > 8 ? this.data.minServices : this.data.allServices
    });
    console.log("showAll...", this.data.services);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id: options.id
      });
      this.loadData(this.page);
  },
  toNextPage: function (e) {
    console.log(e);

    var pageIndex = e.currentTarget.dataset.page;
    var pages = ["/pages/homePage/homePage", "/pages/FightGroups/FightGroups", "/pages/search/search", '/pages/goodDetail/goodDetail']
    wx.navigateTo({
      url: pages[pageIndex],
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
