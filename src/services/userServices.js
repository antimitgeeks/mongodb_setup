const User = require('../model/user');
const genPassword = require('../lib/passwordUtils').genPassword
const mongoose = require('mongoose')


const createUser = async (userName, email, password, mobile, age, hash, salt) => {
    var saltHash = genPassword(email);

    var salt = saltHash.salt;
    var hash = saltHash.hash;

    let info = {
        userName: userName,
        age: age,
        email: email,
        password: password,
        mobile: mobile,
        hash: hash,
        salt: salt
    };

    const newUser = await User.create(info);
    return newUser
}

module.exports = {
    createUser
}