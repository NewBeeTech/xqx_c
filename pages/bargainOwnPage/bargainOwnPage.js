var app = getApp();
var appData = app.globalData;
var timer = require('../../components/wxTimer/wxTimer.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: true,
    showRuleModal: false,
    closeIcon: '../../images/icon/close.png',
    nowTime: new Date().getTime(),
    deadTime: '',
    id: '',
    barginOwnData: {
    },
    wxTimerList: {},
    hid: false,   //分享弹出框
    cnd: '',
    intPara: '',
    intPara2:""
  },
  // 点击取消按钮
  cancelBtn: function () {
    this.setData({
      hid: false
    })
  },
  // 点击分享朋友圈按钮
  shareImg: function (e) {
    console.log(e.currentTarget.dataset)
    var imgurl = e.currentTarget.dataset.imgurl;
    var nowrmb = e.currentTarget.dataset.nowrmb;
    var prermb = e.currentTarget.dataset.prermb;
    var title = e.currentTarget.dataset.title;
    var xj = e.currentTarget.dataset.xj;

    wx.navigateTo({
      url: '../shareFriends/shareFriends?imgurl=' + imgurl + '&nowrmb=' + nowrmb + '&prermb=' + prermb + '&title=' + title + '&xj=' + xj,
    })
    this.setData({
      hid: false
    })
  },
  // 点击分享按钮
  listenerButton: function () {
    this.setData({
      hid: true
    })

    var cnd = this.data.cnd;
    var page1 = 'pages/bargainOwnPage/bargainOwnPage';
    var token = wx.getStorageSync("token");
    var intPara = this.data.intPara;
    var intPara2 = this.data.intPara2;
    // console.log(cnd)
    const parm={
      page: page1,
      token: token,
      intPara: intPara,
      intPara2: intPara2
    }
    appData.Tool.createCode(parm).then(function(res){
      var shareImgSrc = res.data;
      wx.setStorageSync('shareImgSrc', shareImgSrc)
      console.log(wx.getStorageSync('shareImgSrc'))
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    this.setData({
      id: options.id
    })
    // 扫描二维码获取的数据（拼团页面为cnd）
    if (options.scene) {
      var scene = decodeURIComponent(options.scene)
      var arr = [];
      var obj = {};
      arr = scene.split('=');
      obj.intPara2 = arr[1];
      // 将返回的cnd给页面数据
      this.loadData(obj.intPara2);
    }

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.warn('hide');
    this.setData({
      wxTimerList: {}
    })
  },
  navToGoodDetail: function () {
    console.log('click', this.data);
    const id = this.data.barginOwnData.orderId;
    wx.navigateTo({
      url: `/pages/BargainDetails/BargainDetails?id=${id}`,
    })
  },
  onShow: function () {
    this.setData({
      wxTimerList: {},
      hid: false,   //分享弹出框
    })
    this.loadData(this.data.id);
  },
    loadData: function (id) {
    var self = this;
    const params = {
      token: wx.getStorageSync('token'),
      cnd: id
    };
    appData.Tool.getBargainOwnOrOtherInfo(params).then(function (result) {
      console.log(result)
      // var cnd = result.data.goods_group_id;

      if (result.code === 0) {
        var intPara = result.data.id;
        var intPara2 = result.data.orderId;
        self.setData({
          // cnd: cnd,
          intPara: intPara,
          intPara2: intPara2
        })
        wx.hideLoading();
        self.setData({ barginOwnData: result.data, deadTime: result.data.deadLine });
        if (result.data.showFlag == 0) {
          self.setData({
            showModal: false,
          });
        }

        const cutPrice = ((result.data.now_price - result.data.group_price) / 100).toFixed(2)
        const totalCutPrice = ((result.data.price - result.data.now_price) / 100).toFixed(2)
        const hasPrice = ((result.data.now_price - result.data.group_price) / 100).toFixed(2)
        // const xiaojin = (result.data.price / 100 * result.data.ratio / 100).toFixed(2)
        const xiaojin = (result.data.group_price * result.data.ratio / 100) > 1 ? (result.data.group_price * result.data.ratio / 10000).toFixed(2) : 0.01;

        console.log(cutPrice, totalCutPrice, hasPrice)
        self.setData({
          cutPrice,
          totalCutPrice,
          hasPrice,
          'barginOwnData.xiaojin': xiaojin
        })


        var wxTimer = new timer({
          beginTime: result.data.deadLine,
          name: 'wxTimer1',
          complete: function () {
            console.log("完成了")
          }
        })
        wxTimer.start(self);
      } else if (result.code == -3) {
        wx.showToast({
          title: '该商品已下架',
          icon: 'none',
          duration: 20000,
        });
        setTimeout(function () {
          wx.navigateBack();
        }, 2000);
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000,
        });
      }
    }).catch(function (error) {
      console.log(error);
      wx.hideLoading()

    });
  },
  showModalBtn: function () {
    // this.setData({ showModal: true });
  },
  hideModal: function () {
    this.setData({ showModal: false });
  },
  showRuleModal: function () {
    this.setData({ showRuleModal: true });
  },
  hideRuleModal: function () {
    this.setData({ showRuleModal: false });
  },
  onShareAppMessage: function () {

    console.log('id:', this.data.barginOwnData.goods_group_id);
    console.log('intPara:', this.data.barginOwnData.group_buy_id);
    const self = this;
    return {
      title: '砍价',
      path: `/pages/bargainGivenPage/bargainGivenPage?id=${this.data.barginOwnData.goods_group_id}&intPara=${this.data.barginOwnData.group_buy_id}`,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          duration: 2000
        })
        self.setData({
          hid: false,   //分享弹出框
        })
        self.setData({ showModal: false })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          duration: 2000
        })
      }
    }
  },
  myBargainList: function () {
    wx.navigateTo({
      url: '/pages/MyBargain/MyBargain'
    })
  },
  goBargainRule: function () {
    this.setData({
      showRuleModal: true
    })
    // wx.navigateTo({
    //     url: '/pages/bargainRulePage/bargainRulePage',
    // })
  },
  backHome: function () {
    // wx.redirectTo({
    //     url: '../spellGroupHome/spellGroupHome',
    // })
    wx.reLaunch({
      url: '/pages/spellGroupHome/spellGroupHome'
    });
  }
})
