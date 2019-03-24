var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Home = require('../models/Home')

router.use(cors())

process.env.SECRET_KEY = 'secret.BenFYP'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  let { first_name, last_name, email, password, permission_id, home_id } = req.body;
  try {
    var userResult = await User.findOne({ where: { email } });
    if (!userResult) {
      bcrypt.hash(password, 10, async (err, hash) => {
        password = hash;
        var createResult = await User.create({
          first_name,
          last_name,
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

router.use(async (req, res, next) => {
  let token = req.body.token
  try {
    if (token) {
      await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.status(400).json({ success: false, message: 'Token not valid.' })
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

router.put('/edit', async (req, res) => {
  let { first_name, last_name } = req.body
  let decoded = req.decoded
  try {
    let userResult = await User.findOne({ where: { email: decoded.email } })
    if (userResult) {
      let result = await userResult.update({ first_name, last_name })
      if (result > 0) {      
        res.status(200).json({ success: true, message: 'success' })
      } else {      
        res.status(400).json({ success: false, message: 'failed' })
      }
    } else {
      console.log('user not found')
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

router.delete('/deleteUser', async (req, res) => {
  let decoded = req.decoded
  try {
    let userResult = await User.findOne({ where: { email: decoded.email } })
    if (userResult) {
      let result = await User.destroy({ where: { email: userResult.email } })
      if (result) {
        console.log(result)
        res.status(200).json({ success: true, message: 'User delete success', data: result })
      } else {
        console.log(result)
        res.status(400).json({ success: false, message: 'User delete fail', data: result })
      }
    } else {
      console.log('user not found')
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(async (req, res, next) => {
  let decoded = req.decoded
  try {
    if (decoded) {
      if (decoded.permission_id > 1) {
         next()
      } else {
        res.status(400).json({ success: false, message: 'Permission Denied' })
      }
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

router.put('/editMemberPermission', async (req, res) => {
  let { id, permission_id } = req.body
  let decoded = req.decoded
  try {
    let member = await User.findOne({ where: { id } })
    if (member) {
      let result = await member.update({ permission_id })
      // console.log(`result    :   ` )
      // console.log(result)
      if (result = 1) {
        res.status(200).json({ success: true, message: 'update success', data: result })
      } else {
        res.status(400).json({ success: false, message: 'something error' })
      }
    } else {
      res.status(400).json({ success: false, message: 'user not found' })
    }

  } catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: 'system error' })
  }
})

module.exports = router;
