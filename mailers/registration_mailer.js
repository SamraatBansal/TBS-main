const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newRegistration = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/registration_mailer.ejs');
    console.log(user);
    nodeMailer.transporter.sendMail({
       from: ' Saurabh | TBS <hello@theblockchainschool.io>',
       to: user.email,
       subject: "Registration Successful",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}