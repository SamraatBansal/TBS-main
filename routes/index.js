const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');
const resourceController = require('../controllers/resource_controller.js');
// router.use('/user',require('./user'));
// router.use('/Job', require('./posts'));
// router.use('/user_profile', require('./user_profile'));
router.get('/', homeController.home);
router.get('/aboutUs', homeController.aboutUs);
router.get('/contact', homeController.contact);
router.post('/contact_form', homeController.contactFormSubmit);

router.get('/resources', resourceController.resources);

module.exports = router;