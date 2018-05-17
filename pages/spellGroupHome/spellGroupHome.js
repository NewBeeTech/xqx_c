// pages/spellGroup/spellGroup.js
var app = getApp();
var appData = app.globalData;

Number.prototype.toDouble = function(){
  return this.toFixed(2);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    goods:[],
<<<<<<< HEAD
    banners:[],
    city:'',//对应城市设置
=======
    banners:[]
>>>>>>> master
  },
  loadBanners:function(){
     var self = this;
      appData.Tool.getTopPics({}).then(function (result) {
        wx.hideLoading();
        self.setData({
            banners: result.data.topPics
        });
        console.log(self.data.banners);
      });
  },
  link:function(e){
    // wx.navigateTo({
    //     url: e.currentTarget.dataset.url,
    // })
    var info = e.currentTarget.dataset.info;
    console.log(info);
    // 0:h5链接 1:拼团 2:砍价 3:秒杀'
    if (info.activity_type == 0) {
      wx.navigateTo({
        // url: '../h5/h5?url='+info.url,
        url:"../learnOurs/learnOurs"
      });
    } else if (info.activity_type == 2) {
      const id = info.activity_id;
      wx.navigateTo({
          url: `/pages/BargainDetails/BargainDetails?id=${id}&from=banner`,
      })
    }
    // if (info.url==""){
    //   // wx.navigateTo({
    //   //   url: '../goodDetail/goodDetail?id='+info.id,
    //   // })
    // }else{
    //   wx.navigateTo({
    //     // url: '../h5/h5?url='+info.url,
    //     url:"../learnOurs/learnOurs"
    //   })
    // }

  },
  loadOpenedGroup:function(page){
<<<<<<< HEAD
  
    // 获取对应商品
    var a = 1;
    console.log(a.toDouble());
    var self = this;
    // appData.Tool.getGoodsGroupBuyListXCX({ page: page, rows:10 })
    // 根据城市获取商品
    var codeid=wx.getStorageSync("codeid");
    console.log(codeid)
    appData.Tool.getCityGoods({page:page,rows:10, intPara3:codeid})
    .then(function (result) {
=======
    var a = 1;
    console.log(a.toDouble());
    var self = this;
    appData.Tool.getGoodsGroupBuyListXCX({ page: page, rows:10 }).then(function (result) {
>>>>>>> master
      wx.hideLoading();
      console.log(result);
      self.loadBanners();
      if(result.code == 0){
          var arr = self.data.goods.concat(result.data.list);
          for (var k in arr) {
              arr[k].group_price = fn(arr[k].group_price);
              arr[k].price = fn(arr[k].price);
          }
          function fn(a) {
              if (typeof a =='string'){return a};
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
          goods:arr
        });
      }else{
<<<<<<< HEAD
          wx.showToast({
              title: result.message,
              icon: 'none',
              duration: 2000
          })
=======
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000
        })
>>>>>>> master
      }
    }).catch(function(err){
      console.log(err);
    });
  },
<<<<<<< HEAD

=======
>>>>>>> master
  toNextPage:function(e){
    console.log(e);
    var pageIndex = e.currentTarget.dataset.page;
    var pages = ["../homePage/homePage", "/pages/pintuan/pintuan", "../search/search", '/pages/bargainOwnPage/bargainOwnPage', "/pages/bargainHomePage/bargainHomePage","../miaosha/miaosha"]
    // var pages = ["../homePage/homePage", "/pages/FightGroups/FightGroups", "../search/search", '/pages/bargainOwnPage/bargainOwnPage', "/pages/bargainHomePage/bargainHomePage","../miaosha/miaosha"]
    var url = pages[pageIndex];
    if (pages[pageIndex] =="/pages/bargainOwnPage/bargainOwnPage"){
      url += "?id=" + e.currentTarget.dataset.id
    }
    console.log(e.currentTarget.dataset.id);
    console.log(url);
    wx.navigateTo({
      url: url,
    })
  },
  loadUserStatus:function(){
<<<<<<< HEAD

=======
>>>>>>> master
      var self = this;
    // app.getUserLocation(function (addr) {
      app.login(function () {
        wx.hideLoading();
        console.log(wx.getStorageSync("token"));
        // appData.Tool.getAddressData({ location: addr }).then(function (result) {
          // wx.hideLoading();
          // wx.setStorageSync("city", result.data.id);
          // wx.setStorageSync("level", result.data.level);
          self.loadOpenedGroup(1);
        // })
        //   .catch(function (err) {
        //     console.log(err);
        //   });
<<<<<<< HEAD
         
=======
>>>>>>> master
      });
    // })
  },
  //上拉加载
  wrapList:function(){
      this.data.page += 1;
      this.loadOpenedGroup(this.data.page);
  },
<<<<<<< HEAD
  // 城市选择
  choiseCity:function(){
    wx.navigateTo({
      url:"../choiseCity/choiseCity?city="+this.data.city
    })
  },
=======
>>>>>>> master
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
<<<<<<< HEAD

    // app.getUserLocation();  //获取地理位置
    var city= wx.getStorageSync("city1");
    console.log(city)
    this.setData({
      city:city
    })
=======
    // this.loadUserStatus();
>>>>>>> master
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
<<<<<<< HEAD
    
=======

>>>>>>> master
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
<<<<<<< HEAD
    var that=this;
=======
>>>>>>> master

    this.setData({
      page:1,
      goods:[],
      banners:[],
    })
    this.loadUserStatus();
<<<<<<< HEAD

  // 获取缓存中的city与codeid
    wx.getStorage({
      key: 'citybox',
      success: function (res) {
        console.log(res.data)
        that.setData({
          city:res.data.city
        })
        var codeid=res.data.codeid;
        appData.Tool.getCityGoods({ page:1, rows: 10, intPara3: codeid })
          .then(function (result) {
            wx.hideLoading();
            console.log(result);
            self.loadBanners();
            if (result.code == 0) {
              var arr = self.data.goods.concat(result.data.list);
              for (var k in arr) {
                arr[k].group_price = fn(arr[k].group_price);
                arr[k].price = fn(arr[k].price);
              }
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
                goods: arr
              });
            } else {
              wx.showToast({
                title: result.message,
                icon: 'none',
                duration: 2000
              })
            }
          }).catch(function (err) {
            console.log(err);
          });

      }
    })
=======
>>>>>>> master
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
<<<<<<< HEAD
=======

>>>>>>> master
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
