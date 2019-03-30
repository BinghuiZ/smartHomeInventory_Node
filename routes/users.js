var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')

const user_controller  = require('../controllers/users')

router.use(cors())

process.env.SECRET_KEY = 'secret.BenFYP'

/* GET users listing. */
router.get('/', user_controller.test);
router.post('/register', user_controller.register)
router.post('/login', user_controller.login)

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

router.get('/profile', user_controller.profile)
router.put('/edit', user_controller.edit)
router.delete('/deleteUser', user_controller.deleteUser)

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

router.put('/editMemberPermission', user_controller.editMemberPermission)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(async (req, res, next) => {
  let decoded = req.decoded
  try {
    if (decoded) {
      if (decoded.permission_id > 2) {
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



/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(async (req, res, next) => {
  let decoded = req.decoded
  try {
    if (decoded) {
      if (decoded.permission_id = 3) {
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



router.get('/getAllUsers', user_controller.getAllUsers)


module.exports = router;
