const nodemailer = require("nodemailer");
const {google} = require("googleapis");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment.js');
// const CLIENT_ID = '687534517594-ule5med3e28m5gj1rsnhj5mfrecnscog.apps.googleusercontent.com';
const CLIENT_ID = env.google_client_id;
// const CLIENT_SECRET = 'AY9RiZTRwGVi9W9jObsj4IjH';
const CLIENT_SECRET = env.google_client_secret;
const REDIRECT_URL = env.google_refresh_token;
// const REFRESH_TOKEN = '1//04ooRl1ti-6piCgYIARAAGAQSNwF-L9IrQ20wfwZWKGcwg_CJAz0qlJAd2gsTrv4QPZeBBY-mLrxF5VlYWHczn9ZjWtKcciYymEI';
const REFRESH_TOKEN = env.google_refresh_token;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        type: 'OAuth2',
        user: 'asktheblockchainschool@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: oAuth2Client.getAccessToken()
    },
    port: false
});


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