var express = require('express');
var router = express.Router();
const cors = require('cors')

const user_controller  = require('../controllers/users')
const authCheck = require('../util/authCheck')

router.use(cors())

/* GET users listing. */
router.get('/', user_controller.test);
router.post('/register', user_controller.register)
router.post('/login', user_controller.login)

/* check logon & token valid */
router.use(authCheck.authCheck)

router.get('/profile', user_controller.profile)
router.put('/edit', user_controller.edit)
router.delete('/deleteUser', user_controller.deleteUser)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE1)



/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE2)

router.put('/editMemberPermission', user_controller.editMemberPermission)
router.get('/getMemberProfiles', user_controller.getMemberProfiles)

/* admin only  */
router.use(authCheck.permissionLevelEQ3)

router.get('/getAllUsers', user_controller.getAllUsers)


module.exports = router;
