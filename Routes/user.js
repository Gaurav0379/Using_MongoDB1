const express = require('express');
//Importing the user-controller for the logic of different APIs
const { getAllUsers, getUserById, createNewUser, updateUserById, deleteUserById, userSubscriptionDetailsById } = require('../controllers/user-controller');
//
const router = express.Router();

//Get all users
router.get('/',getAllUsers);

//Get the user by id
router.get('/:id',getUserById);

//Create a new user
router.post('/',createNewUser);

//Update a user by id
router.put('/:id',updateUserById);

//Delete a user
router.delete('/:id',deleteUserById);

//Get users subscription details and fine related to it by user id
router.get('/subscription-detail/:id',userSubscriptionDetailsById);

module.exports = router;