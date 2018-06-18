var express = require('express');
var router = express.Router();
const {mongoose} = require('../database/mongoose');
const {User} = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const Tesseract = require('tesseract.js');

const userControl = require('../controllers/usersControl');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  } 
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
  {
    cb(null, true); //accept the file uploaded
  }
  else
  {
    cb(new Error('message'), false); //reject the file uploaded
  }    
};

const upload = multer({storage: storage, limits: {
  filesize: 1024 * 1024 * 5
},
fileFilter: fileFilter}); //add id_user

//signup User
router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then( user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Email already exist',
      })
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message:err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          }); 
          user.save().then( result => {
            console.log(result);
            res.status(201).json({
              message: 'User Created',
              userCreated: user
            })
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              message:err
            });
          });
        } 
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message:err
    });
  });
});

//User login
router.post( '/login', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    } 
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        const token = jwt.sign({email: user[0].email,
        userId: user[0]._id}, 'secretkey213$', {expiresIn: "1h"}
        );
        return res.status(200).json({
          message: 'Auth successful',
          token: token,
          userId: user._id
        });
      }
    }); 
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});


// POST Users
router.post('/', checkAuth, upload.single('productImage'), function(req, res, next) {

  console.log(req.file);
  var user = new User ({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    productImage: req.file.path
  });

  user.save().then( (newuser) => {

    Tesseract.create({ langPath: "../eng.traineddata" })
    .recognize('./' + req.file.path, 'eng')
    .progress(function(packet){
        console.info(packet)
        })
    .then(function(result){
      console.log(result.text)
      res.send(newuser);
    })
    .catch(err => console.log(err));
    
  }, (error) => {
    res.status(400).send(error);
  })

})


/* GET users listing. */
router.get('/', checkAuth, userControl.get_all_users);


router.delete('/:userId', (req, res, next) => {
  User.remove({_id: req.params._id})
  .exec()
  .then( result => {
    res.status(200).json({
      message: 'user deleted'
    })
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

module.exports = router;

