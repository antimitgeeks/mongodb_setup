const {sendError} = require('../utils/responseHandler')

const auth = (req, res, next) => {
    if (req.body.age >= 18) {
        next()
    }
    else {
        res.send(401)
    }
};

const isadmin = (req, res, next) => {
    if (req.body.isadmin ==1) {
        next()
    }
    else {
        sendError(res,401,'user not allowed to add User ')
    }
};

module.exports = {auth,isadmin}