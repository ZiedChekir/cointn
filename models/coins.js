var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var schema = new Schema({
  id:{type:String, required:true}, 
  price:{type:Number, required:true}
},{collection:'coins'});

module.exports = mongoose.model('coins', schema);
