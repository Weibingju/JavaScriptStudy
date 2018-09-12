'use strict';
/**
 * crypto 模块提供了通用的加密和哈希算法。该模块Node.js使用的是c/c++实现
 */
const crypto = require('crypto');

//MD5
const hash = crypto.createHash('md5');
//sha1,还可以替换成sha256、sha512等
//const hash = crypto.createHash('sha1');


//可任意多次调用update()
//update() 方法默认字符串编码为utf-8，也可以传入Buffer
hash.update('Hello,world!');
hash.update('Hello,node.js!');

console.log(hash.digest('hex'));


/*
 *Hmac
 * Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法
 * 两个参数：
 *   第一个：算法名称
 *   第二个：密钥 * 
 */
const hmac = crypto.createHmac('sha256','secret-key');

/**
 * AES
 * AES是一种常用的对称加密算法，加解密都用一个密钥。cypto模块提供了AES支持，但是
 * 需要自己封装好函数，便于使用。
 * AES有很多不同的算法，如：
 *   aes192、ase-128-ecb、aes-256-cbc
 * 除密钥外，还可以指定IV（Initial Vector）
 */

/**
 * 加密
 * @param {Object} data
 * @param {Object} key
 */
function aesEncypt(data,key){
	const cipher = crypto.createCipher('aes192',key);
	var crypted = cipher.updata(data,'utf','hex');
	crypted += cipher.final('hex');
	return crypted;
}

/**
 * 解密
 * @param {Object} encrypted
 * @param {Object} key
 */
function aesDecypt(encrypted,key){
	const decipher = crypto.createDecipher('aes192',key);
	var decrypted = decipher.update(encrypted,'hes','utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

var data = 'Hello,this is a secret message!';
var key = 'Password!';
var encrypted = aesEncypt(data,key);
var decrypted = aesDecypt(encrypted,key);

console.log('Plain text:'+data);
console.log('Encrypted text:'+encrypted);
console.log('Decrypted text:'+decrypted);


/**
 * Diffie-Hellman
 * DH算法是一种密钥交换协议，该算法基于数学原理。
 * 
 */

//xiaoming's keys
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime:'+prime.toString('hex'));
console.log('Generator:'+generator.toString('hex'));

//xiaonghong’s keys
var hong = crypto.createDiffieHellman(prime,generator);
var hong_keys = hong.generateKeys();

//exchange and generate secret
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

//print secret
console.log('Secret of Xiao Ming:'+ming_secret.toString('hex'));
console.log('Secret of Xiao Hong:'+hong_secret.toString('hex'));


/**
 * RSA 
 * RSA是一种非对称加密算法。
 * Node 生成密钥对步骤：
 * 1.命令行执行： penssl genrsa -aes256 -out rsa-key.pem 2048
 *   输入密码，得到rsa-key.pem
 * 2.使用rea-key.pem导出原始私钥
 *   openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
 * 3.使用rea-ky.pem 导出原始公钥
 *   openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
 * 4.使用rsa-prv.pem 、rsa-pub.pem
 * 例：
 */
//公钥加密，私钥解密
const fs = require('fs');

/**
 *完整文件名，包含路径
 * @param {Object} file
 */
function loadKey(file){
	//同步加载文件
	return fs.readFiledSync(file,'utf8');
}

let 
   prvKey = loadKey('./rsa-prv.pem'),
   pubKey = loadKey('./rsa-pub.pem'),
   message = 'Hello,world!';

//使用私钥加密
let enc_by_prv = crypto.privateEncrypt(prvKeym,Buffer.from(message,'utf8'));
console.log('encrypted by private key:'+enc_by_prv.toString());
//使用公钥解密
let dec_by_pub = crypto.publicDecrypt(pubKey,enc_by_prv);
console.log('decrypted by public key:'+ dec_by_pub.toString());

/**
 * 使用公钥加密，私钥解密
 */
//公钥加密
let enc_by_pub = crypto.publicEncrypt(pubKey,Buffer.from(message,'utf8'));
console.log('encrpted by public key:'+enc_by_pub.toString('hex'));

//使用私钥解密
let dec_by_prv = crypto.privateDecrypt(prvKey,enc_by_pub);
console.log('decrypted by private key:'+dec_by_prv.toString());

