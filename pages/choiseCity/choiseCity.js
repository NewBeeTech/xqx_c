// pages/choiseCity/choiseCity.js
var app = getApp();
var appData = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
     city:'',
     citys:[],
    //  cityInitBox: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y','Z'],
     cityFirstLetter:[],
     h:0,
     nowTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前选择城市的高度
    var query = wx.createSelectorQuery()
    query.select('.citynow').boundingClientRect(function (res) {
      console.log(res)
      that.setData({
        nowTop: res.height
      })
    }).exec()
    // 设置城市内容
    var that=this;
    console.log(options.city)
      this.setData({
        city:options.city
      })
      appData.Tool.getCityList({})
        .then(function (result) {
          wx.hideLoading();
          console.log(result);
          var citylist = result.data.xcxCCPPCityList;

          // 排序去重
          var arr=[];
          var firstArr=[];
          for(var i=0;i<citylist.length;i++){
            arr.push(citylist[i].firstLetter)
          }
          for(var i=0;i<arr.length;i++){
            for(var j=0;j<arr.length;j++){
              if(arr[i]==arr[j]&&i!=j){
                arr.splice(j,1);
                j --;
              }
            }
          }
          var cityFirstLetter=arr.sort();

          for (var i = 0; i < cityFirstLetter.length;i++){
              for (var j = 0; j < citylist.length;j++){
                    if (cityFirstLetter[i] == citylist[j].firstLetter) {
                      firstArr.push(citylist[j])
                    }
              }
          }
          console.log(firstArr)

          console.log(citylist)
          that.setData({
            citys: firstArr,
            cityFirstLetter: cityFirstLetter
          })
        }).catch(function (err) {
          console.log(err);
      });

  },
  toScrollTop:function(e){
    var that=this;
    console.log(e)
    var num=0;
    var index=e.currentTarget.dataset.xiabiao;
    console.log(index)
    var city1 = this.data.citys;
    for (var i = 0; i < city1.length;i++){
      if (city1[i].firstLetter == this.data.cityFirstLetter[index]){
        console.log(i)
        num=42*i;
        console.log(num)
        // 获取当前手机的可用高度
        wx.getSystemInfo({
          success: function (res) {
            console.log(res.statusBarHeight)
            that.setData({
              h: (res.windowHeight - res.statusBarHeight- that.data.nowTop)/14*i
            })
          }
        })
     
        console.log(this.data.h)

        break;
      }
    }
    
  },
  goToHome:function(e){
    var data=e.currentTarget.dataset;
    var codeid = data.codeid;
    var city = data.city;
    wx.removeStorageSync('codeid');
    wx.removeStorageSync('city');
    // console.log(wx.getStorageSync('codeid'))
    wx.setStorageSync('codeid', codeid);
    wx.setStorageSync('city', city)
    wx.setStorage({
      key: "citybox",
      data: { city:data.city, codeid:data.codeid },
      success: function () {
        wx.navigateBack();   //返回上一个页面
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
