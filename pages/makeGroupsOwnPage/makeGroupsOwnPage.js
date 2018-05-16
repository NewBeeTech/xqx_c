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
    wxTimerList: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    this.setData({
      id: options.id
    })
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
  navToGoodDetail: function() {
    console.log('click', this.data);
    const id = this.data.barginOwnData.orderId;
    wx.navigateTo({
        url: `/pages/BargainDetails/BargainDetails?id=${id}`,
    })
  },
  onShow: function() {
    this.setData({
      wxTimerList: {}
    })
    // this.loadData(this.data.id);
  },
  loadData: function (id) {
    var self = this;
    const params = {
      token: wx.getStorageSync('token'),
      intPara: 0,
      cnd: id
    };
    appData.Tool.getGroupGoodsGroupOrderInfoXCX(params).then(function (result) {
      if (result.code === 0) {
        wx.hideLoading();
        self.setData({ barginOwnData: result.data, deadTime: result.data.deadLine});
        if (result.data.showFlag == 0) {
          self.setData({
            showModal: false,
          });
        }

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
