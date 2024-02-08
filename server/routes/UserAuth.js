const express = require("express");
const UserModel = require("../models/User");
const userRoutes = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

userRoutes.post("/register", async (req, res) => {
    try {
        // connection check
        if(mongoose.connection.readyState !== 1){
            res.status(201).json({
                status: "true",
                message: "Database not connected."
            })
            return
        }

        const { username, password } = req.body;

        // User exist check
        const userExist = await UserModel.findOne({ username });
        if (userExist) {
            res.status(409).json({
                status: "false",
                message: "Username is taken."
            });
            return;
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            ...req.body
        })
        await newUser.save();
        res.status(201).json({
            status: "true",
            message: "Account created."
        })
        console.log(req.body); // Log the received data


    } catch (error) {
        res.status(500).json({
            status: "false",
            message: error.message
        })
    }
})


userRoutes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (mongoose.connection.readyState !== 1) {
            res.status(200).json({
                status: "false",
                message: "Database not Connected",
                providedCredentials: {
                    username,
                    password,
                },
            });
            return;
        }

        const user = await UserModel.findOne({ username });

        if (user) {
            if (user.password === password) {
                res.status(200).json({
                    status: "true",
                    username: user.username,
                    message: "User logged in successfully.",
                });
            } else {
                res.status(500).json({
                    status: "false",
                    message: "Invalid password",
                });
            }
        } else {
            res.status(500).json({
                status: "false",
                message: "Invalid Username or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "false",
            message: error.message,
        });
    }
})

module.exports = userRoutes