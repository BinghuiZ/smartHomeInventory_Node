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
        let token = jwt.sign(userResult.dataValues, process.env.SECRET_KEY, {
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

router.use( async(req, res, next) => {
  let token = req.body.token
  try {
    if (token) {
      await jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
        if (err) {
          res.status(400).json({success: false, message: 'Token not valid.'})
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      res.status(403).send({
        success: false,
        message: 'No token provided'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

router.put('/edit', async(req, res) => {
  let { name } = req.body
  let decoded = req.decoded
  try {
    let userResult = await User.findOne({ where: {email: decoded.email}})
    if (userResult) {
      let result = await userResult.update({name})
      if (result > 0) {
        console.log(result)
        res.send(result)
      } else {
        console.log(result)
        res.send(result)
      }
    } else {
      console.log('user not found')
    }
      
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

router.delete('/deleteUser', async(req, res) => {
  let decoded = req.decoded
  try {
    let userResult = await User.findOne({ where: {email: decoded.email}})
    if (userResult) {
      let result = await User.destroy({ where: {email: userResult.email}})
      if (result) {
        console.log(result)
        res.json(result)
      } else {
        console.log(result)
        res.json(result)
      }
    } else {
      console.log('user not found')
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

module.exports = router;
