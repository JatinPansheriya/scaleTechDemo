const jwt = require("jsonwebtoken");
const config = require("./../config/config");

module.exports.verifyJWTToken = (request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (!token) {
            return response.status(401).json({ status: false, message: 'Invalid token or expired!' });
        } else {
            jwt.verify(token, config.JWT_SECRET, async (err, result) => {
                if (err) {
                    return response.status(401).json({ status: false, message: 'Invalid token or expired!' });
                } else {
                    if (result && result.id) {
                        request.body.userId = result.id;
                        return next();
                    } else {
                        return response.status(401).json({ status: false, message: 'Invalid token or expired!' });
                    }
                }
            })
        }
    } catch (e) {
        return response.status(401).json({ status: false, message: 'Something went wrong. please try again.' });
    }
}