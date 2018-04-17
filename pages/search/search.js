var app = getApp();
var appData = app.globalData;

var initdata = function (that) {
    var list = that.data.list
    for (var i = 0; i < list.length; i++) {
        list[i].txtStyle = "";
        list[i].textStyle = ""
    }
    that.setData({ list: list })
}

Page({
    data: {
        delBtnWidth: 180,//删除按钮宽度单位（rpx） 
        list: [],
        searchContent: "",
        types:0,
        page:0
    },
    removeRecordTap: function () {
        this.setData({
            list: []
        })
    },
    onLoad: function (options) {
      console.log(options);
      this.setData({
        types: options.id
      });
        // 页面初始化 options为页面跳转所带来的参数 
        this.initEleWidth();
        console.log(appData.searchData);
        if (appData.searchData.length>0){
          this.setData({
            list: appData.searchData
          });
        }
    },
    onReady: function () {
        // 页面渲染完成 
    },
    onShow: function () {
        // 页面显示 
    },
    onHide: function () {
        // 页面隐藏 
    },
    onUnload: function () {
        // 页面关闭 
    },
    touchS: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置 
                startX: e.touches[0].clientX
            });
        }
    },
    searchData: function (e) {
        var self = this;

        console.log(e.detail.value);
        if (e.detail.value.length<=0){
          wx.showToast({
            title: '请输入搜索内容',
            icon:"none",
            duration:2000
          })
          return;
        }
        appData.Tool.getIndustryMerchantV24({ cnd2: e.detail.value, latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), cnd: wx.getStorageSync("city"), intPara2: wx.getStorageSync("level"), intPara: this.data.types}).then(function (result) {
            console.log(result);
            wx.hideLoading()

            if (result.data.list.length==0){
              wx.showToast({
                title: "没有查询到相关数据",
                icon: "none",
                duration: 2000
              })
              return;
            }
            self.setData({
                list: result.data.list,
                searchContent: e.detail.value
            });
            
        })
            .catch(function (error) {
                console.log(error);
                wx.hideLoading()
                wx.showToast({
                  title: error.message,
                  icon: "none",
                  duration: 2000
                })
            });
    },
    navToBussess:function(e){
      var info = e.currentTarget.dataset.info;
      info.txtStyle = "";
      // this.data.list.push(info);
      if (appData.searchData.length==0){
        appData.searchData.push(info);
      }else{
        appData.searchData.forEach(function (item) {
          if (item.id != info.id) {
            appData.searchData.push(info);
          }
        });
      }
      
      console.log(appData.searchData);
      
      wx.navigateTo({
        url: '../MerchantDetails/MerchantDetails?id=' + info.id,
      })
    },
    touchM: function (e) {
        var that = this
        initdata(that)
        if (e.touches.length == 1) {
            //手指移动时水平方向位置 
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值 
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            var textStyle = "";
            if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变 
                txtStyle = "left:0px";
                textStyle = "left:0px";
            } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离 
                txtStyle = "left:-" + disX + "px";
                textStyle = "left:" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度 
                    txtStyle = "left:-" + delBtnWidth + "px";
                    textStyle = "left:" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项 
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            list[index].textStyle = textStyle;
            //更新列表的状态 
            this.setData({
                list: list
            });
        }
    },

    touchE: function (e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置 
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离 
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮 
            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            var textStyle=disX > delBtnWidth / 2 ? "left:" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项 
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            list[index].textStyle = textStyle;
            //更新列表的状态 
            this.setData({
                list: list
                
            });
        }
    },
    //获取元素自适应后的实际宽度 
    getEleWidth: function (w) {
        var real = 0;
        try {
            var res = wx.getSystemInfoSync().windowWidth;
            var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应 
            // console.log(scale); 
            real = Math.floor(res / scale);
            return real;
        } catch (e) {
            return false;
            // Do something when catch error 
        }
    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
        this.setData({
            delBtnWidth: delBtnWidth
        });
    },
    //点击删除按钮事件 
    delItem: function (e) {
        var that = this
        wx.showModal({
            title: '提示',
            content: '是否删除？',
            success: function (res) {
                if (res.confirm) {
                    //获取列表中要删除项的下标 
                    var index = e.target.dataset.index;
                    var list = that.data.list;
                    //移除列表中下标为index的项 
                    list.splice(index, 1);
                    //更新列表的状态 
                    that.setData({
                        list: list
                    });
                } else {
                    initdata(that)
                }
            }
        })

    },
    onReachBottom: function () {
      console.log("onReachBottom");
      this.setData({
        page: ++this.data.page
      })
      this.loadList(this.data.page);
    },
    loadList: function (page) {
      wx.showLoading({
        title: '加载中'
      })
      var self = this;
      
      appData.Tool.getSubMerchant({ cnd2: self.data.searchContent,intPara2: wx.getStorageSync("level"),latitude: wx.getStorageSync("latitude"), longitude: wx.getStorageSync("longitude"), page: self.data.page }).then(function (result) {
        console.log(result);
        self.setData({
          list: self.data.list.concat(result.data.subMerchants)
        });

        console.log(self.data.typeList);
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (result.data.subMerchants.length == 0) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'success',
            duration: 2000
          })
        }
      })
        .catch(function (error) {
          console.log(error);
          wx.hideLoading();
          wx.stopPullDownRefresh()
        });
    },
    a:function(e){
        var z = 6.8;//打折
        var nu = e.detail.value;
    }

}) 