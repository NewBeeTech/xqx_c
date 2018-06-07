const RSA=require('rsa.js');
const Md5=require('md5.js');
var privateKey_pkcs2 ='-----BEGIN PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAOUqTpoQQumrVZy2Uzt8ytHq7YbfO85d4wuErbSsY0Xb7G6SsZCGR4Xlhfrii5gJJJH5iwF3Aj8ldAzJB1Ai78DljkhxSnY1UvcqRujaOxH9z2Qqktl1VnkLUSK1DT9nmGAcBaJH4P/EBsLf1pF6B9KBcYyuYtpqq/RlTqItFJ9NAgMBAAECgYABk8NqBruGXK4qHGYhWW55UeINhNR/5KagogRJCbIYNvDr+0xhQU9VaFSklKUSm40Z7rGXRb119+XFbCfFx5Is8Od8JI+yoL6DpTLSk0aoXPJ+6IbU9zQeuTXaUW30reW5SQhAozz4ZdGD3zDsH7l5+6vfQij24l5uIKjBKPn4mQJBAP25yMCsvqUJ0b2hj55CJixZWqk8ChiekHQb/Cv2GyBkabC9DbfbPjPEeKEgfn6CkCsMJkNpMxUG4uw1hYE7jDUCQQDnOCowPQKZp64WMhdP/RlVh0JyloYDP/7D4273fx1S3Vyw2HJX/9VDr+uvZ4sGMMXX6VBDvlit+mAO8f7xErm5AkEA0uky1edC+tH0xdudFQML1GXalT9RbTGyBrKUpr6Hwh92M/KTirf3NvUlCVuHiwZhbUdGL1ctnVcCHzRGbCzh2QJAC1xDFmOpAQuwDf8gDhoNaJpgtWiX5Qj753wBM7/XHP8rUrUPySsUu2KlXdTki8VRsy4Pd4Sers2icpmJQSb+YQJBAOnoXFy+/K97cN2Xr6qD+G7e/HUPB8XC2dwk4zqK+7jj87uXQRznY+Qju9sOEnurMPOkSRL/jZs59avyf1Xn9GE=-----END PRIVATE KEY-----'
var publicKey_pkcs1 = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlKk6aEELpq1WctlM7fMrR6u2G3zvOXeMLhK20rGNF2+xukrGQhkeF5YX64ouYCSSR+YsBdwI/JXQMyQdQIu/A5Y5IcUp2NVL3Kkbo2jsR/c9kKpLZdVZ5C1EitQ0/Z5hgHAWiR+D/xAbC39aRegfSgXGMrmLaaqv0ZU6iLRSfTQIDAQAB-----END PUBLIC KEY-----'
const $={
  ascSort:function(arr){
    arr.sort(function(a,b){
      return (a+'') - (b+'')
    })
    return arr;
  },
  randomNum:function(){
    const num=Number((Math.random()*9000).toFixed(0))+1000;
    return num;
  },
  getRsa:function(data){
    let arr=[];
    for (var key in data) {
      arr.push(key)
    }
    arr.sort();
    let str=''
    str+=arr[0]+'='+data[arr[0]]
    for(var i=1;i<arr.length;i++){
      str+='&'+arr[i]+'='+data[arr[i]]
    }
    console.log('加密原文'+str)
    str=encodeURIComponent(str)
    str=$.encrypt_rsa(str);
    console.log('加密：'+str)
    return str;
  },
  getAuthorization:function(str,time){
    const nonce=$.randomNum();
    str='appKey=c30f2ee947daf1b4166d31e9ad63729d&nonce='+nonce+'&params='+str+'&timestamp='+time
    return 'sign='+$.md5(str)+'|nonce='+nonce;
  },
  md5:function(str){
    return Md5(str);
  },
  sign_rsa:function(){
    // 加签
    var sign_rsa = new RSA.RSAKey();
    sign_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs1);
    console.log('签名RSA:')
    console.log(sign_rsa)
    var hashAlg = 'sha1';
    var hSig = sign_rsa.signString("signData", hashAlg);
    hSig = RSA.hex2b64(hSig); // hex 转 b64
    console.log("签名结果：" + hSig)
  },
  verify_rsa:function(){
    // 验签
    var verify_rsa = new RSA.RSAKey();
    verify_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    console.log('验签RSA:')
    console.log(verify_rsa)
    hSig = RSA.b64tohex(hSig)
    var ver = verify_rsa.verifyString("signData", hSig)
    console.log('验签结果：' + ver)
  },
  encrypt_rsa:function(str){
    //加密
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey_pkcs1);
    var maxLength = (((encrypt_rsa .n.bitLength()+7)>>3)-11)
    console.log(str)
    if(str.length>maxLength){
      var lt = "";
      var ct = "";

      lt = str.match(/.{1,117}/g);
      lt.forEach(function(entry) {
          var t1 = encrypt_rsa.encrypt(entry);
          ct += t1 ;
      })
      return RSA.hex2b64(ct);
    }
    var encStr = encrypt_rsa.encrypt(str)
    encStr = RSA.hex2b64(encStr);
    return encStr;
  },
  decryptLong:function(str){
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs2);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    var decStr = decrypt_rsa.decryptLong(encStr)
    console.log("分段解密结果：" + decStr)
    return decStr;
  },
  decrypt_rsa:function(str){
    // 解密
    str=str.split('appKey=a4b53a92dfde60&')[1];
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey_pkcs2);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    var encStr = RSA.b64tohex(str)
    var decStr = decrypt_rsa.decrypt(encStr)
    console.log("解密结果：" + decStr)
    return decStr;
  }
}
module.exports = $;
