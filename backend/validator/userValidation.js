const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {validateEmail, validatePassword} = require('../utils/helper');
const utils = require('../utils/response');
const ObjectId = mongoose.Types.ObjectId;

exports.createUserValidations = (req, res, next) => {
    const bodyData = req.body;
    let errorMsg = [];

    console.log("Validations", bodyData);

    if (!bodyData.email) {
        errorMsg.push('Email is required');
    } else {
        if(!validateEmail(bodyData.email)) {
            errorMsg.push("Invalid Email Format!!");
        }
    }

    console.log("is wor");

    if (!bodyData.password) {
        errorMsg.push('password  is required')
    } else {
        if (!validatePassword(bodyData.password)) {
            errorMsg.push("Minimum eight characters, at least one letter, one number and one special character");
        }
    }

    if(!bodyData.name) {
        errorMsg.push("name is required");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    }

    bcrypt.hash(bodyData.password, 12, (error, result) => {
        if(error){
            return utils.response(res, 'fail', error.message, null, 400);
        }else{
            bodyData['_id'] = new mongoose.Types.ObjectId();
            bodyData['password'] = result;
            req.body = bodyData;
            next()
        }
    })
};

exports.loginValidations = (req, res, next) => {
    const bodyData = req.body;
    let errorMsg = [];

    if (!bodyData.email) {
        errorMsg.push('Email is required');
    } else {
        if (!validateEmail(bodyData.email)) {
            errorMsg.push("Invalid Email Format!!");
        }
    }

    if (!bodyData.password) {
        errorMsg.push("password  is required");
    }

    if (errorMsg.length > 0) {
        return utils.response(res, 'fail', errorMsg, null, 400);
    } else {
        req.body = bodyData;
        next();
    }
}

exports.updateUserValidations = (req, res, next) => {
    const bodyData = req.body;
    if(!bodyData.name) {
        return utils.response(res, 'fail', "Please Enter Name", null, 400);
    }
    if(!bodyData.email) {
        return utils.response(res, 'fail', "Please Enter E-mail", null, 400);
    } else {
        if(!validateEmail(bodyData.email)) {
            return utils.response(res, 'fail', "Minimum eight characters, at least one letter, one number and one special character", null, 400);
        }
    }
    next();
};

exports.getSingleUserValidations = (req, res, next) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        utils.response(res, 'fail', `${id} is not valid Mongoose Id`, null, 400);
    }
    next();
};