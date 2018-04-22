// pages/DetailsPayment/DetailsPayment.js
var DateTool = require("../../Tools/DateTool.js");
var app = getApp();
var appData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      xqObj:{},
      su:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadData(options.id);
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
          var arr = res.data.joinList;
          for(var k in arr){
              arr[k].group_price = fn(arr[k].group_price);
              arr[k].price = fn(arr[k].price);
          }
          var su = res.data.group_person_num - arr.length;
          for (var i = su ;i>0;i--) {
              arr.push({})
          };

          
          that.setData({
              xqObj: res.data,
              su:su
          })

          var deadLine = res.data.deadLine - Date.now();
          var dsq = function () {
            if (deadLine-1000 >= 0) {
              var showTime = DateTool.toHHMMSS(res.data.deadLine);
                  that.setData({
                    'xqObj.deadLine': showTime
                  })
              } else {
                  clearInterval(dsq);
                  return
               };
          };
          setInterval(dsq, 1000)
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

    return {
      title: '快来帮我拼团吧',
      path: 'pages/PaymentCompletion2/PaymentCompletion2',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败")
      }
    }
  }
  
})