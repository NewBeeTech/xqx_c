//app.js
var getSession = "/app_person/XCXController/get3rdSession";   //获取sessionKey
var tool = require("Tools/HTTPOpertion.js");
var QQMapWX = require('Tools/qqmap-wx-jssdk.min.js');
var MD5 = require('Tools/md5.js');
var host=require('Tools/Default.js');
var host=require('Tools/common.js');
// var a=MD5("123456");
var qqmapsdk;
var city='';   //新加
App({
  onLaunch: function (q) {
    var that=this;
    qqmapsdk = new QQMapWX({
      key: "5QUBZ-XZVW6-5U7SE-M4OZW-VA7DE-WXFZ6"
      // key:"4BUBZ-FNLWX-5OJ4S-7FR64-HLZQH-R5BI4"
    });
  //  地理位置
    this.getUserLocation() //获取位置函数
  },
  onShow:function(){
    wx.loginOnoff=false;
  },
  getUserLocation: function (callback) {
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.setStorageSync("latitude", res.latitude);
        wx.setStorageSync("longitude", res.longitude);
        // 经纬度位置转换
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            console.log("地理位置成功")
            var address = addressRes.result.formatted_addresses.district;
            console.log(addressRes);
          //  获取城市（新加）
           city = addressRes.result.address_component.city;
            // console.log(city)
            if(callback){
              callback(addressRes.result.address_component.district);
              return false;
            }
            wx.setStorageSync("city", city );
            // this.globalData.city=city;
            // 获取城市
            that.getCityId(city)
          },
          fail: function (err) {
            console.log(err);
            city = '北京' || this.globalData.city;
            that.getCityId(city)
            wx.setStorageSync("city", city);
            wx.setStorageSync("latitude", '39.9');
            wx.setStorageSync("longitude", '116.4');
            wx.setStorageSync('codeid', this.globalData.codeid)
            wx.setStorageSync('citybox', this.globalData.codeid)
            console.log(wx.getStorageSync('codeid'))
          }
        })
      },
      // 获取位置失败，定位到北京市天an门
      fail:function(err){
        city = '北京' || this.globalData.city;
        // that.getCityId(city)
        wx.setStorageSync("city", city);
        wx.setStorageSync('codeid', this.globalData.codeid)
        var currentpage = getCurrentPages();
        that.setpageData(currentpage, city);
      }
    })
  },

  login:function(finish){
    if (wx.getStorageSync("token")){
      finish();
      return false;
    };
    tool.login().then(function (res) {
      console.log(res);
      wx.hideLoading()
      res.token && wx.setStorageSync('token', res.token);
      finish();
    }).catch(function (error) {
      console.log(error);
    });
  },
  getCityId:function(ci){
    var that=this;
    //  获取城市列表id
    // console.log(wx.getStorageSync("city"))
    // var ci = wx.getStorageSync("city");
    var codeid = '';
    this.globalData.Tool.getCityList({}).then(function (res) {
      console.log(res)
      var citylist = res.data.xcxCCPPCityList;
      var i = 0;
      while (i < citylist.length) {
        var cis = citylist[i].cityname + "市";
        if (ci == cis) {
          codeid = citylist[i].id;
          city = citylist[i].cityname;
          // console.log(codeid)
          console.log("获取城市成功"+city)
          if(!wx.getStorageSync('codeid')){
                // 获取当前页，添加data参数
                var currentpage = getCurrentPages();
      //       //       currentpage=currentpage[currentpage.length-1];
                  console.log(currentpage);
                  that.setpageData(currentpage,city);
                  // if(currentpage[0].route){
                  //   currentpage[0].setData({
                  //     city:city
                  //   })
                  // }
          }
          wx.setStorageSync('codeid', codeid)
          wx.setStorageSync('citybox', codeid)
            // that.globalData.city=city;
            // that.globalData.codeid = codeid;
            // console.log(that.globalData.codeid)
          break;
        }
        //  else {
        //   city="北京"
        //   console.log('失败');

        // }
        i++;
      }
    })

  },
  globalData: {
    Tool: tool,
    session: '',
    userid: '',
    host:host.HOST,
    searchData:[],
    photos:[],
    city:'北京',
    codeid:'110100'
  },
  setpageData: function (data,city) {
    const that = this;
    if (data.length > 0) {
      if (data[0].route.indexOf('spellGroupHome/spellGroupHome') > 0) {
        data[0].setData({ city: city })
      }
    } else {
      setTimeout(function () {
        data = getCurrentPages()
        that.setpageData(data,city)
      }, 50)
    }
  },

  // 数据转换json
  jsonToString: function (data) {
    return JSON.stringify(data);
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
})
