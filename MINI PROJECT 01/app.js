const express = require ('express');
const app =express();  
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const postModel = require('./models/post');
const path = require("path");
const upload = require('./config/multerconfig');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public' )));
app.use(cookieParser());


//this is used for giving random names to the file
// crypto.randomBytes(12, function(err,bytes){
//     console.log(bytes.toString("hex"));
// })


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images/uploads'); // Avoid leading slash for relative path
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(16, function (err, bytes) {
//       if (err) return cb(err);

//       const fn = bytes.toString("hex") + path.extname(file.originalname);
//       cb(null, fn);
//     });
//   }
// });

// const upload = multer({ storage: storage });

// dummy route
// app.get("/test",function(req,res){

//     res.render("test");
// })

 
// dummy route
app.post("/upload",isLoggedIn , upload.single("image"), async function (req, res) {

    let user = await userModel.findOne({email: req.user.email});
    user.profilepic = req.file.filename;
    await user.save()
    res.redirect("/profile");

});




app.get("/",function(req,res){

    res.render("index");
})




app.get("/login", function(req,res){
    res.render("login");

})


app.get("/profile", isLoggedIn, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    await user.populate("posts");

    res.render("profile", { user }); 
});


app.get("/profile/upload", function(req,res){
    res.render("profileupload");

})

app.get("/like/:id", isLoggedIn, async function(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1 ){
        post.likes.push(req.user.userid);
    }

    else{
        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }

    await post.save();
    res.redirect("/profile"); 
});


app.get("/edit/:id", isLoggedIn, async function(req, res) {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");

   res.render("edit", {post})
     
});

app.post("/update/:id", isLoggedIn, async function(req, res) {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id } ,{content: req.body.content});

   res.redirect("/profile")
     
});


app.post("/post",isLoggedIn, async function(req,res){
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;
     
    let post = await postModel.create ({
        user: user._id,
        content
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");

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
        
        res.status(200).redirect("/profile");
       }
       else res.redirect("/login");
    });
});


app.get("/logout", function(req,res){
    res.cookie("token","");
    res.redirect("/login");

})

function isLoggedIn(req, res, next) {
    if (!req.cookies.token) { 
        return res.redirect("/login"); 
    }
    
    try {
        let data = jwt.verify(req.cookies.token, "secret hai");
        req.user = data;
        next();
    } catch (err) {
        // Token is invalid or expired
        return res.redirect("/login");
    }
}



app.listen(3000);