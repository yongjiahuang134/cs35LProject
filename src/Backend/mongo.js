const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://cs35lproject1234:uclabruins@cluster0.qusbyem.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to mongodb");
}).catch(()=>{
    console.log("fail to connected mongodb");
})

const newSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    pass:{
        type:String,
        require:true
    }
})

const collection = mongoose.model("collection", newSchema);

module.exports=collection;