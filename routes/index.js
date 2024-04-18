var express = require('express');
var router = express.Router();
var login = require('../controller/logincontroller');


router.post('/',login.insert_data);
router.post('/login', login.login_user);


module.exports = router;
