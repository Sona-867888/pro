 const express =require("express");
 const app= express();
 const bookRoute= express.Router();
 let Book= require("../model/Book");

 bookRoute.route("/add-book").post(async(req,res,next)=>{
   let result=await Book.create(req.body)
 if(result){
   res.json(result)
 }
 }) ;

 bookRoute.route('/').get(async (req, res) => {
   try {
     const data = await Book.find().exec();
     res.json(data);
   } catch (error) {
      next(error)
   }
 });
 
//  bookRoute.route('/').get((req,res)=>{
//    Book.find((error,data)=>{
//       if(error){
//          return next(error)
//       }else{
//          res.json(data)
//       }

//    });
//  });

bookRoute.route('/read-book/:id').get(async (req, res, next) => {

   try {
     const data = await Book.findById(req.params.id);

     res.json(data);
   } catch(error){
      next(error)
   }
 });
 

// bookRoute.route('/read-book/:id').get((req,res)=>{
//    Book.findById(req.params.id,(error,data)=>{
//       if(error){
//         return next(error)
//       }
//       else{
//          res.json(data)
//       }
      
//    });
// });

bookRoute.route('/update-book/:id').put(async (req, res, next) => {
   try {
     const data = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
     if (!data) {
       return res.status(404).json({ error: 'Book not found' });
     }
     res.json(data);
     console.log("Data updated successfully");
   } catch (error) {
     next(error);
     console.log(error);

   }
 });
 

// bookRoute.route('/update-book/:id').put((req,res,next)=>{
//    Book.findByIdAndUpdate(req.params.id,{
//      $set:req.body 
//    },(error,data)=>{
//       if(error){
//          return next(error);
//          console.log(error);
//       }else{
//          res.json(data)
//          console.log("data updated successfully")

//       }
  
//    })
// })

bookRoute.route('/delete-book/:id').delete(async (req, res) => {
   try {
     const data = await Book.findByIdAndRemove(req.params.id);
     res.status(200).json({ msg: data });
    

   } catch (error) {
     // Handle errors here
     res.status(500).json({ error: 'An error occurred' });  

     
   }
 });

// bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
//    Book.findByIdAndRemove(req.params.id,(error,data)=>{
//       if(error){
//          return next(error);
//       }else{
//          res.status(200).json({
//             msg:data
//          })
//       }
//    })
// })


 

module.exports=bookRoute;
