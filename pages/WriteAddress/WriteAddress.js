// pages/WriteAddress/WriteAddress.js
var app = getApp();
var appData = app.globalData;
const QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: '2KDBZ-3AKKR-UQJWU-WGKGQ-R3FM7-ITFSW'
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        modalCityname: '请选择',
        popupIf: false,//弹窗开关
        city: [],//城市列表
        city2: [],//城市列表存储
        cssDH: '',//弹窗动画class名
        nameLs: '',//城市名称

        objC: {
            id: '',
            name: '',
            phone: '',
            address: '',
            group_buy_id: '',
            create_person_id: ''
        },
        xaxAddress: '',//详细地址
        btnIf: false,//btn是否可点
        a1: '',
        a2: '',
        a3: ''
    },

    //获取全国所有城市
    getCityList: function () {
        var that = this;
        qqmapsdk.getCityList({
            success: function (res) {
                console.log(res);
                that.setData({
                    city: res.result[0],
                    city2: res.result[0]
                })
                console.log(res.result[0]);
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
        })
    },

    //点击选择城市
    choiseCity: function (e) {
        var that = this;
        var nameLs = that.data.nameLs;
        that.setData({
            nameLs: nameLs + e.currentTarget.dataset.name + ' '
        })
        var idLs = e.currentTarget.dataset.id + '';

        qqmapsdk.getDistrictByCityId({
            id: idLs,
            success: function (res) {
                console.log(res);
                that.setData({
                    city: res.result[0]
                })
            },
            complete: function (e) {
                if (!e.result) {
                    that.setData({
                        modalCityname: that.data.nameLs
                    })
                    that.popupTap();
                }
            }
        })
    },

    //弹出、收回
    popupTap: function () {
        var that = this;
        var popupIf = !that.data.popupIf;
        var cssDH = popupIf ? 'fadeInUp' : 'fadeOutDown';
        that.setData({
            cssDH: cssDH
        });
        if (popupIf) {
            that.setData({ popupIf: popupIf })
        } else {
            setTimeout(function () { that.setData({ popupIf: popupIf }) }, 500);
            that.setData({//初始化data
                city: that.data.city2,
                nameLs: ''
            })
            that.btnYN();
        }

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCityList();
        var obj = this.data.objC;
        if (options.address_id !== 'undefined') {
            obj.id = options.address_id;
        };
        if (options.create_person_id !== 'undefined') {
            obj.create_person_id = options.create_person_id;
            obj.group_buy_id = options.group_buy_id;
        };
        var obj = wx.getStorageSync('a1a2a3');
        if (obj !== undefined && obj.modalCityname) {
            this.data.objC.name = obj.a1;
            this.data.objC.phone = obj.a2;
            this.data.objC.address = obj.modalCityname + obj.a3;
            this.setData(obj);
            this.btnYN();
            console.log(obj)
        }
        console.log(options)
    },

    //输入input
    inputTap: function (e) {
        var id = e.currentTarget.dataset.id;
        if (id == 1) {//姓名
            this.data.objC.name = e.detail.value
        } else if (id == 2) {//电话
            this.data.objC.phone = e.detail.value
        } else if (id == 3) {//详细地址
            this.data.xaxAddress = e.detail.value
        }
        this.btnYN();
    },

    //判断btn是否可点
    btnYN: function () {
        var that = this;
        var objC = that.data.objC;
        if (objC.name != '' && objC.phone != '' && that.data.xaxAddress != '' && that.data.modalCityname != '请选择') {
            that.setData({
                btnIf: true
            })
        } else {
            that.setData({
                btnIf: false
            })
        }
    },

    //保存btn
    bcTap: function () {
        var that = this;
        var objC = that.data.objC;
        function checktel(str) {    //手机号
            var reg = /^1[3|4|5|7|8][0-9]\d{9}$/;
            return reg.test(str) ? true : false;
        };
        console.log(objC.phone)
        if (checktel(objC.phone)){
            wx.showToast({
                title:'不是手机号码'
            })
            return
        };
        objC.address = that.data.modalCityname + that.data.xaxAddress;
        console.log(objC)

        appData.Tool.operatePersonAddress(objC).then(function (res) {
            console.log(res)
            wx.hideLoading();
            var obj = {
                a1: objC.name,
                a2: objC.phone,
                a3: that.data.xaxAddress,
                modalCityname: that.data.modalCityname,
                xaxAddress: that.data.xaxAddress
            };
            wx.setStorageSync('a1a2a3', obj)
            if (res.data.id) {
                wx.navigateBack({})
            }
        }).catch(function (err) {
            wx.hideLoading();
            console.log(err)
        });
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