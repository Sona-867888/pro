const mongoose= require('mongoose')
const Schema= mongoose.Schema;
// const bodyParser = require('body-parser');

let Book =new Schema({
    name:{  
        type:String
    },
   price:{
        type:String
    },
   description:{
    type:String
   },
},
   {
    collection:'books'
   })
   module.exports = mongoose.model('Book',Book)