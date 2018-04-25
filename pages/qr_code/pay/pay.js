/**
* @time 2018/1/2
* @class yzp
* @CCPP 支付页面
* @modification Time 
* @modification class
*/
const app = getApp()
const getMerchantInfoForWeb = app.globalData.host + "/xcx-person/merchantv20/getMerchantDiscountInfo";//获取商户信息
const createPay = app.globalData.host + "/xcx-person/wechatpay/createPay";//调取微信支付
Page({
  data: {
    disabled: true,
    value: '',
    pay: '0',//实际支付金额
    merchantId: '',
    MerchantInfoFor: [],
    column: false,//是否显示实际支付栏目
    whether_discount: '',//是否打折11465  MR折扣  MD满减30808
    ratio: '',//返金比例
    subtract_money:'',//已减价金额
    full: '',//满减条件
    mInfo_title: '',//满减标题
    subtract: '',//满减多少钱
    code: '',
    mrId: '',
    rebate:'',
    return_money:'0',//返多少钱
    name:true, //判断商家名字字数  变换布局
    money_Off_List:[],
  },
  onLoad: function (options) {
    let that = this;
    let merchantId;
    //that.getUserInfo();
    console.log(options)
    // 获取商户id
    console.log(options.q);
    if (options.q == undefined){
      console.log(options.q)
      wx.getStorage({
        key: 'merchantId',
        success: function (res) {
          //console.log(res);
          that.setData({
            merchantId: res.data
          })
          that.getMerchantInfoForWeb(res.data)
          //that.getMerchantInfoForWeb(res.data)
         
        },
      
      })
      that.getMerchantInfoForWeb('12007')
    }else{
      //console.log(options.q);
      let link = decodeURIComponent(options.q);//乱码转换正常
      let paramArr = link.split('=');//区分 并且放入数组
      merchantId = paramArr[1];//获取商户id
      console.log(merchantId);
      that.setData({
        merchantId: merchantId
      })
      wx.setStorage({
        key: "merchantId",
        data: merchantId
      })
      that.getMerchantInfoForWeb(merchantId)
    }
    // 缓存取出Code
    wx.getStorage({
      key: 'code',
      success: function (res) {
        that.setData({
          code: res.data
        })
      }
    })
    
  },
  // 获取商家信息
  getMerchantInfoForWeb: function (cnd) {
    let that = this;
    let cndTo = String(cnd);
    let param = {
      // cnd: String(cndTo)
      cnd:'12007'
    }
    app.postRequest(getMerchantInfoForWeb, app.jsonToString(param), function (res) {
      if (res.data.code == 0) {
        let info;
        if (res.data.data.discountMode == "MR") {
          info = JSON.parse(res.data.data.mInfo)
          that.setData({
            whether_discount: res.data.data.discountMode,
            ratio: info.rebate, //折扣
            mrId: info.mrId,
          })
        } else if (res.data.data.discountMode == "MD") {
          info = JSON.parse(res.data.data.mInfo)
          let full = [];
          let subtract = [];
          for (let i = 0; i < info.length; i++){
            full.push(info[i].full);
            subtract.push(info[i].subtract);
          }
          that.setData({
            whether_discount: res.data.data.discountMode,
            full: full, //满减条件
            subtract: subtract, //满减金额
          })
          that.setData({
            money_Off_List: info
          })
        }
        
        if (res.data.data.name.length > 9){
          that.setData({
            name: false,
          })
        }else{
          that.setData({
            name: true,
          })
        }
        that.setData({
          MerchantInfoFor: res.data.data,
        })
        if (res.data.data.discountMode != null && res.data.data.discountMode != "") {
          that.setData({
            column: true
          })
        }
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000,
        })
      }

    })
  },
  bindKeyInput: function (e) {
    // 输入是就获取金额
    let that = this;
    let value = e.detail.value;
    that.setData({
      value: value
    })
    if (value != "") {
      that.setData({
        disabled: false,
      })
    } else {
      that.setData({
        disabled: true,
      })
    }
    if (that.data.whether_discount == "MR") {
      that.ratio(that.data.ratio);//折扣
    } else if (that.data.whether_discount == "MD") { //满减
      let value = that.data.value * 100;  
      let fullTo = []; 
      let subtractTo = []; 
      for (let i = 0; i < that.data.full.length; i++) {
        for (let j = i + 1; j < that.data.full.length; j++) {
          if (that.data.full[i] > that.data.full[j]) {
            let tmp = that.data.full[i];
            that.data.full[i] = that.data.full[j];
            that.data.full[j] = tmp;
          }
        }
      }
      for (let i = 0; i < that.data.subtract.length; i++) {
        for (let j = i + 1; j < that.data.subtract.length; j++) {
          if (that.data.subtract[i] > that.data.subtract[j]) {
            let tmp = that.data.subtract[i];
            that.data.subtract[i] = that.data.subtract[j];
            that.data.subtract[j] = tmp;
          }
        }
      }
      if (that.data.full.length == 1 ){
        if (value >= that.data.full[0]) {
          that.moneyOff(that.data.full[0], that.data.subtract[0]);
        } else if (value < that.data.full[0]) {
          that.moneyOff(that.data.full[0], that.data.subtract[0]);
        }
      } else if (that.data.full.length == 2  ){
        if (value >= that.data.full[0] && value < that.data.full[1] || value < that.data.full[0]) {
          that.moneyOff(that.data.full[0], that.data.subtract[0]);
        }else if (value >= that.data.full[1]) {
          that.moneyOff(that.data.full[1], that.data.subtract[1]);
        } else if (value < that.data.full[1]) {
          that.moneyOff(that.data.full[1], that.data.subtract[1]);
        }
      } else if (that.data.full.length == 3) {
        if (value >= that.data.full[0] && value < that.data.full[1]) {
          that.moneyOff(that.data.full[0], that.data.subtract[0]);
        } else if (value < that.data.full[0]) {
          that.moneyOff(that.data.full[0], that.data.subtract[0]);
          
        } else if (value < that.data.full[1]) {
          that.moneyOff(that.data.full[1], that.data.subtract[1]);
        } else if (value >= that.data.full[1] && value < that.data.full[2]) {
          that.moneyOff(that.data.full[1], that.data.subtract[1]);
          
        } else if (value < that.data.full[1]) {
          that.moneyOff(that.data.full[2], that.data.subtract[2]);
        } else if (value >= that.data.full[2]) {
          that.moneyOff(that.data.full[2], that.data.subtract[2]);
        }
      }
    }else{
      let subtract = that.data.value;
      let ratioTo = that.data.MerchantInfoFor.ratio;
      let return_money = subtract * ratioTo;
      let return_moneyTo;
      if (return_money > 1) {
        return_moneyTo = Math.round(return_money);
      } else if (return_money == 0) {
        return_moneyTo = 0.00;
      } else {
        return_moneyTo = 1;
      }
      that.setData({
        return_money: return_moneyTo / 100 //应返小金
      })
    }
  },
  // 折扣
  ratio: function (ratio) {
    let that = this;
    let moneys = that.data.value;
    let ratios = ratio / 10;
    let pays = app.accmul(moneys * ratios, '100');
    let pay = Math.ceil(pays)
    let subtract = pay / 100;
    let subtract_accmul = Math.ceil((moneys * 100) - (subtract * 100));
    let subtract_money = subtract_accmul;
    let ratioTo = that.data.MerchantInfoFor.ratio;
    let return_money = subtract * ratioTo;
    //console.log(moneys);
    let return_moneyTo;
    if ( return_money > 1 ){
      return_moneyTo = Math.round(return_money);
    } else if (return_money == 0){
      return_moneyTo = 0.00;
    }else{
      return_moneyTo = 1;
    }
    // console.log(return_money)
    // console.log(pay);
    //return_money:返多少小金
    that.setData({
      pay: pay / 100, //应付多少元
      subtract_money:subtract_money, //减多少元
      return_money: return_moneyTo / 100 //应返小金
    });
  },
  // 满减
  moneyOff: function (full, subtract) {
    let that = this;
    let moneys = app.accmul(that.data.value, '100');
    let money;
    let subtract_money;
    let ratioTo = that.data.MerchantInfoFor.ratio;
    let return_moneyTo;
    // console.log(moneys);
    // console.log(full);
    if (moneys >= full) {
      
      money = moneys - subtract;
      let return_money = (money / 100) * ratioTo;
      if (return_money > 1) {
        return_moneyTo = Math.round(return_money);
      } else if (return_money == 0) {
        return_moneyTo = 0.00;
      } else {
        return_moneyTo = 1;
      }
      that.setData({
        pay: money / 100,
        subtract_money:subtract,
        return_money: return_moneyTo / 100 //应返小金
      })
    } else if (moneys < full) {
      let return_money = (moneys / 100) * ratioTo;
      if (return_money > 1) {
        return_moneyTo = Math.round(return_money);
      } else if (return_money == 0) {
        return_moneyTo = 0.00;
      } else {
        return_moneyTo = 1;
      }
      //console.log(return_moneyTo);tha
      that.setData({
        pay: moneys / 100,
        subtract_money: '0',
        return_money: return_moneyTo / 100 //应返小金
      })
    }

  },
  payBtn: function () {
    let that = this;
    let money = '';//原价
    const pointLen = that.data.value.split('.')[1];
    if (pointLen && pointLen.length > 2) {
      wx.showToast({
        title: '输入格式错误,小数点后最多2位',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    money = app.accmul(that.data.value, '100');
    let payTo;
    if (that.data.pay * 100 != 0){
      payTo = that.data.pay * 100
    }else{
      payTo = that.data.value * 100
    }
    if (String(payTo) == 0 || String(that.data.value * 100) == 0 || String(payTo) == 'NaN'){
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    // 最大金额限制
    if (String(payTo) / 100 > 100000 || String(that.data.value) > 100000 ){
      wx.showToast({
        title: '最大金额不能超过100000元',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let param = {
      merchantName: that.data.MerchantInfoFor.name, //名字
      ratio: that.data.MerchantInfoFor.ratio,
      merchantId: that.data.MerchantInfoFor.id,//商户id
      session: app.globalData.session,
      money: String(payTo), //实际支付金额
      origionPrice: String(that.data.value * 100),//应付金额
      discountId: that.data.mrId,
      discountInfo: that.data.MerchantInfoFor.mInfo,
    }
    console.log(app.globalData.session)
    app.postRequest(createPay, app.jsonToString(param), function (res) {
        let id = res.data.tradeId ;
        wx.showToast({
            title: '正在支付...',
            icon: 'loading',
            mask: true
        })
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.redirectTo({
              url: '/pages/qr_code/getMoney/getMoney?id=' + id,
            })
          },
          'fail': function (res) {
          }
        })
     
    })
  }
})
