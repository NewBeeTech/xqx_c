// pages/a/a.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [{
      title: '小确幸app有什么用',
      content: "通过小确幸APP，线上进入各平台，线下进入各合作门店，消费成功能获得养老金，消费成功就能获得养老金，用户可关注小确幸公众号，小确幸小程序，获得更多福利。\n这是背景新德浓信息技术有限公司，基于国家养老问题现状，创新推出补充个人养老金的新方式——消费养老金，顾名思义，消费即得养老金",
      red: '',
      hide: 1,
    },
    {
      title: '为什么能获得养老金',
      content: "利用APP平台优势获得各商家合作机会，将商家回馈的佣金，广告酬劳等作为养老金回馈给消费者，随着平台流量的增长，合作商家不断增多，回馈的养老金也越多",
      red: '',
      hide: 2,

    }, {
      title: '为什么要实名认证',
      content: "消费羊拉筋专用账户已获得国家财政部批文，用户在“小确幸”上实名认证后，凭借身份证信息，无需办理实体银行卡，即可开通工商银行消费养老金专用账户，用于托管消费养老金，保障资金安全\n\n登陆小确信APP，可查询以托管 的消费养老金；也可电脑登陆中国工商银行官网，查询路径：企业服务-养老金 - 养老金查询 - 输入身份证 / 手机号 / 短信验证码。",
      red: '',
      hide: 3,
    }, {
      title: '用户能获得什么',
      content: "如联合消费养老金合格计划(Confederate Consumer Pension Plan),简称CCPP，指发起，受托，托管，长官，头管联合构成的养老进资产管理方式。\n即在这个老龄事业发展基金会的监督下，北京新德浓信息技术有限公司作为发起方，构建“小确幸APP”消费平台；用户通过“小确幸”消费获得的养老金，将存入中国工商银行，由具有养老投资管理人资格的投资管理机构进行投管。\n这样用户退休时，男年满60周岁/女年满55周岁，不仅能一次性获得一笔养老金，还能获得相应的收益，具有个人自主自愿参加/资产增值保值/方式自选/资产可继承控制等特点。\n",
      red: "简单的说就是，发起方构建平台/受托方实施监管/托管方(工商银行)保障资金安全，投管房管理基金获得后裔。CCPP四方互相监督合作，从根本上保证每一位用户的利益。",
      red: '',
      hide: 4,
    }, {
      title: '如何保障用户的权益——联合消费养老金合格计划（ccpp',
      content: "小确幸覆盖衣食住行，满足用户线上线下所有消费需求假设一个月消费1万元，用户至少可以积攒500元消费养老金。",
      red: '',
      hide: 5,
    }],
    tabTap: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  appTap: function () {

    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        var isiOS = !!res.model.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var url = "";
        if (isiOS == true) {
          url = "https://itunes.apple.com/cn/app/id1237657075?mt=8"
        }else{
          url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.denong.doluck"
        }

        wx.navigateTo({
          url:"../webApp/webApp?url="+url
        })
      }
    })
    
  },
  tabTap: function (e) {
    const app = e.target.dataset.index;
    const that = this;
    if (this.data.tabTap == app) {
      that.setData({
        tabTap: -1
      })

    } else {
      that.setData({
        tabTap: app
      })
    }

  }
})