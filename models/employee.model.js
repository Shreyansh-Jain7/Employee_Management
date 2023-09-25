const mongoose=require("mongoose");
const empSchema=mongoose.Schema({
    firstname: String,
    lastname:String,
    email: String,
    department:String,
    salary:Number
  },{
    versionKey:false
  })

  const Emp=mongoose.model("employee",empSchema);

  module.exports={Emp};