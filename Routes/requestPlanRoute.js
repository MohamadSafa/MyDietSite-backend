const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/requestPlanController");

router.post("/add", controllers.addRequestPlan);
router.get("/getAll", controllers.getAllRequestPlans);
router.get("/getOrderId/:ID", controllers.getrequestPlanByID);
router.put("/update/:ID", controllers.updaterequestPlanByID);
router.delete("/delete/:id", controllers.deleterequestPlanByID);

module.exports = router;