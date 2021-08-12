const mongoose = require('mongoose');
// const { stringify } = require('querystring');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');


const waitlistSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required:true
    },
    full_phone:{
        type: String,
        unique: true
    },
    understandingLevel:{
        type: Number, 
        required: true
    },
    field: {
        type: String,
        required:true
    },
    polygonKnowledge:{
        type: String,
        required: true
    },
    referrals:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Waitlist'
        }
    ],
    referralCode:{
        type: String
    }   
}, {
    timestamps: true,
    });


const Waitlist = mongoose.model('Waitlist', waitlistSchema);

module.exports = Waitlist;