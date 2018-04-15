// pages/MerchantDetails/MerchantDetails.js

var app = getApp();
var appData = app.globalData;
Page({

    data: {
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
    shop_list_btn:function(e){
      var id = e.currentTarget.dataset.id;
      console.log(id);
      wx.navigateTo({
        url: '../coupon/coupon?id='+id
      })
    },
    tpTap: function (e) {
      
        var id = e.currentTarget.dataset.id;
        
        wx.navigateTo({
          url: '../Album/Album?id=' + id
        })
    },
    //
    mdTap: function (e) {
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        var logo = e.currentTarget.dataset.logo;
        var discountMode = e.currentTarget.dataset.discountMode;
        var rebate = e.currentTarget.dataset.rebate;
        var full = e.currentTarget.dataset.full;
        var subtract = e.currentTarget.dataset.subtract;
        var ratio = e.currentTarget.dataset.ratio;
        console.log(id);
        wx.navigateTo({
          // url: '../check/check?id=' + id + "&name=" + name + "&logo=" + logo + "&discountMode=" + discountMode + "&rebate=" + rebate + "&full=" + full + "&subtract=" + subtract + "&ratio=" + ratio
          url: '../check/check?id=' + id
        })
    },
    //
    gmTap: function (e) {
        var name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '../coupon/coupon'
        })
    },
    //
    shjsTap: function (e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../businessIntr/businessIntr?id='+id
        })
    },
    callPhone:function(e){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    },
    //
    fdTap: function (e) {
      var pid = e.currentTarget.dataset.pid;
        wx.navigateTo({
          url: '../Branch/Branch?pid=' + pid
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
    loadData: function () {
        var self = this;
        console.log(self.data.id);
  
        appData.Tool.getMerchantInfo({ cnd: self.data.id }).then(function (result) {
          wx.hideLoading();
            console.log(result);
            self.setData({
                obj: result.data,
                likes: result.data.reducedList.length > 2 ? [result.data.reducedList[0], result.data.reducedList[1]] : result.data.reducedList,
                allLikes: result.data.reducedList,
                markers: [{
                    latitude: result.data.latitude,
                    longitude: result.data.longitude
                }],
                allServices: result.data.service
            });
           
            if (result.data.service.length >= 8) {
              self.setData({
                services: result.data.service.slice(0,8),
                minServices: result.data.service.slice(0, 8)
              });
              
            } else {
              self.setData({
                services: result.data.service
              });
            }
           
            console.log(self.data.services);
            self.setData({
              currentLikes: self.data.likes
            });
            console.log(self.data.currentLikes);
            if (result.data.storePics.length>=4){
              for(var i=0;i<4;i++){
                self.data.pics.push(result.data.storePics[i]);
              }
            }else{
                self.setData({
                  pics: result.data.storePics
                });
            }
            wx.setNavigationBarTitle({
              title: result.data.name
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
      
        console.log(options);
        this.setData({
          id: options.id
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