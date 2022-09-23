const con = require("./../config/db.config");

module.exports.addEmployeeDetail = (data) => {
    return new Promise(resolve => {
        var sql = `INSERT INTO emaployee_details SET ?`;
        con.query(sql, [data], (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while add emaployee_details" });
            } else {
                if (result && result.insertId > 0) {
                    return resolve({ status: true });
                } else {
                    return resolve({ status: false, message: "Something went wrong." })
                }
            }
        })
    })
}
module.exports.employeeDetailsGet = (query) => {
    return new Promise(resolve => {
        let name = query.name;
        let position = query.position;
        let experience = query.experience;

        var sql = `SELECT * FROM emaployee_details WHERE `;
        if (name) {
            sql += `fullName LIKE ('%${name}%') AND `
        }
        if (position) {
            sql += `relevantPosition LIKE ('%${position}%') AND `
        }
        if (experience) {
            sql += `experience BETWEEN 0 AND ${experience} AND `
        }
        sql += `status = 1 `;
        con.query(sql, (err, result) => {
            if (err) {
                return resolve({ status: false, message: "Error while get employee details!" });
            } else {
                if (result && result.length > 0) {
                    return resolve({ status: true, data: result });
                } else {
                    return resolve({ status: false, message: "No details found!" });
                }
            }
        })
    })
}