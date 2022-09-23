const con = require("../config/db.config");

module.exports.addTechnologyName = (data) => {
    return new Promise(resolve => {
        var sql = `INSERT INTO technologies SET ?`;
        con.query(sql, [data], (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while add technology!" });
            } else {
                if (result && result.insertId > 0) {
                    return resolve({ status: true })
                } else {
                    return resolve({ status: false, message: "Something went wrong." });
                }
            }
        })
    })
}

module.exports.getTechnology = () => {
    return new Promise(resolve => {
        var sql = `SELECT * FROM technologies WHERE status = 1`;
        con.query(sql, (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while get technology!" });
            } else {
                if (result && result.length > 0) {
                    return resolve({ status: true, data: result })
                } else {
                    return resolve({ status: false, message: "Something went wrong." });
                }
            }
        })
    })
}

module.exports.addpositionName = (data) => {
    return new Promise(resolve => {
        var sql = `INSERT INTO relevant_position SET ?`;
        con.query(sql, [data], (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while add relevantPosition!" });
            } else {
                if (result && result.insertId > 0) {
                    return resolve({ status: true })
                } else {
                    return resolve({ status: false, message: "Something went wrong." });
                }
            }
        })
    })
}

module.exports.getPosition = () => {
    return new Promise(resolve => {
        var sql = `SELECT * FROM relevant_position WHERE status = 1`;
        con.query(sql, (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while get relevant_position!" });
            } else {
                if (result && result.length > 0) {
                    return resolve({ status: true, data: result })
                } else {
                    return resolve({ status: false, message: "Something went wrong." });
                }
            }
        })
    })
}