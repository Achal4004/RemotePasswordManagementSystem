const mongoose = require('mongoose');
const DiarySchema= new mongoose.Schema({
    email:{type:String,required:true},
    date:{type:Date,required:true},
    header:{type:String,required:true},
    content:{type:String,required:true},  
});

const PasswordSchema= new mongoose.Schema({
    email:{type:String,required:true},
    website:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
});

module.exports.diary=new mongoose.model("Diarys",DiarySchema);
module.exports.password=new mongoose.model("Passwords",PasswordSchema);
