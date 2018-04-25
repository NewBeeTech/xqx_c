// pages/qr_code/getMoney/getMoney.js

const app = getApp()
const getTradeDetail = app.globalData.host + "/xcx-person/consump/getTradeDetail"; //待托管小金详情
const getMainPagev = app.globalData.host + '/xcx-person/merchantv20/getMainPagev22' //初始化数据
var userId;
var array = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getTradeDetail:[], //小金账单详情数据
    addClass:false, //进度条
    schedule:"",//进度条文案提示
    cur_ratio:true,//判断消费类型
    name: false,
    cnt: '',//附近商户
    maxRatio: '',//最大返金比
    integral: [],
    nearbyTo: false,
    idcard_state:false,//是否开户
    list_img: [], // 卡片图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.id);
    let that = this;
    let id = options.id;
    //let id = '33478';

    wx.getStorage({
      key: 'userid',
      success: function (res) {
        //console.log(res);
        userId = res.data;
        let param = {
          userId: res.data,
          cnd:id
        }
        app.postRequest(getTradeDetail, app.jsonToString(param), function (res) {
          if(res.data.code == 0){
          
            that.setData({
              getTradeDetail:res.data.data
            })
            //console.log(res.data.data.merchant_name.length)
            if (res.data.data.merchant_name.length < 10){
              that.setData({
                name: true
              })
            } else if (res.data.data.merchant_name.length > 10 && res.data.data.merchant_name.length < 19) {
              that.setData({
                name: true
              })
            }else{
              that.setData({
                name: false
              })
            }
            // 判断是否开户
            //console.log(res.data.data.idcard_state)
            if (res.data.data.idcard_state == 1){
              that.setData({
                idcard_state: true
              })
            }else{
              that.setData({
                idcard_state: false
              })
            }
            if (res.data.data.dep_state == 2){  //判断是否已经缴存
              that.setData({
                addClass: true,
                schedule: "托管入账工商银行"
              })
            } else if (res.data.data.dep_state == 1 || res.data.data.dep_state == 3){
              that.setData({
                addClass: false,
                schedule:"已到账, 待托管工商银行"
              })
            }
            // 判断获得小金类型 如果有返金比则消费 如果返金比为null 则不是消费类型
            if (res.data.data.cur_ratio == null){
              that.setData({
                cur_ratio: false,   
              })
            }else{
              that.setData({
                cur_ratio: true,
              })
            }
          }

        })
      }
    })
    wx.getStorage({
      key: 'location',
      success: function (res) {
        that.getMainPagev(userId, res.data.latitude, res.data.longitude); // 调取接口
      }
    })
  },
  // 获取首页信息
  getMainPagev: function (userId, latitude, longitude) {
    let that = this;
    let param = {
      userId: userId,
      latitude: String(latitude),
      longitude: String(longitude)
    }
    app.postRequest(getMainPagev, app.jsonToString(param), function (res) {

      if (res.data.code == 0) {
        if (res.data.data.nearby.cnt > 3) {
          that.setData({
            nearbyTo: true,
          })
        }
        let arr = [];
        for (let i = 0; i < 4; i++) {
          // 如果大于3个商家只显示前三个 如果小于三个商家则正常添加
          if (res.data.data.nearby.list.length > 3) {
            arr.push(res.data.data.nearby.list[i]);
          } else {
            arr.push(res.data.data.nearby.list[i])
          }
          
        }
        for(let i = 0; i<arr.length;i++){
          if(arr[i] == undefined){
           arr.splice(i)
          }
        }
        
        //console.log(arr);
        that.setData({
          list_img: arr
        })
        that.setData({
          currency: res.data.data.userInfo.currency,
          maxRatio: res.data.data.nearby.maxRatio,
          cnt: res.data.data.nearby.cnt,
          integral: res.data.data.integral
        })
        for (let i = 0; i < res.data.data.nearby.list.length; i++) {
          let obj = {};
          obj.latitude = res.data.data.nearby.list[i].latitude;
          obj.longitude = res.data.data.nearby.list[i].longitude;
          obj.width = "32";
          obj.height = "32";
          obj.id = res.data.data.nearby.list[i].id;
          obj.title = res.data.data.nearby.list[i].title;
          obj.iconPath = "/pages/images/landmark.png";
          array.push(obj);
        }
        that.setData({
          markers: array

        })
        // console.log(that.data.markers);
      }

    })

  },
  Goindex:function(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  // 跳转列表页
  goMerchantList: function () {
    wx.navigateTo({
      url: '/pages/merchant/merchantList/merchantList'
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