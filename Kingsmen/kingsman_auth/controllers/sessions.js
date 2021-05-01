//ROUTES FOR NEW SESSION

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

//CREATE NEW USER
router.get('/new', (req, res) => {
    res.render('./sessions/new.ejs');
  });
  
// router.post('/', (req, res) => {
//     User.match(req.body, (err, createdUser) => {
//         res.redirect('/')
//     })
// })

// router.get('/any', (req, res) => {
//     if (req.session.login === 'password') {
//         console.log('it matches!')
//     } else {
//         console.log('not a match!')
//     }
//     res.redirect('/')
// })

router.post('/', (req, res) => {
    User.find({'username': req.body.username}, (err,
        foundUser) => {
            console.log(foundUser[0].password)
            if (req.body.password === foundUser[0].password) {
                res.redirect('/room')
            } else {
                res.send('login failed')
            }
        });
    console.log(req.body);
})

module.exports = router;