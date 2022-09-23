const categoryModel = require("../models/categoryModel");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports.technologyAdd = async (req, res) => {
    try {
        const body = req.body;
        let technologyName = body.technologyName;

        var data = {
            technologyName
        }

        var addedTechnologyName = await categoryModel.addTechnologyName(data);
        if (!addedTechnologyName.status) {
            return res.json({ status: false, message: addedTechnologyName.message });
        }

        return res.json({ status: true, message: "Technology added successfully!" });

    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });

    }
}

module.exports.technologyGet = async (req, res) => {
    try {

        var getTechnology = await categoryModel.getTechnology();
        if (!getTechnology.status) {
            return res.json({ status: false, message: getTechnology.message });
        }

        const token = jwt.sign(JSON.stringify(getTechnology.data), config.JWT_SECRET);

        return res.json({ status: true, message: "Technology get successfully!", data: token });
    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });

    }
}

module.exports.relevantPositionAdd = async (req, res) => {
    try {
        const body = req.body;
        let positionName = body.positionName;

        var data = {
            positionName
        }

        var addedPositionName = await categoryModel.addpositionName(data);
        if (!addedPositionName.status) {
            return res.json({ status: false, message: addedPositionName.message });
        }

        return res.json({ status: true, message: "RelevantPosition added successfully!" });

    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });

    }
}

module.exports.relevantPositionGet = async (req, res) => {
    try {

        var getPosition = await categoryModel.getPosition();
        if (!getPosition.status) {
            return res.json({ status: false, message: getPosition.message });
        }

        const token = jwt.sign(JSON.stringify(getPosition.data), config.JWT_SECRET);

        return res.json({ status: true, message: "RelevantPosition get successfully!", data: token });
    } catch (e) {
        return res.json({ status: false, message: "Something went wrong. Please try again." });

    }
}