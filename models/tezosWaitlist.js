const mongoose = require('mongoose');
// const { stringify } = require('querystring');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');


const tezosWaitlistSchema = new mongoose.Schema({
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
    knowledgeOfTezos:{
        type: String,
        required: true
    },
    referrals:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TezosWaitlist'
        }
    ],
    referrerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TezosWaitlist'
    },
    referralCode:{
        type: String
    }   
}, {
    timestamps: true,
    });


const TezosWaitlist = mongoose.model('TezosWaitlist', tezosWaitlistSchema);

module.exports = TezosWaitlist;