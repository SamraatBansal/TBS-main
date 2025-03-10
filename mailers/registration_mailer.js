const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newRegistration = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/registration_mailer.ejs');
    // console.log(user);
    nodeMailer.transporter.sendMail({
       from: ' Saurabh from TBCS <hello@theblockchainschool.io>',
       to: user.email,
       subject: " Look Who’s Vibing With Substrate: Confirmation Email",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}