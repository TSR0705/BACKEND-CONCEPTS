const cookieParser = require('cookie-parser');
const express= require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());



app.get("/",function(req,res){
    let token = jwt.sign({email:"ts7583@srmist.edu.in"},"secret hai");
    res.cookie("token",token);
    res.send("done");
})



app.get("/read",function(req,res){
    let data = jwt.verify(req.cookies.token,"secret hai");
    console.log(data);
    
})

app.listen(3000);
//$2b$10$7CkqroT8cxw45al.9IEgPuhEi.sUswk9PaZTSLZ3t80UWqRPwQ9nC