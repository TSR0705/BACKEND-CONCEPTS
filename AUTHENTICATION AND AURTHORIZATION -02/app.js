const express = require ('express');
const app =express();  
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const path=require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public' )));
app.use(cookieParser());

app.get("/",function(req,res){

    res.render("index");
})


app.post("/create",(req,res)=>{
    let {username, password, email, age} = req.body;


    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
               username,
               password: hash,
               email,
               age
            });

           let token = jwt.sign({email},"secretkey");
           res.cookie("token",token);
           res.send(createdUser);

        })
    })

})


app.get("/login", function(req,res){
    res.render("login");

})

app.post("/login", async function(req,res){

    let user = await userModel.findOne({email:req.body.email});
    if(!user){
        return res.send("Some went wrong, please try again");
    }

    bcrypt.compare(req.body.password, user.password, function(err, result)  {
       if(result){
        let token = jwt.sign({email: user.email},"secretkey");
        res.cookie("token",token);
        res.send("YES U CAN LOGIN" );
       } 
       else res.send("Some went wrong, please try again");
    });
});

app.get("/logout", function(req,res){
    res.cookie("token","");
    res.redirect("/");

})



app.listen(3000);