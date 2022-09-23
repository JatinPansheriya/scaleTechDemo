const express =require("express");
const router =express.Router();
const jwtHelper =require("./../helpers/jwt.helper");

const authController =require("../controllers/authController");

router.post("/register",authController.register);
router.post("/login",authController.login);

const employeeController =require("./../controllers/employeeController");

router.post("/employee/details/add",jwtHelper.verifyJWTToken,employeeController.addEmployeeDetails);
router.get("/employee/details/get",jwtHelper.verifyJWTToken,employeeController.getEmployeeDetails);

const technologyController =require("../controllers/categoryController");

router.post("/technology/add",jwtHelper.verifyJWTToken,technologyController.technologyAdd);
router.get("/technology/get",jwtHelper.verifyJWTToken,technologyController.technologyGet);
router.post("/relevant/position/add",jwtHelper.verifyJWTToken,technologyController.relevantPositionAdd);
router.get("/relevant/position/get",jwtHelper.verifyJWTToken,technologyController.relevantPositionGet);


module.exports= router