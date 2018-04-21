// pages/orderDetails/orderDetails.js
var app = getApp();
var appData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        xqObj: {}
    },
    loadData: function (id) {
        var that = this;
        appData.Tool.getGoodsGroupOrderInfoXCX({ cnd: id }).then(function (res) {
            console.log(res)
            wx.hideLoading();
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
            res.data.group_price = fn(res.data.group_price);
            res.data.price = fn(res.data.price);
            that.setData({
                xqObj: res.data
            })
        }).catch(function (err) {
            wx.hideLoading();
            console.log(err)
        });
    },
    //确认收货
    qusTap: function () {
        var that = this;
        appData.Tool.commitReceiveGoods({
            orderId: that.data.id,
            goods_group_id: that.data.xqObj.goods_group_id,
            group_buy_id: that.data.xqObj.group_buy_id
        }).then(function (res) {
            console.log(res)
        }).catch(function (err) { });
    },
    //取消订单
    sqtkTap:function(){
        this.setData({
            qxdd: !this.data.qxdd
        })
    },
    quxTap: function () {
      this.setData({
        qxdd: !this.data.qxdd
      })
        var that = this;
        appData.Tool.cancelGroupOrder({
            orderId: that.data.id,
            goods_group_id: that.data.xqObj.goods_group_id,
            group_buy_id: that.data.xqObj.group_buy_id
        }).then(function (res) {
          wx.hideLoading();
            console.log(res);
            if (res.data.cancelFlag == 'false'){
              wx.showToast({
                title: "取消失败",
                duration: 2000
              });
            }else{
              wx.showToast({
                title: "取消成功",
                duration: 2000
              });
            }
            
          }).catch(function (err) { wx.hideLoading();});
    },
    //售后
    shohTap: function () {
        wx.navigateTo({
            url: '../customerService/customerService?store_phone=' + this.data.xqObj.store_phone
        })
    },
    //再次购买
    zcgTap: function () {
        wx.navigateTo({
            url: '../goodDetail/goodDetail?id=' + this.data.xqObj.goods_group_id
        })
    },
    //立即支付
    lijizfTap: function() {
        var that = this;
        var obj = {
            cnd: that.data.xqObj.goods_group_id,
            num: that.data.xqObj.num,
            money: that.data.xqObj.money,
            merchant_id: that.data.xqObj.merchant_id,
            ratio: that.data.xqObj.ratio,
            address_id: that.data.xqObj.person_address_id,
            name: that.data.xqObj.group_name,
            create_person_id: that.data.xqObj.id,
            group_buy_id: that.data.xqObj.group_buy_id,
            orderId: that.data.xqObj.orderId
        };
        console.log(obj);
        appData.Tool.createGroupBuyXCX(obj).then(function (res) {
            console.log(res)
            wx.hideLoading();

            if (res.data.package) {
                wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success: function (e) {
                        console.log(e);
                        wx.showToast({
                            title: '支付成功',
                            complete: function () {
                                wx.redirectTo({
                                    url: '../DetailsPayment/DetailsPayment?cnd='+that.data.id
                                })
                            }
                        })
                    },
                    fail: function (er) {
                        console.log(er)
                        wx.showToast({
                            title: '支付失败'
                        })
                    },
                })
            }
        }).catch(function (err) {
            wx.hideLoading();
            console.log(err)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData(options.id);
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
    onShareAppMessage: function (res) {
        var that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
            var id = res.target.dataset.id
        }
        return {
            title: '自定义转发标题',
            path: '/pages/goodDetail/goodDetail?id=' + id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})