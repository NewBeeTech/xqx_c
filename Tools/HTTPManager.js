// var app = getApp();
// var appData = app.globalData;


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
  console.log("URL:",url,"parms:", parm);
  wx.hideLoading();
  wx.showLoading({
    title: '加载中',
  });
  parm.token = wx.getStorageSync('token');
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
  wx.getStorage({
    key: 'token',
    success: function(res) {
      console.log(res);
    },
  })
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
          wx.reLaunch({
            url: '../boundNumber/boundNumber',
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
HTTPManager.login = function(){
  return new Promise(function (success, fail) {

    wx.login({
      success: function (res) {
        console.log(res);

        var code = res.code;

          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              wx.setStorage("encryptedData", res.encryptedData);
              wx.setStorage("iv", res.iv);
              /**
               * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
               *
               * code	String	是	code
               * encryptedData	String	是	微信用户加密信息
               * iv	String	是	微信用户加密信息
               */
              var config = { code: code, encryptedData: res.encryptedData, iv: res.iv };
              console.log(config);
              HttpManager
                .post("http://mini.xqx.com/app_person/" + "XCXController/get3rdSession", config).then(function (result) {
                console.log(result);
                wx.hideLoading();
                success(result);
              }).catch(function (error) {
                console.log(error);
                wx.hideLoading();
                fail(error);
              });
            }
          })

      }
    });
  })
}
module.exports = HTTPManager;
