const authModel = require("./../models/authModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.register = async (req, res) => {
    try {
        const body = req.body;
        let firstName = body.firstName;
        let lastName = body.lastName;
        let email = body.email;
        let password = body.password;
        let mobileNo = body.mobileNo;
        let status = (body.status) ? (body.status) : 1

        var checkEmailExist = await authModel.getUserByEmail(email);
        if (!checkEmailExist.status) {
            return res.json({ status: false, message: checkEmailExist.message })
        }

        var data = {
            firstName,
            lastName,
            email,
            password: md5(password),
            mobileNo,
            status
        }
        var userRegister = await authModel.userRegister(data);
        if (!userRegister.status) {
            return res.json({ status: false, message: userRegister.message });
        }

        return res.json({ status: true, message: "User register successfully!" });
    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });
    }
}

module.exports.login = async (req, res) => {
    try {
        const body = req.body;
        let email = body.email;
        let password = md5(body.password);

        var checkUserLogin = await authModel.checkUserLogin(email, password);
        if (!checkUserLogin.status) {
            return res.json({ status: false, message: checkUserLogin.message });
        }

        var token = jwt.sign(JSON.stringify(checkUserLogin.data[0]), config.JWT_SECRET);
        return res.json({ status: true, message: "User login successfully!", data: token })
    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });
    }
}