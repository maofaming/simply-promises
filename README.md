# simply-promises
简单的promises实现

模仿jquery defer 实现简单的promise
使用方法
```javascript
var Deferred = require('simply-promises').deferred;

var requestIp = function (url) {
    var deferred = new Deferred(); \\声明
    httpRequest(url,function(ip){
        if(ip) {
            deferred.resolve(ip) \\ 成功
        }else{
            deferred.reject() \\ 失败
        }
    });
    return deferred.promise; \\返回promise对象
};

var url = 'http://sneezryworks.sinaapp.com/ip.php';

requestIp(url).then(function(ip){// 成功后调用
    console.log('success ip:',ip)
    document.getElementById('ip_div').innerText = ip;
},function(){ // 失败后调用
    console.log('error')
})
```