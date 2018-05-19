
var Default = require("Default.js");
var HttpManager = require("HTTPManager.js");
var login = require('login.js');
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
    return HttpManager.post(Default.HOST + Default.ADDRESS_DATA, parm);

}

HTTPOpertion.getTopPics = function (parm) {
  return HttpManager.post(Default.HOST + Default.GET_TOP_PICS, parm);
}

HTTPOpertion.getGoodsCatelog = function (parm) {
  return HttpManager.post(Default.HOST + Default.GETGOODSCATELOG, parm);
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
        .post(Default.HOST + Default.MAIN_PAGE, parm||{});

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
//  */
// HTTPOpertion.login = function () {

//     return new Promise(function (success, fail) {
//         wx.login({
//             success: function (res) {
//                 console.log(res);

//                 var code = res.code;
//                 wx.getUserInfo({
//                     success: function (res) {
//                         console.log(res);
//                         HTTPOpertion.saveToLocation("encryptedData", res.encryptedData);
//                         HTTPOpertion.saveToLocation("iv", res.iv);
//                         /**
//                          * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
//                          *
//                          * code	String	是	code
//                          * encryptedData	String	是	微信用户加密信息
//                          * iv	String	是	微信用户加密信息
//                          */
//                         HTTPOpertion.get3rdSession({ code: code, encryptedData: res.encryptedData, iv: res.iv }).then(function (result) {
//                             console.log(result);
//                             success(result);
//                         }).catch(function (error) {
//                             console.log(error);
//                             fail(error);
//                         });
//                     },
//                     fail: function(err) {
//                       console.warn('getUserInfo fail: ', err);
//                       wx.showToast({
//                         title: '很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。',
//                         icon: 'none',
//                         duration: 5000,
//                       });

//                     }
//                 })


//             }
//         });
//     })
// }
HTTPOpertion.login = login.login;
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


/**
token	String	是	token
intPara	Integer	否	分类id
intPara2	Integer	否	排序规则 1 返金由高到低 2 人气由高到低 3价格由高到低
page	Integer	是	页码
rows	Integer	是	页面大小
*
*/

HTTPOpertion.getGoodsGroupBuyListXCX = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GOODS_GROUP_BUY_LIST, parm);

}

HTTPOpertion.getGoodsGroupBuyListXCX1 = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GOODS_GROUP_BUY_LIST1, parm);

}

/**
 * token	String	是
 * page	Integer	是	页码
 * rows	Integer	是	页面大小
 *
 */
HTTPOpertion.getGoodsGroupBuyInfoXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.GOODS_GROUP_BUY_INFO, parm || {});

};
/**
token	String	是	token
cnd	String	是	团id
create_person_id	String	否	团id 开团此项为空 参团此项必填
group_buy_id	String	否	拼团id 开团此项为空 参团此项必填
 */
HTTPOpertion.getCreateGroupBuyInfoXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.CREATE_GROUP_BUY_INFO, parm || {});

};
/**
token	String	是	token
id	String	否	地址id //修改时此项必填
name	String	是	名字
phone	String	是	电话
address	String	是	地址
 */
HTTPOpertion.operatePersonAddress = function (parm) {
    return HttpManager.post(Default.HOST + Default.OPERATE_PERSON_ADDRESS, parm || {});

};
/**
token	String	是	token
cnd	String	是	团id
num	String	是	商品数量
money	String	是	支付金 分
merchant_id	String	是	商户id
ratio	String	是	返金比例
address_id	String	是
name	String	是	团名称
create_person_id	String	否	团长id 开团此项为空 参团此项必填
group_buy_id	String	否	拼团id 开团此项为空 参团此项必填
 */
HTTPOpertion.createGroupBuyXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.CREATE_GROUP_BUY, parm || {});

};
/**
token	String	是
page	Integer	是	页码
rows	Integer	是	页面大小
 */
HTTPOpertion.getGoodsGroupOrderListXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.GET_GOODS_GROUP_ORDER_LIST, parm || {});

};
/**
token	String	是
page	Integer	是	页码
rows	Integer	是	页面大小
 */
HTTPOpertion.getGoodsGroupOrderList = function (parm) {
    return HttpManager.post(Default.HOST + Default.GET_GOODS_GROUP_ORDER_LIST1, parm || {});

};
/**
token	String	是
page	Integer	是	页码
rows	Integer	是	页面大小
 */
HTTPOpertion.getGroupGoodsGroupOrderListXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.GET_GROUP_GOODS_GROUP_ORDER_LIST, parm || {});

};

/**
token	String	是	token
cnd	String	是	账单id
 */
HTTPOpertion.getGoodsGroupOrderInfoXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.GET_GOODS_GROUP_ORDER_INFO, parm || {});

};
HTTPOpertion.getGroupGoodsGroupOrderInfoXCX = function (parm) {
    return HttpManager.post(Default.HOST + Default.GET_GOODS_GROUP_ORDER_INFO1, parm || {});

};

/**
 * token	String	是	token
 * orderId	String	是	账单ID
 * goods_group_id	String	是	团id 订单列表/详情接口可获得
 * group_buy_id	String	是	拼团id 订单列表/详情接口可获得
 *
*/

HTTPOpertion.commitReceiveGoods = function (parm) {
    return HttpManager.post(Default.HOST + Default.COMMIT_RECEIVE_GOODS, parm || {});

};
HTTPOpertion.commitReceiveGoods1 = function (parm) {
    return HttpManager.post(Default.HOST + Default.COMMIT_RECEIVE_GOODS1, parm || {});

};

/**
 * token	String	是	token
 * orderId	String	是	账单ID
 * goods_group_id	String	是	团id 订单列表/详情接口可获得
 * group_buy_id	String	是	拼团id 订单列表/详情接口可获得
 */
HTTPOpertion.cancelGroupOrder = function (parm) {
    return HttpManager.post(Default.HOST + Default.CANCEL_GROUP_ORDER, parm || {});

};

HTTPOpertion.cancelGroupOrder1 = function (parm) {
    return HttpManager.post(Default.HOST + Default.CANCEL_GROUP_ORDER1, parm || {});

};


/**
 * 获取砍价商品详情
 *
 * token	String	是	token
 * userId	String	否	userId
 * cnd	String	是	商户id
 */
HTTPOpertion.getBargainInfo = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_BARGAIN_DETAILS, parm || {});

}

HTTPOpertion.joinGroupBuyXCX = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.JOIN_GROUP_BUY, parm || {});

}

/**
 * 获取砍价商品详情
 *
 * token	String	是	token
 * userId	String	否	userId
 * cnd	String	是	商户id
 */
HTTPOpertion.getBargainInfo1 = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_BARGAIN_DETAILS1, parm || {});

}


/**
 * 获取我的砍价商品
 *
 * token	String	是	token
 * userId	String	否	userId
 * cnd	String	是	商户id
 */
HTTPOpertion.getMyBargains = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_MY_BARGAINS, parm || {});
}

/**
 * 获取砍价商品列表
 *
 * token	String	是	token
 * userId	String	否	userId
 * cnd	String	是	商户id
 */
HTTPOpertion.getBargainList = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_BARGAIN_LIST, parm || {});

}

HTTPOpertion.getBargainOwnOrOtherInfo = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_BARGAIN_INFO, parm || {});

}

/**
 * 获取地址列表
 */
HTTPOpertion.getAddressList = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.GET_ADDRESS_LIST, parm || {});

}

/**
 * 分享接口
 */
HTTPOpertion.shareBargain = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.SHARE_BARGAIN, parm || {});

}

/**
 * 砍价支付接口
 */
HTTPOpertion.bargainPay = function (parm) {
    return HttpManager
        .post(Default.HOST + Default.BARGAINS_PAY, parm || {});

}

/**
 * 获取城市列表接口
 *
 * token	String	是	token
 */
HTTPOpertion.getCityList= function (parm) {
  return HttpManager
    .post(Default.HOST + Default.CITY_LIST, parm || {});

}


/**
 * 获取砍价商品列表
 *
 * token	String	是	token
 * intPara	Integer	否	分类id
 * intPara2	Integer	否  排序规则  返回由高到低、人气由高到低、价格由高到低、距离由近到远
 * intPara3	string	否	城市编码
 * intPara4	string	否	邮寄  自提
 * latitude	String	是	纬度
 * longitude	String	是	经度
 * page 	Integer 是 页码
 * rows 	Integer 是 页面大小
 *
 */
HTTPOpertion.getCityGoods = function (parm) {
  return HttpManager
    .post(Default.HOST + Default.CITY_GOODS, parm || {});
}

module.exports = HTTPOpertion;
