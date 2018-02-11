var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const crypto = require('crypto');



const ENCRYPTION_KEY = "kjhszol125sdjn65893vbnaze4rg56b2"; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16


 module.exports = function coins(){
		
	this.encryptcoins = function(text){
 		let iv = crypto.randomBytes(IV_LENGTH);
 		let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 		let encrypted = cipher.update(text);

 		encrypted = Buffer.concat([encrypted, cipher.final()]);
 		return iv.toString('hex') + ':' + encrypted.toString('hex');
	}
	this.decryptcoins = function(text){
 		let textParts = text.split(':');
 		let iv = new Buffer(textParts.shift(), 'hex');
 		let encryptedText = new Buffer(textParts.join(':'), 'hex');
 		let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 		let decrypted = decipher.update(encryptedText);
		
 		decrypted = Buffer.concat([decrypted, decipher.final()]);

		 return decrypted.toString();
	}
	this.initializeCoins = function(){
		let iv = crypto.randomBytes(IV_LENGTH);
 		let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
 		let encrypted = cipher.update('0');

 		encrypted = Buffer.concat([encrypted, cipher.final()]);

 		return iv.toString('hex') + ':' + encrypted.toString('hex');
	}
}








// var encryptedText = encrypt(key, text);
// console.log(encryptedText);
// var decryptedText = decrypt(key, encryptedText);
// console.log( decryptedText);
