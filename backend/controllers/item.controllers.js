import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body
        let image;

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required"
            });
        }


        image = await uploadOnCloudinary(req.file.path)

        const shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            return res.status(404).json({ message: "shop not found" })
        }
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })
        shop.items.unshift(item._id)
        await shop.save()
        await shop.populate("items owner")
        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({
            message: `add item error ${error.message

                }`

        })
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const updateData = {
            name,
            category,
            foodType,
            price,
        };
        if (image) {
            updateData.image = image;
        }
        const item = await Item.findByIdAndUpdate(itemId,
            updateData,
            { new: true });

        if (!item) {
            return res.status(404).json({ message: "item not found" })
        }
        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: {
                sort: { updatedAt: -1 }
            }

        }).populate("owner")

        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({
            message: `edit item error ${error.message

                }`
        })
    }
}

export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await Item.findById(itemId)
        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({ message: `get item error ${error.message}` })
    }
}


export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findByIdAndDelete(itemId)
        if (!item) {
            return res.status(404).json({ message: "item not found" })
        }
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }
        shop.items = shop.items.filter(i => i.toString() !== item._id.toString())
        await shop.save()
        await shop.populate("items owner")
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({ message: `Delete item error ${error.message}` })
    }
}

export const getItemByCity = async (req, res) => {
    try {


        const { city } = req.params
        if (!city) {
            return res.status(400).json({ message: "city is required" })
        }
        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate('items')

        if (shops.length === 0) {
            return res.status(400).json({ message: "shops not found" })
        }
        const shopIds = shops.map((shop) => shop._id);
        const items = await Item.find({ shop: { $in: shopIds } })

        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({
            message: `Get items by city error ${error.message}`
        });
    }
}