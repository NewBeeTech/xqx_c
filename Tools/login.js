var Default = require("Default.js");
function login() {

}
login.post = function (url, parm) {
  wx.hideLoading();
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  console.warn("URL:", url, "parms:", parm);
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
login.get3rdSession = function (parm) {
  return login
    .post(Default.HOST + Default.GET_3RD_SESSION, parm || {});

}
login.saveToLocation = function (key, value) {
  return new Promise(function (success, fail) {
    wx.setStorage({
      key: key,
      data: value,
      success: function () {
        success("存储成功");
      },
      fail: function () {
        fail("存储失败");
      }
    })
  });
}
login.login = function () {
  return new Promise(function (success, fail) {
    wx.login({
      success: function (res) {
        console.log(res);

        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            login.saveToLocation("encryptedData", res.encryptedData);
            login.saveToLocation("iv", res.iv);
            /**
             * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
             *
             * code	String	是	code
             * encryptedData	String	是	微信用户加密信息
             * iv	String	是	微信用户加密信息
             */
            login.get3rdSession({ code: code, encryptedData: res.encryptedData, iv: res.iv }).then(function (result) {
              console.log(result);
              success(result);
            }).catch(function (error) {
              console.log(error);
              fail(error);
            });
          },
          fail: function (err) {
            console.warn('getUserInfo fail: ', err);
            wx.showToast({
              title: '很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。',
              icon: 'none',
              duration: 5000,
            });

          }
        })


      }
    });
  })

}
module.exports = login;