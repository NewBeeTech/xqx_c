
var Default = require("Default.js");
var HttpManager = require("HTTPManager.js");
function HTTPOpertion() { };

/**
 * 首页
 * 
 * token	String	是	token
 * intPara	String	否	城市代码 默认为空
 * latitude	String	是	纬度
 * longitude	String	是	经度
 */
HTTPOpertion.getAddressData = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.ADDRESS_DATA, parm);

}


/**
 * 首页
 * 
 * token	String	是	token
 * intPara	String	否	城市代码 默认为空
 * latitude	String	是	纬度
 * longitude	String	是	经度
 */
HTTPOpertion.getMianData = function (parm) {

  return HttpManager
    .post(Default.HOST + Default.MAIN_PAGE, parm);

}

HTTPOpertion.getMy = function () {
  return HttpManager
    .post(Default.HOST + Default.GET_MY, { userId: 60018 });

}

/**
 * 获取行业分类
 * 
 * token	String	是	token
 * intPara	String	是	上级分类id 默认为0 查询第一级分类
 */
HTTPOpertion.getSubCatelog = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.SUB_CATEGORY, parm || {});
}

/**
 * 获取ccpp城市接口
 * 
 * token	String	是	token
 */
HTTPOpertion.getCCPPCity = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.SUB_CATEGORY, parm || {});

}


/**
 * 根据行业代码及用户所在城市获取商户，首页搜索商户
 * 
 * token	String	是	token
 * cnd	String	否	城市代码
 * cnd2	String	否	查询条件，商户名称
 * intPara	Integer	否	行业代码 进入分类后传入
 * intPara2	int	否	城市层级
 * unionid	String	否	排序，“1”关注人数，“2”返金比例
 * latitude	String	是	纬度
 * longitude	String	是	经度
 */
HTTPOpertion.getIndustryMerchantV24 = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.SEARCH_MERCHANT, parm || {});
}


/**
 * 获取商户详情
 * 
 * token	String	是	token
 * userId	String	否	userId
 * cnd	String	是	商户id
 */
HTTPOpertion.getMerchantInfo = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.MERCHANT_INFO, parm || {});

}


/**
 * 获取子商户列表信息
 * 
 * token	String	否	token
 * cnd	String	否	商户id
 * latitude	String	是	纬度
 * longitude	String	是	经度
 * page	Integer	是	页码
 * rows	Integer	是	页面大小
 */
HTTPOpertion.getSubMerchant = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.SUBMERCHANT, parm || {});

}

/**
 * 商户相册列表
 * 
 * token	String	是	token
 * merchantId	String	是	商户id
 */
HTTPOpertion.getMerchantPicCatelogs = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.MERCHANT_PIC_CATE, parm || {});

}

/**
 * 商户图片列表
 * 
 * token	String	是	token
 * page	String	否	页数 默认1
 * rows	String	否	行数 默认15
 * merchantId	String	是	商户id
 * catelogId	String	否	相册id 不填默认查全部图片
 */
HTTPOpertion.getMerchantStorePics = function (parm) {

  return HttpManager
    .post(Default.HOST + Default.MERCHANT_STORE_PICS, parm || {});

}


/**
 * 获取商户介绍信息接口
 * 
 * token	String	否	token
 * cnd	String	否	商户id
 */
HTTPOpertion.getMerchantIntroduce = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.MERCHANT_INTRODUCE, parm || {});

}

/**
 * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
 * 
 * code	String	是	code
 * encryptedData	String	是	微信用户加密信息
 * iv	String	是	微信用户加密信息
 */
HTTPOpertion.get3rdSession = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.GET_3RD_SESSION, parm || {});

}

/**
 * 一键授权
 * 解析获取用户手机号 后端自动注册
 * 
 * session	String	是	session
 * iv	String	是	iv
 * encryptedData	String	是	encryptedData
 */
HTTPOpertion.info = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.INFO, parm || {});

}

/**
 * 发送登录验证码接口，同时验证该手机手否已注册
 * 
 * loginName	String	是	用户手机号
 */
HTTPOpertion.checkLoginNameV1 = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.CHECK_LOGIN, parm || {});

}

/**
 * 注册接口
 * 
 * loginName	String	是	用户手机号
 * smsCode	String	是	注册验证码
 * session	String	是	session
 * registerFlag	String	是	固定字符串 sms
 */
HTTPOpertion.register = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.REGISTER, parm || {});

}

/**
 * 获取个人信息
 */
HTTPOpertion.getUserInfo = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.USER_INFO, parm || {});

}

/**
 * 小金
 * 获取账单历史明细接口,已到账未托管
 */
HTTPOpertion.getArrivalTradeHistoryv232 = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.ARRIVAL_TRADE_HISTORY, parm || {});

}


/**
 * 获取账单详情接口
 */
HTTPOpertion.getTradeDetail = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.TRADE_DETAIL, parm || {});

}

/**
 * 获取缴存详情接口
 */
HTTPOpertion.getDepositedInfo = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.Deposited_INFO, parm || {});

}


/**
 * 已缴存消费养老金页面(托管列表)
 * 获取缴存信息接口
 * 
 * page 当前页码
 * rows 每页记录数
 */
HTTPOpertion.getDepositedHistory = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.DEPOSITED_HISTORY, parm || {});

}

/**
 * 我的身份码
 * 获取二维码接口
 */
HTTPOpertion.createQRCode = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.CREATE_QRCODE, parm || {});

}

/**
 * 邀请奖励
 * 获取邀请相关参数
 */
HTTPOpertion.getInviteInfo = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.INVITE_INFO, parm || {});

}

/**
 * 支付
 * 
 * money	String	是	实际支付金额
 * session	String	是	session
 * token	String	是	token
 * merchantId	String	是	商户id
 * origionPrice	String	是	原始价格
 * discountId	String	是	折扣id 打折id 满减此项为空
 * discounInfo	String	是	折扣信息 打折为 打折具体数值 满减为商户详情mInfo
 */
HTTPOpertion.createPay = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.CREATE_PAY, parm || {});

}

HTTPOpertion.getMerchantDiscountInfo = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.MERCHANT_DISCOUNT_INFO, parm || {});

}


/**
 * 授权
 */
HTTPOpertion.login = function () {

  return new Promise(function(success,fail){
    wx.login({
      success: function (res) {
        console.log(res);

        var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              HTTPOpertion.saveToLocation("encryptedData",res.encryptedData);
              HTTPOpertion.saveToLocation("iv", res.iv);
              /**
               * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
               * 
               * code	String	是	code
               * encryptedData	String	是	微信用户加密信息
               * iv	String	是	微信用户加密信息
               */
              HTTPOpertion.get3rdSession({ code: code, encryptedData: res.encryptedData, iv: res.iv }).then(function (result) {
                console.log(result);
                success(result);
              }).catch(function (error) {
                console.log(error);
                fail(error);
              });
            }
          })
       

      }
    });
  })
}

/**
 * 本地存储数组
 * key:存储的字段
 * value:存储的值
 */

HTTPOpertion.saveArrayToLocation = function (key, value) {
  return new Promise(function (success, fail) {
    wx.setStorage({
      key: key,
      data: value.join(","),
      success: function () {
        success("存储成功");
      },
      fail: function () {
        fail("存储失败");
      }
    })
  });

}

/**
 * 本地存储字符串
 * key:存储的字段
 * value:存储的值
 */

HTTPOpertion.saveToLocation = function (key, value) {
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

/**
 * 本地存储数组
 * key:存储的字段
 * value:存储的值
 */

HTTPOpertion.getArrayToLocation = function (key) {

  return new Promise(function (success, fail) {
    wx.getStorage({
      key: key,
      success: function (res) {
        console.log(res.data.split(","));
        success(res.data.split(","));
      },
      fail: function () {
        fail("获取失败");
      }
    })
  });

}

/**
 * 本地存储字符串
 * key:存储的字段
 * value:存储的值
 */

HTTPOpertion.getToLocation = function (key) {
  return new Promise(function (success, fail) {
    wx.getStorage({
      key: key,
      success: function (res) {
        console.log(res.data)
        success(res.data);
      },
      fail: function () {
        fail("获取失败");
      }
    })
  });

}

module.exports = HTTPOpertion;