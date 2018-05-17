function DateTool (){}

 /**
   * 时 1000毫秒*60秒*60分
   * 分 （总时间-时）1000毫秒*60秒
   * 秒 （总时间-时-分）1000毫秒
   */
DateTool.toHHMMSS = function (tempstamp){
  var hours = "00";
  var minutes = "00";
  var seconds = "00";
  var curData = new Date();
  var temp = parseInt(tempstamp) - curData.getTime();
  if (temp > 1000) {

    hours = parseInt((temp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = parseInt((temp % (1000 * 60 * 60)) / (1000 * 60));
    seconds = parseInt((temp % (1000 * 60)) / 1000);
  }

  return DateTool.toDoubleNum(hours) + ":" + DateTool.toDoubleNum(minutes) + ":" + DateTool.toDoubleNum(seconds);
},
  /**
    * 时 1000毫秒*60秒*60分
    * 分 （总时间-时）1000毫秒*60秒
    * 秒 （总时间-时-分）1000毫秒
    */
  DateTool.toHHMMSS2 = function (tempstamp) {
    var hours = "00";
    var minutes = "00";
    var seconds = "00";
    var curData = new Date();
    var temp = parseInt(tempstamp);
    if (temp > 1000) {

      hours = parseInt((temp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = parseInt((temp % (1000 * 60 * 60)) / (1000 * 60));
      seconds = parseInt((temp % (1000 * 60)) / 1000);
    }

    return DateTool.toDoubleNum(hours) + ":" + DateTool.toDoubleNum(minutes) + ":" + DateTool.toDoubleNum(seconds);
  },
// 转为01 这样的数字
DateTool.toDoubleNum = function (num){
  var temp = parseInt(num);
  return temp < 10 ? "0" + temp : temp;
} 
module.exports = DateTool;