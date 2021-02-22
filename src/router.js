const express = require('express')
const router = express.Router()

const {
    getAllUsers,
    user,
  } = require('./controllers');


router.post(`/register`, user.registerNewUser);
//router.post(`/login`, user.loginUser);
//router.get(`/me`, user.getUserDetails);


router.get('/users', getAllUsers);

module.exports = router;
