var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')

const home_controller = require('../controllers/homes')

router.use(cors())

process.env.SECRET_KEY = 'secret.BenFYP'


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

router.put('/pairHome', home_controller.pairHome)

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



router.post('/createHome', home_controller.createHome)
router.delete('/removeHome', home_controller.removeHome)

module.exports = router;