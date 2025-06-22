const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');



app.get('/', function(req, res)  {
  res.send('Hello, World!');
});


app.get('/create', async function(req, res)  {

      let user = await userModel.create({
          username: 'John bhai',
          age: 30,
          email: 'jhonybhaiya@gmail.com'
      
     });

      res.send(user);
})

app.listen(3000);