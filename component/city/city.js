// component/city/city.js
// 《选择城市，区，县》

// 引入josn:
// "usingComponents": {
//     "modal": "../../component/city/city"
// }

// 引入xml:（不能放在text标签里）
// <modal modal-pageactive="{{is_modal_Pageactive}}"/>

// 引入js:
// data:{
//     /*
//     is_modal_Cityname: '请选择',
//     /*
// }






const QQMapWX = require('qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
    key: '2KDBZ-3AKKR-UQJWU-WGKGQ-R3FM7-ITFSW'
});
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      modalCityname: {//城市名称
          type: String,
          value: '请选择'
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      popupIf: false,//弹窗开关
      city: [],//城市列表
      city2: [],//城市列表存储
      cssDH: '',//弹窗动画class名
      nameLs: '请选择',//城市名称
      idLs:''//城市id
  },

  /**
  * 组件生命周期函数，在组件实例进入页面节点树时执行
  */
  attached: function (options) {
      this.getCityList();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //获取全国所有城市
    getCityList: function () {
        var that = this;
        qqmapsdk.getCityList({
            success: function (res) {
                console.log(res);
                that.setData({
                    city: res.result[0],
                    city2: res.result[0]
                })
                console.log(res.result[0]);
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
        })
    },

    //点击选择城市
    choiseCity: function (e) {
        var that = this;
        console.log(e)

        var nameLs = that.data.nameLs;
        if(nameLs == '请选择'){
            that.setData({
                nameLs: e.currentTarget.dataset.name
            })
        }else{
            that.setData({
                nameLs: nameLs + ' ' + e.currentTarget.dataset.name
            })
        }

        that.data.idLs = e.currentTarget.dataset.id;//存储id

        that.bc();
    },

    //根据城市选择区县
    bc: function () {
        var that = this;
        var id = that.data.idLs + '';
        console.log(id)
        qqmapsdk.getDistrictByCityId({
            id: id,
            success: function (res) {
                console.log(res);
                that.setData({
                    city: res.result[0]
                })
            },
            complete:function(e){
                if (!e.result){
                    that.setData({
                        modalCityname: that.data.nameLs
                    })
                    that.popupTap();
                }
            }
        })
    },

    //弹出、收回
    popupTap: function () {
        var that = this;
        var popupIf = !that.data.popupIf;
        var cssDH = popupIf ? 'fadeInUp' : 'fadeOutDown';
        that.setData({
            cssDH: cssDH
        });
        if (popupIf) {
            that.setData({ popupIf: popupIf })
        } else {
            setTimeout(function () { that.setData({ popupIf: popupIf }) }, 500);
            that.setData({//初始化data
                city: that.data.city2,
                nameLs: '请选择'
            })
        }
    },

  }
})
