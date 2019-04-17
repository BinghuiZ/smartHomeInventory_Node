const ShoppingList = require('../models/Shopping_list')
const ShoppingListItems = require('../models/Shopping_list_items')
const Items = require('../models/Item')


/**
 * to create a shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.createShoppingList = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            console.log(`shoplistResult :   ${shoplistResult}`)
            if (!shoplistResult) {
                var createResult = ShoppingList.create({ home_id })
                console.log(`createResult   :   ${createResult}`)
                res.status(200).json({ success: true, message: 'create success', data: createResult })
            } else {
                res.status(400).json({ success: false, message: 'Shopping list already exist, every home has only one shopping list.' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to remove a shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.removeShoppingList = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            if (shoplistResult) {
                let result = await ShoppingList.destroy({ where: { home_id } })

                if (result) {
                    console.log(result)
                    res.status(200).json({ success: true, message: 'Shopping list delete success', data: result })
                } else {
                    console.log(result)
                    res.status(400).json({ success: false, message: 'Shopping list delete fail', data: result })
                }

            } else {
                res.status(400).json({ success: false, message: 'shopping list not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to add item to shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @param {number} purchase_quantity - number to puchase
 * @param {number} resupplyNo - number to resupply 
 * @param {String} barcode - id of item
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.addItemToShoppingList = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { purchase_quantity, resupplyNo, barcode } = req.body
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            console.log(`shoplistResult :   ${shoplistResult}`)
            if (shoplistResult) {

                let list_id = shoplistResult.list_id
                console.log(`list_id    :   ${list_id}`)
                let SLIResult = await ShoppingListItems.findOne({ where: { list_id: list_id, barcode: barcode } })
                console.log(`SLIResult  :   ${SLIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (!SLIResult) {

                    let createResult = await ShoppingListItems.create({ list_id, purchase_quantity, resupplyNo, barcode })
                    console.log('createResult   :   createResult')
                    res.status(200).json({ success: true, message: 'item added to shopping list', data: createResult })

                } else { 

                    res.status(400).json({ 
                        success: false,
                        message: 'This item already in your shopping list',
                        data: {
                            home_id: home_id,
                            list_id: list_id,
                            purchase_quantity: purchase_quantity,
                            resupplyNo: resupplyNo,
                            barcode: barcode
                        }
                    })

                } 

            } else {
                res.status(400).json({ success: false, message: 'shopping list not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to update item status to shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @param {number} purchase_quantity - number to puchase
 * @param {number} resupplyNo - number to resupply 
 * @param {String} barcode - id of item
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.updateItemQuantityAndResupply = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { purchase_quantity, resupplyNo, barcode } = req.body
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            console.log(`shoplistResult :   ${shoplistResult}`)
            if (shoplistResult) {

                let list_id = shoplistResult.list_id
                console.log(`list_id    :   ${list_id}`)
                let SLIResult = await ShoppingListItems.findOne({ where: { list_id: list_id, barcode: barcode } })
                console.log(`SLIResult  :   ${SLIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (SLIResult) {
                    let result = await SLIResult.update({ purchase_quantity, resupplyNo })
                    console.log(`result :   ${result}`)

                    if (result) {
                        res.status(200).json({ success: true, message: 'update success', data: result })
                    } else {
                        res.status(400).json({ success: false, message: 'update fail', data: result })
                    }

                } else {
                    res.status(400).json({ success: false, message: 'item does not in your shopping list', data: { barcode: barcode } })
                }

            } else {
                res.status(400).json({ success: false, message: 'shopping list not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to remove item from shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @param {String} barcode - id of item
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.remvoeItemFromList = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { barcode } = req.body
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            console.log(`shoplistResult :   ${shoplistResult}`)
            if (shoplistResult) {

                let list_id = shoplistResult.list_id
                console.log(`list_id    :   ${list_id}`)
                let SLIResult = await ShoppingListItems.findOne({ where: { list_id: list_id, barcode: barcode } })
                console.log(`SLIResult  :   ${SLIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (SLIResult) {
                    console.log(`SLIResult  :   ${SLIResult.dataValues}`)
                    let result = await ShoppingListItems.destroy({ where: { list_id, barcode } })
                    console.log(`result :   ${result}`)

                    if (result) {
                        res.status(200).json({ success: true, message: 'remove success', data: result })
                    } else {
                        res.status(400).json({ success: false, message: 'remove fail', data: result })
                    }

                } else {
                    res.status(400).json({ success: false, message: 'item does not in your shopping list', data: { barcode: barcode } })
                }

            } else {
                res.status(400).json({ success: false, message: 'shopping list not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to show all items from shopping list
 * @param {String} decoded - The token parse by user 
 * @param {String} home_id - id of home, to search which home 
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.getAllShoppingListItems = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let shoplistResult = await ShoppingList.findOne({ where: { home_id } })
            console.log(`shoplistResult :   ${shoplistResult}`)
            if (shoplistResult) {

                let list_id = shoplistResult.list_id
                console.log(`list_id    :   ${list_id}`)
                let SLIResult = await ShoppingListItems.findAll({ where: { list_id } })
                console.log(`SLIResult  :   ${SLIResult}`)
                console.log(SLIResult.length)
                
                if (SLIResult.length > 0) {

                    let data = []
                    for (var i in SLIResult) {
                        let temp = SLIResult[i]
                        let itemResult = await Items.findOne({ where: { barcode: temp.barcode } })
                        
                        if (itemResult) {
                            data.push({
                                id: temp.id,
                                list_id: temp.list_id,
                                purchase_quantity: temp.purchase_quantity,
                                resupplyNo: temp.resupplyNo,
                                barcode: temp.barcode,
                                name: itemResult.name,
                                image: itemResult.image,
                            })
                        } 

                    }
                    
                    res.status(200).json({ success: false, message: 'shopping list', data: data })

                } else {
                    res.status(400).json({ success: false, message: 'Your shopping list is empty, please add item to your list', data: SLIResult })
                }

            } else {
                res.status(400).json({ success: false, message: 'shopping list not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}