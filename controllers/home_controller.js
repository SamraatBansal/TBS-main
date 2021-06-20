// const { readdirSync } = require("fs")
const queue = require('../config/kue');
const emailMailer = require('../mailers/contact_query_mailer');
const emailVerificationWorker = require('../workers/contact_query_worker');
const env = require("../config/environment.js");

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
}

module.exports.contact = function(req, res){
    
    return res.render('contact',{
        title: "Contact | The Blockchain School",
        contact_msg: "NULL",
        recaptcha: env.google_recaptcha_dateSiteKey
    })
}