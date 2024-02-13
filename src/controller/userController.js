const User = require('../model/user');
const { sendSuccess, sendError } = require("../utils/responseHandler")
const winston = require('../config/logger')
const { createUser } = require("../services/userServices")


// 1. create user
const addUser = async (req, res) => {
    try {
        const { userName, email, password, mobile, age, hash, salt } = req.body
        const newUser = createUser(userName, email, password, mobile, age, hash, salt)
        sendSuccess(res, newUser);
    } catch (error) {
        // below argument only takes string we cannot pass direct the error so we have to send in backticks
        winston.log("info", `${req.url} ${error.message}`);
        sendError(res, 500, 'Error creating user:')
    }
};

// 2. get all users
const getAllUsers = async (req, res) => {
    try {
        let users = await User.find({});
        console.log(users)
        sendSuccess(res, users)
    } catch (error) {
        winston.log("info", `${req.url} ${error.message}`);
        sendError(res, 500, 'Error getting all  user:')
    }
};

// 3. get single user
const getOneUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id);
        if (!user) {
            winston.log("info", `${req.url} User not found`);
            return sendError(res, 404, 'user not found')
        }
        sendSuccess(res, user)
    } catch (error) {
        console.log(error);
        winston.log("info", `${req.url} ${error.message}`);
        sendError(res, 500, 'internal server error')
    }
};

// 4. update user
const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(id, req.body);

        if (!updatedUser) {
            winston.log("info", `${req.url} User not found`);
            return sendError(res, 404, 'user not found ')
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        winston.log("info", `${req.url} ${error.message}`);
        sendError(res, 500, 'Internal server error ')
    }
};


// 5. delete user by id
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedRowCount = await User.findByIdAndDelete(id);
        if (deletedRowCount === 0) {
            winston.log("info", `${req.url} User not found`);
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).send('User is deleted!');
    } catch (error) {
        winston.log("info", `${req.url} ${error.message}`);
        sendError(res, 500, 'Internal Server Error ')
    }
};
const login = async (req, res, next) => {
    try {
        res.send('You entered the correct value password.');
        next();
    }
    catch (error) { winston.log("info", `${req.url} ${error.message}`); }

};

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    login
};
