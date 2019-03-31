var express = require('express');
var router = express.Router();
const cors = require('cors')

const home_controller = require('../controllers/homes')
const authCheck = require('../util/authCheck')

router.use(cors())

router.use(authCheck.authCheck)

router.put('/pairHome', home_controller.pairHome)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE1)


router.post('/createHome', home_controller.createHome)
router.delete('/removeHome', home_controller.removeHome)

module.exports = router;