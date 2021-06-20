const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newQuery = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/contact_query_mailer.ejs');
    console.log(user);
    nodeMailer.transporter.sendMail({
       from: 'asktheblockchainschool@gmail.com',
       to: 'asktheblockchainschool@gmail.com',
       subject: "New Query is Recieved ",
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