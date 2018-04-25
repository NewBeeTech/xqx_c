// pages/wholeOrder/wholeOrder.js
var DateTool = require("../../Tools/DateTool.js");
var app = getApp();
var appData = app.globalData;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,//页码
        Ddarr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDdList();
    },
    //详情
    gmTap: function (e) {
        wx.navigateTo({
            url: '../orderDetails/orderDetails?id=' + e.currentTarget.dataset.id
        })
    },
    //售后
    sohTap: function () {
        wx.navigateTo({
            url: '../customerService/customerService',
        })
    },

    //获取用户全部订单
    getDdList: function () {
        console.log(1111)
        var that = this;
        appData.Tool.getGoodsGroupOrderListXCX({ page: that.data.page, rows: 10, intPara: 'KJ' }).then(function (res) {
            console.log(res)
            wx.hideLoading();
            var arr = res.data.list;
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
            that.setData({
                Ddarr: that.data.Ddarr.concat(res.data.list)
            })
        })
            .catch(function (err) {
                wx.hideLoading();
                console.log(err)
                wx.showToast({
                    title: err.message,
                    duration:2000
                })
             })
    },

    //下拉加载
    xijSoll: function () {
        this.setData({
            page: this.data.page + 1
        });
        this.getDdList();
    },

    //取消订单
    qxdTap:function(e){
        var that = this;
        var data = e;
        wx.showModal({
            title:'提示',
            content:'是否取消订单',
            success:function(e){
                if (e.confirm){
                    var obj = {
                      orderId: data.currentTarget.dataset.id,
                      goods_group_id: data.currentTarget.dataset.goods_group_id,
                      group_buy_id: data.currentTarget.dataset.group_buy_id
                    }
                    appData.Tool.cancelGroupOrder(obj).then(function (res) {
                        console.log(res)
                        wx.hideLoading();
                        var title = '';
                        if (res.data.cancelFlag) {
                            title = '取消成功'
                        } else {
                            title = '取消失败'
                        };
                        wx.showToast({
                            title: title
                        });
                        setTimeout(function () {
                            that.data.Ddarr = [];
                            that.data.page = 1;
                            that.getDdList();
                        }, 1500)
                    })
                        .catch(function (err) {
                            wx.hideLoading();
                            console.log(err)
                            wx.showToast({
                                title: err.message,
                                duration: 2000
                            })
                        })
                }
            }
        })

    },
    //确认收货
    qrsTap: function (e) {
        var that = this;
        var obj = {
            orderId: e.currentTarget.dataset.id,
            goods_group_id: e.currentTarget.dataset.goods_group_id,
            group_buy_id: e.currentTarget.dataset.group_buy_id
        }
        appData.Tool.commitReceiveGoods(obj).then(function (res) {
            console.log(res)
            wx.hideLoading();
            that.data.Ddarr = [];
            that.data.page = 1;
            that.getDdList();
        })
            .catch(function (err) {
                wx.hideLoading();
                console.log(err)
                wx.showToast({
                    title: err.message,
                    duration: 2000
                })
            })
    },

    onShareAppMessage: function (res) {
        console.log(res)
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '自定义转发标题',
            path: '',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    fxIndex:function(e){
        this.data.goods_group_id = e.currentTarget.dataset.goods_group_id;
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
