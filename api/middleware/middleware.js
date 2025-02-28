import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const middleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Auth Error" });

        // Verify token using the secret key
        const decoded = jwt.verify(token, "scretkeyofnotepadapp@123#");

        if (!decoded) return res.status(401).json({ message: "Wrong token" });

        // Find user by decoded ID
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        // Attach user information to the request object
        const newUser = { id: user._id, name: user.name };
        req.user = newUser; // Corrected the assignment to req.user

        // Proceed to next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).json({ message: "Please login" });
    }
};

export default middleware;
