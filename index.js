const express = require('express')
const app = express()
const port = process.env.PORT||3000;
const path = require('path');
const bodyparser = require("body-parser");

const nodemailer = require('nodemailer');
const log = console.log;

app.use(express.static('public'))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/' , (req , res) =>{
  var name , surname, email , message;

   name  = req.body.name , 
   surname  = req.body.surname ,
   email  = req.body.email,
   message  = req.body.message
   
 
  
  let transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com ',
    
    secure: true,
    auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD ,
    }
});

let mailOptions = {
  from: 'mphathisimatinise16@gmail.com', 
  to: email,
  subject: 'Nodemailer - Test',
  text: 'Wooohooo it works!!'
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
      return log(err);
  }
  return log('Email sent!!!');
});

  res.redirect('/thankYou')



  console.log(name , surname , email ,message);


})

app.get('/thankYou', (req, res) => {
  res.sendFile(__dirname + "/public/thank.html")
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})