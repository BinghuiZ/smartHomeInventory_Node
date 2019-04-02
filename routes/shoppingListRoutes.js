var express = require('express');
var router = express.Router();
const cors = require('cors')

const shoppingList_controller  = require('../controllers/shoppingList')
const authCheck = require('../util/authCheck')

router.use(cors())

/* check logon & token valid */
router.use(authCheck.authCheck)


/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE1)


/* permission 0: check stock, 1: udpate inventory record, 2: can edit shopping list & place order 3: admin permission  */
router.use(authCheck.permissionLevelGE2)
router.post('/createShoppingList', shoppingList_controller.createShoppingList)
router.delete('/removeShoppingList', shoppingList_controller.removeShoppingList)
router.post('/addItemToShoppingList', shoppingList_controller.addItemToShoppingList)
router.put('/updateItemQuantityAndResupply', shoppingList_controller.updateItemQuantityAndResupply)
router.delete('/remvoeItemFromList', shoppingList_controller.remvoeItemFromList)

/* admin only  */
router.use(authCheck.permissionLevelEQ3)

module.exports = router;