//获取应用实例
var app = getApp();
var appData = app.globalData;
console.log(appData.host)
Page({
  data: {
    h:'',
    shareImgSrc:'',
    imgurl:'',
    nowrmb:'',
    prermb:'',
    title:'',
    xj:'',
    maskHidden:true,
    src:'',
    tupurl:''
    // temp1:''
    // aaaaa:"../../images/xcxm.jpg"
  },
  onLoad:function(options){
    var that=this;
    // var shareImgSrc = wx.getStorageSync('shareImgSrc');
    var imgurl = options.imgurl;
    var nowrmb = options.nowrmb;
    var prermb = options.prermb;
    var title = options.title;
    var xj = options.xj;
    // var page1 = options.page;
    // var cnd = options.cnd;
    // console.log(cnd)
    this.setData({
      imgurl: imgurl,
      nowrmb: nowrmb,
      prermb: prermb,
      title: title,
      xj: xj,
      // src: shareImgSrc
    })



    // var that=this;
    // var aa = wx.getStorageSync('shareImgSrc');
    // console.log(aa)
    // wx.downloadFile({
    //     url:aa,
    //     success: function (sres) {
    //       console.log(sres);
    //       that.data.src = sres.tempFilePath
    //       that.drawCanvas();
    //     },
    //     fail: function (fres) {
    //           wx.showToast({
    //             title: '图片加载失败，请重新加载',
    //             icon:'none',
    //             duration:1000
    //           })
    //     }
    // })

    this.downLoadFile()

    // this.drawCanvas();


  },
  // 下载图片
  downLoadFile:function(){
    var that = this;
    var erweima = wx.getStorageSync('shareImgSrc');
    console.log(erweima)
    var tupian = this.data.imgurl;
    console.log(tupian)

    wx.downloadFile({
      url: tupian,
      success: function (sres) {
        console.log(sres);
        that.data.tupurl = sres.tempFilePath;
        // that.drawCanvas();
      },
      fail: function (fres) {
        wx.showToast({
          title: '图片加载失败，请重新加载',
          icon: 'none',
          duration: 1000,
          success: function () {
            setTimeout(function(){
                wx.navigateBack()
            }, 1000)
          }
        })
      }
    })

      wx.downloadFile({
        url: erweima,
        success: function (sres) {
          console.log(sres);
          that.data.src = sres.tempFilePath;
              setTimeout(function () {
                    that.drawCanvas();
              }, 800)
        },
        fail: function (fres) {
          wx.showToast({
            title: '图片加载失败，请重新加载',
            icon: 'none',
            duration: 1000,
            success:function(){
              setTimeout(function () {
                wx.navigateBack()
              }, 1000)

            }
          })

        }
      })


  },

  drawCanvas:function(){
    // console.log('画画图')
    var ctx = wx.createCanvasContext('firstCanvas');
    var txt = this.data.title;
    var url = this.data.imgurl;
    var pictureSrc = this.data.src; //图片能获取

    if (txt.length >=10) {
      txt = txt.substr(0, 10) + "...";
    }
    var num=this.data.xj;
    var jlj="奖励："+num+"小金";
    var num1 = this.data.nowrmb;
    var nowj = "￥" + num1;
    var num2 = this.data.prermb;
    var prej = "￥" + num2;

    ctx.clearRect(0, 0, 375, 375);
    //2 获取画布画指定内容
    ctx.setFillStyle('#FFFFFF');
    ctx.fillRect(0, 0, 375, 375);
    // 画上面的矩形
    ctx.beginPath();
    ctx.setFillStyle('#FFFFFF');
    ctx.setShadow(0, 0, 6, '#DBDDE1');
    ctx.fillRect(15, 15, 345, 207);
    ctx.closePath();

    // 画二维码
    console.log(pictureSrc)
    ctx.setShadow(0, 0, 0, '#FFFFFF');
    ctx.drawImage(pictureSrc,15,242, 120, 118);

    // 画任意图
    var url = this.data.tupurl;
    ctx.drawImage(url, 30, 43.5, 145, 145);
    // 写图片右侧文字(大字)
    ctx.setFontSize(15);
    ctx.setFillStyle('#353535');
    ctx.fillText(txt, 185,57, 160);
  //   //  小金
    ctx.setFontSize(13);
    ctx.setFillStyle('#999999');
    ctx.fillText(jlj, 185, 154);
  //   // 现价
    ctx.setFontSize(20);
    ctx.setFillStyle('#FE003B');
    ctx.fillText(nowj, 185, 189);
  //   // 原价
    ctx.setFontSize(13);
    ctx.setFillStyle('#999999');
    ctx.fillText(prej, 280, 189);
  //   // 原价上面的小线条
    // ctx.setStrokeStyle('#999999')
    // ctx.moveTo(283, 185);
    // ctx.lineTo(340, 185);
    // ctx.stroke();
  //   // 画中间线条
    // ctx.setLineDash([10, 10], 2);
    // ctx.beginPath();
    // ctx.moveTo(15, 235);
    // ctx.lineTo(360, 235);
    // ctx.stroke();
  //   //  小确幸活动
    ctx.setFontSize(15);
    ctx.setFillStyle('#353535');
    ctx.fillText('小确幸活动', 218, 277);

  //   // 矩形
    // const grd = ctx.createLinearGradient(0,0,130,33);
    // grd.addColorStop(0, 'green');
    // grd.addColorStop(1, '#FFC900');
    // ctx.setShadow(0, 0, 6, '#FFA000');
    ctx.setFillStyle('#FFC900');
    ctx.fillRect(190,306, 130, 33);
  // // 按钮加文字
    ctx.setShadow(0, 0, 0, '#FFFFFF');
    ctx.setFontSize(15);
    ctx.setFillStyle('#FFFFFF');
    ctx.fillText('长按扫码参加', 210, 330);


    //最后画所有内容
    ctx.draw()
    console.log('绘画完成')

    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    });

    var that = this;
    setTimeout(function(){
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375,
                height: 375,
                destWidth:375,
                destHeight:375,
                canvasId: 'firstCanvas',
                success: function (res) {
                  that.setData({
                    maskHidden:false
                  })
                  wx.hideToast()
                  var tempFilePath = res.tempFilePath;
                  console.log(tempFilePath)
                  wx.setStorageSync('tempFilePath', tempFilePath)
                  wx.previewImage({
                    current: tempFilePath, // 当前显示图片的http链接
                    urls: [tempFilePath], // 需要预览的图片http链接列表
                    success: function (res) {
                      that.setData({
                        maskHidden: true
                      })
                      // that.baocun()
                      setTimeout(function(){
                        wx.navigateBack()
                      },500)


                    }
                  })

                },
                fail: function (res) {
                  console.log(res);
                }
              })

    },500)



  },
  baocun:function(){
    var tempFilePath=wx.getStorageSync('tempFilePath');
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success(res) {
        wx.showModal({
          title: '图片成功保存到相册了，去发圈噻~',
          success: function (res) {
            wx.navigateBack()
          }
        })
        // wx.showModal({
        //   title: '存图成功',
        //   content: '图片成功保存到相册了，去发圈噻~',
        //   showCancel: false,
        //   confirmText: '好哒',
        //   confirmColor: '#72B9C3',
        //   success: function (res) {

        //       if (res.confirm) {
        //         console.log('用户点击确定');
        //       }
        //   }
        // })
        // wx.navigateBack()
      }
    })
  }


})
