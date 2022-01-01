const mongoose = require('mongoose');

const polkadotWaitlistSchema = new mongoose.Schema({
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
    knowledgeOfPolkadot:{
        type: String,
        required: true
    },
    referrals:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PolkadotWaitlist'
        }
    ],
    referrerID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PolkadotWaitlist'
    },
    referralCode:{
        type: String
    }   
}, {
    timestamps: true,
    });


const PolkadotWaitlist = mongoose.model('PolkadotWaitlist', polkadotWaitlistSchema);

module.exports = PolkadotWaitlist;