var app = getApp();
var appData = app.globalData;
var timer = require('../../components/wxTimer/wxTimer.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    showRuleModal: false,
    closeIcon: '../../images/icon/close.png',
    nowTime: new Date().getTime(),
    deadTime: '',
    id: '',
    barginOwnData: {
      // userPortrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      // userName: '丽丽',
      // img_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      // name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      // group_person_num: 3,
      // price: 30,
      // group_price: 30,
      // now_price: 30,
      // deadLine: '2016-09-30',
      // cutList: [{
      //     portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      //     name: '名称',
      //     cut_price: 30
      // },{
      //     portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      //     name: '名称',
      //     cut_price: 30
      // }],
      // cut_price:30,
      // goods_group_id:2,
      // group_buy_id:3,
      // orderId:2
      
    },
    wxTimerList: {},
    hid: false,   //分享弹出框
    cnd:''
  },
  // 点击取消按钮
  cancelBtn: function () {
    this.setData({
      hid: false
    })
    wx.showToast({
      title: '用户取消分享',
      icon: 'none',
      duration: 1000
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
    var cnd = this.data.cnd;
    var page1 = 'pages/DetailsPayment/DetailsPayment';
    var token = wx.getStorageSync("token");

    wx.request({
      // Default.HOST = "https://192.168.1.204:8080/app_person/";
      url: 'http://192.168.1.204:8080/app_person/xcxgroupbuy/createCode',
      // url: appData.host+'/app_person/xcxgroupbuy/createCode',
      method: "POST",
      data: {
        cnd: cnd,
        page: page1,
        token: token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        // console.log(res.data)
        var shareImgSrc = res.data.data;
        wx.setStorageSync('shareImgSrc1', shareImgSrc)
        // console.log(wx.getStorageSync('shareImgSrc1'))
        // that.setData({
        //   shareImgSrc: shareImgSrc
        // })
        // that.drawCanvas();
      }
    })




    // pages / makeGroupsOwnPage / makeGroupsOwnPage
    wx.navigateTo({
      url: '../shareFriends/shareFriends?imgurl=' + imgurl + '&nowrmb=' + nowrmb + '&prermb=' + prermb + '&title=' + title + '&xj=' + xj + '&page=pages/DetailsPayment/DetailsPayment&cnd='+cnd
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    this.setData({
      id: options.id,
      from: options.from,
    })





  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.warn('hide');
    this.setData({
      wxTimerList: {}
    })
  },
  navToGoodDetail: function() {
    console.log('click', this.data);
    const id = this.data.barginOwnData.goods_group_id;
    wx.navigateTo({
        url: `/pages/makeGroupsDetails/makeGroupsDetails?id=${id}`,
    })
  },
  onShow: function() {
    this.setData({
      wxTimerList: {}
    })
    this.loadData(this.data.id);
  },
  loadData: function (id) {
    var self = this;
    let params = {
      token: wx.getStorageSync('token'),
      intPara: 0,
      cnd: id
    };
    if (this.data.from == 'share') {
      params.intPara = 1;
    }
    appData.Tool.getGroupGoodsGroupOrderInfoXCX(params).then(function (result) {
      if (result.code === 0) {
        wx.hideLoading();
        self.setData({ barginOwnData: result.data, deadTime: result.data.deadLine});
        if (result.data.showFlag == 0) {
          self.setData({
            showModal: false,
          });
        }
        var cnd=result.data.id;
        self.setData({
          cnd:cnd
        })
      // console.log(result.data.id)
        const cutPrice = ((result.data.now_price - result.data.group_price) / 100).toFixed(2)
        const totalCutPrice = ((result.data.price - result.data.now_price) / 100).toFixed(2)
        const hasPrice = ((result.data.now_price -  result.data.group_price) / 100).toFixed(2)
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
            complete:function(){
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
      }
    }).catch(function (error) {
        console.log(error);
        wx.hideLoading()

    });
  },
  // 一键开团
  getCreateGroupBuyInfoXCX(e) {
    console.warn(e);
    const self = this;
    const group_buy_id = e.currentTarget.dataset.group_buy_id;
    const create_person_id = e.currentTarget.dataset.create_person_id;
    let config = {};
    if (create_person_id) {
      config = {
        cnd: self.data.id,
        group_buy_id,
        create_person_id,
      };
    } else {
      config = {
        cnd: self.data.id,
      };
    }
    appData.Tool.getCreateGroupBuyInfoXCX(config).then(function (result) {
        wx.hideLoading();
        console.warn('result: ', result);
        if (result.code == 0) {
          // wx.showToast({
          //   title: '开团成功',
          //   duration: 1000,
          // });
          wx.navigateTo({
            url: '/pages/ConfirmationOrder/ConfirmationOrder?cnd='+self.data.id+'&group_buy_id='+group_buy_id+'&create_person_id='+create_person_id,
          });
        }
    })
    .catch(function (error) {
      console.log(error);
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
      title: '拼团',
      path: `/pages/makeGroupsOwnPage/makeGroupsOwnPage?from=share&id=${this.data.barginOwnData.id}&intPara=${this.data.barginOwnData.group_buy_id}`,
      success: function(res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          duration: 2000
        })
        self.setData({ showModal: false })
      },
      fail: function(res) {
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
        url: '/pages/makeGroupsMy/makeGroupsMy'
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
