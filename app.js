//jshint es versionconst:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
 const Server  = require("http");
 const parse = require("parse/node")
mailchimp.setConfig({
    apiKey:"0a2727038f60b87fe7d70ecde1fbb9ca-us11",
    Server: "us11",
});

const app = express();

// const run = async() => {
//     const response = await
//     clint.lists.addListMember("259f572fd1",{
//         email_address:"Ebony_BREKK@getMaxListeners.com",
//         status:"pending",

//     })
//     console.log(response);
// }

app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended:true}));
 app.get("/",function(req,res){
     res.sendFile(__dirname+"/signup.html")
 })
app.post("/", function(req,res){
    const firstName = req.body.yname;
    const password = req.body.pass;
    const email = req.body.email;

const data= {
   members:[
       {
            email_address: email,
            status:"subscribed",
            merge_fields:{
              FNAME: firstName,
              LNAME: password,
                
                
           }
        }
  
    ]
}
const jsondata = JSON.stringify(data);

const url = "https://us11.api.mailchimp.com/3.0/lists/259f572fd1"
const options = {
     method: "post",
    auth: "somyadav37:0a2727038f60b87fe7d70ecde1fbb9ca-us11"}
    
    const request = https.request(url, options,function(response){
       
       if (response.statusCode===200){
    res.sendFile(__dirname+"/succes.html")

}else{res.sendFile(__dirname+"/Failure.html")};

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    
    });
   
    request.write(jsondata);
    request.end()
})
  

 

  app.post("/Failure", function(req,res){
     res.redirect("/")
 })






 app.listen(3000, function(){
     console.log("the port is listining on port 3000")
 })

//c7a0188abf4b088b0c720de356323494-us11 api key
// 259f572fd1. list id



// //c7a0188abf4b088b0c720de356323494-us11 api key
// // 259f572fd1. list id


// "@mailchimp/mailchimp_marketing": "^3.0.80",
//     "body-parser": "^1.20.2",
//     "bootstrap": "^5.3.0-alpha1",
//     "ejs": "^3.1.9",
//     "express": "^4.18.2",
//     "parse": "^4.0.1",
//     "request": "^2.88.2"


// F:\web development anglie yu\chalanges\email-signuppage\.git