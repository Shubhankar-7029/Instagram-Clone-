const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


 async function registerController   (req, res) {
    const {email, username, password,bio,profileImage} = req.body


    const isUserExistByEmail = await userModel.findOne({
        $or: 
        [{ email }, { username }]  
    });

    if (isUserExistByEmail) {
        return res.status(409)
        .json({
            message: 'User with this email or username already exists' +(isUserAllreadyExists.email === email ? ' Email already exists' : ' Username already exists')
         });
    }

    // const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign
    ({ id: user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie("token", token, )

    res.status(201).json({
        message: 'User registered successfully',

        user: 
        { email: user.email,
             username: user.username ,
              bio: user.bio, 
              profileImage: user.profileImage}
    });

}

async function loginController (req, res)  {
    const {username,  email, password} = req.body;

    const user = await userModel.findOne({
        $or: 
        [{ email }, { username }]  
    });

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(404).json({
            message: 'Invalid password'
        });
    }
    // if (user.password !== hash) {
    //     return res.status(404).json({
    //         message: 'Invalid password'
    //     });
    // }

    const token = jwt.sign
    ({ id: user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
 


    res.status(200).json({
        message: 'User logged in successfully',
        user: 
        { email: user.email,
             username: user.username ,
              bio: user.bio, 
              profileImage: user.profileImage}
    });
}

module.exports = {
    registerController,
    loginController
}