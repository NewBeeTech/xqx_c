//app.js

var tool = require("Tools/HTTPOpertion.js");
var QQMapWX = require('Tools/qqmap-wx-jssdk.min.js');
var qqmapsdk;
App({
  onLaunch: function () {
    qqmapsdk = new QQMapWX({
      key: "5QUBZ-XZVW6-5U7SE-M4OZW-VA7DE-WXFZ6"
    });
  },
  getUserLocation: function (callback) {

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.setStorageSync("latitude", res.latitude);
        wx.setStorageSync("longitude", res.longitude);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.district;
            console.log(addressRes);
            callback(addressRes.result.address_component.district);
          }, fail: function (err) {
            console.log(err);
          }
        })
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
      tool.saveToLocation("userId", res.userId);
      tool.saveToLocation("token", res.token);
      tool.saveToLocation("session", res.session);
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

                }
              })
            }
          }
        })
      }
    }).catch(function (error) {
      console.log(error);
    });
  },
  globalData: {
    Tool: tool,
    searchData:[],
    photos:[]
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
})