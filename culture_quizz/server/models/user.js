const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  Pseudo: {
    type : String,
    required : true
  },
  Email : {
    type : String,
    required : true,
    unique: true
  },
  Password: {
    type:String,
    required :true
  }
})
 
module.exports = mongoose.model('User', userSchema);