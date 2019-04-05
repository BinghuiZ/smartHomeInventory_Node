const HouseStock = require('../models/House_stock')
const HouseStockItems = require('../models/House_stock_items')
const Items = require('../models/Item')

exports.createHouseStock = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            console.log(`houseStockResult :   ${houseStockResult}`)
            if (!houseStockResult) {
                var createResult = HouseStock.create({ home_id })
                console.log(`createResult   :   ${createResult}`)
                res.status(200).json({ success: true, message: 'create success', data: createResult })
            } else {
                res.status(400).json({ success: false, message: 'House Stock already exist, every home has only one shopping list.' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.removeHouseStock = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            if (houseStockResult) {
                let result = await HouseStock.destroy({ where: { home_id } })

                if (result) {
                    console.log(result)
                    res.status(200).json({ success: true, message: 'House Stock delete success', data: result })
                } else {
                    console.log(result)
                    res.status(400).json({ success: false, message: 'House Stock delete fail', data: result })
                }

            } else {
                res.status(400).json({ success: false, message: 'House Stock not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.addItemToHouseStock = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { barcode, quantity } = req.body
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            console.log(`houseStockResult :   ${houseStockResult}`)
            if (houseStockResult) {

                let stock_id = houseStockResult.stock_id
                console.log(`stock_id    :   ${stock_id}`)
                let HSIResult = await HouseStockItems.findOne({ where: { stock_id, barcode } })
                console.log(`HSIResult  :   ${HSIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (!HSIResult) {

                    let createResult = await HouseStockItems.create({ stock_id, barcode, quantity })
                    console.log(`createResult   :   ${createResult}`)
                    res.status(200).json({ success: true, message: 'create new house stock item', data: createResult })

                } else { 

                    let newQuantity = quantity + HSIResult.quantity
                    let result = await HSIResult.update({ quantity: newQuantity })
                    console.log(result)
                    if (result) {
                        res.status(200).json({ success: true, message: 'resupply house stock item success.', data: result })
                    } else {
                        res.status(400).json({ success: true, message: 'resupply house stock item failed.', data: result })
                    }

                } 

            } else {
                res.status(400).json({ success: false, message: 'House Stock not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.getAllHouseStockItems = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            console.log(`houseStockResult :   ${houseStockResult}`)
            if (houseStockResult) {

                let stock_id = houseStockResult.stock_id
                console.log(`stock_id    :   ${stock_id}`)
                let HSIResult = await HouseStockItems.findAll({ where: { stock_id } })
                console.log(`HSIResult  :   ${HSIResult}`)
                console.log(HSIResult.length)
                
                if (HSIResult.length > 0) {

                    let data = []
                    for (var i in HSIResult) {
                        let temp = HSIResult[i]
                        let itemResult = await Items.findOne({ where: { barcode: temp.barcode } })
                        
                        if (itemResult) {
                            data.push({
                                stock_id: temp.stock_id,
                                quantity: temp.quantity,
                                barcode: temp.barcode,
                                name: itemResult.name,
                                image: itemResult.image,
                            })
                        } 

                    }
                    
                    res.status(200).json({ success: false, message: 'All House Stock Items', data: data })

                } else {
                    res.status(400).json({ success: false, message: 'Your HouseStock is empty, please add item to your stock', data: SLIResult })
                }

            } else {
                res.status(400).json({ success: false, message: 'House stock not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.removeHouseStockItem = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { barcode } = req.body
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            console.log(`houseStockResult :   ${houseStockResult}`)
            if (houseStockResult) {

                let stock_id = houseStockResult.stock_id
                console.log(`stock_id    :   ${stock_id}`)
                let HSIResult = await HouseStockItems.findOne({ where: { stock_id, barcode } })
                console.log(`HSIResult  :   ${HSIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (HSIResult) {
                    console.log(`HSIResult  :   ${HSIResult.dataValues}`)
                    let result = await HouseStockItems.destroy({ where: { stock_id, barcode } })
                    console.log(`result :   ${result}`)

                    if (result) {
                        res.status(200).json({ success: true, message: 'remove success', data: result })
                    } else {
                        res.status(400).json({ success: false, message: 'remove fail', data: result })
                    }

                } else {
                    res.status(400).json({ success: false, message: 'item does not in your house stock', data: { barcode: barcode } })
                }

            } else {
                res.status(400).json({ success: false, message: 'House Stock not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}

exports.usedHouseStockItem = async (req, res) => {
    let decoded = req.decoded
    let home_id = decoded.home_id
    let { barcode } = req.body
    try {
        if (home_id != null) {
            let houseStockResult = await HouseStock.findOne({ where: { home_id } })
            console.log(`houseStockResult :   ${houseStockResult}`)
            if (houseStockResult) {

                let stock_id = houseStockResult.stock_id
                console.log(`stock_id    :   ${stock_id}`)
                let HSIResult = await HouseStockItems.findOne({ where: { stock_id, barcode } })
                console.log(`HSIResult  :   ${HSIResult}`)
                let ItemResult = await Items.findOne({ where: { barcode } })
                console.log(`ItemResult :   ${ItemResult}`)

                if (!ItemResult) {
                    res.status(400).json({ success: false, message: 'this item is not exist', data: { barcode: barcode } })
                }

                if (HSIResult) {
                    let quantity = HSIResult.quantity - 1
                    console.log(`quantity   :   ${quantity}`)
                    let result = await HSIResult.update({ quantity })
                    console.log(`result :   ${result}`)

                    if (result) {
                        res.status(200).json({ success: true, message: 'update success', data: result })
                    } else {
                        res.status(400).json({ success: false, message: 'update fail', data: result })
                    }

                } else {
                    res.status(400).json({ success: false, message: 'item does not in your house stock', data: { barcode: barcode } })
                }

            } else {
                res.status(400).json({ success: false, message: 'House Stock not found' })
            }
        } else {
            res.status(400).json({ success: false, message: 'No Home record, Please create or pair home first.' })
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, message: 'system error' })
    }
}