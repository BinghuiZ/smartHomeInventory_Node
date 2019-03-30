const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Home = require('../models/Home')

process.env.SECRET_KEY = 'secret.BenFYP'

exports.test = function (req, res, next) {
    res.send('respond with a resource');
}

exports.register = async (req, res) => {
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
}

exports.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        var userResult = await User.findOne({ where: { email } });
        if (userResult) {
            if (bcrypt.compareSync(password, userResult.password)) {
                let token = jwt.sign(userResult.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.status(200).json({ success: true, message: 'success', data: token })
            }
        } else {
            res.status(400).json({ success: false, message: 'User does not exist!' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.profile = async (req, res) => {
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        if (userResult) {

            console.log(userResult.dataValues)
            if (userResult.home_id != null) {
                let homeResult = await Home.findOne({ where: { home_id: userResult.home_id } })

                if (homeResult) {
                    res.status(200).json({
                        success: true,
                        message: 'profile with home info',
                        data: {
                            first_name: userResult.first_name,
                            last_name: userResult.last_name,
                            email: userResult.email,
                            address: homeResult.address,
                            latitude: homeResult.latitude,
                            longitude: homeResult.longitude
                        }
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'home cannot been found',
                        data: {
                            first_name: userResult.first_name,
                            last_name: userResult.last_name,
                            email: userResult.email
                        }
                    })
                }

            } else {
                res.status(200).json({
                    success: true,
                    message: 'profile',
                    data: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email
                    }
                })
            }

        } else {
            console.log('user not found')
            res.status(400).json({ success: false, message: 'user not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.edit = async (req, res) => {
    let { first_name, last_name } = req.body
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        if (userResult) {
            let result = await userResult.update({ first_name, last_name })
            if (result = 1) {
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
}

exports.deleteUser = async (req, res) => {
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
}

exports.editMemberPermission = async (req, res) => {
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
}

exports.getAllUsers = async (req, res) => {
    let decoded = req.decoded
    try {
        let userResult = await User.findAll()
        if (userResult) {

            res.status(200).json({ success: true, message: '', data: userResult })

        } else {
            console.log('user not found')
            res.status(400).json({ success: false, message: 'user not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}