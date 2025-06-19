const express = require('express');
const app = express();

const userModel = require('./usermodel');


app.get('/', (req, res) => {
    res.send('Hello World!');
})

// app.get('/create', async (req, res) => { 
//     let createduser = await userModel.create({
//         name: "Tanmay",
//         username: "tanmay",
//         email: "tanmaysingh8246@gmail.com"
        
//     })
//     res.send(createduser);     
// })


// app.get ('/read' , async (req ,res) => {
//     let users = await userModel.find({name: "Tanmay"});
//     res.send(users);
// })



// app.get('/update', async (req, res) => {

//    let updateduser = await userModel.findOneAndUpdate({username: "tanmay"},{name: "TANMAY SINGH RAJPUT"},{new: true});

//    res.send(updateduser);
   
// })





// app.get ('/delete' , async (req ,res) => {
//     let users = await userModel.findOneAndDelete({name: "Tanmay"});
//     res.send(users);
// })

app.listen(3000);
