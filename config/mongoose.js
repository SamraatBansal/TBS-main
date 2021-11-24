const mongoose = require('mongoose');
const env = require('../config/environment')
// const mongoURI = "mongodb+srv://samraat:Samraat@7@cluster0.uxnjj.mongodb.net/hiring_block_db?retryWrites=true&w=majority";
// mongoose.connect('mongodb://localhost/waitlist_db', {useNewUrlParser: true});
const mongoURI = "mongodb://116.202.96.218/TBS_waitlist_db?authSource=admin"
// const mongoURI = "mongodb://localhost/TBS_main_db"
// const mongoURI = "mongodb+srv://alphaUser:123@tbs-dashboard-test.2euj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let options = {
    user: "samraat",
    pass: "Samraat@TBS2021",
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// mongoose.connect(env.db, {useNewUrlParser: true,useUnifiedTopology: true,
//     useCreateIndex: true, });
// // mongoURI || 
// // || 'mongodb://localhost/hiring_block_db'
mongoose.connect(mongoURI, options)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function(){
    console.log('Successfully connected to the database');
})

module.exports = db;