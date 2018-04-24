var app = getApp();
var appData = app.globalData;
var timer = require('../../components/wxTimer/wxTimer.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    closeIcon: '../../images/icon/close.png',
    cutPrice: 0,
    hasPrice: 0,
    totalCutPrice: 0,
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
      //     join_person_portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      //     join_name: '名称',
      //     per_price: 30
      // },{
      //     join_person_portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524208554&di=d9b6ddb674b126952257281bc081d6ea&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe1fe9925bc315c602050233b87b1cb1348547718.jpg',
      //     join_name: '名称',
      //     per_price: 30
      // }],
      // cut_price:30,
      // goods_group_id:2,
      // group_buy_id:3,
      // orderId:2,
      // create_person_id: 11
    },
    wxTimerList: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求数据
    const id = options.id;
    const intPara =  options.intPara;
    console.warn(id)
    console.warn(intPara)
    wx.showToast({
      title: 'id: ' + id + ' intPara: ' + intPara,
      icon: 'success',
      duration: 2000
    })
    // const id = '5087f119-96d7-4453-85d6-4cb87970561b';
    // const intPara = '279';
    this.loadData(id, intPara);
  },
  loadData: function (id, intPara) {
    var self = this;
    const params = {
      token: wx.getStorageSync('token'),
      cnd: id,
      intPara,
    };
    appData.Tool.getBargainOwnOrOtherInfo(params).then(function (result) {
      if (result.code === 0) {
        self.setData({ barginOwnData: result.data });
        if (result.data.showFlag == 0) {
          self.setData({ showModal: false });
        } else {
          self.setData({ showModal: true });
        }

        const cutPrice = ((result.data.now_price - result.data.group_price) / 100).toFixed(2)
        const totalCutPrice = ((result.data.price - result.data.now_price) / 100).toFixed(2)
        const hasPrice = ((result.data.now_price -  result.data.group_price) / 100).toFixed(2)
        const xiaojin = (result.data.price / 100 * result.data.ratio / 100).toFixed(2)

        console.log(cutPrice, totalCutPrice, hasPrice)
        self.setData({
          cutPrice,
          totalCutPrice,
          hasPrice,
          'barginOwnData.xiaojin': xiaojin
        })

        var wxTimer = new timer({
            beginTime: result.data.deadLine - new Date().getTime(),
            name: 'wxTimer1',
            complete:function(){
                console.log("完成了")
            }
        })
        wxTimer.start(self);
        wx.hideLoading();
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
    this.setData({ showModal: true });
  },
  hideModal: function () {
    this.setData({ showModal: false });
  },
  goBargainRule: function () {
    wx.navigateTo({
        url: '/pages/bargainRulePage/bargainRulePage',
    })
  }
})
