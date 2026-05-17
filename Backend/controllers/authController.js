const User = require('../models/userModel.js');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{
    const {name, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        return (
            res.status(400).json({
                message: "User already exists"
            })
        );
    }

    const hashPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password : hashPassword
    });

    res.status(201).json(user);
};

const login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return (
            res.status(401).json({
                message : "User does not exist"
            })
        );
    }

    const match = await bycrypt.compare(password, user.password);

    if(!match){
        return (
            res.status().json({
                message : "Incorrect Password"
            })
        );
    }

    const token = jwt.sign(
        {
            id : user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.json({token});
};

module.exports = {register, login};
