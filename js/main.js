'use strict';
//引入hello模块
var greet = require('./hello');
var s = 'Michael';
greet(s);
//下一次执行
process.nextTick(function(){
	console.log('nextTick callback');
});

console.log('nextTick was set!');
var fs = require('fs');
fs.readFile('hello.js','utf-8',function(err,data){
		    	if(err){
		    		console.log(err);
		    	}else{
		    		console.log(data);
		    	}
		    });		    
	    