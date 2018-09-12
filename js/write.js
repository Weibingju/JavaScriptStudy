'use strict';
var fs = require('fs');
var wsl = fs.createWriteStream('output1.txt');
wsl.write('kkkkkkk');
//wsl.write(new Buffer('写入二进制数据'，'utf-8');
wsl.end();