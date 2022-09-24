const employeeModel = require("./../models/employeeModel");
const jwt = require("jsonwebtoken");
const config = require("./../config/config")
module.exports.addEmployeeDetails = async (req, res) => {
    try {
        const body = req.body;
        let fullName = body.fullName;
        let dateOfBirth = body.dateOfBirth;
        let relevantPosition = body.relevantPosition;
        let technology = body.technology;
        let experience = body.experience;
        let currentCity = body.currentCity;
        let currentCTC = body.currentCTC;
        let expectedCTC = body.expectedCTC;
        const files = req.files;
        let cvFile = files.cvFile;
        let data = {
            fullName,
            dateOfBirth,
            relevantPosition,
            technology,
            experience,
            currentCity,
            currentCTC,
            expectedCTC,
        }
        if (cvFile) {
            let fileName = Date.now() + '.' + cvFile.name.split(" ").join("-");
            await cvFile.mv('./public/' + fileName, (err) => {
                if (err) {
                    return res.json({ status: true, message: "Error while upload file!" });
                }
            })
            data.cvURL = `public/${fileName}`;
        }

        var addedEmployeeDetails = await employeeModel.addEmployeeDetail(data);
        if (!addedEmployeeDetails.status) {
            return res.json({ status: false, message: addedEmployeeDetails.message });
        }

        return res.json({ status: true, message: "Employee details added successfully!" });

    } catch (e) {
        console.log(e);
        return res.json({ status: false, message: "Something went wrong. Please try again." });
    }
}

module.exports.getEmployeeDetails = async (req, res) => {
    try {

        const query = req.query;
        var employeeDetailsGet = await employeeModel.employeeDetailsGet(query);
        if (!employeeDetailsGet.status) {
            return res.json({ status: false, message: employeeDetailsGet.message })
        }

        const token = jwt.sign(JSON.stringify(employeeDetailsGet.data), config.JWT_SECRET);

        return res.json({ status: true, message: "Employee details get successfully.", data: employeeDetailsGet.data });

    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });
    }
}

module.exports.EmployeeDetailsPdfDownload = async (req, res) => {
    try {
        const query = req.query;
        let pdfURL = query.pdfURL;
        return res.download(pdfURL)
    } catch (e) {
        console.log(e);
        return res.json({ status: false, message: "Something went wrong. Please try again." });
    }
}