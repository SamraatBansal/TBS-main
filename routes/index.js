const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');
const resourceController = require('../controllers/resource_controller.js');
const waitlistController = require('../controllers/waitlist_controller.js')
// router.use('/user',require('./user'));
// router.use('/Job', require('./posts'));
// router.use('/user_profile', require('./user_profile'));
router.get('/', homeController.home);
router.get('/aboutUs', homeController.aboutUs);
router.get('/contact', homeController.contact);
router.post('/contact_form', homeController.contactFormSubmit);

router.get('/resources', resourceController.resources);

// router.get('/referral/:code', waitlistController.referral);


router.get('/nearprogram', waitlistController.landingNear);
router.get('/tezosprogram', waitlistController.landingTezos);
router.get('/polkadotprogram', waitlistController.landingPolkadot);

// Waitlist
router.get('/polkadotprogram/waitlist/:code', waitlistController.waitlist);
router.get('/polkadotprogram/waitlist', waitlistController.waitlist);
router.post('/waitlist-form/registration', waitlistController.registration )

// router.post('/waitlist-from/registration/:code', waitlistController.referralRegistration)
//waitlist end



// router.get('/error', function(req, res){
//     return res.render('error', {
//         title: "Error"
//     })
// })


module.exports = router;