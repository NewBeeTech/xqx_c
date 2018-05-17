// pages/homePage/homePage.js
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Popup_inde:0,
    Popup_inde2:0,
    PopupIf:false,
    unionidPopupIf:false,
    name:'',
    windowHeight:'',
    list:[],
    orderType:"智能排序",
    orderID:"",
    typeID:"",
    className: "",
    scrollHeight: 0,
    positionType: "nor",
    top: 0,
    subList:[],
    paddingTop: 0,
    Popup_index_right:0,
    superID:0,
    page:0,
    merchantID:0
  },
  //获取首页信息
  loadData: function (callback) {
    wx.showLoading({
      title: '加载中'
    })
    var self = this;
    appData.Tool.getMianData({ latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude") }).then(function (result) {
      console.log(result);
      var temp = [{ name: "全部", id: 0 }].concat(result.data.catalogList);

      self.setData({
        subList: [{ name: "不限", id: null }],
        obj: result.data,
        // list: result.data.merchantList,
        typeList: temp
      });
      // self.data.typeList.unshift({name:"全部",id:0});
      console.log(self.data.typeList);
      wx.hideLoading();
      callback();
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  PopupBoxLeftChoose: function (e) {

    var self = this;
    var id = typeof e !== "object" ? e : e.currentTarget.dataset.id;

    if (id == 0) {
      self.setData({
        subList: [],
        Popup_inde: 0,
        types: "全部"
      });
      this.loadData();
      this.returnType();
      return;
    }

    self.setData({
      superID:e.currentTarget.dataset.id,
      Popup_index_right: 0
    });
    console.log(id);
    appData.Tool.getSubCatelog({ intPara: id, intPara2: wx.getStorageSync("city"), level: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude")}).then(function (result) {

      var temp = [{ name: "不限", id: 0 }].concat(result.data.list);

      self.setData({
        subList: temp,
        Popup_inde: e.currentTarget.dataset.index,
        name: e.currentTarget.dataset.name
      });

      wx.hideLoading()
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  returnType: function () {
    this.setData({
      unionidPopupIf: false,
      PopupIf: false
    })
  },
  shTap: function () {
    this.setData({
      unionidPopupIf: false,
      PopupIf: !this.data.PopupIf
    })
    if (this.data.positionType === "fixed") {
      this.setData({
        top: "top"
      })
    }
  },

  unionidTap: function (e) {
    this.setData({
      PopupIf: false,
      unionidPopupIf: !this.data.unionidPopupIf
    })
  },
  //
  PopupBoxLeft: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(e);
    var self = this;
    var id = e.currentTarget.dataset.id;
    if (id == 0) {
      self.setData({
        Popup_index_right: 0,
        // Popup_inde: 0,
        orderType: "全部",

      });
      // this.loadData();
      // this.returnType();
      // return;
    } else {
      this.setData({
        Popup_index_right: e.currentTarget.dataset.index,
        types: e.currentTarget.dataset.name
      })
    }
    this.setData({
      name: e.currentTarget.dataset.name == "不限" ? this.data.typeList[this.data.Popup_inde].name : e.currentTarget.dataset.name,
      typeID: e.currentTarget.dataset.id
    })
    console.log(e.currentTarget.dataset.id);
    var config = e.currentTarget.dataset.id == 0 ? { latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: self.data.superID, unionid: this.data.orderID, level: wx.getStorageSync("level") } : { latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: e.currentTarget.dataset.id, unionid: this.data.orderID, level: wx.getStorageSync("level") };
    appData.Tool.getIndustryMerchantV24(config).then(function (result) {
      console.log(result);
      self.setData({
        list: result.data.list,
        PopupIf: !self.data.PopupIf,
        unionidPopupIf: false
      });

      wx.hideLoading()
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  //
  PopupBoxRight: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(e);
    this.setData({
      Popup_inde2: e.currentTarget.dataset.index,
      orderType: e.currentTarget.dataset.type,
      orderID: e.currentTarget.dataset.id
    })
    var self = this;

    var parm = self.data.typeID ? { intPara2: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), unionid: e.currentTarget.dataset.id, intPara: self.data.typeID } : { latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), unionid: e.currentTarget.dataset.id, intPara2: wx.getStorageSync("level")}
    appData.Tool.getIndustryMerchantV24(parm).then(function (result) {
      console.log(result);
      self.setData({
        list: result.data.list,
        PopupIf: false,
        unionidPopupIf: !self.data.unionidPopupIf
      });

      wx.hideLoading()
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  scrolling: function (e) {
    console.log(e.detail.scrollTop, this.data.positionType);
    if (this.data.positionType === "nor") {
      if (e.detail.scrollTop > 44) {
        this.setData({
          positionType: "fixed",
          PopupIf: false,
          unionidPopupIf: false,
          paddingTop: 44
        });
      }
    } else {
      if (e.detail.scrollTop < 44) {
        this.setData({
          positionType: "nor",
          PopupIf: false,
          unionidPopupIf: false,
          paddingTop: 0
        });
      }
    }
  },
  shopTap: function (e) {
    var name = e.currentTarget.dataset.name;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../MerchantDetails/MerchantDetails?id=' + e.currentTarget.dataset.id
    })
    this.returnType();
  },
  PopupF: function () {

    this.setData({
      PopupIf: false,
      unionidPopupIf: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      merchantID: e.id
    });
    this.loadData(function(){
      appData.Tool.getSubCatelog({ intPara: e.id, intPara2: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude") }).then(function (result) {
        console.log(result);
        wx.hideLoading()
        var temp = [{ name: "不限", id: 0 }].concat(result.data.list);

        self.setData({
          subList: temp
        });
        console.log(self.data.subList);
      })
        .catch(function (error) {
          console.log(error);
        });
    });
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        that.setData({
          windowHeight: e.windowHeight,
          scrollHeight: e.windowHeight
        })
        console.log(that.data.scrollHeight)
      }
    })
    this.setData({
        name:e.name,
        id: e.id
    });

    this.windowHeight();

    var self = this;
    appData.Tool.getIndustryMerchantV24({ intPara: e.id, intPara2: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude")}).then(function (result) {
      console.log(e.index);
      wx.hideLoading()
      self.setData({
        list: result.data.list,
        Popup_inde: e.index
      });

    })
      .catch(function (error) {
        console.log(error);
      });


  },
  windowHeight:function(){
      var windowHeight = wx.getStorageSync('windowHeight');
      this.setData({
          windowHeight: windowHeight
      })
  },

  //
  shTap:function(){
      this.setData({
          PopupIf: !this.data.PopupIf
      })
  },
  unionidTap: function () {
    this.setData({
      unionidPopupIf: !this.data.unionidPopupIf
    })
  },
  //



  //
  PopupF:function(){
      this.setData({
          PopupIf:false
      })
  },
  //
  shopxqTap:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
      wx.navigateTo({
        url: '../MerchantDetails/MerchantDetails?id=' + id,
      })
  },
  //
  inputTap: function (e) {
      var name = e.currentTarget.dataset.name;
      wx.navigateTo({
          url: '../search/search?id='+this.data.id
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
    console.log("onReachBottom");
    this.setData({
      page: ++this.data.page
    })
    this.loadList(this.data.page);
  },
  loadList: function (page) {
    wx.showLoading({
      title: '加载中'
    })
    var self = this;
    appData.Tool.getSubMerchant({ cnd: self.data.merchantID, latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), page: self.data.page }).then(function (result) {
      console.log(result);
      self.setData({
        list: self.data.list.concat(result.data.list)
      });

      console.log(self.data.typeList);
      wx.hideLoading();
      if (result.data.subMerchants.length==0){
        wx.showToast({
          title: '没有更多数据',
          icon: 'success',
          duration: 2000
        })
      }

      wx.stopPullDownRefresh();
    })
      .catch(function (error) {
        console.log(error);
        wx.hideLoading();
        wx.stopPullDownRefresh()
      });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
