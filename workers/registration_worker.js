const queue = require('../config/kue');

const registrationMailer = require('../mailers/registration_mailer');

queue.process('registrationEmail', function(job, done){
    // console.log('emails worker is processing a job ', job.data);

    registrationMailer.newRegistration(job.data);
    
    done();
});