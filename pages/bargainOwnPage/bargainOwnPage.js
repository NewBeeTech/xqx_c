var app = getApp();
var appData = app.globalData;
var timer = require('../../components/wxTimer/wxTimer.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: true,
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
    // console.log(options.id);
    // console.log(this.data.id);
    // const id = this.data.id || options.id;
    // this.loadData(id);
  },
  onShow: function() {
    this.loadData(this.data.id || options.id);
  },
  loadData: function (id) {
    var self = this;
    const params = {
      token: wx.getStorageSync('token'),
      cnd: id
    };
    appData.Tool.getBargainOwnOrOtherInfo(params).then(function (result) {
      if (result.code === 0) {
        self.setData({ barginOwnData: result.data, deadTime: new Date(result.data.deadLine).getTime()});

        var wxTimer = new timer({
            beginTime: new Date(result.data.deadLine).getTime(),
            name: 'wxTimer1',
            complete:function(){
                console.log("完成了")
            }
        })
        wxTimer.start(self);
      } else if (result.code == -3) {
        wx.navigateBack();
      }
      wx.hideLoading();
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
    wx.navigateTo({
        url: '../bargainRulePage/bargainRulePage',
    })
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
