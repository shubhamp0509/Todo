const express=require('express');
var router=express.Router();
const ObjectId=require('mongoose').Types.ObjectId;
const Info=require('../models/todo');
//localhost:3000/infos
router.get('/:value',(req,res)=>{
     
      temp=req.params.value;

      if(temp=="true"){    //today page
      //console.log(req.params.value);
      Info.find({"date":new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()},function(err,f){
        
        res.send(f);
     })
    
    }else{   //upcoming page
        //console.log(req.params.value);
        Info.find({date:{$gt:new Date()}}).exec((err, docs) => { 
            res.send(docs)
         });

    }
   

})


router.post('/',async (req,res)=>{
    try{
     rec=new Info({

        task:req.body.task,
        date:req.body.date
    });
   const v=await rec.save();
   console.log(v);
}catch(arr){
    res.status(400).send(err);
}
   // console.log(res);
})

// router.post('/upcoming',async (req,res)=>{
//     try{
//      rec=new Info({

//         task:req.body.task,
//         date:req.body.date
//     });
//    const v=await rec.save();
//    console.log(v);
// }catch(arr){
//     res.status(400).send(err);
// }
//    // console.log(res);
// })



router.get('/:id/:b',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    else
        Info.findById(req.params.id,(err,doc)=>{
                if(!err)
                res.send(doc)
                else
                console.log('Error in retriving');

        })


})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    
    var up={
        task:req.body.task,
        
        
    };
    Info.findOneAndUpdate({_id:req.params.id},{$set:up},{new:true},(err,doc)=>{
    
   if(!err)
        res.send(doc)
        else
        console.log("Error in Task Updated");
    });
})



router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    Info.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){res.send(doc); }

        else{console.log('Error in Task Delete');}
    });
})

// router.delete('/upcoming:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No record with given id: ${req.params.id}');
//     Info.findByIdAndRemove(req.params.id,(err,doc)=>{
//         if(!err){res.send(doc); }

//         else{console.log('Error in Task Delete');}
//     });
// })


// router.put('/upcoming:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No record with given id: ${req.params.id}');
    
//     var up={
//         task:req.body.task
//     };
//     Info.findOneAndUpdate(req.params.id,{$set:up},{new:true},(err,doc)=>{
    
//    if(!err)
//         res.send(doc)
//         else
//         console.log("Error in Task Updated");
//     });
// })

// router.get('/upcoming:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No record with given id: ${req.params.id}');
//     else
//         Info.findById(req.params.id,(err,doc)=>{
//                 if(!err)
//                 res.send(doc)
//                 else
//                 console.log('Error in retriving');

//         })


// })

//localhost:3000/infos/upcoming
// router.get('/upcoming',(req,res)=>{
//      Info.find({date:{$gt:new Date()}}).exec((err, docs) => { 
//          res.send(docs)
//       });

    

// })

module.exports=router;
