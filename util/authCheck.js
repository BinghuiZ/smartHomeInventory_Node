var JWT = require('./jwt')

exports.authCheck = async (req, res, next) => {
    console.log(req.headers)
    let token = req.body.token || req.headers.authorization
    try {
        if (typeof token !== 'undefined') {
            let decoded = await JWT.verifyToken(token)
            if (decoded) {
                req.decoded = decoded
                next()
            } else {
                res.status(400).json({ success: false, message: 'Token not valid.' })
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
}

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
exports.permissionLevelGE1 = async (req, res, next) => {
    let decoded = req.decoded
    try {
        if (decoded) {
            if (decoded.permission_id >= 1) {
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
}

exports.permissionLevelGE2 = async (req, res, next) => {
    let decoded = req.decoded
    try {
        if (decoded) {
            if (decoded.permission_id >= 2) {
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
}

exports.permissionLevelEQ3 = async (req, res, next) => {
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
}