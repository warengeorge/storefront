const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const User = require('../models/user');
const Token = require('../models/token');
const { helpers } = require('../helpers');
const logger = require('../middlewares/logger');
const auth = require("../middlewares/auth")
const { signupSchema, signinSchema, verificationTokenSchema } = require('../schemas/auth');

router.post('/signup', async (req, res) => {
    const validation = signupSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            if (!user.isVerified) {
                await helpers.sendEmailToVerifyAccount(user, req, res);
                res.status(400).json({
                    message: 'Your account has not been verified',
                    verified: false
                });
            }
            return res.status(400).json({ message: 'Email Already Exists' });
        } else {
            const newUser = new User({
                ...req.body
            });
            await userService.registerUser(newUser);
            await helpers.sendEmailToVerifyAccount(newUser, req, res);
            return res.status(201).json({
                success: true,
                message: "Account is successfully created and email has been sent.",
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        res.end();
    }
});

