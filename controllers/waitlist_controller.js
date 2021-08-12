const Waitlist = require('../models/waitlist')
const randomString = require('randomstring')

const queue = require('../config/kue');
const emailMailer = require('../mailers/registration_mailer');
const emailVerificationWorker = require('../workers/registration_worker');

module.exports.waitlist = function(req, res){
    
    return res.render('waitlist_form',{
        title: "Waitlist | The Blockchain School", 
        code: req.params.code
    })
}

module.exports.registration = async function(req, res){
    let user = await Waitlist.findOne({email: req.body.email});
    if(!user){
        // console.log(req.body)
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
          let job = queue.create('registrationEmail', user).save(function(err){
            if (err){
                console.log('Error in sending to the queue', err);
            }
            console.log('job enqueued', job.id);
        });
          let referrer = await Waitlist.findOne({referralCode: req.body.referrer.toUpperCase() });
          if(referrer){
              referrer.referrals.push(user);
              referrer.save();
          }
          return res.render('thankYou_waitlist',{
            title: "Successfully Registered | TBS", 
            code: code
        })
    }



    return res.render('thankYou_waitlist',{
        title: "Successfully Registered | TBS", 
        code: user.referralCode
    })
}


