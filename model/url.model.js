const mongoose = require('mongoose');

const urlSchema =new mongoose.Schema({
    shortId : {
        type : String,
        require: true,
        unique:true
    },
    redirectURL:{
        type: String,
        require: true,
    },
    visitHistory: [{timestamp: {type:Number}}],
    createBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{timestamp:true}
);

const URL = mongoose.model("url", urlSchema);

 module.exports = URL;