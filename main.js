/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  var slideIndex = 1;

/* index.js file from mongo */

  var express = require("express")
  var bodyParser = require("body-parser")
  var mongoose = require("mongoose")
  
  const app = express()
  
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({
      extended:true
  }))
  
  mongoose.connect('mongodb://localhost:27017/database',{
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  
  var db = mongoose.connection;
  
  db.on('error',()=>console.log("Error in Connecting to Database"));
  db.once('open',()=>console.log("Connected to Database"))
  
  app.post("/sign_up",(req,res)=>{

      var name = req.body.name;
      var email = req.body.email;
      var phno = req.body.phno;
      var pincode = req.body.pincode;
      var address = req.body.address;
  
      var data = {
          "name": name,
          "email" : email,
          "phno": phno,
          "pincode": pincode,
          "address" : address
      }
  
      db.collection('users').insertOne(data,(err,collection)=>{
          if(err){
              throw err;
          }
          console.log("Record Inserted Successfully");
      });
  
      return res.redirect('success.html');
  
  })
  
  
  app.get("/",(req,res)=>{
      res.set({
          "Allow-access-Allow-Origin": '*'
      })
      return res.redirect('details.html');
  }).listen(3000);
  
  
  console.log("Listening on PORT 3000");


  