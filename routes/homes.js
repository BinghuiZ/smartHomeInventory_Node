var express = require('express');
var router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken')
var nanoid = require('nanoid')

const User = require('../models/User')
const Home = require('../models/Home')

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



router.put('/pairHome', async (req, res) => {
    let { home_id } = req.body
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        if (userResult) {
            let result = await userResult.update({ home_id })
            if (result = 1) {
                res.status(200).json({ success: true, message: 'You have successfully joined the family' })
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



router.post('/createHome', async (req, res) => {
    let { address, latitude, longitude } = req.body;
    let decoded = req.decoded
    try {
        // console.log(`lat: ${latitude}, log: ${longitude}`)
        var userResult = await User.findOne({ where: { email: decoded.email } });
        if (userResult) {
            let nanoidResult = nanoid(10)
            var homeResult = await Home.findOne({ where: { address } })

            if (!homeResult) {
                let homeCreateResult = await Home.create({
                    home_id: nanoidResult,
                    address,
                    latitude,
                    longitude
                })
                // console.log(homeCreateResult)
                if (homeCreateResult) {

                    let userUpdateHome = await userResult.update({ home_id: homeCreateResult.home_id })
                    if (userUpdateHome = 1) {
                        res.status(200).json({ success: true, message: `Home has been created, The invitation code is ${homeCreateResult.home_id}` })
                    } else {
                        res.status(400).json({ success: false, message: 'Something occured, Please try again' })
                    }

                } else {
                    res.status(400).json({ success: false, message: 'Something occured, Please try again' })
                }
            } else {
                res.status(400).json({ success: false, message: 'This address has been created. please ask for invitaiton code to join the group' })
            }

        } else {
            res.status(400).json({ success: false, message: 'User not found!' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' });
    }
})



router.delete('/removeHome', async (req, res) => {
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        if (userResult) {
            let home = await Home.destroy({ where: { home_id: userResult.home_id } })
            if (home) {
                console.log(home)
                
                let [userUpdateResult, affectedRows] = await User.update({ home_id: null }, { where: { home_id: userResult.home_id } })
                if (userUpdateResult) {
                    res.status(200).json({ success: true, message: 'Home removed', data: userUpdateResult })
                } else {
                    res.status(400).json({ success: false, message: 'Something occured, Please try again' })
                }

            } else {
                console.log(home)
                res.status(400).json({ success: false, message: 'Home remove fail', data: result })
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