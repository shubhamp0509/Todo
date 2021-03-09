
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/todoList",{

useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true,
useFindAndModify:false,

}).then(()=>{

    console.log("Connection successful..");
}).catch((e)=>{
    console.log("Connection failed...");
})

module.exports=mongoose;