var express = require('express');
var router = express.Router();
const {mongoose} = require('../database/mongoose');
const {User} = require('../models/user');


// POST Users
router.post('/', function(req, res, next) {

  var user = new User ({
    name: req.body.name,
    email: req.body.email
  });

  user.save().then( (newuser) => {
    res.send(newuser);
  }, (error) => {
    res.status(400).send(error);
  })

})


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');

  User.find().then((user)=>{
    res.status(200).json({
      userfound: user
    });
  }, (error) => {
      res.status(400).send(err);
  });

});

module.exports = router;
