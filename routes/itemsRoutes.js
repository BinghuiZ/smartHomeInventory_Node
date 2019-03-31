var express = require('express');
var router = express.Router();
const cors = require('cors')

const item_controller  = require('../controllers/items')
const authCheck = require('../util/authCheck')

router.use(cors())

/* check logon & token valid */
router.use(authCheck.authCheck)
router.get('/getAllItems', item_controller.getAllItems)

/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE1)
router.post('/createItem', item_controller.createItem)


/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE2)


/* admin only  */
router.use(authCheck.permissionLevelEQ3)
router.post('/createItemType', item_controller.createItemType)
router.put('/editItemType', item_controller.editItemType)
router.delete('/removeItemType', item_controller.removeItemType)
router.get('/getItemType', item_controller.getItemType)
router.put('/editItem', item_controller.editItem)
router.delete('/removeItem', item_controller.removeItem)


module.exports = router;