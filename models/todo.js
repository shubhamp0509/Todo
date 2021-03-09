const mongoose=require('mongoose');

const list=new mongoose.Schema({

    
    task:{
        type:String,
        require:true
    },
    date:{
        type:Date,
         
    }
})

const Todo=new mongoose.model("Todo",list);

module.exports=Todo


