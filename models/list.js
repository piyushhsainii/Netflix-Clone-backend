const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    title:{type:String, required:true},
    type:{type:String, required:true},
    genre:{type:String, required:true},
    content:{type:Array, required:true},
})

module.exports = mongoose.model("List",ListSchema)