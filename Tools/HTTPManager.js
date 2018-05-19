// var app = getApp();
// var appData = app.globalData;
var login = require("login.js");
function HTTPManager() { }
HTTPManager.get = function (url, parm) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise(function (success, fail) {
    wx.request({
      url: url,
      data: parm,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        success(res.data);

      },
      fail: function (error) {
        wx.showToast({
          title: error,
          icon: 'none',
          duration: 2000
        })
        fail(error)
      }
    })
  });
}

HTTPManager.post = function (url, parm) {
  wx.hideLoading();
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  parm.token = wx.getStorageSync('token') || '缓存中没有token';
  console.warn('post  token' + parm.token)
  let session = wx.getStorageSync('session') || "";
  parm.session = session;
  // parm.session = wx.getStorageSync('session') ? wx.getStorageSync('session'):"";
  // if(!parm.session) {
  //   wx.showToast({
  //     title: 'session' + parm.session,
  //     icon: 'success',
  //     duration: 2000
  //   });
  // }
  // console.log(parm,wx.getStorageSync('token'));
  console.warn("URL:", url, "parms:", parm, "token: ", parm.token);
  return new Promise(function (success, fail) {
    wx.request({
      url: url,
      data: parm,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code === 2) {
          console.warn('其他接口验证需要跳转手机号页面-调用登录接口再次验证')
          login.login().then(function (res) {
            console.log('重新登录校验token')
            console.log(res)
            if (res.code == 0) {
              if (res.token) {
                wx.setStorageSync('token', res.token)
                parm.token = res.token;
                wx.request({
                  url: url,
                  data: parm,
                  method: "POST",
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    success(res.data);
                  }
                })
              } else {
                console.warn('其他接口访问，经重新登录接口再次验证需要跳转手机号页面注册');
                wx.reLaunch({
                  url: '/pages/boundNumber/boundNumber',
                })
              }
            } else {
              wx.hideLoading;
              wx.showToast({
                title: '网络错误请稍后再试',
                icon: 'none',
                duration: 5000,
              });
            }
          })


          return;
        }
        success(res.data);
      },
      fail: function (error) {
        fail(error)
      }
    })
  });


}
HTTPManager.login = function (url, parm) {
  wx.hideLoading();
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  wx.setStorageSync('token', '');
  parm.token = wx.getStorageSync('token') || wx.token;
  console.warn('post  新token' + parm.token)
  let session = wx.getStorageSync('session') || "";
  parm.session = session;
  console.warn("URL:", url, "parms:", parm, "token: ", parm.token);
  return new Promise(function (success, fail) {
    wx.request({
      url: url,
      data: parm,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code === 2) {
          console.warn('登录接口验证需要跳转手机号页面')
          wx.reLaunch({
            url: '/pages/boundNumber/boundNumber',
          })

          return;
        }
        success(res.data);
      },
      fail: function (error) {
        fail(error)
      }
    })
  });
}
module.exports = HTTPManager;
