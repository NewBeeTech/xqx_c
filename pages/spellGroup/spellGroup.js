// pages/spellGroup/spellGroup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    
    windowHeight: 1200,
    Popup_inde: 0,
    Popup_inde2: 0,
    PopupIf: false,
    unionidPopupIf: false,
    name: '',
    windowHeight: '',
    
    Popup_index_right: 0,
    types: "全部分类",
    orderType: "智能排序",
    superID: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  PopupF: function () {
    this.setData({
      PopupIf: false,
      unionidPopupIf: false
    })
  },
  PopupBoxLeftChoose: function (e) {

    var self = this;
    var id = typeof e == "number" ? 10 : e.currentTarget.dataset.id;

    if (id == 0) {
      self.setData({
        Popup_inde: 0,
        types: "全部",
        superID: e.currentTarget ? e.currentTarget.dataset.id : 0
      });
      
      this.returnType();
      return;
    }
    self.setData({
      superID: e.currentTarget.dataset.id,
      Popup_index_right: 0
    });
/*
    appData.Tool.getSubCatelog({ intPara2: wx.getStorageSync("city"), level: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: self.data.superID }).then(function (result) {
      var temp = [{ name: "不限", id: 0 }].concat(result.data.list);
      console.log(result);
      self.setData({
        subList: temp,
        Popup_inde: e.currentTarget.dataset.index,
        types: e.currentTarget.dataset.name
      });
      console.log(this.data.subList);
      wx.hideLoading()
    })
      .catch(function (error) {
        console.log(error);
        wx.hideLoading()
      });
      */
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

  unionidTap: function () {
    this.setData({
      PopupIf: false,
      unionidPopupIf: !this.data.unionidPopupIf
    })
  },
 
  PopupBoxLeft: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this;
    var id = e.currentTarget.dataset.id;
    console.log(e);
    if (id == 0) {
      self.setData({
        Popup_index_right: 0,
        orderType: "全部",

      });
    } else {
      this.setData({
        Popup_index_right: e.currentTarget.dataset.index,
        types: e.currentTarget.dataset.name
      })
    }
    console.log(e);

/*
    console.log(wx.getStorageSync("level"));

    var config = e.currentTarget.dataset.id == 0 ? { intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: self.data.superID } : { latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: e.currentTarget.dataset.id, intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city") };
    console.log(config);
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
        wx.hideLoading()
        // wx.showToast({
        //   title: error.message,
        //   icon: 'none',
        //   duration: 2000
        // })

      });
      */
  },
  //
  PopupBoxRight: function (e) {

    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.PopupIf);
    this.setData({
      Popup_inde2: e.currentTarget.dataset.index,
      orderType: e.currentTarget.dataset.name
    })
    var self = this;
    /*
    appData.Tool.getIndustryMerchantV24({ latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), unionid: e.currentTarget.dataset.id, intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city") }).then(function (result) {
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
        wx.hideLoading()
      });
      */
  }

})