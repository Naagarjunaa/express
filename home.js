var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var path = require('path');

var app= express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs');
app.use( express.static( "assets" ) );

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/user/:name',(req,res)=>{
    var data= {id : 29, designation : 'qa' ,email : 'abc@xyz.com', hobbies :['fishing','watching TV','sleeping'] };
    res.render('user',{person : req.params.name, data : data, qs : req.query});
    console.log(req.query);
    
});
app.post('/afteradd',urlencodedParser,(req,res)=>{
   
    console.log(req.body);
    res.render('added_success',{data : req.body});
    
});


app.get('/adduser',(req,res)=>{
    res.render('adduser');
});

app.get('/mail',(req,res)=>{
    res.render('mail');
});

app.post('/send-email',urlencodedParser,(req,res)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xxx@xx.com',
            pass: 'xxxx'
        }
});
let mailOptions = {
    from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.body, // plain text body
    html: '<b>NodeJS Email Tutorial</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
        console.log('info');
        
    });
});

app.listen(4200);