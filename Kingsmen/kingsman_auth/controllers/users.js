//ROUTES FOR USERS/NEW TO CREATE NEW USER

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//CREATE NEW USER
router.get('/new', (req, res) => {
    res.render('./users/new.ejs');
  });
  
router.post('/new', (req, res) => {
    users.create(req.body, () => {
        res.redirect('/')
    })
})

module.exports = router;