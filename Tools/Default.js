function Default() { }
/**
 * 主机地址
 */
Default.HOST = "http://ccpp.denong.com/app_person/";

//Default.HOST = "http://192.168.1.166:8080/app_person/";
 //Default.HOST = "https://mini.xqx.com/app_person/";
Default.KEY = "5QUBZ-XZVW6-5U7SE-M4OZW-VA7DE-WXFZ6";

Default.JOIN_GROUP_BUY = "xcxgroupbuy/joinGroupBuy";



Default.GETGOODSCATELOG = "xcxgroupbuy/getGoodsCatelog";
Default.GET_TOP_PICS = "XCXmerchant/getTopPics";
/**
 * 首页
 */

/**
 * token	String	是	token
 * location	String	是	所在位置地名
 */
Default.ADDRESS_DATA = "merchantv20/getAddressData";
/**
 * method:post
 * parms:
 *    token
 *    intPara城市代码 默认为空
 */
Default.MAIN_PAGE = "merchantv20/getXCXMainPage";

/**
 * 获取行业分类
 */
Default.SUB_CATEGORY = "merchantv20/getSubCatelogXCX";

/**
 * 获取ccpp城市接口
 */
Default.CCPP_CITY = "merchant/getCCPPCity";

/**
 * 根据行业代码及用户所在城市获取商户，首页搜索商户
 */
Default.SEARCH_MERCHANT = "merchantv20/getIndustryMerchantv24XCX";

/**
 * 获取商户详情
 */
Default.MERCHANT_INFO = "merchantv20/getMerchantInfo";

/**
 * 获取子商户列表信息
 */
Default.SUBMERCHANT = "merchantv20/getIndustryMerchantv24XCX";


/**
 * 商户相册列表
 */
Default.MERCHANT_PIC_CATE = "merchantv20/getMerchantPicCatelogs";


/**
 * 商户图片列表
 */
Default.MERCHANT_STORE_PICS = "merchantv20/getMerchantStorePics";


/**
 * 获取商户介绍信息接口
 */
Default.MERCHANT_INTRODUCE = "merchantv20/getMerchantIntroduceXCX";


/**
 * 进入小程序获取unionid 相关信息 判断是当前用户是否进入注册页面
 */
Default.GET_3RD_SESSION = "XCXController/get3rdSession";

/**
 * 一键授权
 * 解析获取用户手机号 后端自动注册
 */
Default.INFO = "xcxuserBakv20/info";

/**
 * 发送登录验证码接口，同时验证该手机手否已注册
 */
Default.CHECK_LOGIN = "xcxuserv20/checkLoginNameV1";

/**
 * 注册接口
 */
Default.REGISTER = "xcxuserv20/register";

/**
 * 获取个人信息
 */
Default.USER_INFO = "userInfov20/getUserInfo";

/**
 * 小金
 * 获取账单历史明细接口,已到账未托管
 */
Default.ARRIVAL_TRADE_HISTORY = "consumpv20/getArrivalTradeHistoryv232";


/**
 * 获取账单详情接口
 */
Default.TRADE_DETAIL = "consumpv20/getTradeDetail";


/**
 * 获取缴存详情接口(暂时不用)
 */
Default.Deposited_INFO = "consumpv20/getDepositedInfo";


/**
 * 已缴存消费养老金页面(托管列表)
 * 获取缴存信息接口 （暂时不用）
 */
Default.DEPOSITED_HISTORY = "consumpv20/getDepositedHistory";

/**
 * 我的身份码
 * 获取二维码接口
 */
Default.CREATE_QRCODE = "userInfov20/createQRCode";

/**
 * 邀请奖励
 * 获取邀请相关参数
 */
Default.INVITE_INFO = "userInfov20/getInviteInfo";

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
Default.CREATE_PAY = "xcxwechatpay/createPay";

/**
 *
 * 商户信息含折扣信息
 * cnd	String	是	商户id
 */
Default.MERCHANT_DISCOUNT_INFO = "xcxwechatpay/getMerchantDiscountInfo";

/**
 *
 * 首页拼团列表
 *
 */
Default.GOODS_GROUP_BUY_LIST1 = "xcxgroupbuy/getGoodsGroupBuyListXCX";
/**
 * 开团
 * @type {String}
 */
Default.GOODS_GROUP_BUY_LIST = "xcxcutprice/getGoodsCutPriceListXCX";

/**
 * 获取拼团详情
 */
Default.GOODS_GROUP_BUY_INFO = "xcxgroupbuy/getGoodsGroupBuyInfoXCX";

/**
 * 一键开团/参团
 */
Default.CREATE_GROUP_BUY_INFO = "xcxgroupbuy/getCreateGroupBuyInfoXCX";

/**
 * 新建/修改收货地址
 */
Default.OPERATE_PERSON_ADDRESS = "xcxgroupbuy/operatePersonAddress";

/**
 * 确认一键开团/参团
 */
Default.CREATE_GROUP_BUY = "xcxgroupbuy/createGroupBuy";
/**
 * 确认一键开团/参团
 */
Default.JOIN_GROUP_BUY = "xcxgroupbuy/joinGroupBuy";

/**
 * 获取用户拼团订单列表
 */
Default.GET_GOODS_GROUP_ORDER_LIST = "xcxcutprice/getGoodsCutPriceOrderListXCX";
/**
 * 获取用户拼团订单列表
 */
Default.GET_GOODS_GROUP_ORDER_LIST1 = "xcxgroupbuy/getGoodsGroupOrderListXCX";

/**
 * 获取用户拼团订单列表
 */
Default.GET_GROUP_GOODS_GROUP_ORDER_LIST = "xcxgroupbuy/getMyGroupGoods";
// Default.GET_GOODS_GROUP_ORDER_LIST = "xcxcutprice/getGoodsCutPriceOrderListXCX";
/**
 * 获取拼团订单详情
 */
Default.GET_GOODS_GROUP_ORDER_INFO = "xcxcutprice/getGoodsCutPriceOrderInfoXCX";
/**
 * 获取拼团订单详情1
 */
Default.GET_GOODS_GROUP_ORDER_INFO1 = "xcxgroupbuy/getGoodsGroupOrderInfoXCX";

/**
 * 确认收货
 */
// 砍价
Default.COMMIT_RECEIVE_GOODS = "xcxcutprice/commitReceiveGoods";
// 拼团
Default.COMMIT_RECEIVE_GOODS1 = "xcxgroupbuy/commitReceiveGoods";

/**
 * 取消订单
 */
// 砍价
Default.CANCEL_GROUP_ORDER = "xcxcutprice/cancelGroupOrder";
// 拼团
Default.CANCEL_GROUP_ORDER1 = "xcxgroupbuy/cancelGroupOrder";

/**
 * 获取砍价详情
 */
Default.GET_BARGAIN_DETAILS = "xcxcutprice/getGoodsCutPriceInfoXCX";
Default.GET_BARGAIN_DETAILS1 = "xcxcutprice/getGoodsInfoXCX";

// 砍价首页
Default.GET_BARGAIN_LIST = "xcxcutprice/getGoodsCutPriceListXCX";

// 砍价详情
Default.GET_BARGAIN_INFO = "xcxcutprice/createCutPriceXCX";

// 获取收获地址列表
Default.GET_ADDRESS_LIST = "xcxcutprice/getPersonAddressInfoXCX";

// 分享接口
Default.SHARE_BARGAIN = "xcxcutprice/getGoodsCutPriceOrderInfoXCX";

// 获取我的砍价商品
Default.GET_MY_BARGAINS = "xcxcutprice/getGoodsCutPriceOrderListXCX";

// 砍价确认支付
Default.BARGAINS_PAY = "xcxcutprice/createWeChatPayXCX";

// 新增
//获取城市列表接口     /merchantv20/getXCXCCPPCity
Default.CITY_LIST = "merchantv20/getXCXCCPPCity";

// 获取砍价商品列表 / xcxcutprice / getGoodsCutPriceListXCX
Default.CITY_GOODS =
"xcxcutprice/getGoodsCutPriceListXCX";

// 获取砍价、拼团商品列表（首页热门）   xcxgroupbuy/getHomeHot
Default.INDEX_CITY_GOODS =
  "xcxgroupbuy/getHomeHot";

//获取我的订单（整合）  xcxgoods/getGoodsOrderListXCX
Default.GET_GOODS_ORDER_LIST_XCX =
  "xcxgoods/getGoodsOrderListXCX";

module.exports = Default;
