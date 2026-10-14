import Order from "./models/order.model.js";
import User from "./models/user.model.js";


export const socketHandler = async (io) => {
    io.on('connection', (socket) => {
        socket.on('identity', async ({ userId }) => {
            try {
                const user = await User.findByIdAndUpdate(userId, {
                    socketId: socket.id, isOnline: true
                }, { new: true })

            } catch (error) {
                console.log("IDENTITY ERROR:", error);
            }


        })

        socket.on("updateLocation", async ({ latitude, longitude, userId }) => {
            console.log(
                "LOCATION UPDATED:",
                userId,
                latitude,
                longitude
            );
            try {
                if (latitude == null || longitude == null || !userId) {
                    console.log("INVALID LOCATION DATA");
                    return
                }
                const user = await User.findByIdAndUpdate(userId, {
                    location: {
                        type: "Point",
                        coordinates: [
                            Number(longitude),
                            Number(latitude)
                        ]
                    },
                    isOnline: true,
                    socketId: socket.id
                }, { new: true });
                console.log("LOCATION SAVED");
                if (user) {
                    io.emit('updateDeliveryLocation', {
                        deliveryBoyId: userId,
                        latitude,
                        longitude
                    })
                }
                console.log(
                    "LOCATION EMITTED:",
                    latitude,
                    longitude
                );

            } catch (error) {
                console.log("UPDATE LOCATION ERROR:", error);
            }
        })

        socket.on("orderDelivered", async ({ orderId, shopOrderId }) => {
            try {
                console.log("Order Delivered Event :", orderId, shopOrderId)

                const order = await Order.findById(orderId);

                if (!order) {
                    console.log("ORDER NOT FOUND");
                    return;

                }

                const customerId = order.user;

                const customer = await User.findById(customerId);

                if (!customer) {
                    console.log("CUSTOMER NOT FOUND");
                    return;

                }

                if (!customer.socketId) {
                    console.log("CUSTOMER SOCKET NOT AVAILABLE");
                    return;

                }

                io.to(customer.socketId).emit("orderDelivered", {
                    orderId,
                    shopOrderId
                })

            } catch (error) {
                console.log("ORDER DELIVERED ERROR:", error);
            }
        })

        socket.on("disconnect", async () => {
            try {
                const user = await User.findOne({ socketId: socket.id })
                if (!user) {
                    console.log("User already offline or not found");
                    return;
                }

                user.socketId = null;
                user.isOnline = false
                await user.save()
            } catch (error) {
                console.log("DISCONNECT ERROR:", error);

            }
        });

    })
}; 