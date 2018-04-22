// pages/MerchantDetails/MerchantDetails.js
var timer = require('../../components/wxTimer/wxTimer.js')

var app = getApp();
var appData = app.globalData;

Page({
  data: {
    list: [
      {
        id:'账单id',
        group_buy_id:'1',
        goods_group_id: '砍价商品id',
        merchant_name: '商户名称',
        store_logo: '商户logo',
        name: '商品名称',
        img_url: '../../images/img/dui.png',
        deadLine: '12314231223',
        group_price:133,
        price:4555,
        now_price: 200,
        ratio: '返金比例',
        order_state: '账单状态'
      }
    ],
    wxTimerList: {},
    page: 1
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
      console.log(self.data.id);
      var config = { page: self.data.page, rows: 10 };
      appData.Tool.getMyBargains(config).then(function (result) {
        // wx.hideLoading();
          console.log(result);
          // self.setData({
          //     obj: result.data,
          //     likes: result.data.reducedList.length > 2 ? [result.data.reducedList[0], result.data.reducedList[1]] : result.data.reducedList,
          //     allLikes: result.data.reducedList,
          //     markers: [{
          //         latitude: result.data.latitude,
          //         longitude: result.data.longitude
          //     }],
          //     allServices: result.data.service
          // });
          //
          // if (result.data.service && result.data.service.length >= 8) {
          //   self.setData({
          //     services: result.data.service.slice(0,8),
          //     minServices: result.data.service.slice(0, 8)
          //   });
          //
          // } else {
          //   self.setData({
          //     services: result.data.service
          //   });
          // }
          //
          // console.log(self.data.services);
          // self.setData({
          //   currentLikes: self.data.likes
          // });
          // console.log(self.data.currentLikes);
          // if (result.data.storePics.length>=4){
          //   for(var i=0;i<4;i++){
          //     self.data.pics.push(result.data.storePics[i]);
          //   }
          // }else{
          //     self.setData({
          //       pics: result.data.storePics
          //     });
          // }
          // wx.setNavigationBarTitle({
          //   title: result.data.name
          // })

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
      var wxTimer = new timer({
          beginTime:"1524402355724",
          name: 'wxTimer1',
          complete:function(){
              console.log("完成了")
          }
      })
      console.log(wxTimer);
      wxTimer.start(this);
      // wxTimer.stop();
      console.log(options);
      this.setData({
        id: options.id
      });
      // this.loadData(this.page);

  },
  toNextPage: function (e) {
    console.log(e);

    var pageIndex = e.currentTarget.dataset.page;
    var pages = ["../homePage/homePage", "../FightGroups/FightGroups", "../search/search", '../goodDetail/goodDetail']
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
