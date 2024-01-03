import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const isAuthenticatedUser = async (req, res, next) => {
    console.log(req.cookies);
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({ success: false, message: "Please authenticate yourself." });
    }
    else {
        const { token } = req.cookies;
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findOne({ _id: decodedUser.id });
        next();
    }
};

export default isAuthenticatedUser;