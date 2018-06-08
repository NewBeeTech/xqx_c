var login = require("login.js");
var common=require('common.js');
let systeminfo=wx.getStorageSync('systeminfo');
if(!systeminfo){
  try {
    systeminfo = wx.getSystemInfoSync()
    console.log(systeminfo)
    wx.getNetworkType({
      success: function(res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        systeminfo.networkType = res.networkType
        wx.setStorageSync('systeminfo',JSON.stringify(systeminfo))
      }
    })
  } catch (e) {
  }
}
function HTTPManager() { }
HTTPManager.get = function (url, parm) {
  wx.showLoading({
    title: '加载中',
  })
  const time=new Date().getTime();
  return new Promise(function (success, fail) {
    wx.request({
      url: url,
      data: parm,
      header: {
        'content-type': 'application/json', // 默认值
        'From':'xqx_c_wxxcx',
        'Authorization':parm.token,
        'DateTime':time,
        'TerminalEnv':systeminfo
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
      wx.showLoading({title: '加载中',mask: true});
      parm.token = wx.getStorageSync('token') || '';
      console.warn('post  token' + parm.token)
      //没有token的情况直接重新登录获取token
      if(!parm.token){
        return new Promise(function(success,fail){
          login.login().then(function (res) {
            console.log('重新登录校验token')
            console.log(res)
            if (res.code == 0) {
              res.token&&wx.setStorageSync('token', res.token)
              parm.token = res.token;
              console.log(url+':'+JSON.stringify(parm))
              const rsaData=common.getRsa(parm)
              const time=new Date().getTime();
              const Authorization=common.getAuthorization(rsaData,time)
              wx.request({
                url: url,
                data: rsaData,
                method: "POST",
                header: {
                  'content-type': 'application/json',
                  'From':'xqx_c_wxxcx',
                  'Authorization':Authorization,
                  'DateTime':time,
                  'TerminalEnv':systeminfo
                },
                success: function (res) {
                  console.log(res.header)
                  success(res.data);
                }
              })
            } else {
              wx.showToast({
                title: '网络错误请稍后再试',
                icon: 'none',
                duration: 5000,
              });
            }
          })
        })
      }else{
        const rsaData=common.getRsa(parm)
        const time=new Date().getTime();
        const Authorization=common.getAuthorization(rsaData,time)
        console.log(url+':'+JSON.stringify(parm))
        return new Promise(function (success, fail) {
          wx.request({
            url: url,
            data: rsaData,
            method: "POST",
            header: {
              'content-type': 'application/json',
              'From':'xqx_c_wxxcx',
              'Authorization':Authorization,
              'DateTime':time,
              'TerminalEnv':systeminfo
            },
            success: function (res) {
              console.log(res);
              wx.hideLoading();
              if (res.data.code == 2 ) {
                console.warn('其他接口验证需要跳转手机号页面-调用登录接口再次验证')
                login.login().then(function (res) {
                  console.log('重新登录校验token')
                  console.log(res)
                  if (res.code == 0) {
                      res.token&&wx.setStorageSync('token', res.token)
                      parm.token = res.token;
                      const rsaData=common.getRsa(parm)
                      const time=new Date().getTime();
                      const Authorization=common.getAuthorization(rsaData,time)
                      console.log(url+':'+JSON.stringify(parm))
                      wx.request({
                        url: url,
                        data: rsaData,
                        method: "POST",
                        header: {
                          'content-type': 'application/json',
                          'From':'xqx_c_wxxcx',
                          'Authorization':Authorization,
                          'DateTime':time,
                          'TerminalEnv':systeminfo
                        },
                        success: function (res) {
                          success(res.data);
                        }
                      })
                  } else {
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
}
module.exports = HTTPManager;
