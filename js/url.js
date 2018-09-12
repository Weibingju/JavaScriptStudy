'use strict';
//解析url
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

//处理本地目录
var path = require('path');
//解析当前目录
var workDir = path.resolve('.');

//组合完整的文件路径
var filePath = path.join(workDir,'pub','index.html');
