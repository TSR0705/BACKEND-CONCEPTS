const express = require ('express');
const app =express();  
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const path=require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const post = require('./models/post');


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public' )));
app.use(cookieParser());

app.get("/",function(req,res){

    res.render("index");
})

app.get("/login", function(req,res){
    res.render("login");

})


app.get("/profile",isLoggedIn, function(req,res){
    
    res.render("profile");

})


app.post("/register", async function(req,res){
    let {username, name, age, email, password} = req.body;  

   let user = await userModel.findOne({email});
    if(user){
         return res.status(500).send("User already registered");
    }

    bcrypt.genSalt(10, (err, salt) => { 
        bcrypt.hash(password,salt, async (err,hash) =>  {
            let user = await userModel.create({
                username,
                name,
                age,
                email,
                password: hash
            });
            let token = jwt.sign({email: email ,userid: user._id},"secret hai");
            res.cookie("token", token);
            res.send("User registered successfully");
        })
    });
})


app.post("/login", async function(req,res){
    let {email, password} = req.body;

    let user = await userModel.findOne({email});
    if(!user) {return res.send("Some went wrong, please try again");}

    bcrypt.compare(password, user.password, function(err, result)  {
       if(result) {
        let token = jwt.sign({email: email ,userid: user._id},"secret hai");
        res.cookie("token", token);
        
        res.status(200).send("you can login");
       }
       else res.redirect("/login");
    });
});


app.get("/logout", function(req,res){
    res.cookie("token","");
    res.redirect("/login");

})

function isLoggedIn(req,res,next)  {
     if(req.cookies.token === "") res.redirect("/login");
     else{
        let data = jwt.verify(req.cookies.token,"secret hai");
        req.user = data;
     }
     next();

}


app.listen(3000);