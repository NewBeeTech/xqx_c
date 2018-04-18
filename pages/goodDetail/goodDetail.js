// pages/goodDetail/goodDetail.js
var DateTool = require("../../Tools/DateTool.js");
var app = getApp();
var appData = app.globalData;
var timer = null;
var dsq;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertTop:0,
    isShow:"none",
    goodsInfo:{},
    groupInfo:{},
    groups: [{ time: 1523766688, dateString: "0" }, { time: 1523795430, dateString:"0" }],
    tId:''
  },
  oneKeyGroup: function (e){
    wx.navigateTo({
        url: '../ConfirmationOrder/ConfirmationOrder?cnd=' + e.currentTarget.dataset.id + '&create_person_id=' + e.currentTarget.dataset.create_person_id + '&group_buy_id=' + e.currentTarget.dataset.group_buy_id
    })
  },
  lastTime:function(last){
    var curTime = new Date();
    var timeNum = curTime.getTime();
    console.log(timeNum);
    return "";
  },
  loadData: function (id) {
    var self = this;
    return new Promise(function (success, fail) {
      var config = { cnd:id };
      
      appData.Tool.getGoodsGroupBuyInfoXCX(config).then(function (res) {
        wx.hideLoading();
        console.log(res)
        if (res.code === 0) {
          success();

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
          res.data.group_price = fn(res.data.group_price);
          res.data.price = fn(res.data.price);
          self.setData({
            goodsInfo: res.data,
            tId:res.id
          });
          var arry = self.data.goodsInfo.joinList;
          var sj = Date.now();
          for (var k in arry){
              arry[k].deadLine -= sj;
          };
          dsq = function(){
              var arr = self.data.goodsInfo.joinList;
              for (var k in arr){
                  if (arr[k].deadLine - 1000 > 0){
                      arr[k].deadLine -= 1000;
                  }else{
                      clearInterval(dsq);
                  }
                  arr[k].deadLineX = fnItem(arr[k].deadLine);
              };
              self.setData({
                  'goodsInfo.joinList': arr
              });
              function fnItem(t) {
                  var s = ~~(t / 60 / 60 / 1000);
                  var f = ~~((t - s * 60 * 60 * 1000) / 60 / 1000);
                  var m = ~~((t - s * 60 * 60 * 1000 - f * 60 * 1000) / 1000);
                  return (s < 10 ? '0' + s : s) + ':' + (f < 10 ? '0' + f : f) + ':' + (m < 10 ? '0' + m : m);
              };
          };
          setInterval(dsq,1000)

         
        } else {
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
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  backHome:function(){
    wx.navigateBack();
  },
  startTimer:function(){
    var self = this;
    timer = setInterval(function(){
      // self.data.groups[0].dateString = DateTool.toHHMMSS(self.data.groups[0].time);
    },500);
  },
  stopTimer:function(){
    clearInterval(timer);
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: this.data.goodsInfo.shareUrl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  showAlert:function(){
    this.setData({
      alertTop:50,
      isShow:"block"
    });
  },
  close:function(){
    this.setData({
      alertTop: 0,
      isShow: "none"
    });
  },
//   goToConfirmationOrder:function(){
//     wx.navigateTo({
//         url: '../ConfirmationOrder/ConfirmationOrder?cnd=' + e.currentTarget.dataset.id + '&create_person_id=' + e.currentTarget.dataset.create_person_id + '&group_buy_id=' + e.currentTarget.dataset.group_buy_id
//     })
//   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startTimer();
    console.log(options.id);
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
    clearInterval(timer);
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