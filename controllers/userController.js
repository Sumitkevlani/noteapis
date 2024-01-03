import User from "../models/userModel.js";
import express from "express";
import validator from "validator";
import sendToken from "../utils/JwtToken.js";


const registerController = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const user = await User.create({
            name,
            email,
            password
        });

        sendToken(user, 201, res);
    }
    catch (error) {
        console.log("Error during registration", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter an email and password." });
        }

        else if (!validator.isEmail(email)) {
            return res.status(401).json({ success: false, message: "Please enter a valid email." });
        }

        else {
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                next(new ErrorHandler("Invalid credentials", 401));
            }

            else {

                const isPasswordMatched = await user.comparePassword(password);

                if (!isPasswordMatched) {
                    return res.status(401).json({ success: false, message: "Invalid credentials." });
                }
                else {
                    sendToken(user, 200, res);
                }

            }
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const logoutController = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { registerController, loginController, logoutController };