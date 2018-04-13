function Default() { }
/**
 * 主机地址
 */
// Default.HOST = "http://ccpp.denong.com/app_person/";
Default.HOST = "http://mini.xqx.com/app_person/";
Default.KEY = "5QUBZ-XZVW6-5U7SE-M4OZW-VA7DE-WXFZ6";

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
Default.SUBMERCHANT = "merchantv20/getSubMerchant";


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

module.exports = Default;