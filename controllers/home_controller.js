// const { readdirSync } = require("fs")
const queue = require('../config/kue');
const emailMailer = require('../mailers/contact_query_mailer');
const emailVerificationWorker = require('../workers/contact_query_worker');
const env = require("../config/environment.js");
const request = require('request')
module.exports.home = function(req, res){
    
    return res.render('tbs_home',{
        title: "The Blockchain School" 
    })
}
module.exports.aboutUs = function(req, res){
    
    return res.render('aboutUs',{
        title: "About Us | The Blockchain School" 
    })
}

module.exports.contactFormSubmit = function(req, res){

    let user = {
        name: req.body.username,
        email: req.body.useremail,
        contact: req.body.usercontact,
        query: req.body.query
    }

    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
      }

      let secretKey = "6LcZNCsbAAAAADnNcU2FECVfV0LvYbvOuMPFBoDk";

      var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
      console.log(verificationUrl)
      request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
          return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        }
         let job = queue.create('emails', user).save(function(err){
            if (err){
                console.log('Error in sending to the queue', err);
                return res.render('contact',{
                    title: "Contact | The Blockchain School",
                    contact_msg: "failed"
                });
            }
            console.log('job enqueued', job.id);
            return res.render('contact',{
                title: "Contact | The Blockchain School",
                contact_msg: "success"
            }) 
        });
      });

  
}

module.exports.contact = function(req, res){
    
    return res.render('contact',{
        title: "Contact | The Blockchain School",
        contact_msg: "NULL"
    })
}