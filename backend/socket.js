import User from "./models/user.model.js";

export const socketHandler = async (io) => {
    io.on('connection', (socket) => {
        console.log("SOCKET CONNECTED:", socket.id);
        socket.on('identity', async ({ userId }) => {
            try {
                const user = await User.findByIdAndUpdate(userId, {
                    socketId: socket.id, isOnline: true
                }, { new: true })

            } catch (error) {
                console.log("IDENTITY ERROR:", error);
            }

        })



        socket.on("disconnect", async () => {
            console.log("SOCKET DISCONNECTED:", socket.id);
            try {
                const user = await User.findOne({ socketId: socket.id })
                if (!user) {
                    console.log("User already offline or not found");
                    return;
                }
                console.log("DISCONNECT USER:", user._id);

                user.socketId = null;
                user.isOnline = false
                await user.save()
                console.log("USER OFFLINE:", user._id);
                console.log("DATABASE:", {
                    socketId: user.socketId,
                    isOnline: user.isOnline
                });

            } catch (error) {
                console.log("DISCONNECT ERROR:", error);

            }
        });

    })
}; 