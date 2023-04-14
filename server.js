const express=require("express");
const app=express();
const bodyParser=require("body-parser")
const { MongoClient } = require('mongodb');
const {isInvalidEmail,isEmptyPayload}= require("./validator")
const { response } = require("express");
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName="company-db"
const collName="employees"


app.use(bodyParser.json())
app.use("/",express.static(__dirname+"/dist"))

app.get("/get-profile",async function(req,res){
    
    //conect to mongodb database
    await client.connect();
  console.log('Connected successfully to server');
  //initiate or get the database & collection
  const db=client.db(dbName)
  const collection=db.collection(collName)
   //get data from database
    const result=await collection.findOne({id:1})
    console.log(result)
    client.close()
    
    //we dont write const here for response because we want chenge it in the dowen
    let response = {}
    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }
    res.send(response)
})


app.post("/update-profile",async function(req,res){
    const payload=req.body

    console.log(payload)
    if (isEmptyPayload(payload) || isInvalidEmail(payload)){
        res.send({Error:"empty payload.couldnt update user profile data "})
    }else{
        //connect to mongodb database
    await client.connect()
    console.log('Connected successfully to server');
    //initiates the database
    const db=client.db("company-db")
    const collection=db.collection("employees")

    //save payload data to database 
    payload["id"]=1
    const updatedValues={$set: payload}
    await collection.updateOne({id:1},updatedValues,{upsert:true});
    client.close()
        res.send({info:"user profile data updated successfully"})
    }
    }
)
const server = app.listen(3000, function () {
    console.log("app listening on port 3000")
})



module.exports={
    app,
    server
}