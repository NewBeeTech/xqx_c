//app.js
var getSession = "/app_person/XCXController/get3rdSession";   //获取sessionKey

var tool = require("Tools/HTTPOpertion.js");
var QQMapWX = require('Tools/qqmap-wx-jssdk.min.js');
var qqmapsdk;
App({
  onLaunch: function (q) {
    qqmapsdk = new QQMapWX({
      key: "5QUBZ-XZVW6-5U7SE-M4OZW-VA7DE-WXFZ6"
    });
    //console.log(q.path);
    var that = this;
    //this.globalData.path = q.path;
    var path = q.path;
    wx.login({
      success: res => {
        // console.log("在这")
        this.globalData.code = res.code;
        wx.setStorage({
          key: "code",
          data: res.code
        })
        // 获取用户信息
        wx.getSetting({
          success: result => {
            // console.log("在获取用户信息")
            // console.log(result)
            wx.getUserInfo({
              success: data => {
                // console.log("走到这")
                let url = this.globalData.host + getSession;
                let param = {
                  code: res.code,
                  iv: data.iv,
                  encryptedData: data.encryptedData
                }
                this.postRequest(url, this.jsonToString(param), function (res) {
                  // console.log("正确运行")
                  that.globalData.userid = res;
                  that.globalData.session = res.data.session;
                  // 数据缓存session
                  wx.setStorage({
                    key: "session",
                    data: res.data.session
                  })
                  wx.setStorage({
                    key: "userid",
                    data: res.data.userId
                  })
                  // console.log(path)
                  if (res.data.needRegister == true) {
                    if (path == 'pages/index/index') {
                      wx.redirectTo({
                        url: '/pages/login/login',
                      })
                    } else if (path == 'pages/qr_code/pay/pay') {
                      wx.redirectTo({
                        url: '/pages/login/loginTo/loginTo',
                      })
                    }

                  } else {
                    that.getPromission();
                  }
                })
                if (result.authSetting['scope.userInfo']) {

                }
              },
              fail: data => { }
            })


          },
        })
      }
    })
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
  // 判断用户进入是否进行授权 如果没有进行授权提示授权
  getPromission: function () {
    var loginStatus = true;
    if (!loginStatus) {
      wx.openSetting({
        success: function (data) {
          if (data) {
            if (data.authSetting["scope.userInfo"] == true) {
              loginStatus = true;
              wx.getUserInfo({
                withCredentials: false,
                success: function (data) {},
                fail: function () {}
              });
            }
          }
        },
        fail: function () {}
      });
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (data) {},
              fail: function () {
                loginStatus = false;
                // 显示提示弹窗
                wx.showModal({
                  title: '是否接受微信授权',
                  content: '需要获取您的微信信息，请确认授权，否则将无法展示您的个人信息',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              loginStatus = true;
                              wx.getUserInfo({
                                withCredentials: false,
                                success: function (data) {},
                                fail: function () {
                                }
                              });
                            }
                          }
                        },
                        fail: function () {}
                      });
                    } else if (res.cancel) {
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              loginStatus = true;
                              wx.getUserInfo({
                                withCredentials: false,
                                success: function (data) {},
                                fail: function () {
                                }
                              });
                            }
                          }
                        },
                        fail: function () {}
                      });
                    }
                  }
                });
              }
            });
          }
        },
        fail: function () {}
      });
    }
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
  onShow: function() {
    let that = this;
    wx.login({
      success: res => {
        wx.setStorage({
          key: "code",
          data: res.code
        })
        // 获取用户信息
        wx.getSetting({
          success: result => {
            if (result.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: data => {
                  this.globalData.code = res.code;
                  let url = this.globalData.host + getSession;
                  let param = {
                    code: res.code,
                    iv: data.iv,
                    encryptedData: data.encryptedData
                  }
                  this.postRequest(url, this.jsonToString(param), function (res) {
                    that.globalData.userid = res;
                    that.globalData.session = res.data.session;
                    // 数据缓存session
                    wx.setStorage({
                      key: "session",
                      data: res.data.session
                    })
                    wx.setStorage({
                      key: "userid",
                      data: res.data.userId
                    })
                    //console.log(path)
                    if (res.data.needRegister == true) {
                      if (path == 'pages/index/index') {
                        wx.redirectTo({
                          url: '/pages/login/login',
                        })
                      } else if (path == 'pages/qr_code/pay/pay') {
                        wx.redirectTo({
                          url: '/pages/login/loginTo/loginTo',
                        })
                      }
                    }
                  })
                },
                fail: data => { }
              })
            }

          },
          fail: result => {
            this.getPromission();
          }
        })


      }
    })
  },
  globalData: {
    Tool: tool,
    session: '',
    userid: '',
    host: "http://mini.xqx.com",
    searchData:[],
    photos:[]
  },
  // 数据转换json
  jsonToString: function (data) {
    return JSON.stringify(data);
  },
  // 解决精度丢失
  accmul: function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  // post请求
  postRequest: function (url, data, succ, status) {
    wx.request({
      url: url,
      data: data,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        succ && succ(res);
      },
      fail: function (res) {
        fail && fail(res);
      },
      complete: function () {
        if (!status) {
          wx.hideToast();
        }
      }
    })
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
})
