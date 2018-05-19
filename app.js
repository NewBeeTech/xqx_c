//app.js
var getSession = "/app_person/XCXController/get3rdSession";   //获取sessionKey

var tool = require("Tools/HTTPOpertion.js");
var QQMapWX = require('Tools/qqmap-wx-jssdk.min.js');
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

    // this.getCityId()//城市匹配

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
            wx.setStorageSync("city", city );
            // 获取城市
            that.getCityId(city)
            // callback(addressRes.result.address_component.district);
          }, fail: function (err) {
            console.log(err);
          }
        })
      },
      // 获取位置失败，定位到北京市天南门
      fail:function(err){
        city='北京';
        wx.setStorageSync("city", city);
      }
    })
  },

  login:function(finish){
    if (wx.getStorageSync("token")){
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success(res) {
                console.log(res);

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
      finish();
      return
      };
    tool.login().then(function (res) {
      console.log(res);
      wx.hideLoading()
      // tool.saveToLocation("userId", res.userId);
      // tool.saveToLocation("token", res.token);
      // tool.saveToLocation("session", res.session);
      res.userId && wx.setStorageSync('userId', res.userId);
      res.token && wx.setStorageSync('token', res.token);
      wx.token=res.token;
      res.session && wx.setStorageSync('session', res.session);
      wx.getStorage({
        key: 'token',
        success: function(res) {
          console.log("！！！！！token", res);
        },
      })

      var session = res.session;
      finish();
      if (res.needRegister) {

                  wx.reLaunch({
                    url: '/pages/boundNumber/boundNumber'
                  })

      }else {
      // console.log('hahah3');
        // wx.getSetting({
        //   success(res) {
        //     if (!res.authSetting['scope.userInfo']) {
        //       wx.authorize({
        //         scope: 'scope.userInfo',
        //         success(res) {
        //           console.log(res);

        //           wx.reLaunch({
        //             url: '/pages/boundNumber/boundNumber'
        //           })

        //         },
        //         fail(err) {
        //           console.warn(err);
        //           wx.showToast({
        //             title: '很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。',
        //             icon: 'none',
        //             duration: 5000,
        //           });
        //         }
        //       })
        //     }
        //   }
        // })
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  getCityId:function(ci){
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
          // 获取当前页，添加data参数
          var currentpage = getCurrentPages();
//       //       currentpage=currentpage[currentpage.length-1];
            console.log(currentpage);
            if(currentpage[0].route){
              currentpage[0].setData({
                city:city
              })
            }


          // wx.setStorageSync('city1', city)
          wx.setStorageSync('codeid', codeid)
          break;
        } else {
          console.log('失败');
        }
        i++;
      }
    })

  },
  globalData: {
    Tool: tool,
    session: '',
    userid: '',
    // host: "https://mini.xqx.com",
    host: "http://ccpp.denong.com",
    searchData:[],
    photos:[]
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
