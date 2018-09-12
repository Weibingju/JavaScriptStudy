'use strict';
//Node 模块方法
var s = 'Hello';
function greet(name){
	console.log(s+', ' + name + '!');
	//简单判断JavaScript执行环境：
	if(typeof(window) === 'undefined'){
	    	console.log('JavaScript运行环境是：node.js');
	    }else{
	    	console.log('JavaScript运行环境是：browser');
	    }
}
//把函数 greet 作为模块的输出暴露出去，这样其他模块就可以使用了
module.exports = greet;

//fs 读取文件实例
//异步读取
var fs = require('fs');
fs.readFile('hello.js','utf-8',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
