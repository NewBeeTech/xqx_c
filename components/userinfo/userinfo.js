
const app=getApp()
const host=require('../../Tools/Default.js');

Component({
  data:{
    ishow:false,
    text:"小确幸需要您的授权，才能正常使用哦。"
  },
  properties: {

  },
  ready:function(){
     const that=this;
     if (!wx.getStorageSync("token")){
       wx.getSetting({
         success(res) {
            if(res.authSetting['scope.userInfo']){
              that.setData({ishow:false})
              //that.triggerEvent('setinfo')
            }else if(host.HOST!='https://mini.xqx.com/app_person/'){
              that.setData({ishow:true})
            }
         }
       })
     }else{
       that.setData({ishow:false})
       //that.triggerEvent('setinfo')
     }
  },
  methods: {
    getUserInfo:function(e){
      if(e.detail.errMsg=="getUserInfo:ok"){
        this.setData({ishow:false})
        var data = {id:111111} // detail对象，提供给事件监听函数
        this.triggerEvent('setinfo', data)
      }else{
        const self=this;
        this.setData({text:'很遗憾，因为授权失败，您将无法正常使用小程序。请到设置里（右上角 - 关于 - 右上角 - 设置）重新授权。'})
        setTimeout(function(){
          self.setData({ishow:false})
        },3000)
      }
    }
  }
})
