const queue = require('../config/kue');

const contactQueryMailer = require('../mailers/contact_query_mailer');

queue.process('emails', function(job, done){
    // console.log('emails worker is processing a job ', job.data);

    contactQueryMailer.newQuery(job.data);
    
    done();
});