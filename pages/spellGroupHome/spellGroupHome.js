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
    goods:[]
  },
  loadOpenedGroup:function(page){
    var a = 1;
    console.log(a.toDouble());
    var self = this;
    appData.Tool.getGoodsGroupBuyListXCX({ page: page, rows:10 }).then(function (result) {
      wx.hideLoading();
      console.log(result);
      if(result.code == 0){
          var arr = result.data.list;
          for (var k in arr) {
              arr[k].group_price = fn(arr[k].group_price);
              arr[k].price = fn(arr[k].price);
          }
          function fn(a) {
              var str = ~~(a / 100) + '';
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
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(function(err){
      console.log(err);
    });
  },
  toNextPage:function(e){
    console.log(e);
    var pageIndex = e.currentTarget.dataset.page;
    var pages = ["../homePage/homePage", "../FightGroups/FightGroups","../search/search", '../goodDetail/goodDetail']
    var url = pages[pageIndex];
    if (pages[pageIndex] =="../goodDetail/goodDetail"){
      url += "?id=" + e.currentTarget.dataset.id
    }
    wx.navigateTo({
      url: url,
    })
  },
  loadUserStatus:function(){
      var self = this;
    app.getUserLocation(function (addr) {
      app.login(function () {
        wx.hideLoading();
        console.log(wx.getStorageSync("token"));
        appData.Tool.getAddressData({ location: addr }).then(function (result) {
          wx.hideLoading();
          wx.setStorageSync("city", result.data.id);
          wx.setStorageSync("level", result.data.level);
          self.loadOpenedGroup(1);
        })
          .catch(function (err) {
            console.log(err);
          });
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUserStatus();
    
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