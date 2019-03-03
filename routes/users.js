var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require('../models/User')
router.use(cors())

process.env.SECRET_KEY = 'secret'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', (req, res) => {
//   const userData = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }
//   User.findOne({
//     where: {
//       email: req.body.email
//     }
//   })
//   .then(user => {
//     if(!user) {
//       bcrypt.hash(req.body.password, 10, (err, hash) => {
//         userData.password = hash
//         User.create(userData)
//         .then(user => {
//           res.json({success: true, message: user.email + ' registered'})
//         })
//         .catch(err => {
//           res.send('error: ' + err)
//         })
//       })
//     } else {
//       res.json({success: false, message: 'User already exists!'})
//     }
//   })
//   .catch(err => {
//     res.send('error: ' + err)
//   })
// })

router.post('/register', async (req, res) => {
  let { name, email, password, permission_id, home_id } = req.body;
  try {
    var userResult = await User.findOne({ where: { email } });
    if (!userResult) {
      bcrypt.hash(password, 10, async (err, hash) => {
        password = hash;
        var createResult = await User.create({
          name,
          email,
          password,
          permission_id,
          home_id
        });
        res.status(200).json({ success: true, message: createResult.email + ' registered' })
      })
    } else {
      res.status(400).json({ success: false, message: 'User already exists!' })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' });
  }
})

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  try {
    var userResult = await User.findOne({ where: { email } });
    if (userResult) {
      if (bcrypt.compareSync(password, userResult.password)) {
        let token = jwt.sign(userResult.toJSON(), process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
      }
    } else {
      res.status(400).json({ success: false, message: 'User does not exist!' })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

module.exports = router;
