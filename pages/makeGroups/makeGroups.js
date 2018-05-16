var app = getApp();
var appData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        julIf: false,
        popupIf: false,
        index: -1,
        windowHeight: 1200,
        Popup_inde: 0,
        Popup_inde2: 0,
        PopupIf: false,
        unionidPopupIf: false,
        name: '',
        windowHeight: '',
        list: [],
        className: "",
        scrollHeight: 0,
        positionType: "nor",
        subList: [],
        typeList: [],
        Popup_index_right: 0,
        types: "全部分类",
        orderType: "智能排序",
        superID: 0,
        goods: [],
        a1:'',
        a2:'',
        imgURL: '',
        topPic: {},
        hasMore: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onShow: function() {
      this.setData({
        page: 1,
        julIf: false,
        popupIf: false,
        index: -1,
        windowHeight: 1200,
        Popup_inde: 0,
        Popup_inde2: 0,
        PopupIf: false,
        unionidPopupIf: false,
        name: '',
        windowHeight: '',
        list: [],
        className: "",
        scrollHeight: 0,
        positionType: "nor",
        subList: [],
        typeList: [],
        Popup_index_right: 0,
        types: "全部分类",
        orderType: "智能排序",
        superID: 0,
        goods: [],
        a1:'',
        a2:'',
        imgURL: '',
        topPic: {},
        hasMore: true
      })
      this.loadMainData();
      this.loadData(1);
    },

    loadMainData: function () {
        wx.showLoading({
            title: '加载中'
        })
        var self = this;
        var config = { intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude") };
        console.log(config);
        appData.Tool.getMianData(config).then(function (result) {
            console.log(result);
            var temp = [{ name: "全部", id: 0 }].concat(result.data.catalogList);

            let topPics = result.data.topPics;
            topPics = topPics && topPics.filter(item => item.activity_type == 1);
            const topPic = topPics && topPics[0];
            const imgURL = topPics && topPics[0] && topPics[0].img_url;
            self.setData({
                subList: [{ name: "不限", id: null }],
                obj: result.data,
                list: result.data.merchantList,
                typeList: temp,
                topPic,
                imgURL,
            });
            // self.data.typeList.unshift({name:"全部",id:0});
            console.log(self.data.typeList);
            wx.hideLoading();
            wx.stopPullDownRefresh();
        }).catch(function (error) {
                console.log(error);
                wx.hideLoading();
                wx.stopPullDownRefresh()
            });
    },
    toWaring: function () {
        wx.navigateTo({
            url: '../bargainRulePage/bargainRulePage',
        })
    },
    bannerLink: function() {
      const topPic = this.data.topPic;
      const id = topPic.activity_id;
      id && wx.navigateTo({
          url: `/pages/BargainDetails/BargainDetails?id=${id}&from=banner`,
      })
    },
    toGroupDetail: function (e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: `/pages/makeGroupsDetails/makeGroupsDetails?id=${id}`,
      })
    },
    PopupF: function () {
        console.log("....");
        this.setData({
            PopupIf: false,
            unionidPopupIf: false
        })
    },
    //筛选点击
    PopupBoxLeftChoose: function (e) {
        var self = this;
        var id = typeof e == "number" ? 10 : e.currentTarget.dataset.id;
        console.log('id:', id);
        if (id == 0) {
            self.setData({
                subList: [],
                Popup_inde: 0,
                types: "全部",
                superID: e.currentTarget ? e.currentTarget.dataset.id : 0,
                a1: '',
                a2: '',
                // PopupIf: false,
            });
            this.loadData(1);
            this.returnType();
            return;
        }
        self.setData({
            superID: e.currentTarget.dataset.id,
            Popup_index_right: 0
        });

        appData.Tool.getSubCatelog({ intPara2: wx.getStorageSync("city"), level: wx.getStorageSync("level"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: self.data.superID }).then(function (result) {
            var temp = [{ name: "不限", id: 0 }].concat(result.data.list);
            console.log(result);
            self.setData({
                subList: temp,
                Popup_inde: e.currentTarget.dataset.index,
                types: e.currentTarget.dataset.name,
                // PopupIf: false,
            });
            wx.hideLoading()
        }).catch(function (error) {
          wx.hideLoading()
        });
    },
    //
    navListTap: function (e) {
        var name = e.currentTarget.dataset.name;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '',
        })
        this.returnType();
    },
    scrolling: function (e) {
        // console.log(e.detail.scrollTop, this.data.positionType);
        if (this.data.positionType === "nor") {
            if (e.detail.scrollTop > (47 + 52)) {
                this.setData({
                    positionType: "fixed",
                    PopupIf: false,
                    unionidPopupIf: false,
                    paddingTop: 92 + 15
                });
            }
        } else {
            if (e.detail.scrollTop < (47 + 52)) {
                this.setData({
                    positionType: "nor",
                    PopupIf: false,
                    unionidPopupIf: false,
                    paddingTop: 0
                });
            }
        }


    },
    backHome: function (e) {
      wx.reLaunch({
        url: '/pages/spellGroupHome/spellGroupHome'
      })
    },
    returnType: function () {
        this.setData({
            unionidPopupIf: false,
            PopupIf: false
        })
    },
    //弹窗-左侧-筛选
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
    //弹窗-右侧-筛选
    unionidTap: function () {
        this.setData({
            PopupIf: false,
            unionidPopupIf: !this.data.unionidPopupIf
        })
    },
    //筛选点击**
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
        console.log(id);
        this.data.a1 = id;
        this.loadData(1 ,true ).then(function () {
            self.setData({
                PopupIf: !self.data.PopupIf,
                unionidPopupIf: false
            });
        });
        this.setData({ PopupIf: false })
    },
    //右侧-筛选**
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
        this.data.a2 = e.currentTarget.dataset.id
        this.loadData(1  ,true ).then(function () {
            self.setData({
                PopupIf: false,
                unionidPopupIf: !self.data.unionidPopupIf
            });
        });
        this.unionidTap()

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        loadData(1);
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
    //
    yhTap: function (e) {
        var name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '../purchaseCoupon/purchaseCoupon'
        })
        this.returnType();
    },
    //
    tsTap: function (e) {
        var name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: '../exploreExperience/exploreExperience'
        })
        this.returnType();
    },
    /**
     * intPara 分类
     * intPara2 排序规则 1 返金由高到低 2 人气由高到低 3价格由高到低
     */
    loadData: function (page, sf) {
        var intPara = this.data.a1;
        var intPara2 = this.data.a2;
        var self = this;
        return new Promise(function (success, fail) {
            var config = { page: page, rows: 10, token: wx.getStorageSync('token') };
            if (intPara) { config.intPara = intPara }
            if (intPara2) { config.intPara2 = intPara2 }
            appData.Tool.getGoodsGroupBuyListXCX(config).then(function (res) {
                wx.hideLoading();
                if (res.code === 0) {
                  if (page === 1) {
                    var listData = res.data.list
                    self.setData({
                        goods: listData,
                        hasMore: listData.length >= 10 ? true : false
                    });
                  } else {
                    const goods = self.data.goods
                    var listData = goods.concat(res.data.list);
                    self.setData({
                        goods: listData,
                        hasMore: res.data.list.length >= 10 ? true : false
                    });
                  }

                  if (res.data.list.length == 0) {
                    // wx.showToast({
                    //     title: '没有更多数据',
                    //     icon: 'success',
                    //     duration: 2000
                    // })
                  }
                }else {
                  wx.showToast({
                    title: res.message,
                    duration: 2000
                  })
                }
            }).catch(function (err) {
                wx.hideLoading();
            });
        });
    },
    //页面滚动
    // pageScroll: function (e) {
    //     var bil = e.detail.scrollWidth / 375; //单位换算适应屏幕
    //     var top = e.detail.scrollTop;
    //     if (top > bil * 345 / 2) {
    //         this.setData({
    //             julIf: true
    //         })
    //     } else {
    //         this.setData({
    //             julIf: false
    //         })
    //     }
    // },
    //上滑加载
    shjiaz: function () {
      if (this.data.hasMore) {
        this.data.page += 1
        this.loadData(this.data.page);
      } else {
        wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 2000
        })
      }
    },
    //弹窗
    popupTap: function (e) {
        var that = this;
        var ind = e.currentTarget.dataset.ind;
        var index = that.data.index;
        if (index == ind) {
            that.setData({
                popupIf: !that.data.popupIf,
                index: ind
            })
        } else {
            that.setData({
                popupIf: true,
                index: ind
            })
        }
    },
    oneKeyGroup: function () {
      wx.navigateTo({
          url: '../MyBargain/MyBargain'
      })
    }


})
