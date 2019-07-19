const bcrypt = require('bcrypt')

const User = require('../models/User')
const Home = require('../models/Home')
const JWT = require('../util/jwt')

exports.test = function (req, res, next) {
    res.send('respond with a resource');
}

/**
 * to register an account
 * @param {String} first_name - first name
 * @param {String} last_name - last name
 * @param {String} email - email
 * @param {String} password - password
 * @param {String} permission_id - permssion is to identify what action can be done bu user
 * @param {String} home_id - id of item
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
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
                console.log(createResult)
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


/**
 * to login accoutn
 * @param {String} email - email
 * @param {String} password - password
 * @returns {String} token - a token will be returned
 * @throws {systemError} system error
 */
exports.login = async (req, res) => {
    let { email, password } = req.body;
    try {
        var userResult = await User.findOne({ where: { email } });
        console.log(userResult)
        if (userResult) {
            if (bcrypt.compareSync(password, userResult.password)) {
                let token = await JWT.genToken(userResult.dataValues)
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


/**
 * to show personal profile
 * @param {String} decoded - The token parse by user 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.profile = async (req, res) => {
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        console.log(userResult)
        if (userResult) {
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
                            permission: userResult.permission_id,
                            home_id: userResult.home_id,
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
                            email: userResult.email,
                            permission: userResult.permission_id
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
                        email: userResult.email,
                        permission: userResult.permission_id
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


/**
 * to edit personal info
 * @param {String} decoded - The token parse by user 
 * @param {String} first_name - first name
 * @param {String} last_name - last name
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.edit = async (req, res) => {
    let { first_name, last_name } = req.body
    let decoded = req.decoded
    try {
        let userResult = await User.findOne({ where: { email: decoded.email } })
        if (userResult) {
            let result = await userResult.update({ first_name, last_name })
            console.log(`result :   ${result}`)
            if (result) {
                res.status(200).json({ success: true, message: 'success' })
            } else {
                res.status(400).json({ success: false, message: 'failed' })
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


/**
 * to delete user
 * @param {String} decoded - The token parse by user 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
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


/**
 * to edit member's permission
 * @param {String} decoded - The token parse by user 
 * @param {number} id - id of user
 * @param {number} permission_id - permission level
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.editMemberPermission = async (req, res) => {
    let { id, permission_id } = req.body
    let decoded = req.decoded
    try {
        let member = await User.findOne({ where: { id } })
        console.log(member)
        if (member) {
            let result = await member.update({ permission_id })
            console.log(result)
            if (result) {
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


/**
 * to show all users for admin only
 * @param {String} decoded - The token parse by user 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.getAllUsers = async (req, res) => {
    let decoded = req.decoded
    try {
        let userResult = await User.findAll()
        console.log(userResult)
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


/**
 * to show all members' profile
 * @param {String} decoded - The token parse by user 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.getMemberProfiles = async (req, res) => {
    let decoded = req.decoded
    try {
        if (decoded.home_id != null) {
            let memberResult = await User.findAll({ where: { home_id: decoded.home_id } })
            console.log(memberResult)
            if (memberResult) {
                res.status(200).json({ success: true, message: 'family members profiles', data: memberResult })
            } else {
                res.status(400).json({ success: false, message: 'You do not have family members.' })
            }
        } else {
            res.status(400).json({ success: false, message: 'You do not have a home record, please create a home first.' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}