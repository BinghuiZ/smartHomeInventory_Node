var nanoid = require('nanoid')

const User = require('../models/User')
const Home = require('../models/Home')

process.env.SECRET_KEY = 'secret.BenFYP'

exports.pairHome = async (req, res) => {
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
}

exports.createHome = async (req, res) => {
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
}

exports.removeHome = async (req, res) => {
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
}