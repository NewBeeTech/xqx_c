
var DateTool = require("../../Tools/DateTool.js");
var app = getApp();
var appData = app.globalData;

var _lastTime = null
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    // let _lastTime = null
    // 返回新的函数
    return function () {
        let _nowTime = + new Date()
        console.log(_nowTime, _lastTime, gapTime);
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,//页码
        Ddarr: [],    //关于订单返回的总数据
        currentTab: 0   //选项卡控制参数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
    },
    //详情
    gmTap: function (e) {
        wx.navigateTo({
            url: '../makeGroupsOrderDetails/makeGroupsOrderDetails?id=' + e.currentTarget.dataset.id
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
      var token=wx.getStorageSync("token");
      var intPara = this.data.currentTab;
      console.log(intPara)
        var that = this;
        // appData.Tool.getGoodsGroupOrderList({ page: that.data.page, rows: 10  }).then(function (res) {
        appData.Tool.getGoodsOrderListXCX({ token: token, page: that.data.page, rows: 10, intPara: intPara }).then(function (res) {
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
            if (res.data.list!=0&&that.data.page==1){
              that.setData({
                  // Ddarr: that.data.Ddarr.concat(res.data.list)
                Ddarr:arr
              })
            } else if (res.data.list != 0 && that.data.page != 1){
              that.setData({
                Ddarr: that.data.Ddarr.concat(res.data.list)
              })
            }else{
              wx.hideLoading();
              wx.showToast({
                title: "没有更多数据了",
                duration: 1000
              })
            }
            console.log(that.data.Ddarr)
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
       console.log(e)
        var p;
        var token=wx.getStorageSync("token");
        var that = this;
        var data = e;
        wx.showModal({
            title:'取消订单',
            content:'取消订单后款项会原路退回',
            success:function(e){
                if (e.confirm){
                    var obj = {
                      orderId: data.currentTarget.dataset.id,
                      token: token
                    }
                    var type1 = data.currentTarget.dataset.goods_type;
                    console.log(type1)
                    // 拼团
                    if(type1==1){
                        p=appData.Tool.cancelGroupOrder1(obj)
                    // 砍价
                    }else if(type1==3){
                        p=appData.Tool.cancelGroupOrder(obj)
                    }
                    // console.log(appData.Tool.cancelGroupOrder1(obj))
                    console.warn('参数：', obj);

                    p.then(function (res) {
                        console.log(res)
                        wx.hideLoading();
                        if (res.code == 0) {
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
                        } else {
                          wx.showToast({
                              title: res.message,
                              icon: 'none',
                              duration: 2000
                          });
                        }

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
        var pro;
        var title='';
        var token = wx.getStorageSync("token");
        var delivery_method = e.currentTarget.dataset.delivery_method;
        if (delivery_method == 1) {
          title = "确认收货"
        } else if (delivery_method == 2) {
          title = "确认自提"
        }
        var obj = {
          orderId: e.currentTarget.dataset.id,
          token: token
        }
        var type1 = e.currentTarget.dataset.goods_type;
        wx.showModal({
          title: title,
          content: title + "后款项无法退回，请谨慎操作",
          success: function (e) {
             if(e.confirm){

              if(type1==1){
                  pro = appData.Tool.commitReceiveGoods1(obj)
              }else if(type1==3){
                  pro = appData.Tool.commitReceiveGoods(obj)
              }
              throttle(function() {

                  pro.then(function (res) {
                      console.log(res)
                      wx.hideLoading();
                      if (res.code == 0) {
                        that.data.Ddarr = [];
                        that.data.page = 1;
                        that.getDdList();
                      } else {
                        wx.showToast({
                            title: res.message,
                            icon: 'none',
                            duration: 2000
                        });
                      }

                  })
                      .catch(function (err) {
                          wx.hideLoading();
                          console.log(err)
                          wx.showToast({
                              title: err.message,
                              duration: 2000
                          })
                      })


              }, 10000)();
             }
          },
          fail:function(err){
              console.log(err)
          }
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
      this.data.Ddarr = [];
      this.data.page = 1;
      this.getDdList();
      // console.log(1111111111111)
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
    //滑动切换
    swiperTab: function (e) {
      console.log(e)
      // console.log(e.detail.current)
      // var that = this;
      this.setData({
        currentTab: e.detail.current,
        Ddarr:[],
        page: 1,
      });
      this.getDdList();
    },
    //点击切换
    clickTab: function (e) {
      // var that = this;
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.setData({
          currentTab: e.target.dataset.current,
          Ddarr: [],
          page: 1,
        })
        this.getDdList();
      }

    }

})
