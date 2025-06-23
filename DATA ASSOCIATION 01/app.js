const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const post = require('./models/post');



app.get('/', function(req, res)  {
  res.send('Hello, World!');
});


app.get("/create", async function(req, res)  {

      let user = await userModel.create({
          username: 'John bhai',
          age: 30,
          email: 'jhonybhaiya@gmail.com'
      
     });

      res.send(user);
})


app.get("/post/create", async function(req, res)  {
      let post = await postModel.create({
          postdata: 'This is a post',
          user: '6858eefc1c28222965563c9e' 
      });

     let user = await userModel.findOne({ _id: '6858eefc1c28222965563c9e' });

      user.posts.push(post._id);
      await user.save();

      res.send({
          post: post,
          user: user
      });
          
})

app.listen(3000);