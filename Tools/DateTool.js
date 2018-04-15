function DateTool (){}

DateTool.toHHMMSS = function(timeStamp){
  var date = new Date(timeStamp*1000);
  console.log(date);
  var str = DateTool.toDoubleNum(parseInt(date.getHours())) + ":" + DateTool.toDoubleNum(parseInt(date.getMinutes())) + ":" + DateTool.toDoubleNum(parseInt(date.getSeconds()));
  // console.log(str);
  date = null;
  
  return str;
}

// 转为01 这样的数字
DateTool.toDoubleNum = function (num){
  return num<10?"0"+num:num;
} 
module.exports = DateTool;