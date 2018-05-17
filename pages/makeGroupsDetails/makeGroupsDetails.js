// pages/MerchantDetails/MerchantDetails.js

var app = getApp();
var appData = app.globalData;
Page({
  data: {
    userId: '',
    from: '',
    icon: '../../images/img/dui.png',
    isShow: 'none',
    alertTop: 0,
    gonlList: [],
    id: 0,
    obj: {},
    types:[],
    markers: [{
      iconPath: "https://activity.denong.com/dw.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
    }],
    allLikes:[],
    likes:[],
    currentLikes: [],
    services:[],
    allServices:[],
    minServices: [],
    pics:[]
  },
  showAlert:function(){
    this.setData({
      alertTop:50,
      isShow:"block"
    });
  },
  close:function(){
    this.setData({
      alertTop: 0,
      isShow: "none"
    });
  },
  ddhua:function(e){
    const phoneNumber = e.currentTarget.dataset.store_phone;
    wx.makePhoneCall({
        phoneNumber,
    })
  },
  shop_list_btn:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/coupon/coupon?id='+id
    })
  },
  tpTap: function (e) {

      var id = e.currentTarget.dataset.id;

      wx.navigateTo({
        url: '/pages/Album/Album?id=' + id
      })
  },
  //
  mdTap: function (e) {

  },

  callPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  oneKeyGroup: function (e){
    // console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
        url: '/pages/bargainConfirmOrder/bargainConfirmOrder?orderId=' + e.currentTarget.dataset.id
    })
  },
  toBarginOwn: function (e){
    // wx.navigateTo({
    //     url: '/pages/bargainOwnPage/bargainOwnPage?cnd=' + e.currentTarget.dataset.id + '&create_person_id=' + e.currentTarget.dataset.create_person_id + '&group_buy_id=' + e.currentTarget.dataset.group_buy_id
    // })
    const id = e.currentTarget.dataset.id;
    // console.warn(`/pages/bargainOwnPage/bargainOwnPage?id=${id}`);
    // console.log(id);
    wx.navigateTo({
        url: `/pages/bargainOwnPage/bargainOwnPage?id=${id}`,
    })
  },
  toShop: function (e){
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: `/pages/MerchantDetails/MerchantDetails?id=${id}`,
    })
  },
  onShareAppMessage: function () {
    const self = this;
    return {
      title: self.data.obj.name,
      path: `/pages/makeGroupsDetails/makeGroupsDetails?id=${self.data.obj.id}`,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          duration: 2000
        })
        self.setData({ showModal: false })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          duration: 2000
        })
      }
    }
  },
  backHome: function (e) {
    wx.switchTab({
        url: '/pages/spellGroupHome/spellGroupHome',
    })
  },
  navToMap:function(e){
    console.log(e);
    var lat = e.currentTarget.dataset.info.latitude;
    var log = e.currentTarget.dataset.info.longitude;
    var name = e.currentTarget.dataset.info.name;
    // wx.navigateTo({
    //   url: '../map/map?lat='+lat+"&log="+log+"&name="+name
    // })
    wx.openLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(log),
      name: name,
      scale: 18
    })
  },
  showAll:function(){
    this.setData({
      currentLikes: this.data.currentLikes.length == this.data.likes.length ? this.data.allLikes : this.data.likes
    });
  },
  // 一键开团
  getCreateGroupBuyInfoXCX(e) {
    console.warn(e);
    const self = this;
    const group_buy_id = e.currentTarget.dataset.group_buy_id;
    const create_person_id = e.currentTarget.dataset.create_person_id;
    let config = {};
    if (create_person_id) {
      config = {
        cnd: self.data.id,
        group_buy_id,
        create_person_id,
      };
    } else {
      config = {
        cnd: self.data.id,
      };
    }
    appData.Tool.getCreateGroupBuyInfoXCX(config).then(function (result) {
        wx.hideLoading();
        console.warn('result: ', result);
        if (result.code == 0) {
          // wx.showToast({
          //   title: '开团成功',
          //   duration: 1000,
          // });
          wx.navigateTo({
            url: '/pages/ConfirmationOrder/ConfirmationOrder?cnd='+self.data.id+'&group_buy_id='+group_buy_id+'&create_person_id='+create_person_id,
          });
        }
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  loadData: function () {
      var self = this;
      console.log(self.data.id);
      console.log('self.data',self.data);
      if (self.data.from == 'banner') {
        appData.Tool.getBargainInfo1({ cnd: self.data.id }).then(function (result) {
            wx.hideLoading();
            let explain_img_url = result.data.explain_img_url;
            if (explain_img_url) {
              explain_img_url = JSON.parse(explain_img_url);
            } else {
              explain_img_url = "";
            }
            console.warn('create_person_id：',result.data.create_person_id,'userId: ', self.data.userId, 'obj: ', result.data);
            self.setData({
                obj: result.data,
                'obj.imgList': explain_img_url,
                'obj.xiaojin': result.data.currency/100
            });
            console.warn(explain_img_url);
        })
            .catch(function (error) {
                console.log(error);
            });
      } else {
        appData.Tool.getGoodsGroupBuyInfoXCX({ cnd: self.data.id }).then(function (result) {
            wx.hideLoading();
            let explain_img_url = result.data.explain_img_url;
            if (explain_img_url) {
              explain_img_url = JSON.parse(explain_img_url);
            } else {
              explain_img_url = "";
            }
            console.warn('create_person_id：',result.data.create_person_id,'userId: ', self.data.userId, 'obj: ', result.data);
            self.setData({
                obj: result.data,
                'obj.imgList': explain_img_url,
                'obj.xiaojin': result.data.currency/100
            });
            console.warn(explain_img_url);
        })
            .catch(function (error) {
                console.log(error);
            });
      }
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

        console.log(options);
        const userId = wx.getStorageSync('userId');
        this.setData({
          id: options.id,
          from: options.from,
          userId: userId,
        });
        this.loadData();

        if (options.qFlag){

          if (options.id == "9976161"){
            this.setData({
              gonlList: [{
                url: "http://logo.denong.com/Fo5sLJvQc9JUSDvIZ7c7ZWJuOJS_", material_name: "怡庭 Bistrot B", id: "9976161", price: "30", fen: "10", orangePrice: "53",name:"黑椒牛柳" }]
            });

          }
          if (options.id == "9976162") {
            this.setData({
              gonlList: [{ url: "http://logo.denong.com/Fo5sLJvQc9JUSDvIZ7c7ZWJuOJS_", material_name: "山海楼(德胜门店)", id: "9976162", price: "50", fen: "40", orangePrice: "66", name: "黑椒牛排"}]
            });

          }

        }

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
