const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
    addPlan,
    getAllPlans,
    getPlanByID,
    updatePlanByID,
    deletePlanByID,
    getPlansByName,
    getPlansByDescription,
} = require("../Controllers/planController");

router.post("/add", addPlan);
router.get("/getAll", getAllPlans);
router.get("/getByID/:ID", getPlanByID);
router.put("/update/:ID", updatePlanByID);
router.delete("/delete/:ID", deletePlanByID);

router.get("/getName/:name", getPlansByName);
router.get("/getDescription/:description", getPlansByDescription);

module.exports = router;