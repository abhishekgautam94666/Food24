import Order from "../models/order.model.js"
import Shop from "../models/shop.model.js"

export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        if (!cartItems || cartItems.length === 0) {
            return res.status.json({ message: "Cart is empty" })
        }
        if (
            !deliveryAddress.text ||
            !deliveryAddress.latitude ||
            !deliveryAddress.longitude
        ) {
            return res.status(400).json({
                message: "Please select delivery address"
            });
        }
        const groupItemByShop = {

        }

        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemByShop[shopId]) {
                groupItemByShop[shopId] = []
            }
            groupItemByShop[shopId].push(item)
        });

        const shopOrders = await Promise.all(Object.keys(groupItemByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({ message: "Restaurant  not found" })
            }
            const items = groupItemByShop[shopId]




            const subtotal = items.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name

                }))
            }
        }))

        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            paymentStatus:
                paymentMethod === "cod" ? "pending" : "paid",
            deliveryAddress,
            totalAmount,
            shopOrders
        })
        console.log("newOrder", newOrder);
        //newOrder.populate("shopOrders.shopOrderItems.item", "name image price")

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            newOrder,

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to place order. Please try again.",
        });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 }).populate("shopOrders.shop", "name").populate("shopOrders.owner", "fullName email mobile").populate("shopOrders.shopOrderItems.item", "name image price")
        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: `Get user orders error: ${error.message}` })
    }
}

export const getOwnerOrder = async (req, res) => {
    try {
        const orders = await Order.find({ "shopOrders.owner": req.userId }).sort({ createdAt: -1 }).populate("shopOrders.shop", "name").populate("user", "fullName email mobile").populate("shopOrders.shopOrderItems.item", "name image price")

        // console.log("orders 232", orders);


        const filtereOrder = orders.map((order) => ({
            _id: order._id,
            paymentMethod: order.paymentMethod,
            Status: order.shopOrders.Status,
            user: order.user,
            shopOrders: order.shopOrders.find(o => o.owner._id == req.userId),
            createdAt: order.createdAt

        }))
        //   console.log("orders 501", filtereOrder);

        return res.status(200).json({
            success: true,
            orders: filtereOrder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: `Get user orders error: ${error.message}` })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body

        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        const shopOrder = order.shopOrders.find(o => o.shop.toString() == shopId)
        if (!shopOrder) {
            return res.status(400).json({ success: false, message: "shop order not found" })
        }
        shopOrder.status = status
        await order.save()

        console.log("shopOrder", shopOrder);

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            status: shopOrder.status
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Unable to update order status"
        });
    }
};
