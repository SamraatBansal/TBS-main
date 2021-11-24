const nodemailer = require("nodemailer");
// const {google} = require("googleapis");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment.js');
// const nodemailerSendgrid = require('nodemailer-sendgrid');
// const SENDGRID_API_KEY =  env.sendgrid_api_key;
var sendinBlue = require('nodemailer-sendinblue-transport');

// // const CLIENT_ID = '687534517594-ule5med3e28m5gj1rsnhj5mfrecnscog.apps.googleusercontent.com';
// const CLIENT_ID = env.google_client_id;
// // const CLIENT_SECRET = 'AY9RiZTRwGVi9W9jObsj4IjH';
// const CLIENT_SECRET = env.google_client_secret;
// const REDIRECT_URL = env.google_refresh_token;
// // const REFRESH_TOKEN = '1//04ooRl1ti-6piCgYIARAAGAQSNwF-L9IrQ20wfwZWKGcwg_CJAz0qlJAd2gsTrv4QPZeBBY-mLrxF5VlYWHczn9ZjWtKcciYymEI';
// const REFRESH_TOKEN = env.google_refresh_token;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

// const SENDGRID_API_KEY =  env.sendgrid_api_key;


// let transporter = nodemailer.createTransport(
//     nodemailerSendgrid({
//         apiKey: SENDGRID_API_KEY

//     })
// );


let transporter = nodemailer.createTransport(
    sendinBlue({

        apiKey: 'MRBk30QYZnKELPqJ'
    }
    )
    
);

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}