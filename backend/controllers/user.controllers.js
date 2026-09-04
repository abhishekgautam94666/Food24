import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ message: 'userId is not found' })
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: 'user is not found' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` })
    }
}


export const updateUserLocation = async (req, res) => {
    try {
        const { lat, lon } = req.body

        console.log("Received:", lat, lon);
        console.log("User ID:", req.userId);

        const user = await User.findByIdAndUpdate(req.userId, {
            location: {
                type: "Point",
                coordinates: [Number(lon), Number(lat)]
            }
        }, { new: true })
        if (!user) {
            return res.status(400).json({ message: "user is not found" })
        }
        return res.status(200).json({
            success: true,
            message: "Location updated",
            location: user.location
        });
    } catch (error) {
        console.log("Location update error:", error);

        return res.status(500).json({
            success: false,
            message: `Update location user error ${error.message}`
        });
    }
}
