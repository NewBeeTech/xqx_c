// pages/homePage/homePage.js
var app = getApp();
var appData = app.globalData;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        city:'北京',
        page: 1,
        obj: {},
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
        top: 0,
        paddingTop: 0,
        subList: [],
        typeList: [],
        Popup_index_right: 0,
        types: "全部分类",
        orderType: "智能排序",
        superID: 0,
        classID: 0,
        orderID: ""
    },
    onPullDownRefresh: function () {
        // wx.stopPullDownRefresh()
    },
    PopupF: function () {
        console.log("....");
        this.setData({
            PopupIf: false,
            unionidPopupIf: false
        })
    },
    PopupBoxLeftChoose: function (e) {

        var self = this;
        var id = typeof e == "number" ? 10 : e.currentTarget.dataset.id;
        console.log(e);

        if (id == 0) {
            self.setData({
                subList: [],
                Popup_inde: 0,
                types: "全部",
                superID: e.currentTarget ? e.currentTarget.dataset.id : 0
            });
            this.loadData();
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
                types: e.currentTarget.dataset.name
            });
            console.log(this.data.subList);
            wx.hideLoading()
        })
            .catch(function (error) {
                console.log(error);
                wx.hideLoading()

            });
    },
    //
    navListTap: function (e) {
        var name = e.currentTarget.dataset.name;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../shopList/shopList?name=' + name + "&id=" + id + "&index=" + e.currentTarget.dataset.index
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
    moveToTop: function (e) {
        // console.log(e);
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
    //
    shopTap: function (e) {
        var name = e.currentTarget.dataset.name;
        console.log(e.currentTarget.dataset.index);
        wx.navigateTo({
            url: '../MerchantDetails/MerchantDetails?id=' + e.currentTarget.dataset.id + "&index=" + e.currentTarget.dataset.index + "&qFlag=" + e.currentTarget.dataset.qFlag
        })
        this.returnType();
    },
    //
    inputTap: function (e) {
        wx.navigateTo({
            url: '../search/search'
        })
        this.returnType();
    },
    //
    dkTap: function (e) {
        var pic_url = e.currentTarget.dataset.pic_url;
        wx.navigateTo({
            url: '../webApp/webApp?url=' + pic_url
        })

        this.returnType();
    },
    //获取首页信息
    loadData: function () {

        wx.showLoading({
            title: '加载中'
        })

        var self = this;
        var config = { intPara2: wx.getStorageSync("level"), cnd: self.data.city, latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude") };
        console.log(config);
        appData.Tool.getMianData(config).then(function (result) {
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
            self.loadList(1);

            wx.hideLoading();
            wx.stopPullDownRefresh();
        })
            .catch(function (error) {
                console.log(error);
                wx.hideLoading();
                wx.stopPullDownRefresh()
            });
    },
    //
    lower: function () {
        console.log(111)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        var self = this;
        wx.getSystemInfo({
            success: function (e) {
                self.setData({
                    windowHeight: e.windowHeight,
                    scrollHeight: e.windowHeight
                })
                console.log(self.data.scrollHeight)
            }
        });

        app.getUserLocation(function (addr) {
            app.login(function () {
                console.log(wx.getStorageSync("token"));
                appData.Tool.getAddressData({ location: addr }).then(function (result) {
                    //wx.setStorageSync("city", result.data.id);
                    self.setData({'city':result.data.id})
                    wx.setStorageSync("level", result.data.level);
                    console.log(result);
                    self.loadData();
                    self.windowHeight();
                    // self.PopupBoxLeftChoose(0);
                })
                    .catch(function (err) {
                        console.log(err);
                        wx.showToast({
                            title: err.message,
                            icon: 'none',
                            duration: 2000
                        })
                    });

            });
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.login();
    },
    login: function () {
        var self = this;
        appData.Tool.login().then(function (res) {
            console.log(res);
            wx.hideLoading()
            res.userId && wx.setStorageSync('userId', res.userId);
            res.token && wx.setStorageSync('token', res.token);
            res.session && wx.setStorageSync('session', res.session);
            // appData.Tool.saveToLocation("userId", res.userId);
            // appData.Tool.saveToLocation("token", res.token);
            // appData.Tool.saveToLocation("session", res.session);
            var session = res.session;

            if (res.needRegister) {
                wx.getSetting({
                    success(res) {
                        if (!res.authSetting['cope.userInfo']) {
                            wx.authorize({
                                scope: 'scope.userInfo',
                                success(res) {
                                    console.log(res);
                                    wx.hideLoading();
                                    wx.reLaunch({
                                        url: '/pages/boundNumber/boundNumber'
                                    })
                                },
                                fail(err) {
                                  console.warn(err);
                                  wx.showToast({
                                    title: '很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。',
                                    icon: 'none',
                                    duration: 5000,
                                  });
                                }
                            })
                        }
                    }
                })

            } else {
                self.loadData();
                self.windowHeight();
                // self.PopupBoxLeftChoose(0);
            }
        }).catch(function (error) {
            console.log(error);
            wx.hideLoading()
            wx.showToast({
                title: error.message,
                icon: 'none',
                duration: 2000
            })
        });
    },
    windowHeight: function () {
        var windowHeight = wx.getStorageSync('windowHeight');
        console.log(windowHeight);
        this.setData({
            windowHeight: windowHeight
        })
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
    //
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
                // Popup_inde: 0,
                orderType: "全部",
                classID: 0
            });
            // this.loadData();
            // this.returnType();
            // return;
        } else {
            this.setData({
                Popup_index_right: e.currentTarget.dataset.index,
                types: e.currentTarget.dataset.name,
                classID: id
            })
        }
        console.log(e);

        console.log("id:", self.data.classID, "order:", self.data.orderID);
        console.log(wx.getStorageSync("level"));

        var config = e.currentTarget.dataset.id == 0 ? { intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city"), latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: self.data.superID } : { latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), intPara: e.currentTarget.dataset.id, intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city"), unionid: self.data.orderID };
        console.log(config);
        appData.Tool.getIndustryMerchantV24(config).then(function (result) {
            console.log(result);
            self.setData({
                list: result.data.list || [],
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
    },
    //
    PopupBoxRight: function (e) {

        wx.showLoading({
            title: '加载中',
        })
        console.log(this.data.PopupIf);
        this.setData({
            Popup_inde2: e.currentTarget.dataset.index,
            orderType: e.currentTarget.dataset.name,
            orderID: e.currentTarget.dataset.id
        })

        var self = this;
        console.log("id:", self.data.classID, "order:", self.data.orderID);
        console.log(e.currentTarget.dataset.id);
        appData.Tool.getIndustryMerchantV24({ latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), unionid: e.currentTarget.dataset.id, intPara2: wx.getStorageSync("level"), cnd: wx.getStorageSync("city"), intPara: self.data.classID }).then(function (result) {
            console.log(result);
            self.setData({
                list: result.data.list || [],
                PopupIf: false,
                unionidPopupIf: !self.data.unionidPopupIf
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
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        loadData();
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
        appData.Tool.getSubMerchant({ latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), page: self.data.page }).then(function (result) {
            console.log(result);
            console.warn(self.data.list);
            self.setData({
                list: self.data.list && self.data.list.concat(result.data.list)
            });

            console.log(self.data.typeList);
            wx.hideLoading();
            wx.stopPullDownRefresh();
            if (result.data.list.length == 0) {
                wx.showToast({
                    title: '没有更多数据',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
            .catch(function (error) {
                console.log(error);
                wx.hideLoading();
                wx.stopPullDownRefresh()
            });
    },
})
