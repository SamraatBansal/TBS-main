const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


// const logDirectory = path.join(__dirname, '../production_logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: logDirectory
// });



const development = {
    name: 'development',
    asset_path: 'static',
    // session_cookie_key: 'blahsomething',
    db: 'mongodb+srv://anmol:anmol123@cluster0.myzqs.mongodb.net/',
    db_uri: "mongodb+srv://anmol:anmol123@cluster0.myzqs.mongodb.net/keepAlive=true&poolSize=30&autoReconnect=true&socketTimeoutMS=360000&connectTimeoutMS=360000?ssl=true&ssl_cert_reqs=CERT_NONE",
    google_client_id: "1057271008763-fik1k4g2kl5man96m96qai4hf0ubt0ol.apps.googleusercontent.com",
    google_client_secret: "zDcHEIgtDyc-fJtCFUYM_GGH",
    google_redirect_url: "https://developers.google.com/oauthplayground",
    google_refresh_token: "1//043NIDmwe9C9VCgYIARAAGAQSNwF-L9IrvpLvqPa_D--h6CjcwKc7LYw6x9FzyC4eIn6WJGaq9f3U3UR4oY7LKb4aW_6oDAwp1gk",
    sendgrid_api_key: "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",
    mongo_user:"samraat",
    mongo_pass:"Samraat@TBS2021"
    // google_recaptcha_dateSiteKey: "6LcZNCsbAAAAAKnEucGFf1PJxCFzvqapMy4NtjNz",
    // google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    // jwt_secret: 'codeial',
    // morgan: {
    //     mode: 'dev',
    //     options: {stream: accessLogStream}
    // }
}


const production =  {
    name: 'production',
    asset_path: process.env.TBS_ASSET_PATH,
    // session_cookie_key: process.env.TBS_SESSION_COOKIE_KEY,
    db: process.env.TBS_DB,
    db_uri: process.env.TBS_DB_URI,
    sendgrid_api_key: process.env.TBS_SENDGRID,
    mongo_user: process.env.TBS_MONGO_USER,
    mongo_pass: process.env.TBS_MONGO_PASS
        // google_client_id: process.env.TBS_GOOGLE_CLIENT_ID,
    // google_client_secret: process.env.TBS_GOOGLE_CLIENT_SECRET,
    // google_redirect_url: process.env.TBS_GOOGLE_REDIRECT_URL,
    // google_refresh_token: process.env.TBS_GOOGLE_REFRESH_TOKEN,
    // google_recaptcha_dateSiteKey: process.env.TBS_GOOGLE_RECAPTCHA_KEY,
    // morgan: {
    //     mode: 'combined',
    //     options: {stream: accessLogStream}
    // }
}


// module.exports = development;
module.exports = eval(process.env.TBS_ENVIRONMENT) == undefined ? development : eval(process.env.TBS_ENVIRONMENT);