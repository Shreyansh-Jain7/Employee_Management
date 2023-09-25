const express=require("express");
const empRouter=express.Router();
const {Emp}=require("../models/employee.model");
const {User}=require("../models/user.model");
const jwt=require("jsonwebtoken");

empRouter.get("/",async(req,res)=>{
    // const decoded=jwt.verify(req.headers.authorization,"secretkey");
    // const _id=decoded.userId;
    let {department,sort,page}=req.query;
    let filter={department};
    if(!department){
        filter={};
    }
    if(!page){
        page=1;
    }
    if(!sort){
        sort="asc"
    }
    try {
        const emps=await Emp.find(filter).limit(5).skip(5*(page-1)).sort({salary:sort});
        res.status(200).send(emps);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

// bookRouter.get("/:id",async(req,res)=>{
//     try {
//         const books=await Book.find({_id:req.params.id});
//         res.status(200).send(books);
//     } catch (error) {
//         res.status(400).send({"msg":error.message});
//     }
// })

empRouter.post("/",async(req,res)=>{
    // const decoded=jwt.verify(req.headers.authorization,"secretkey");
    // const _id=decoded.userId;

    try {
        const emp=new Emp(req.body);
        await emp.save();
        res.status(201).send({"msg":"Employee has been added"});
        
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

empRouter.patch("/:id",async(req,res)=>{
    try {
        await Emp.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(204).send({"msg":"Employee has been updated"});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

empRouter.delete("/:id",async(req,res)=>{
    try {
        await Emp.findByIdAndDelete({_id:req.params.id},req.body);
        res.status(204).send({"msg":"Employee has been deleted"});
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


module.exports={empRouter}