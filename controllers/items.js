const Item_Type = require('../models/item_type')
const Item = require('../models/Item')


/**
 * to create Item Type only for admin
 * @param {String} name - item type name
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.createItemType = async (req, res) => {
    let { name } = req.body
    try {
        let itemTypeResult = await Item_Type.findOne({ where: { name } })
        if (!itemTypeResult) {
            var createResult = Item_Type.create({
                name
            })
            console.log(createResult)
            res.status(200).json({ success: true, message: 'create success', data: createResult })
        } else {
            res.status(400).json({ success: false, message: 'item type already exist' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to edit Item Type only for admin
 * @param {String} name - item type name
 * @param {number} type_id - id
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.editItemType = async (req, res) => {
    let { type_id, name } = req.body
    try {
        let itemTypeResult = await Item_Type.findOne({ where: { type_id } })
        console.log(`itemTypeResult:    ${itemTypeResult}`)
        if (itemTypeResult) {
            let result = await itemTypeResult.update({ name })
            console.log(`result:    ${result}`)
            if (result = 1) {
                res.status(200).json({ success: true, message: 'success', data: result })
            } else {
                res.status(400).json({ success: false, message: 'failed', data: result })
            }            
        } else {
            res.status(400).json({ success: false, message: 'item not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to remove Item Type only for admin
 * @param {number} type_id - id
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.removeItemType = async (req, res) => {
    let { type_id } = req.body
    try {
        let itemTypeResult = await Item_Type.findOne({ where: { type_id } })
        console.log(`itemTypeResult:    ${itemTypeResult}`)
        if (itemTypeResult) {
            let result = await Item_Type.destroy({ where: { type_id } })
            console.log(`result:    ${result}`)
            if (result) {
                res.status(200).json({ success: true, message: 'success', data: result })
            } else {
                res.status(400).json({ success: false, message: 'failed', data: reuslt })
            }            
        } else {
            res.status(400).json({ success: false, message: 'item not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to get Item Type only for admin
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.getItemType = async (req, res) => {
    try {
        let itemTypeResult = await Item_Type.findAll()
        console.log(`itemTypeResult:    ${itemTypeResult}`)
        if (itemTypeResult) {
            res.status(200).json({ success: true, message: 'show all item type', data: itemTypeResult })
        } else {
            res.status(400).json({ success: false, message: 'item not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to create Item
 * @param {number} type_id - type id
 * @param {String} name - item name
 * @param {String} barcode - id of item
 * @param {String} image - path of image
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.createItem = async (req, res) => {
    let { name, barcode, image, type_id } = req.body
    try {
        let itemResult = await Item.findOne({ where: { barcode } })
        if (!itemResult) {
            var createResult = Item.create({
                name,
                barcode,
                image,
                type_id
            })
            console.log(createResult)
            res.status(200).json({ success: true, message: 'create success', data: createResult })
        } else {
            res.status(400).json({ success: false, message: 'item already exist' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to edit Item
 * @param {number} type_id - type id
 * @param {String} name - item name
 * @param {String} barcode - id of item
 * @param {String} image - path of image
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.editItem = async (req, res) => {
    let { name, barcode, image, type_id } = req.body
    try {
        let itemResult = await Item.findOne({ where: { barcode } })
        console.log(`itemResult:    ${itemResult}`)
        if (itemResult) {
            let result = await itemResult.update({ name, barcode, type_id })
            console.log(`result:    ${result}`)
            if (result = 1) {
                res.status(200).json({ success: true, message: 'success', data: result })
            } else {
                res.status(400).json({ success: false, message: 'failed', data: result })
            }            
        } else {
            res.status(400).json({ success: false, message: 'item not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}


/**
 * to reove Item
 * @param {String} barcode - id of item
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.removeItem = async (req, res) => {
    let { barcode } = req.body
    try {
        let itemResult = await Item.findOne({ where: { barcode } })
        console.log(`itemResult:    ${itemResult}`)
        if (itemResult) {
            let result = await Item.destroy({ where: { barcode } })
            console.log(`result:    ${result}`)
            if (result) {
                res.status(200).json({ success: true, message: 'success', data: result })
            } else {
                res.status(400).json({ success: false, message: 'failed', data: reuslt })
            }            
        } else {
            res.status(400).json({ success: false, message: 'item not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

/**
 * to show all Items
 * @returns {json} The response with status code and json
 * @throws {systemError} system error
 */
exports.getAllItems = async (req, res) => {
    try {
        let itemResult = await Item.findAll()
        console.log(`itemTypeResult:    ${itemResult}`)
        console.log(`length:    ${itemResult.length}`)
        if (itemResult) {
            var temp = { temp: [] }
            for (var i in itemResult) {
                var item = itemResult[i]
                // temp.temp.push(item)
                var itemType = await Item_Type.findOne({ where: { type_id: item.type_id } })
                if (itemType) {
                    temp.temp.push({
                        name: item.name,
                        barcode: item.barcode,
                        image: item.image,
                        type_id: item.type_id,
                        type_name: itemType.name
                    })
                } else {
                    res.status(400).json({ success: false, message: 'query problem' })
                }
            }
            res.status(200).json({ success: true, message: 'show all items', data: temp.temp })



            // res.status(200).json({ success: true, message: 'show all items', data: itemResult })
        } else {
            res.status(400).json({ success: false, message: 'no item found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}