const mongoose = require('mongoose');
// const { stringify } = require('querystring');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');


const nearWaitlistSchema = new mongoose.Schema({
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
    heardAboutNear:{
        type: String,
        required: true
    },
    referrals:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NearWaitlist'
        }
    ],
    referrerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NearWaitlist'
    },
    referralCode:{
        type: String
    }   
}, {
    timestamps: true,
    });


const NearWaitlist = mongoose.model('NearWaitlist', nearWaitlistSchema);

module.exports = NearWaitlist;