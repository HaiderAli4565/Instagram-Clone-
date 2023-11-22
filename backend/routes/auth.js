const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require('../keys');
const requireLogin = require("../middlewares/requireLogin");



router.get('/', (req, res) => {
    res.send("Hello")
})

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body; // instead of const name = req.body.name

    if (!name || !userName || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User Already exist with the same email or userName" })
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {

            const user = new USER({
                name,
                email,
                userName,
                password: hashedPassword
            })
            user.save()
                .then(user => {
                    res.json({ message: "Registered successfully" });
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        console.error('Validation Errors:', err.errors);
                        res.status(400).json({ error: err.message });
                    } else {
                        console.error(err);
                        res.status(500).json({ error: "Internal Server Error" });
                    }
                })
        })

    })
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email" })
        }
        bcrypt.compare(password, savedUser.password).then((matchpass) => {
            if (matchpass) {
                //return res.status(200).json({ message: "Signed in successfully" })
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const {_id,name,email,userName} = savedUser
                res.json({token,user:{_id,name,email,userName}})
                console.log({token,user:{_id,name,email,userName}})

            }
            else {
                return res.status(422).json({ error: "Invalid Password" })
            }
        })
            .catch(err => console.log(err))
    })
})

module.exports = router;