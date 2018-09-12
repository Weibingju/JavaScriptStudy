'use strict';
var fs = require('fs');
//打开一个流
var rs = fs.createReadStream('hello.js','utf-8');

//data 表示可以读流了
rs.on('data',function(chunk){
	console.log('data');
	console.log(chunk);
});
//end 表示；流到末尾了
rs.on('end',function(){
	console.log('END');
});

rs.on('error',function(err){
	console.log('ERROR:'+err);
});
