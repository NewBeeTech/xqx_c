var wxTimer = function (initObj){
	initObj = initObj || {};
	this.beginTime = initObj.beginTime || "00:00:00";	//开始时间
	this.interval = initObj.interval || 0;				//间隔时间
	this.complete = initObj.complete;					//结束任务
	this.intervalFn = initObj.intervalFn;				//间隔任务
	this.name = initObj.name;							//当前计时器在计时器数组对象中的名字

	this.intervarID;									//计时ID
	this.endTime;										//结束时间
	this.endSystemTime;									//结束的系统时间
}

wxTimer.prototype = {
	//开始
	start:function(self){
			var seconds = this.beginTime - new Date().getTime()
	    var that = this;
	    //开始倒计时
	    var count = 0;//这个count在这里应该是表示s数，js中获得时间是ms，所以下面*1000都换成ms
	    function begin(){
	        var tmpTime = seconds - 1000 * count++;
	        var wxTimerHour = String(parseInt(tmpTime/1000 / 60 / 60)).replace(/\b(\d)\b/g, "0$1");//去掉前面的年月日就剩时分秒了
	        var wxTimerMin = String(parseInt(tmpTime/1000 / 60 % 60)).replace(/\b(\d)\b/g, "0$1");//去掉前面的年月日就剩时分秒了
	        var wxTimerSecond = String(parseInt(tmpTime/1000 % 60)).replace(/\b(\d)\b/g, "0$1");
					var wxTimerList = self.data.wxTimerList;
					var tmpTimeStr = [
			        parseInt(tmpTime/1000 / 60 / 60), // 时
			        parseInt(tmpTime/1000 / 60 % 60), // 分
			        parseInt(tmpTime/1000 % 60), // 秒
			    ]
        	.join(":")
        	.replace(/\b(\d)\b/g, "0$1");

					//更新计时器数组
					wxTimerList[that.name] = {
						wxTimer: tmpTime >= 0 ? tmpTimeStr : '00:00:00',
			      wxTimerHour: tmpTime >= 0 ? wxTimerHour : '00',
						wxTimerMin: tmpTime >= 0 ? wxTimerMin : '00',
						wxTimerSecond: tmpTime >= 0 ? wxTimerSecond : '00'
					}

	        self.setData({
						wxTimer: tmpTime >= 0 ? tmpTimeStr : '00:00:00',
						wxTimerHour: tmpTime >= 0 ? wxTimerHour : '00',
						wxTimerMin: tmpTime >= 0 ? wxTimerMin : '00',
						wxTimerSecond: tmpTime >= 0 ? wxTimerSecond : '00',
						wxTimerList
	        });
	        //时间间隔执行函数
	        if( 0 == (Number(count)-1) % that.interval && that.intervalFn){
	            that.intervalFn();
	        }
	        //结束执行函数
	        if(tmpTime <= 0){
	            if(that.complete){
	               that.complete();
	            }
	            that.stop();
	        }
	    }
	    begin();
	    this.intervarID = setInterval(begin,1000);
	},
	//结束
	stop:function(){
		clearInterval(this.intervarID);
	},
	//校准
	calibration:function(){
		this.endTime = this.endSystemTime - Date.now();
	}
}

module.exports = wxTimer;
