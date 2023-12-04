const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
    Name : { type: String, require:true  },
    Desc : { type : String , required: true},
    Img : { type : String, required : true },
    ImgTitle : { type : String, required : true },
    ImgSm : { type : String, required : true },
    trailer : { type : String, required : true },
    isSeries : { type : String, default : false },
    genre : { type : String, required : true },
    createdAt: { type: Date, default :  Date.now() }
})


module.exports =  mongoose.model("Movie",MovieSchema)
