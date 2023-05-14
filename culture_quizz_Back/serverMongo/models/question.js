const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type : String,
    required : false
  },
  type : {
    type : String,
    required : false
  },
  options: {
    type:Array,
    required :false
  }
})

module.exports = mongoose.model('Question', questionSchema)