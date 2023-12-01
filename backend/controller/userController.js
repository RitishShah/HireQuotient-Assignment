const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const utils = require('../utils/response');
const jwtTokenCookie = require('../utils/jwtTokenCookie');

dotenv.config({
    path:"backend/config/.env"
});

exports.createUser = async (req, res) => {
    const bodyData = req.body;
    console.log(bodyData);
    const name = bodyData.name;
    const email = bodyData.email;
    const password = bodyData.password;

    const user = await User.find({email: email});

    if(user.length > 0) {
      return utils.response(res, 'fail', 'Mail already exists !!', null, 404);
    }

    try {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password
        });
        result = await user.save();
        const token = jwt.sign({ userid: result._id }, process.env.JWT_KEY, { expiresIn: "24h" });
        console.log("asasdasdasdasdasdas", token);
        jwtTokenCookie.sendToken(res,token);
        utils.response(res, 'success', 'User Created', token, 200);
    } catch (error) {
      utils.response(res, 'fail', error.message, null, 403);
    }
};

// Sign In User
exports.loginUser = async (req, res) => {
    const bodyData = req.body;
    const user = await User.find({email: bodyData.email}, "-__v");
  
    console.log(user);
    console.log(bodyData);
  
    if(user.length > 0) {
      bcrypt.compare(bodyData.password, user[0].password, (error, result) => {
        if (error) {
          return utils.response(res, 'fail', 'Auth Failed', null, 401);
        }
        if (result) {
          const token = jwt.sign({ email: user[0].email, userid: user[0]._id }, process.env.JWT_KEY, { expiresIn: "24h" });
          const data = user[0];
          console.log(data);
          const userInfo = {
            "name": data.name,
            "email": data.email,
            "createdAt": data.createdAt,
          }
          console.log("login user", token);
          jwtTokenCookie.sendToken(res,token);
          return utils.response(res, 'success', "Auth Successful", userInfo, 200);
        } else {
          utils.response(res, 'fail', "Password not matching with database", null, 400);
        }
      });
    } else {
      utils.response(res, 'fail', "User Not Found", null, 404);
    }
}

  // Sign Out User
exports.logoutUser = async (req, res) => {
    res.cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly:true
    });
    utils.response(res,'success','User logout', null, 200);
}

exports.updateUser = async (req, res) => {
  const bodyData = req.body;
  const name = bodyData.name;
  const email = bodyData.email;
  const userId = req.user.id;
  const user = await User.find({_id: userId});

  if(user.length == 0) {
    return utils.response(res, 'fail', "User is not found with this id", null, 400);
  }

  await User.findByIdAndUpdate(userId, {'name': name, 'email': email}, {
    new: true,
    runValidator: true,
    useFindAndModify: false
  });

  const updatedUser = await User.find({_id: userId});

  utils.response(res, 'success', "Profile Updated Successfully", updatedUser[0], 200);
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  utils.response(res, 'success', "All Users", users, 200);
}

exports.getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return utils.response(res, 'fail', "User is not found with this id", null, 400);
  }

  utils.response(res, 'success', "User found with this id", user, 200);
};