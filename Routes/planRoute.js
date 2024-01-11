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
} = require("../Controllers/planController");

router.post("/add", addPlan);
router.get("/getAll", getAllPlans);
router.get("/getByID/:ID", getPlanByID);
router.put("/update/:ID", updatePlanByID);
router.delete("/delete/:ID", deletePlanByID);

router.post("/getName/:name", getPlansByName);


module.exports = router;