import express from 'express';
import mongoose from 'mongoose';

// create a server
const userServer = new express();
userServer.listen('7000', ()=> {
    console.log("server is running on the port 7000");
})

// json parse middleware
userServer.use(express.json());

// mongoDB database connection
mongoose.connect("mongodb://localhost:27017/userAuth");
const db = mongoose.connection;
db.on('open', ()=> {
    console.log("mongoDB database connection is successful");
})
db.on('error', ()=> {
    console.log("mongoDB database connection is failed")
})