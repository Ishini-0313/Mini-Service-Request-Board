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

const login = ()=>{};

module.exports = {register, login};
