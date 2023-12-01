const express = require('express');
const router = express.Router();
const { createUserValidations, loginValidations, updateUserValidations, getSingleUserValidations } = require('../validator/userValidation');
const { createUser, loginUser, logoutUser, updateUser, getAllUsers, getSingleUser } = require('../controller/userController');
const checkAuth = require('../middleware/checkAuth');

router.post('/create-user', createUserValidations, createUser); // Sign up User
router.post('/login', loginValidations, loginUser); // Sign in user
router.get('/logout', logoutUser); // logout User
router.put('/me/update', checkAuth, updateUserValidations, updateUser); // Update User
router.get('/all-users', getAllUsers); // Get All Users
router.get('/user/:id', getSingleUserValidations, getSingleUser); // Get Single User

module.exports = router;