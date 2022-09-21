const con = require("./../config/db.config");

module.exports.getUserByEmail = (email) => {
    return new Promise(resolve => {
        var sql = `SELECT * FROM users WHERE email = ?`;
        con.query(sql, [email], (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while check exist email!" });
            } else {
                if (result.length > 0) {
                    return resolve({ status: false, message: "Email already exist!" })
                } else {
                    return resolve({ status: true })
                }
            }
        })
    })
}
module.exports.userRegister = (data) => {
    return new Promise(resolve => {
        var sql = `INSERT INTO users SET ?`;
        con.query(sql, [data], (err, result) => {
            if (err) {
                console.log(err);
                return resolve({ status: false, message: "Error while register user!" });
            } else {
                if (result && result.insertId > 0) {
                    return resolve({ status: true });
                } else {
                    return resolve({ status: false, message: "Something went wrong!" })
                }
            }
        })
    })
}

module.exports.checkUserLogin = (email, password) => {
    return new Promise(resolve => {
        var sql = `SELECT id,firstName,lastName,email,mobileNo FROM users WHERE email = ? AND password = ? AND status = 1`;
        con.query(sql, [email, password], (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while user login!" });
            } else {
                if (result && result.length > 0) {
                    return resolve({ status: true, data: result });
                } else {
                    return resolve({ status: false, message: "Something went wrong!" })
                }
            }
        })
    })
}