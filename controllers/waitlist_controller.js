const Waitlist = require('../models/waitlist')
const randomString = require('randomstring')

const queue = require('../config/kue');
const emailMailer = require('../mailers/registration_mailer');
const emailVerificationWorker = require('../workers/registration_worker');
const request = require("request")


module.exports.landing = function(req, res){
    
    return res.render('landing_near',{
        title: "NEAR | The Blockchain School", 
        // code: req.params.code
    })
}

module.exports.waitlist = function(req, res){
    
    return res.render('waitlist_form',{
        title: "Waitlist | The Blockchain School", 
        code: req.params.code
    })
}

module.exports.registration = async function(req, res){
    let user = await Waitlist.findOne({email: req.body.email});
    if(!user){


        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
          }
    
          let secretKey = "6LcZNCsbAAAAADnNcU2FECVfV0LvYbvOuMPFBoDk";
    
          var verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;
        request(verificationUrl,async function(error,response,body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
                }
                user = await Waitlist.create(req.body)
                let options = {
                    length: 5,
                    charset: 'alphanumeric',
                    capitalization: 'uppercase',
                    readable: true
                }
            let code =  "TBS-" + randomString.generate(options);
            let check = await Waitlist.findOne({referralCode: code});
            console.log(code);
            while(check){
                code =  "TBS-" + randomString.generate(options);
                check = await Waitlist.findOne({referralCode: code});
            }
            user.referralCode = code;
            user.save();
    //           let job = queue.create('registrationEmail', user).save(function(err){
    //             if (err){
    //                 console.log('Error in sending to the queue', err);
    //             }
    //             console.log('job enqueued', job.id);
    //         });
            let referrer = await Waitlist.findOne({referralCode: req.body.referrer.toUpperCase() });
            if(referrer){
                referrer.referrals.push(user);
                referrer.save();
            }
            return res.render('thankYou_waitlist',{
                title: "Successfully Registered | TBS", 
                code: code
            }) 
    });
        // console.log(req.body)
          
   }
    return res.render('thankYou_waitlist',{
        title: "Successfully Registered | TBS", 
        code: user.referralCode
    })
}


