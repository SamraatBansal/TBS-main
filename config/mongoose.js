const mongoose = require('mongoose');
const env = require('../config/environment')
// const mongoURI = "mongodb+srv://samraat:Samraat@7@cluster0.uxnjj.mongodb.net/hiring_block_db?retryWrites=true&w=majority";
// mongoose.connect('mongodb://localhost/waitlist_db', {useNewUrlParser: true});

const mongoURI = env.db;
let options = {
    user: env.mongo_user,
    pass: env.mongo_pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(mongoURI, options)
// // mongoURI || 
// // || 'mongodb://localhost/hiring_block_db'
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database'));

db.once('open', function(){
    console.log('Successfully connected to the database');
})

module.exports = db;