const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/requestPlanController");

router.post("/add", controllers.addRequestPlan);
router.get("/getAll", controllers.getAllRequestPlans);
router.get("/getRequestById/:ID", controllers.getrequestPlanByID);
router.get("/getRequestByUserId/:Id", controllers.getrequestPlanByUserID);

router.put("/updateById/:ID", controllers.updaterequestPlanByID);
router.put("/updateByUserId/:ID", controllers.updaterequestPlanByUserID);
router.delete("/delete/:id", controllers.deleterequestPlanByID);

module.exports = router;