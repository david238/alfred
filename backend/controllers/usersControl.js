const {User} = require('../models/user');

exports.get_all_users  = (req, res, next) => {
    // res.send('respond with a resource');
    User.find().then((user)=>{
      res.status(200).json({
        userfound: user
      });
    }, (error) => {
        res.status(400).send(err);
    });

  }

  