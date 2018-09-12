'use strict';
/**
 * Express 是第一代最流行的web框架，对Node.js的http进行了封装，基于ES5语法。
 *实现异步代码的方法就是回调
 */

var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send('Hello World!');
});

app.listen(3000,function(){
	console.log('Example app listening on port 3000!');
});
