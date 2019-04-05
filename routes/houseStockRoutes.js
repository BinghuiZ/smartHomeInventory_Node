var express = require('express');
var router = express.Router();
const cors = require('cors')

const houseStock_controller = require('../controllers/houseStock')
const authCheck = require('../util/authCheck')

router.use(cors())

/* check logon & token valid */
router.use(authCheck.authCheck)
router.get('/getAllHouseStockItems', houseStock_controller.getAllHouseStockItems)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE1)
router.post('/addItemToHouseStock', houseStock_controller.addItemToHouseStock)
router.put('/usedHouseStockItem', houseStock_controller.usedHouseStockItem)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE2)
router.post('/createHouseStock', houseStock_controller.createHouseStock)
router.delete('/removeHouseStock', houseStock_controller.removeHouseStock)
router.delete('/removeHouseStockItem', houseStock_controller.removeHouseStockItem)


/* admin only  */
router.use(authCheck.permissionLevelEQ3)

module.exports = router;